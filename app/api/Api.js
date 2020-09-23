/* eslint-disable max-classes-per-file */
import { AbilityBuilder, Ability } from '@casl/ability';
import {remote} from 'electron';
import log from 'electron-log';
import settingsUtil from '../settings/Settings.ts';
import Jwt from './Jwt';
import fs from 'fs-extra';
import logger from 'electron-log';
import axios from 'axios';
import ApiExecutor from './ApiExecutor';

const mainWindow = remote.getCurrentWindow();

axios.defaults.adapter = require('axios/lib/adapters/xhr.js');

function defineAbilitiesFor(user) {
  const { can, cannot, rules } = new AbilityBuilder();

  if(user.role === 'Administrator') {
    can('manage', 'all');
  } else if (user.role === 'TrustedCreator') {
    can('manage', 'PerkPack', {
        author: { $regex: `^${(user.authorProfile || {}).name}[ |+|&]?` }
    });
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
        return this.currentUser;
      }
    } catch (e) {
      log.info('User not logged in!', e);
      return null;
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

  async popNotification() {
    return this.executor.apis.default.popNotification({since: settingsUtil.settings.lastNotificationRead});
  }

  async checkForPackChanges() {
    const lastUpdate = await axios.get(
      'https://dead-by-daylight-icon-toolbox.herokuapp.com/lastUpdate'
    );

    if (lastUpdate.data !== settingsUtil.settings.lastUpdate) {
      logger.info('Clearing cache!');
      await mainWindow.webContents.session.clearCache();
      settingsUtil.settings.lastUpdate = lastUpdate.data;
      await settingsUtil.save();
      return lastUpdate.data;
    }

    return false;
  }

  async uploadZip(sourceFile, onProgress) {
    const file = await fs.readFile(sourceFile);
    // This is just a little hack to update the JWT if necessary before the upload
    // The upload doesn't use swagger client, and I did not want to re-write the JWT refresh
    // logic
    await this.getUser();
    const uploadUrl = await this.executor.apis.default.getUploadServer();
    await axios.post(`${uploadUrl}/v2/packs`, file, {
      headers: {
        'Content-Type': 'application/octet-stream',
        Authorization: `Bearer ${this.executor.jwt.token}`
      },
      onUploadProgress: progressEvent => {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader('content-length') ||
            progressEvent.target.getResponseHeader(
              'x-decompressed-content-length'
            );
        console.log('onUploadProgress', totalLength);
        if (totalLength !== null) {
          onProgress(Math.round((progressEvent.loaded * 100) / totalLength));
        }
      }
    });
  }
}

export default new Api();
