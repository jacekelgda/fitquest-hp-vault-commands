class HpService {
  constructor (url, rp) {
    this.url = url;
    this.requestService = rp;
  }

  getAll () {
    return rp(this.url)
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = HpService;
