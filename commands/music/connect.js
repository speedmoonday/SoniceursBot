const Discord = require("discord.js")
const { MESSAGES } = require("../../util/handler/constant.js")
const ytdl = require('ytdl-core');
module.exports.run = async (client, message, args, userDB) => {
	if(!message.member.voice.channel) return message.channel.send("you need to be connected in a voice channel.")
	const connection = await message.member.voice.channel.join().catch(err => console.log(err))
	connection.play(await ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { filter: 'audioonly' }), { type: "opusscript", volume: 1 });
}

module.exports.help = MESSAGES.COMMANDS.MUSIC.CONNECT;