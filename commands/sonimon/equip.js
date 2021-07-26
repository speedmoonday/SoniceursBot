const { MESSAGES } = require("../../util/handler/constant.js")

const fs = require("fs");


module.exports.run = (client, message, args, userDB) => {
    
    const db = JSON.parse(fs.readFileSync("./util/database/sonimon.json"));
    
    const find = db.find(each => each.name === args[0].toLowerCase()) && userDB[message.author.id].sonistat.sonimon[args[0].toLowerCase()] !== undefined
    console.log(find);
    console.log(userDB[message.author.id].sonistat.equipedSonimon);
    console.log(args[0].toLowerCase());
    if(find === undefined) return message.channel.send("this sonimon does not exist");
    if(find === false) return message.channel.send("you does not have this sonimon")
    
    if (userDB[message.author.id].sonistat.sonimon === {}) return message.channel.send("you can't equip sonimon before have one")
    
    if(userDB[message.author.id].sonistat.equipedSonimon !== false){
        const sonimon = userDB[message.author.id].sonistat.equipedSonimon;
        userDB[message.author.id].sonistat.equipedSonimon = args[0].toLowerCase()
        client.wait(2000).then(() =>{ 
            fs.writeFile("./util/database/user.json", JSON.stringify(userDB, null, 4), (x) => {
                if(x) console.error(x);
            })
        })
        message.channel.send(`I remove ${sonimon} and i set ${args[0].toLowerCase()} to equiped sonimon`)
    }else if(userDB[message.author.id].sonistat.equipedSonimon === args[0].toLowerCase()) {
        message.channel.send(`${args[0].toLowerCase()} is already equiped`)
    }
    else{
        userDB[message.author.id].sonistat.equipedSonimon = args[0].toLowerCase()
        client.wait(2000).then(() =>{ 
            fs.writeFile("./util/database/user.json", JSON.stringify(userDB, null, 4), (x) => {
                if(x) console.error(x);
            })
        })
        message.channel.send(`I set ${args[0].toLowerCase()} to equiped sonimon`)
    }
}

module.exports.help = MESSAGES.COMMANDS.SONIMON.EQUIP