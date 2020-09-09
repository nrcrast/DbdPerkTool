/* eslint-disable max-classes-per-file */
import { AbilityBuilder, Ability } from '@casl/ability';
import log from 'electron-log';
import settingsUtil from '../settings/Settings.ts';
import Jwt from './Jwt';
import ApiExecutor from './ApiExecutor';

function defineAbilitiesFor(user) {
  const { can, cannot, rules } = new AbilityBuilder();

  if (user.role === 'TrustedCreator') {
    can('manage', 'PerkPack');
  } else if (user.role === 'Administrator') {
    can('manage', 'all');
  }
  return new Ability(rules);
}

class Api {
  constructor() {
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
        user.abilities = defineAbilitiesFor(user);
        this.currentUser = user;
        log.info('User Logged In: ', user);
      }
    } catch (e) {
      log.info('User not logged in!', e);
    }
  }

  isLoggedIn() {
    return this.currentUser !== null && this.currentUser !== undefined;
  }

  async setLoggedIn(jwtResp) {
    this.executor.setJwt(new Jwt(jwtResp), jwtResp.refreshToken);
    await this.executor.saveJwt();
    await this.getUser();
  }

  async updateFavorite(packId, newValue) {
    if (newValue) {
      await this.executor.apis.default.addFavorite({
        id: packId
      });
    } else {
      await this.executor.apis.default.deleteFavorite({
        id: packId
      });
    }
  }

  async setLoggedOut() {
    this.currentUser = null;
    delete this.executor.jwt;
    await this.executor.deleteJwt();
  }
}

export default new Api();
