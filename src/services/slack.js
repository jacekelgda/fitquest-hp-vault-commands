class SlackApiService {
  constructor (slackClient) {
    this.slackClient = slackClient;
  }

  getTeamUsers () {
    return new Promise((resolve, reject) => {
      this.slackClient.api('users.list',
        {},
        (err, response) => {
          if (err) {
              reject(err);
          } else if (response.ok === false) {
              reject(response.error);
          } else if (response.ok === true) {
              resolve(response.members);
          }
        });
    });
  }

  filterActiveUsers (members) {
    let activeUsers = [];
    for (let i = 0; i < members.length; i += 1) {
        const userData = members[i];
        if (!userData.is_bot && !userData.deleted && !userData.is_restricted) {
            activeUsers.push(userData);
        }
    }

    return activeUsers
  }
}

module.exports = SlackApiService;
