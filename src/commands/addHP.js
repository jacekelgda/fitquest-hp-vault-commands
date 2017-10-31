const isAdmin = require('../utils/isAdmin');
const { extractMentionedUser }  = require('../utils/extractMentionedUsers');

class AddHPCommand {
  constructor (slack, hpService) {
    this.slack = slack;
    this.hpService = hpService;

    this.init();
  }

  init () {
    this.slack.on('/addhp', async (msg, bot) => {
      try {
        console.log(msg);
        let message = 'Adding 1HP';
        if (isAdmin(msg.user_name)) {
            const mentionedUser = extractMentionedUser(msg.text);
            console.log(mentionedUser);
            bot.replyPrivate(`${message} to @${mentionedUser.userName}`);
            this.hpService.addHP(mentionedUser);
        }
      } catch (error) {
        bot.replyPrivate('Whoops! An Error occured!');
      }
    });
  }
}

module.exports = AddHPCommand;
