export default class Jwt {
  constructor(jwtData) {
    this.token = jwtData.jwtToken;
    this.jwtData = jwtData;
    this.tokenExpire = new Date(jwtData.jwtTokenExpiry);
  }

  isExpired() {
    const now = new Date();
    return this.tokenExpire <= now;
  }
}
