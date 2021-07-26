const { MESSAGES } = require("../../util/handler/constant.js")

const fs = require("fs")

module.exports.run = async (client, message, args, userDB) => {
    if(userDB[message.author.id].sonistat.sonimon === {}) return message.channel.send("you need to have a sonimon for heal one")
    if(userDB[message.author.id].sonistat.equipedSonimon === false) return message.channel.send("you need to have an equiped sonimon for heal one ")
    
    
    const sonimon = userDB[message.author.id].sonistat
    
    if(sonimon.sonimon[sonimon.equipedSonimon].hp === Math.round(sonimon.sonimon[sonimon.equipedSonimon].stat.defence*2.5)) return message.channel.send("your sonimon is already healled")
    
    if(sonimon.sonimon[sonimon.equipedSonimon].hp < 0) sonimon.sonimon[sonimon.equipedSonimon].hp = 0
    
    const heal = Math.round(sonimon.sonimon[sonimon.equipedSonimon].stat.defence*2.5)-sonimon.sonimon[sonimon.equipedSonimon].hp
    
    
    message.channel.send(`do you want to pay ${heal} for add ${heal} hp to ${sonimon.equipedSonimon} ? (yes/no)`)
    
    const filter = m => m.author.id == message.author.id
    
    try {
        let msg = await message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
        
        switch (msg.first().content.toLowerCase()) {
            case 'yes':
                if(userDB[message.author.id].economy.money-heal<0)return message.channel.send("you doesn't have enought money, come back later.")
                userDB[message.author.id].economy.money -= heal
                sonimon.sonimon[sonimon.equipedSonimon].hp = Math.round(sonimon.sonimon[sonimon.equipedSonimon].stat.defence*2.5)
                client.wait(200).then(() => {
                    fs.writeFile("./util/database/user.json", JSON.stringify(userDB, null, 4), (x) => {
                        if(x) console.error(x);
                    })
                })
                message.channel.send(`I heal your sonimon with ${heal}$`)
                break;
            
            case 'no':
                return message.channel.send("ok, see you later.")
                break;
            
            default:
                return message.channel.send("this is no an option, try ```yes``` or ```no```")
        }
        
    } catch (err) {
        console.error(err)
        message.channel.send("you run out of time, rerun the command for heal a sonimon")
        return
    }
};


module.exports.help = MESSAGES.COMMANDS.SONIMON.HEAL