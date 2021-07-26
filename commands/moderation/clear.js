const {
    MESSAGES
} = require("../../util/handler/constant.js")

module.exports.run = async (client, message, args, userDB) => {
    let user = message.guild.member(message.mentions.users.first());
    
    
    if(user && args[1]){
        if (!args[1] || isNaN(args[1]) || args[1] < 1 || args[1] > 100)
            return message.channel.send("il faut spécifier un ***nombre*** entre 1 et 100!");
        const messages = (
            await message.channel.messages.fetch({
                limit: 100,
                before: message.id,
            })
        )
        .filter((a) => a.author.id === user.id)
        .array();
        console.log(Math.min(Number(args[1]), messages.length))
        messages.length = Math.min(args[1], messages.length);
    
        if (messages.length === 0)
            return message.reply(
            "no message to delete for this user"
        );
    
        if (messages.length === 1) await messages[0].delete();
        else await message.channel.bulkDelete(messages, true).then(msg => {
            message.channel.send(`i deleted ${msg.size} message(s) from ${user.user.username}`)
        });
    
        message.delete();
    } else  if(!user && !args[1]){
        if (!args[0] || isNaN(args[0]) || args[0] < 1 || args[0] > 100)
            return message.channel.send("il faut spécifier un ***nombre*** entre 1 et 100!");
        const messages = (
            await message.channel.messages.fetch({
                limit: 100,
                before: message.id,
            })
        )
        
        if (messages.length === 0)
            return message.reply(
            "no message to delete for this channel"
        );
        message.delete
        if (messages.length === 1) await messages[0].delete();
        else await message.channel.bulkDelete(messages, true).then(msg => {
            message.channel.send(`i deleted ${msg.size} message(s) from ${message.channel.name}`)
        });
    } else return message.channel.send("an error was provided please rerun the command correctly : `"+MESSAGES.COMMANDS.MODERATION.CLEAR.usage+"`")
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.CLEAR;