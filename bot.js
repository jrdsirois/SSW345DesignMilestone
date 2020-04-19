var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', () => {
    console.log('Bot Launched and ready to roll!')
    
    //Any other stuff the bot can do on launch 
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

// admin to be messaged by bot
var adminID = 'adminDude';

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !intro
            case 'intro':
                bot.sendMessage({
                    to: channelID,
                    message: 'Hello! I am a bot. Use the command !help for some help.'
                });
            break;

            // !help
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: 'You fool! There is no help command; there is only quarantine!'
                });
            break;

            // !promotionEligible
            case 'promotionEligible':
                bot.sendMessage({
                    to: adminID,
                    message: user + ' is eligible to be promoted to a Trusted User!' 
                });
            break;



            // Just add any case commands if you want to..
         }
     }
});