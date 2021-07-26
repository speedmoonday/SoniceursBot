const {MessageEmbed} = require("discord.js")
const { MESSAGES } = require("../../util/handler/constant.js")

const ms = require("ms")

module.exports.run = async (client, message, args, userDB) => {
	const mention = message.mentions.members.first();
	if(args[0] === "def"){
		if(mention == undefined){
				message.reply("please, mention a correct user")
			}
			else{
				if(mention.bannable){
					if(message.member.roles.highest.position <= mention.roles.highest.position) return message.channel.send("you can't ban a member who have more/same permission than you.")
					
					const saymessage = args.slice(2).join(" ")
					if(!saymessage[0]) return message.channel.send(":x: Écris la raison.");
					const embed = new MessageEmbed()
					.setTitle("you are banned from Speed Garden")
					.setColor("#FF0000")
					.addField("reason :", saymessage)
					.addField("duration :", "∞")
					.addField("moderator :", message.author.tag)
					.setTimestamp()
					const user = message.mentions.members.first();
					await user.send(embed).catch(err => console.log(err))
					mention.ban();
					message.channel.send(mention.displayName + " was been successfully banned")
				}
				else{
					message.reply("this members is invinsible")
				}
			}
	} else if(args[0] === "temp"){
		if(mention == undefined) return message.channel.send("please, mention a correct user")
		if(message.member.roles.highest.position <= mention.roles.highest.position) return message.channel.send("you can't ban a member who have more/same permission than you.")
		if(!mention.bannable) return message.channel.send("this members is invinsible");
		if(!args[2]) return message.channel.send("please add the time.")
		const saymessage = args.slice(3).join(" ")
		if(!saymessage[0]) return message.channel.send("please, enter a reason.");
		
		const embed = new MessageEmbed()
		.setTitle("you are banned from Speed Garden")
		.setColor("#FF0000")
		.addField("reason :", saymessage)
		.addField("duration :", ms(ms(args[2])))
		.addField("moderator :", message.author.tag)
		.setTimestamp()
		const user = message.mentions.members.first();
		await user.send(embed).catch(err => console.log(err))
		mention.ban();
		message.channel.send(mention.displayName + " was been successfully banned")
		setTimeout(async function () {
			await message.guild.fetchBans().then(async bans => {
				if(bans.size == 0) return
				let bannedUser = bans.find(b => b.user.id === mention.id)
				if(!bannedUser) return
				await message.guild.members.unban(bannedUser.user).catch(err => console.log(err))
			})
		}, ms(args[2]));

		
	} else if(args[0] === "soft"){
		
	}else return message.channel.send(`${args[0]} is not a typeOfDefin try soft, temp, def`)
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.BAN;