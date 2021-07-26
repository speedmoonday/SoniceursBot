const {MessageEmbed} = require("discord.js")
const { MESSAGES } = require("../../util/handler/constant.js")

module.exports.run = async (client, message, args, userDB) => {
	let mention = message.mentions.members.first();
	let gRole = message.guild.roles.cache.find(roles => roles.name === "Muted");
	
	if(mention == undefined){
		message.reply(":x: please, mention a correct user :x:")
	} else {
		if(args[0] === "def"){
			if(gRole){
				mention.roles.add(gRole)
				client.guilds.cache.get('799175308644712449').channels.array().forEach(c => console.log(c.name));
			}else {
				message.guild.roles.create
				.then(r => {
					r.edit({name: 'Muted', color: '#505050', mentionnable: false, position: 10, permission: {SEND_MESSAGES: false, SPEAK: false, }})
					client.guilds.cache.get('799175308644712449').channels.array().forEach(c => console.log(c.name));
					
				})
				.catch(err => console.log(err))
			}
			const saymessage = args.slice(2).join(" ")
			if(!saymessage[0]) return message.channel.send(":x: Écris la raison.");
			const user = message.mentions.users.first();
			const embed = new MessageEmbed()
			.setTitle("you are muted from Speed Garden")
			.setColor("#FF0000")
			.addField("reason :", saymessage)
			.addField("moderator :", message.author.tag)
			.setTimestamp()
			message.channel.send(mention.displayName + " was been successfully muted")
		}else if(args[0]){
			
		}
	}
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.MUTE;