const express = require('express')
const bodyParser = require('body-parser')
const Logger = require('logplease');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');

const logger = (nameFile) => Logger.create(nameFile);

const app = express()

const api = require('./api')
const botTelegram = require('./botTelegram')

global.bots = new Map()

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser())

app.use('/api', api)
global.bots.set('bot-telegram', botTelegram)

module.exports = app;
