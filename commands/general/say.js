const { MESSAGES } = require("../../util/handler/constant.js")
module.exports.run = (client, message, args, userDB) => {
    if(message.member.hasPermission('ADMINISTRATOR')) {
        message.channel.send(`${args.join(' ')}`).then(() => message.delete())
        return
    }
    message.channel.send(`**${message.author.username}**: ${args.join(' ')}`).then(() => message.delete())
};


module.exports.help = MESSAGES.COMMANDS.GENERAL.SAY