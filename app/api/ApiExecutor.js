/* eslint-disable max-classes-per-file */
import SwaggerClient from 'swagger-client';
import keytar from 'keytar';
import settingsUtil from '../settings/Settings.ts';
import Jwt from './Jwt';

export default class ApiExecutor extends SwaggerClient {
  async initialize() {
    try {
      const jwt = new Jwt(
        JSON.parse(await keytar.getPassword('dbdicontoolbox', 'jwt'))
      );
      this.refreshToken = await keytar.getPassword(
        'dbdicontoolbox',
        'refreshToken'
      );

      if (jwt) {
        this.setJwt(jwt, this.refreshToken);
      }
    } catch (e) {
      await this.deleteJwt();
    }
  }

  clientHasJwt() {
    return this.jwt !== undefined && this.jwt !== null;
  }

  jwtNeedsRefresh() {
    return !this.clientHasJwt() || this.jwt.isExpired();
  }

  clearJwt() {
    this.jwt = null;
  }

  setJwt(jwt, refreshToken) {
    this.jwt = jwt;
    this.refreshToken = refreshToken;
    this.authorizations = {
      BearerAuth: {
        value: this.jwt.token
      }
    };
  }

  async deleteJwt() {
    await keytar.deletePassword('dbdicontoolbox', 'jwt');
    await keytar.deletePassword('dbdicontoolbox', 'refreshToken');
  }

  async saveJwt() {
    await keytar.setPassword(
      'dbdicontoolbox',
      'jwt',
      JSON.stringify(this.jwt.jwtData)
    );
    await keytar.setPassword(
      'dbdicontoolbox',
      'refreshToken',
      this.refreshToken
    );
  }

  async refreshJwt() {
    const jwtData = await this.apis.default.refreshToken(
      {},
      { requestBody: { refreshToken: this.refreshToken } }
    );
    this.setJwt(new Jwt(jwtData), jwtData.refreshToken);
    await this.saveJwt();
  }

  hasSecurity(opts) {
		let path = null;

		if (opts.method === 'GET') {
			path = opts.spec.paths[opts.pathName].get;
		} else if (opts.method === 'PUT') {
			path = opts.spec.paths[opts.pathName].put;
		} else if (opts.method === 'DELETE') {
			path = opts.spec.paths[opts.pathName].delete;
		} else {
			path = opts.spec.paths[opts.pathName].post;
		}

		return path.security && path.security.length > 0;
	}

  async execute(opts) {
    const currentApi = this;
    if (this.hasSecurity(opts) && this.jwtNeedsRefresh() && opts.operationId !== 'refreshToken') {
      await this.refreshJwt();
    }

    const targetServer = settingsUtil.get('targetServer');
    this.spec.schemes = `${targetServer.split('//')[0]}//`; // http/https

    try {
      // Try to execute the call
      const resp = await super.execute(opts);
      return resp.obj;
    } catch (e) {
      // Unauthorized. Refresh JWT
      if (e.statusCode === 401 && opts.operationId !== 'refreshToken') {
        console.log('Refreshing JWT');
        await currentApi.refreshJwt();
      } else {
        // Some other HTTP error. Bubble it up to the caller.
        throw e;
      }

      // Try again
      return super.execute(opts);
    }
  }
}
