const { MessageEmbed } = require("discord.js")
const { MESSAGES } = require("../../util/handler/constant.js")

module.exports.run = async (client, message, args, userDB) => {
	
	const fs = require("fs").promises
	const mention = message.mentions.members.first()
	if(!mention){
		if(!args[0]){
			if(userDB[message.author.id].sonistat.sonimon === {}) return message.channel.send("you doesn't have any sonimon, try ```.capture``` for get one.")
			const keys = Object.keys(userDB[message.author.id].sonistat.sonimon)
			const value = Object.values(userDB[message.author.id].sonistat.sonimon)
			const embed = new MessageEmbed()
			.setTitle(`${message.author.username}'s sonidex`)
			.setColor(`${message.member.roles.highest.hexColor}`)
			.setFooter(`sonimon system`, message.author.avatarURL)
			.setTimestamp()
			.setDescription("__**list :**__")
			.setThumbnail(message.author.avatarURL)
			for(let i = 0; i < keys.length; i++){
				if (value[i] !== "?") {
				  embed.setDescription(embed.description+`\n **${keys[i]}**,`)
				}
			}
			message.channel.send(embed)
		} else {
			console.log("reussi")
			const embed = new MessageEmbed()
			.setTitle(`${message.author.username}'s sonidex`)
			.setColor(`${message.member.roles.highest.hexColor}`)
			.setFooter(`sonimon system`, message.author.avatarURL)
			.setTimestamp()
			.setDescription(`__you're watching **${args[0]}**__`)
			.setThumbnail(message.author.avatarURL)
				
				
			if(userDB[message.author.id].sonistat.sonimon[args[0]]){
				embed.addField("endurance", Math.round((20-userDB[message.author.id].sonistat.sonimon[args[0]].stat.endurance)/4)+"\n this is the speed at witch the sonimon attaque.")
				embed.addField("attaque", Math.round(userDB[message.author.id].sonistat.sonimon[args[0]].stat.attaque/2+3)+"\n this is a number of damage than the sonimon do.")
				embed.addField("defence", Math.round(userDB[message.author.id].sonistat.sonimon[args[0]].stat.defence*2.5)+"\n this is the hp of the sonimon.")
				message.channel.send(embed)
			} else {
				message.channel.send("sorry but this sonimon doesn't exist or you doesn't have him.")
			}
		}
	}
}
	
module.exports.help = MESSAGES.COMMANDS.SONIMON.SONIDEX;