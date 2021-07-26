const { MESSAGES } = require("../../util/handler/constant.js")
module.exports.run = async (client, message, args, userDB) => {
    await message.delete()
    await message.reply("bot's restarted")
    process.exit();
};


module.exports.help = MESSAGES.COMMANDS.ADMINISTRATION.RELOAD