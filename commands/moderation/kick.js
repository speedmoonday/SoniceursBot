const { MESSAGES } = require("../../util/handler/constant.js")
const fs = require("fs")
const { MessageEmbed } = require("discord.js")
module.exports.run = async (client, message, args, userDB) => {
	const mention = message.mentions.members.first()
	
	if(mention == undefined){
		message.reply("please, mention a correct user")
	}else{
		if(mention.kickable){
			if(message.member.roles.highest.position <= mention.roles.highest.position) return message.channel.send("you can't kick a member who have more/same permission than you.")
			const saymessage = args.slice(1).join(" ")
			if(!saymessage[0]) return message.channel.send(":x: Écris la raison.");
			const embed = new MessageEmbed()
			.setTitle("you are kicked from Speed Garden")
			.setColor("#FF0000")
			.addField("reason :", saymessage)
			.addField("moderator :", message.author.tag)
			.setTimestamp()
			
			delete userDB[mention.user.id]
			fs.writeFile("./util/database/user.json", JSON.stringify(userDB), (x) => {
			    if(x) console.error(x);
			})
			const user = message.mentions.members.first();
			await user.send(embed).catch(err => console.log(err))
			mention.kick();
			message.channel.send(mention.displayName + " was been successfully kicked")
		}else{
			message.reply("this members is invinsible")
		}
	}
}
			
module.exports.help = MESSAGES.COMMANDS.MODERATION.KICK;