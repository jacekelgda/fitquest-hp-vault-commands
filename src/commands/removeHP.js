const isAdmin = require('../utils/isAdmin');
const { extractMentionedUser }  = require('../utils/extractMentionedUsers');

class RemoveHPCommand {
  constructor (slack, hpService) {
    this.slack = slack;
    this.hpService = hpService;

    this.init();
  }

  init () {
    this.slack.on('/fitquest-remove-hp', async (msg, bot) => {
      try {
        let message = 'Removing 1HP';
        if (isAdmin(msg.user_name)) {
          const mentionedUser = extractMentionedUser(msg.text);
          bot.replyPrivate(`${message} from @${mentionedUser.userName}`);
          const response = await this.hpService.removeHP(mentionedUser);
          console.log('Response:', response);
        } else {
          bot.replyPrivate('Access denied');
        }
      } catch (error) {
        bot.replyPrivate('Whoops! An Error occured!');
      }
    });
  }
}

module.exports = RemoveHPCommand;
