const { CommandManager } = require('./commands');
const { MessageEmbed } = require('discord.js');
const dogapi = require('./dog-api');
const wiki = require('wikijs').default;

class DogCommands extends CommandManager {
  constructor(prefix) {
    super(prefix);
    super.commands = {
      dog: {
        image: this.image.bind(this),
        gif: this.gif.bind(this),
        fact: this.fact,
      },
    };
  }

  default(msg) {
    msg.reply('Dog Bot command list');
  }

  image(msg) {
    dogapi.getImage(msg.author.username, 'png jpg', true).then(
      (result) => {
        var url = result[0].url;
        var breed = result[0].breeds[0];

        wiki()
          .search(breed.name)
          .then((res) => {
            wiki()
              .page(res.results[0])
              .then((page) => {
                page.summary().then((description) => {
                  const embed = new MessageEmbed()
                    .setColor(this.colour)
                    .setTitle(breed.name)
                    .setDescription(description + '\n' + page.raw.fullurl)
                    .setImage(url);

                  msg.reply(embed);
                });
              });
          });
      },
      (reason) => {
        error(reason);
      }
    );
  }

  gif(msg) {
    dogapi.getImage(msg.author.username, 'gif', false).then(
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
    dogapi.getFact().then((result) => msg.channel.send(result.fact));
  }
}

module.exports = {
  DogCommands,
};
