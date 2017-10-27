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
          for (let i = 0; i < activeUsers.length; i += 1) {
            const data = {
              slackid: activeUsers[i].id,
              slackusername: activeUsers[i].name
            }
            await this.hp.create(data);
            bot.replyPrivate(`Created ${activeUsers[i].name}\n`);
          }
          bot.replyPrivate('Done!');
        } catch (error) {
          console.log(error);
          bot.replyPrivate('Whoops! An Error occured!');
        }
      } else {
        bot.replyPrivate('You don\'t have a permission to do that!');
      }
    });
  }
}

module.exports = InitHPProfilesCommand;
