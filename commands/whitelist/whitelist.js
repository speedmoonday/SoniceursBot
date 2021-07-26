const { MESSAGES } = require("../../util/handler/constant.js")
const disbut = require("discord-buttons")
const { userData } = require("../../util/raccourci/userDB.js")
const fs = require("fs")
const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args, userDB) => {
    const mention = message.mentions.members.first()
    
    const embed = new MessageEmbed()
    .setTitle("⚠️ __**WARNING**__ ⚠️")
    .setColor("#FFCA00")
    .setDescription(`__**warning**__: give the whitelist permission to ${mention.user.username} can be fatal for the server !!!\nThe user will can :`)
    .addField("Use and manage all commands", "The commands system is base on a role permission and whitelisted user, a whitelisted user is consider like an administrateur even if he doesn't have the permissions.", false)
    .addField("Will be invulnerable", "A whitelisted user is invulnerable like the other whitelisted user, he can be deleted from the whitelist and delete/add other people from the whitelist without your permission. But, he can still be ban/kick/mute by a moderator.", false)
    .setFooter(`executed by ${message.author.username}`, message.author.avatarURL)
    .setTimestamp()
    
    let accept = new disbut.MessageButton()
    .setStyle('green')
    .setLabel('accept')
    .setID('wl_accept')
    .setEmoji('✅')
    
    let deny = new disbut.MessageButton()
    .setStyle('red')
    .setLabel('deny')
    .setID('wl_deny')
    .setEmoji('❌')

    let m = await message.channel.send({
        embed: embed,
        buttons: [accept, deny]
    })
    
    const filter = (button) => button.clicker.user.id === message.author.id;
    const collector = m.createButtonCollector(filter, {
        time: 500000
    })
    collector.on('collect', b => {
        if(b.id === "wl_deny") {
            b.defer
            m.delete()
            return message.channel.send("permission doesn't gave").then(msg => {
                msg.delete(3000)
            })
        }
        if(b.id === "wl_accept") {
            if(!userDB[mention.id]){
                client.sleep(2000)
                userData(client, mention)
            }
            console.log(userDB)
            userDB = client.userDB || userDB
            userDB[mention.id].userinfo.whitelisted = true;
            message.channel.send(`whitelisted permission was gave to ${mention.user.username}#${mention.user.discriminator}`).then(msg => {
                msg.delete(300)
            })
            b.defer()
            
            client.wait(2000).then(() => {
                fs.writeFile("./util/database/user.json", JSON.stringify(userDB, null, 4), (x) => {
                    if(x) console.error(x)
                })
            })
        }
    })
};


module.exports.help = MESSAGES.COMMANDS.WHITELIST.WHITELIST