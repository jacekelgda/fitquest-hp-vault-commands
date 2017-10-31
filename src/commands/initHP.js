const isAdmin = require('../utils/isAdmin');

class InitHPProfilesCommand {
  constructor (slack, hp, slackApi) {
    this.slack = slack;
    this.hp = hp;
    this.slackApi = slackApi;

    this.init();
  }

  init () {
    this.slack.on('/inithpprofiles', async (msg, bot) => {
      if (isAdmin(msg.user_name)) {
        try {
          const slackUsers = await this.slackApi.getTeamUsers();
          const activeUsers = this.slackApi.filterActiveUsers(slackUsers);
          const data = this.slackApi.reduceToData(activeUsers);
          console.log(data.length);
          // send all payload
          await this.hp.createAll(data);

          bot.replyPrivate('Done!');
        } catch (error) {
          console.log(error);
          bot.replyPrivate('Whoops! An Error occured!');
        }
      }  else {
        bot.replyPrivate('Access denied');
      }
    });
  }
}

module.exports = InitHPProfilesCommand;
