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
        if (isAdmin(msg.user_name)) {
          const mentionedUser = extractMentionedUser(msg.text);
          bot.replyPrivate(`Removing 1HP from @${mentionedUser.userName} ...`);
          let notify = true;
          const response = await this.hpService.removeHP(mentionedUser)
            .catch((error) => {
              if (error.response.body === 'ConditionalCheckFailedException') {
                bot.replyPrivate(`@${mentionedUser.userName} is already dead.`);
              }
              notify = false;
            });
          if (notify) {
            if (response.Attributes.hp < 1) {
              bot.replyPrivate(`${response.Attributes.userName} has died! ${response.Attributes.hp}HP ['].`);
            } else {
              bot.replyPrivate(`${response.Attributes.userName} has now ${response.Attributes.hp}HP.`);
            }
          }
        } else {
          bot.replyPrivate('Access denied');
        }
      } catch (error) {
        console.log('Remove HP Exception:', error);
        bot.replyPrivate('Whoops! An Error occured!');
      }
    });
  }
}

module.exports = RemoveHPCommand;
