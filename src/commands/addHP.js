const isAdmin = require('../utils/isAdmin');
const { extractMentionedUser }  = require('../utils/extractMentionedUsers');

class AddHPCommand {
  constructor (slack, hpService) {
    this.slack = slack;
    this.hpService = hpService;

    this.init();
  }

  init () {
    this.slack.on('/fitquest-add-hp', async (msg, bot) => {
      try {
        if (isAdmin(msg.user_name)) {
            const mentionedUser = extractMentionedUser(msg.text);
            bot.replyPrivate(`Adding 1HP to @${mentionedUser.userName} ...`);
            let notify = true;
            const response = await this.hpService.addHP(mentionedUser)
              .catch((error) => {
                if (error.response.body === 'ConditionalCheckFailedException') {
                  bot.replyPrivate(`@${mentionedUser.userName} max HP reached.`);
                }
                notify = false;
              });
            if (notify) {
              bot.replyPrivate(`${response.Attributes.userName} has now ${response.Attributes.hp}HP.`);
            }
        } else {
          bot.replyPrivate('Access denied');
        }
      } catch (error) {
        console.log('Add HP Exception:', error);
        bot.replyPrivate('Whoops! An Error occured!');
      }
    });
  }
}

module.exports = AddHPCommand;
