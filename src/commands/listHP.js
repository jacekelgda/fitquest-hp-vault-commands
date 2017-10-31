const isAdmin = require('../utils/isAdmin');

class ListHPCommand {
  constructor (slack, hpService) {
    this.slack = slack;
    this.hpService = hpService;

    this.init();
  }

  init () {
    this.slack.on('/listhp', async (msg, bot) => {
      try {
        let message = '';
        if (isAdmin(msg.user_name)) {
          const data = await this.hpService.getAll();
          for (let i = 0; i < data.length; i += 1) {
            message += `${data[i].userName} - ${data[i].hp} \n`;
          }
        }

        bot.replyPrivate(message);
      } catch (error) {
        bot.replyPrivate('Whoops! An Error occured!');
      }
    });
  }
}

module.exports = ListHPCommand;
