const { MESSAGES } = require("../../util/handler/constant.js")
module.exports.run = (client, message, args, userDB) => {
    
    switch (args[0]) {
        case 'commands':
            switch (args[1]) {
                case client.commands.get(args[1].toLowerCase) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[1].toLowerCase)):
                    // code
                    break;
                
                default:
                    message.channel.send(`${args[1].toLowerCase}`)
            }
            break;
        
        case 'channel':
            // code
            break;
        
        case 'user':
            // code
            break;
        
        case 'role':
            // code
            break;
        
        case 'sonimon':
            // code
            break;
        
        case 'bot':
            // code
            break;
        
        case 'server':
            // code
            break;
        
        
        default:
            // code
    }
    
};


module.exports.help = MESSAGES.COMMANDS.ADMINISTRATION.CONFIG