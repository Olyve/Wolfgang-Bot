'use strict';

const validator = require('email-validator');
const _ = require('lodash');
const Discord = require('discord.js');
const express = require('express');

const mailChimp = require('./mailChimp');
const secrets = require('./secrets/secrets');

const client = new Discord.Client();
const app = express();

// Set up basic server stuff so the app runs
// -----------------------------------------
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.send('There is nothing here. Are you lost?');
});

app.listen(app.get('port'), function() {
  console.log('App is running on port ' + app.get('port'));
});


// The actual Bot stuff begins here!
// --------------------------------------

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (message) => {
  if (message.content == '!ping') {
    message.reply('pong');
  }

  // Handle adding users to mailing list
  if (_.startsWith(message.content, '!signup')) {
    // Split message, [1] should contain email
    var content = message.content.split(' ');
    var email = content[1];

    // Validate that [1] is an email and pass on to function that adds it to spreadsheet
    if (validator.validate(email) === true) {
      mailChimp.subscribeUser(email, (success) => {
        if (success) {
          message.reply('Thank you for subscribing to the newsletter with: ' + email);
        }
        else {
          message.reply('Damn, looks like something went wrong! Please try again or report the bug.');
        }
      });
    }
    else {
      message.reply('Invalid format, please try again with the proper formatting:\n' +
                    'example: !signup email@something.com');
    }
  }
});

client.login(secrets.discord_client_id);
