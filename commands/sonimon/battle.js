const {
    MessageEmbed
} = require("discord.js")
const {
    MESSAGES
} = require("../../util/handler/constant.js")

module.exports.run = async (client, message, args, userDB) => {
    
    
    const fs = require("fs")
    if (userDB[message.author.id].sonistat.equipedSonimon === false) return message.channel.send("sorry but you can't run this command before have or equiped a sonimon.")
    let mention = message.mentions.members.first();
    if (userDB[mention.user.id].sonistat.equipedSonimon === false) return message.channel.send("sorry but you can't defi a user who have no sonimon or no sonimon equiped")
    const mentionned = m => m.author.id == mention.user.id;
    const author = m => m.author.id == message.author.id;

    mention.send(`Hi,\n${message.author.tag} want to defi you on a battle you have 90 seconds for accept.\n\nYou can do \`\`\`accept\`\`\` in the message channel for accept or \`\`\`deny\`\`\` in the message channel for deny\n\nmessage URL : ${message.url}`).catch(err => console.log(err))
    message.channel.send(`I send an invite to ${mention.user.username}`)
    
    
    try {
        let msg = await message.channel.awaitMessages(mentionned, {
            max: 1, time: 90000, errors: ['time']})
        switch (msg.first().content.toLowerCase()) {
            case 'accept':
                message.channel.send("the battle can start !");
                break;

            case 'deny':
                return message.channel.send("the battle is refused by the mentionned user.");
                break;

            default:
                return message.channel.send("this is not an option, battle canceled");
        }
    } catch (err) {
        console.error(err);
        message.channel.send("the mentionned user does not reply in time");
        return
    }

    const embed = new MessageEmbed()
    .setTitle("A battle is running !")
    .setColor("#36393F")
    .setTimestamp()
    .setDescription(`__**${message.author.username}**__\n   *${userDB[message.author.id].sonistat.equipedSonimon}*\n   🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩\n\n   VS\n\n   🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩\n   *${userDB[mention.user.id].sonistat.equipedSonimon}*\n__**${mention.user.username}**__
        `)
    .setFooter(`${message.author.username} VS ${mention.user.username}`)
    console.log("work")
    message.channel.send(embed).then(async msg => {
        console.log("\n---------------\n")
        const authorCount = userDB[message.author.id].sonistat.battleCount
        const mentionCount = userDB[mention.user.id].sonistat.battleCount
        
        const authorMaxHealt = Math.round(userDB[message.author.id].sonistat.sonimon[userDB[message.author.id].sonistat.equipedSonimon].stat.defence*2.5)
        const mentionMaxHealt = Math.round(userDB[mention.user.id].sonistat.sonimon[userDB[mention.user.id].sonistat.equipedSonimon].stat.defence*2.5)
        const authorHeal = userDB[message.author.id].sonistat.sonimon[userDB[message.author.id].sonistat.equipedSonimon].hp*userDB[message.author.id].sonistat.healboost*userDB[message.author.id].sonistat.boostboost
        const authorHealCalculeted = Math.round(authorHeal/authorMaxHealt*10)
        const mentionHeal = userDB[mention.user.id].sonistat.sonimon[userDB[mention.user.id].sonistat.equipedSonimon].hp*userDB[mention.id].sonistat.healboost*userDB[mention.id].sonistat.boostboost
        const mentionHealCalculeted = Math.round(mentionHeal/mentionMaxHealt*10)
            
        
            
        async function authorPart(){
            
            if(userDB[message.author.id].sonistat.sonimon[userDB[message.author.id].sonistat.equipedSonimon].hp <= 0 || userDB[mention.user.id].sonistat.sonimon[userDB[mention.user.id].sonistat.equipedSonimon].hp <= 0){
                
                if(userDB[message.author.id].sonistat.sonimon[userDB[message.author.id].sonistat.equipedSonimon].hp <= 0 && userDB[mention.user.id].sonistat.sonimon[userDB[mention.user.id].sonistat.equipedSonimon].hp > 0) {
                    userDB[message.author.id].sonistat.battleCount++
                    userDB[mention.user.id].sonistat.battleCount++
                    userDB[message.author.id].sonistat.defeats++
                    userDB[mention.user.id].sonistat.wins++
                    
                } else if(userDB[mention.user.id].sonistat.sonimon[userDB[mention.user.id].sonistat.equipedSonimon].hp <= 0 && userDB[message.author.id].sonistat.sonimon[userDB[message.author.id].sonistat.equipedSonimon].hp > 0) {
                    userDB[message.author.id].sonistat.battleCount++
                    userDB[mention.user.id].sonistat.battleCount++
                    userDB[message.author.id].sonistat.wins++
                    userDB[mention.user.id].sonistat.defeats++
                    
                } else {
                    userDB[message.author.id].sonistat.battleCount++
                    userDB[mention.user.id].sonistat.battleCount++
                    userDB[message.author.id].sonistat.defeats++
                    userDB[mention.user.id].sonistat.defeats++
                    
                }
                clearInterval(this)
                fs.writeFile("./util/database/user.json", JSON.stringify(userDB, null, 4), (x) => {
                    if(x) console.error(x)
                })
            }
            
            embed.setDescription(`\n__**${message.author.username}**__\n   *${userDB[message.author.id].sonistat.equipedSonimon}*\n   `)
            for (var i = 0; i < authorHealCalculeted; i++) {
                embed.setDescription(embed.description += "🟩")
            }
            embed.setDescription(embed.description += `\n\n   VS\n\n   `)
            
            for (var i = 0; i < mentionHealCalculeted; i++) {
                embed.setDescription(embed.description += "🟩")
            }
            
            embed.setDescription(embed.description += `   \n   *${userDB[mention.user.id].sonistat.equipedSonimon}*\n__**${mention.user.username}**__`)
            
            msg.edit("\u200B",embed).catch(err => console.error("err : "+err))
            
            
            
            userDB[mention.user.id].sonistat.sonimon[userDB[mention.user.id].sonistat.equipedSonimon].hp = userDB[mention.user.id].sonistat.sonimon[userDB[mention.user.id].sonistat.equipedSonimon].hp-userDB[message.author.id].sonistat.sonimon[userDB[message.author.id].sonistat.equipedSonimon].damage
            
            
        }

        async function mentionPart(){
            
            embed.setDescription(`\n__**${message.author.username}**__\n   *${userDB[message.author.id].sonistat.equipedSonimon}*\n   `)
            for (var i = 0; i < authorHealCalculeted; i++) {
                embed.setDescription(embed.description += "🟩")
            }
            embed.setDescription(embed.description += `\n\n   VS\n\n   `)

            for (var i = 0; i < mentionHealCalculeted; i++) {
                embed.setDescription(embed.description += "🟩")
            }
            embed.setDescription(embed.description += `   \n   *${userDB[mention.user.id].sonistat.equipedSonimon}*\n__**${mention.user.username}**__`)
            msg.edit("\u200B", embed).catch(err => console.error(err))
            
            if(userDB[message.author.id].sonistat.sonimon[userDB[message.author.id].sonistat.equipedSonimon].hp <= 0 || userDB[mention.user.id].sonistat.sonimon[userDB[mention.user.id].sonistat.equipedSonimon].hp <= 0){
                clearInterval(this)
                fs.writeFile("./util/database/user.json", JSON.stringify(userDB, null, 4), (x) => {
                    if(x) console.error(x)
                })
            }
            
            userDB[message.author.id].sonistat.sonimon[userDB[message.author.id].sonistat.equipedSonimon].hp = userDB[message.author.id].sonistat.sonimon[userDB[message.author.id].sonistat.equipedSonimon].hp-userDB[mention.user.id].sonistat.sonimon[userDB[mention.user.id].sonistat.equipedSonimon].damage
            
            
        }
        
        setInterval(authorPart, userDB[message.author.id].sonistat.sonimon[userDB[message.author.id].sonistat.equipedSonimon].speed*1000)
        setInterval(mentionPart, userDB[mention.user.id].sonistat.sonimon[userDB[mention.user.id].sonistat.equipedSonimon].speed*1000)
    
    })
    
    
}
    module.exports.help = MESSAGES.COMMANDS.SONIMON.BATTLE