const { MESSAGES } = require("../../util/handler/constant.js")
const { MessageEmbed } = require("discord.js")
module.exports.run = (client, message, args, userDB) => {
    const mention = message.mentions.members.first()
    if(mention){
        const sonimon = Object.keys(userDB[mention.user.id].sonistat.sonimon)
        const object = Object.keys(userDB[mention.user.id].sonistat.object)
        const embed = new MessageEmbed()
        .setColor("#36393F")
        .setTitle(`${mention.user.username}'s sonistats`)
        .addField("sonimon", sonimon.length ? `no sonimon hatched` : sonimon.join(",\n"), true)
        .addField("object :", !object.length ? `no object bought` : object.join(",\n"), true)
        .addField("money :", userDB[message.author.id].economy.money)
        
        
        message.channel.send(embed)
    }else {
        const sonimon = Object.keys(userDB[message.author.id].sonistat.sonimon)
        const object = Object.keys(userDB[message.author.id].sonistat.object)
        const stat = userDB[message.author.id].sonistat.sonimon[userDB[message.author.id].sonistat.equipedSonimon]
        const embed = new MessageEmbed()
        .setColor("#36393F")
        .setTitle(`${message.author.username}'s sonistat`)
        .addField("sonimon :", !sonimon.length ? `no sonimon hatched` : sonimon.join(",\n"), false)
        .addField("object :", !object.length ? `no object bought` : object.join(",\n"), false)
        .addField("stat :", !stat ? "no sonimon equiped" : `\nspeed : ${userDB[message.author.id].sonistat.sonimon[userDB[message.author.id].sonistat.equipedSonimon].speed*userDB[message.author.id].sonistat.speedboost*userDB[message.author.id].sonistat.boostboost}\ndamage : ${userDB[message.author.id].sonistat.sonimon[userDB[message.author.id].sonistat.equipedSonimon].damage*userDB[message.author.id].sonistat.damageboost*userDB[message.author.id].sonistat.boostboost}\nhp : ${userDB[message.author.id].sonistat.sonimon[userDB[message.author.id].sonistat.equipedSonimon].hp*userDB[message.author.id].sonistat.healboost*userDB[message.author.id].sonistat.boostboost}`)
        .addField("equiped :", "sonimon : "+userDB[message.author.id].sonistat.equipedSonimon+",\nobject : "+userDB[message.author.id].sonistat.equipedObject, false)
        .addField("money :", userDB[message.author.id].economy.money, false)
        .addField("battle count :", userDB[message.author.id].sonistat.battleCount ? userDB[message.author.id].sonistat.battleCount : "0", true)
        .addField("wins :", userDB[message.author.id].sonistat.wins ? userDB[message.author.id].sonistat.wins : "0", true)
        .addField("defeat :", userDB[message.author.id].sonistat.defeat ? userDB[message.author.id].sonistat.defeat : "0", true)
        
        
        message.channel.send(embed)
    }
};


module.exports.help = MESSAGES.COMMANDS.SONIMON.SONISTAT