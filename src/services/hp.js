class HpService {
  constructor (url, rp) {
    this.url = url;
    this.rp = rp;
  }

  create (data) {
    const options = {
      uri: `${this.url}/healthpoints`,
      method: 'POST',
      json: true,
      body: data
    };
    return this.rp(options);
  }

  createAll (data) {
    const options = {
      uri: `${this.url}/init`,
      method: 'POST',
      json: true,
      body: data
    };
    return this.rp(options);
  }

  getAll () {
    const options = {
        uri: `${this.url}/healthpoints`,
        json: true
    };
    return this.rp(options);
  }
}

module.exports = HpService;
