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
        log.info(`User logged in: ${user.username} - ${user.steamDisplayName}`);
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

  async connectAuthor(steamId, authorName) {
    await this.executor.apis.default.connectProfile({}, {requestBody: {steamId, author: authorName}});
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

  async getPacks(queryParams) {
    if(this.isLoggedIn()) {
      return this.executor.apis.default.getPacksSec(queryParams);
    } else {
      return this.executor.apis.default.getPacks(queryParams);
    }
  }

  async determineTargetServer() {
    const servers = ['https://dead-by-daylight-icon-toolbox.herokuapp.com', 'http://app.dbdicontoolbox.com'];
    for(let i = 0; i < servers.length; i++) {
      logger.info(`Attempting to communicate with server ${servers[i]}`)
      const server = servers[i];
      try {
        const lastUpdate = await axios.get(`${server}/lastUpdate`)
        logger.info(`Successfully communicated with server ${server}`)
        return server;
      } catch(e) {
        logger.info(`Error communicating with server ${server}`)
      }
    }
    return null;
  }

  async setLoggedOut() {
    this.currentUser = null;
    delete this.executor.jwt;
    await this.executor.deleteJwt();
  }

  async getPatrons() {
    return this.executor.apis.default.getPatrons();
  }

  async popNotification() {
    logger.debug('Popping notification');
    return this.executor.apis.default.popNotification(settingsUtil.settings.lastNotificationRead ? {since: settingsUtil.settings.lastNotificationRead} : {});
  }

  async checkForPackChanges() {
    const lastUpdate = await axios.get(
      `${settingsUtil.get('targetServer')}/lastUpdate`
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
    const fileDetails = fs.statSync(sourceFile);

    if(fileDetails.size / 1000000.0 > 150) {
      throw Error('File is too large. Must be less than 150MB!');
    }

    const file = await fs.readFile(sourceFile);
    // This is just a little hack to update the JWT if necessary before the upload
    // The upload doesn't use swagger client, and I did not want to re-write the JWT refresh
    // logic
    await this.getUser();
    const uploadUrl = settingsUtil.settings.uploadServer || await this.executor.apis.default.getUploadServer();
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
