const Discord = require('discord.js');

class DiscordBot {
  constructor(token, commandManager) {
    this.token = token;
    this.client = new Discord.Client();
    this.commands = commandManager;

    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}`);
      console.log(
        `Connect to ${this.client.guilds.cache.array().length} guild(s)`
      );
      this.updateStatus();
    });

    this.client.on('message', (msg) => {
      const args = msg.content.split(' ');
      if (!this.commands.prescan(msg, this.client, args)) return false;
      this.commands.all(msg, args);
    });

    this.client.on('guildCreate', (guild) => {
      this.updateStatus();
      console.log(`Joined a new guild: ${guild.name}`);
    });

    this.client.on('guildDelete', (guild) => {
      this.updateStatus();
      console.log(`Left a guild: ${guild.name}`);
    });

    this.client.on('rateLimit', (limit) => {
      console.log(JSON.stringify(limit));
    });
  }

  start() {
    this.client.login(this.token);
  }

  updateStatus() {
    this.client.user.setPresence({
      afk: true,
      activity: {
        name: `with ${this.client.guilds.cache.array().length} guild(s)`,
        type: 'PLAYING',
      },
    });
  }
}

module.exports = {
  DiscordBot,
};
