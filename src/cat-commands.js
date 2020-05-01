const { CommandManager } = require('./commands');
const { MessageEmbed } = require('discord.js');
const catapi = require('./cat-api');

class CatCommands extends CommandManager {
  constructor(prefix, colour) {
    super(prefix);
    super.commands = {
      cat: {
        image: this.image.bind(this),
        gif: this.gif.bind(this),
        fact: this.fact,
      },
    };

    this.colour = colour;
  }

  default(msg) {
    msg.reply('Cat Bot command list');
  }

  image(msg) {
    catapi.getImage(msg.author.username, 'png jpg', true).then(
      (result) => {
        var url = result[0].url;
        var breed = result[0].breeds[0];

        const embed = new MessageEmbed()
          .setColor(this.colour)
          .setTitle(breed.name)
          .setDescription(breed.description + '\n' + breed.wikipedia_url)
          .setImage(url);

        msg.reply(embed);
      },
      (reason) => {
        error(reason);
      }
    );
  }

  gif(msg) {
    catapi.getImage(msg.author.username, 'gif', false).then(
      (result) => {
        var url = result[0].url;
        const embed = new MessageEmbed().setColor(this.colour).setImage(url);
        msg.reply(embed);
      },
      (reason) => {
        error(reason);
      }
    );
  }

  fact(msg) {
    catapi.getFact().then((result) => msg.channel.send(result.fact));
  }
}

module.exports = {
  CatCommands,
};
