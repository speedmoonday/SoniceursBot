const {MessageEmbed}= require("discord.js")

const { MESSAGES } = require("../../util/handler/constant.js")

module.exports.run = async (client, message, args, userDB) => {
	const embed = new MessageEmbed()
	.setColor("#0099FF")
	.setTitle("calculing...")
	.setTimestamp();
	message.channel.send(embed).then(m => {
		var ms = m.createdAt-message.createdAt;
		console.log(ms);
	if(ms <= 300){
		var color = "#00CC00"
		var footer = "your connection is good"
	} else if(ms >= 900){
		var color = "#FF0000"
		var footer = "your connection is bad"
	} else {
		var color = "#FF7F00"
		var footer = "your connection is average"
	}
	embed
	.setDescription(`${ms}ms`)
	.setTitle("your delay :")
	.setColor(color)
	.setFooter(footer)
	m.edit(embed)
	})
}

module.exports.help = MESSAGES.COMMANDS.GENERAL.PING