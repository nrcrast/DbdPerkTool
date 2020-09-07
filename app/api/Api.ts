import SwaggerClient from 'swagger-client';
import settingsUtil from '../settings/Settings';

class Api {
  constructor() {
    this.client = null;
    this.loggedIn = false;
  }

  setJwt(jwt) {
    this.jwtToken = jwt.jwtToken;
  }

  setRefreshToken(token) {
    this.refreshToken = token;
  }

  async initialize() {
    const specUrl = `${settingsUtil.get('targetServer')}/spec`;
    this.client = await SwaggerClient(specUrl);
    this.client.spec.schemes = `${specUrl.split('//')[0]}//`; // http/https
  }
}

export default new Api();
