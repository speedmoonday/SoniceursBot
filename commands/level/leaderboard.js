const {MessageEmbed} = require("discord.js")
const { MESSAGES } = require("../../util/handler/constant.js")



module.exports.run = async (client, message, args, userDB) => {
	
	const fs = require("fs").promises
	const d = await fs.readFile("./util/database/database.json", "utf8");
	const db = JSON.parse(d);
	
	let rankEmbed = new MessageEmbed()
	rankEmbed.setColor("#FF0000")
	rankEmbed.setDescription("__**Are you here ?**__\n")
	const top10Level = Object.keys(db).sort(function(a,b){
		return db[b].totalxp-db[a].totalxp
	}).slice(0, 10);
	const mappedTop10 = top10Level.map(c => `__**${db[c].username}#${db[c].discriminator}**__ | Level: ${db[c].level} - XP ${db[c].xp}\n`);
	let x = 1
	for( let z = 0; z < mappedTop10.length; z++ ){
		rankEmbed.setTitle("Top 10 of the serveur")
		rankEmbed.setDescription(rankEmbed.description+`\`#${x}\` ${mappedTop10[z]}`)
		x++;
	}
	message.channel.send(rankEmbed);
}
module.exports.help = MESSAGES.COMMANDS.LEVEL.LEADERBOARD;