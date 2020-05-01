const { DiscordBot } = require('./discord-bot');
const { CatCommands } = require('./cat-commands');
const { DogCommands } = require('./dog-commands');
const config = require('../config');

config.discord.botkeys.forEach((bot) => {
  new DiscordBot(
    bot.key,
    bot.type === 'cat'
      ? new CatCommands(bot.prefix)
      : new DogCommands(bot.prefix)
  ).start();
});

// Cat bot
// https://discordapp.com/oauth2/authorize?&client_id=281182988388007938&scope=bot&permissions=0

// Dog bot
// https://discordapp.com/oauth2/authorize?&client_id=705785003312676916&scope=bot&permissions=0
