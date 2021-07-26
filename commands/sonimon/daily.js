const { MESSAGES } = require("../../util/handler/constant.js")
const fs = require("fs")

module.exports.run = (client, message, args, userDB) => {
    const money = userDB[message.channel.send].economy.money
    
    const random = Math.floor(Math.random()*300)+200
    
    
    money+=random;
    
    fs.writeFile("./util/database/user.json", JSON.stringify(userDB), (x) => {
        if(x) console.error(x);
    })
    message.channel.send(`today, you work and you won \`\`\`${random}$\`\`\`.\nYour balance is currently \`\`\`${money}$\`\`\``)
};


module.exports.help = MESSAGES.COMMANDS.SONIMON.DAILY