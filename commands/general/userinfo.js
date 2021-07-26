const { MESSAGES } = require("../../util/handler/constant.js")
const { MessageEmbed } = require("discord.js")

module.exports.run = (client, message, args, userDB) => {
    
    //je code la commande userInfo pour
    //pouvoir avoir des info sur les 
    //utilisateurs.
    
    const member = !args[0] ? message.member : (message.mentions.members.first() || message.guild.members.cache.get(args[0]))
    const info = userDB[member.user.id]
        
    const embed = new MessageEmbed()
    .setTitle(`${member.username}'s info`)
    .setColor(member.roles.highest.hexColor)
    .setFooter(`executed by ${member.user.username}#${member.user.discriminator}`, member.user.avatarURL({dynamic: true}) || member.user.displayAvatarURL({dynamic: true}))
    .setThumbnail(member.user.avatarURL({dynamic: true}) || member.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .addField("**Username :**", member.user.username, true)
    .addField("**Discriminator :**", member.user.discriminator, true)
    .addField("**ID :**", member.user.id)
    .addField("**Avatar :**", `[click here to see the avatar](${member.user.avatarURL({dynamic: true}) || member.user.displayAvatarURL({dynamic: true})})`, true)
    .addField("**Roles :**", info ? info.userinfo.roles.slice(0, info.userinfo.roles.length-2).join(", ") : "no info know for this user.", true)
    .addField("**Bot :**", member.user.bot, true)
    .addField("**join :**", `**Server :**\n${ info ? info.userinfo.joinedServerAt : "no info know for this user."}\n**Discord :**\n${info ? info.userinfo.joinedDiscordAt : "no info know for this user."}`, true)
    .addField("**Owner :**", `**Bot :**\n${info ? info.userinfo.botOwner : "no info know for this user."}\n**Server :**\n${info ? info.userinfo.serverOwner : "no info know for this user."}`)
    
    message.channel.send(embed)
};

module.exports.help = MESSAGES.COMMANDS.GENERAL.USERINFO