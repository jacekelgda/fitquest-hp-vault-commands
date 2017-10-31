const isAdmin = require('../utils/isAdmin');
const { extractMentionedUser }  = require('../utils/extractMentionedUsers');

class RemoveHPCommand {
  constructor (slack, hpService) {
    this.slack = slack;
    this.hpService = hpService;

    this.init();
  }

  init () {
    this.slack.on('/removehp', async (msg, bot) => {
      try {
        let message = 'Removing 1HP';
        if (isAdmin(msg.user_name)) {
          const mentionedUser = extractMentionedUser(msg.text);
          console.log(mentionedUser);
          bot.replyPrivate(`${message} from @${mentionedUser.userName}`);
        }
      } catch (error) {
        bot.replyPrivate('Whoops! An Error occured!');
      }
    });
  }
}

module.exports = RemoveHPCommand;
