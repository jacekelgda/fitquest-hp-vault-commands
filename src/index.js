'use strict';

const slack = require('serverless-slack');
const rp = require('request-promise');
const SlackClient = require('slack-node');
const sc = new SlackClient(process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN);

const HpService = require('./services/hp');
const SlackApiService = require('./services/slack');
const ListHPCommand = require('./commands/listHP');
const InitHPProfilesCommand = require('./commands/initHP');
const AddHPCommand = require('./commands/addHP');
const RemoveHPCommand = require('./commands/removeHP');
const GetHPCommand = require('./commands/getHP');

exports.handler = slack.handler.bind(slack);

const hp = new HpService(process.env.HP_API_ENDPOINT, rp);
const slackApi = new SlackApiService(sc);

new ListHPCommand(slack, hp);
new InitHPProfilesCommand(slack, hp, slackApi);
new AddHPCommand(slack, hp);
new RemoveHPCommand(slack, hp);
new GetHPCommand(slack, hp);
