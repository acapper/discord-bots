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
        magic8: this.magic8.bind(this)
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

        const imageName = url.substring(url.lastIndexOf('/') + 1);
        const embed = new MessageEmbed()
          .setColor(this.colour)
          .setTitle(breed.name)
          .setDescription(breed.description + '\n' + breed.wikipedia_url)
          .attachFiles([{name: imageName, attachment:url}])
          .setImage(`attachment://${imageName}`);

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
        const imageName = url.substring(url.lastIndexOf('/') + 1);
        const embed = new MessageEmbed()
        .setColor(this.colour)
        .attachFiles([{name: imageName, attachment:url}])
        .setImage(`attachment://${imageName}`);
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

  magic8(msg, args) {
    args = args.slice(2);
    catapi.getMagic8(args.join(' ')).then((result) => {
      const magic = result.magic;
      const embed = new MessageEmbed().setColor(this.colour).setDescription(`**Question:** ${magic.question}\n**Answer:** ${magic.answer}`).setFooter(magic.type);
      msg.reply(embed);
    },
    (reason) => {
      error(reason);
    })
  }
}

module.exports = {
  CatCommands,
};
