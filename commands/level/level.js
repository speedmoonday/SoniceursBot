const { MESSAGES } = require("../../util/handler/constant.js")
const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args, userDB) => {
    
    let userInfo = userDB[message.author.id].level;
    let member = message.mentions.members.first();
    let embed = new MessageEmbed()
    .setColor("#0099FF")
    .addField("Level", userInfo.level)
    .addField("XP", userInfo.xp+"/"+userInfo.level*7)
    .addField("With", userInfo.msg+" message")
    if(!member) return message.channel.send(embed)
    let membersInfo = userDB[member.id].level
    let embed2 = new MessageEmbed()
    .setColor("#0099FF")
    .addField("Level", membersInfo.level)
    .addField("XP", membersInfo.xp+"/"+membersInfo.level*7)
    .addField("With", membersInfo.msg+" message")
    if(message.member.roles.hasPermission("ADMINISTRATOR")) return message.channel.send(embed2)
    
    
};
module.exports.help = MESSAGES.COMMANDS.LEVEL.LEVEL;