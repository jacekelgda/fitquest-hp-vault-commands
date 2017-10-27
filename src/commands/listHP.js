const isAdmin = require('../utils/isAdmin');
const { extractMentionedUsers } = require('../utils/extractMentionedUsers');

class ListHPCommand {
  constructor (slack, hpService) {
    this.slack = slack;
    this.hpService = hpService;

    this.init();
  }

  init () {
    this.slack.on('/listHP', async (msg, bot) => {
      try {
        let message = 'HP Vault: \n';

        if (isAdmin(msg.user_name)) {
          try {
              const data = await this.hpService.getAll();
          } catch (e) {
              bot.replyPrivate(e);
              return;
          }

          for (const index in data) {
            message += `\n${data[index].name} - ${data[index].coins}`;
          }
        } else {
          const data = await this.coinsService.get(msg.user_id);
          const coins = data ? data.coins : 0;

          message = `You have ${coins} :coin:`;
        }

        bot.replyPrivate(message);
      } catch (error) {
        bot.replyPrivate('Whoops! An Error occured!');
      }
    });
  }
}

module.exports = ListHPCommand;
