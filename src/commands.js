class CommandManager {
  constructor(prefix) {
    this.prefix = prefix;
    this.commands = {};
  }

  prescan(msg, client, args) {
    if (msg.author.bot) return false;
    if (msg.mentions.users.find((val) => val.id === client.user.id)) {
      args.splice(0, 1);
      return true;
    }
    if (args[0].charAt(0) == this.prefix) return true;
    return false;
  }

  all(msg, args) {
    const command = this.commands[
      args[0].substring(this.prefix.length, args[0].length).toLowerCase()
    ];

    this.findCommand(msg, args, command, 0);
  }

  findCommand(msg, args, command, idx) {
    if (typeof command === 'function') {
      command(msg, args);
    } else if (typeof command === 'object') {
      idx += 1;
      this.findCommand(msg, args, command[args[idx].toLowerCase()], idx);
    } else {
      this.default(msg, args);
    }
  }

  default(msg) {
    msg.reply('Default command not overwritten');
  }
}

module.exports = {
  CommandManager,
};
