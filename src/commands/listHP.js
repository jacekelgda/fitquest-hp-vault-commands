const isAdmin = require('../utils/isAdmin');

class ListHPCommand {
  constructor (slack, hpService) {
    this.slack = slack;
    this.hpService = hpService;

    this.init();
  }

  init () {
    this.slack.on('/fitquest-list-hp', async (msg, bot) => {
      try {
        let message = '';
        if (isAdmin(msg.user_name)) {
          let data = await this.hpService.getAll();
          data = data.sort((a, b) => {
            return parseInt(b.hp) - parseInt(a.hp);
          });
          const hasFilter = /^filter:.*/.test(msg.text);
          let filter = '';
          if (hasFilter) {
            filter = msg.text.substring(('filter:').length, msg.text.length);
            switch (true) {
              case (['alive','live','living','not dead','active','playing'].indexOf(filter) > -1): {
                  for (let i = 0; i < data.length; i += 1) {
                    if (data[i].hp > 0) {
                      message += `:heart: ${data[i].userName} ${data[i].hp}\n`;
                    }
                  }
                  break;
              }
              case (['dead','killed','not alive','not playing','done'].indexOf(filter) > -1): {
                  for (let i = 0; i < data.length; i += 1) {
                    if (data[i].hp < 1) {
                      message += `:candle: ${data[i].userName}\n`;
                    }
                  }
                  break;
              }
              case /[0-5]+/.test(filter): {
                  for (let i = 0; i < data.length; i += 1) {
                    if (data[i].hp == parseInt(filter)) {
                      if (data[i].hp < 1) {
                        message += `:candle: ${data[i].userName} ${data[i].hp}\n`;
                      } else if (data[i].hp > 0) {
                        message += `:heart: ${data[i].userName} ${data[i].hp}\n`;
                      }
                    }
                  }
                  break;
              }
              default: {
                  message = 'Please try again.';
              }
            }
            bot.replyPrivate((message == '') ? 'Noting found by that filter' : message);
          } else {
            for (let i = 0; i < data.length; i += 1) {
              if (data[i].hp < 1) {
                message += `:candle: ${data[i].userName} ${data[i].hp}\n`;
              } else if (data[i].hp > 0) {
                message += `:heart: ${data[i].userName} ${data[i].hp}\n`;
              }
            }
            bot.replyPrivate(message);
          }
        } else {
          bot.replyPrivate('Access denied');
        }
      } catch (error) {
        console.log(error);
        bot.replyPrivate('Whoops! An Error occured!');
      }
    });
  }
}

module.exports = ListHPCommand;
