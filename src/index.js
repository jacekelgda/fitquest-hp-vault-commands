'use strict';

const slack = require('serverless-slack');
const rp = require('request-promise');
const HpService = require('./services/hp');
const ListHPCommand = require('./commands/listHP');
exports.handler = slack.handler.bind(slack);
const hp = new HpService(process.env.HP_API_ENDPOINT, rp);

new ListHPCommand(slack, hp);
