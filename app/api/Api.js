/* eslint-disable max-classes-per-file */
import EventEmitter from 'events';
import log from 'electron-log';
import settingsUtil from '../settings/Settings.ts';
import Jwt from './Jwt';
import ApiExecutor from './ApiExecutor';

class Api extends EventEmitter {
  constructor() {
    super();
    this.currentUser = null;
  }

  async initialize() {
    const targetServer = settingsUtil.get('targetServer');
    this.executor = await new ApiExecutor(`${targetServer}/spec`);
    await this.executor.initialize();
    this.executor.spec.servers[0].url = `${targetServer}/v2`;
    await this.getUser();
  }

  async getUser() {
    try {
      const user = await this.executor.apis.default.getUser();
      if (user.username) {
        this.currentUser = user;
        this.emit('loggedIn', user);
        log.info('User Logged In: ', user);
      }
    } catch (e) {
      log.info('User not logged in!');
    }
  }

  async setLoggedIn(jwtResp) {
    this.executor.setJwt(new Jwt(jwtResp), jwtResp.refreshToken);
    await this.executor.saveJwt();
    await this.getUser();
  }

  async setLoggedOut() {
    delete this.executor.jwt;
    await this.executor.deleteJwt();
  }
}

export default new Api();
