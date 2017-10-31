const isAdmin = require('../utils/isAdmin');
const { extractMentionedUser }  = require('../utils/extractMentionedUsers');

class GetHPCommand {
  constructor (slack, hpService) {
    this.slack = slack;
    this.hpService = hpService;

    this.init();
  }

  init () {
    this.slack.on('/fitquest-my-hp', async (msg, bot) => {
      try {
        const response = await this.hpService.get(msg.user_id);
        bot.replyPrivate(`@${msg.user_name} has ${response.hp}HP`);
      } catch (error) {
        bot.replyPrivate('Whoops! An Error occured!');
      }
    });
  }
}

module.exports = GetHPCommand;
