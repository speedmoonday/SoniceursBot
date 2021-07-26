const fs = require("fs");
const {MessageEmbed} = require("discord.js")
const { MESSAGES } = require("../../util/handler/constant.js")


module.exports.run = (client, message, args, userDB) => {
    
    const db = JSON.parse(fs.readFileSync("./util/database/sonimon.json"));

	var random = Math.floor(Math.random() * db.length);
	const rdm = db[random]
	var rdmEndurance = Math.floor(Math.random() * rdm.stats.maxEndurance)+1;
	var rdmAttaque = Math.floor(Math.random() * rdm.stats.maxAttaque)+1;
	var rdmDefence = Math.floor(Math.random() * rdm.stats.maxDefence)+1;
	
	const embed = new MessageEmbed()
	.setTitle("you found a SoniMon!!!")
	.setColor("#5499C7")
	.setDescription("this is his information")
	.addField("**Name**:", rdm.name, true)
	.addField("**Description**:", rdm.description ? rdm.description: "*no description*", true)
	.addField(`*${rdm.possession} others users have this sonimon*`,"\u200B", true)
	.setImage(rdm.imageURL)
	.setTimestamp()
	.setThumbnail(message.author.avatarURL({dynamic: true}))
	.setFooter(message.author.tag, message.author.avatarURL({dynamic: true}))
	if(!userDB[message.author.id].sonistat.sonimon[rdm.name]) {
    	embed.addField("**Endurance**:", rdmEndurance, true)
    	embed.addField("**Attaque**", rdmAttaque, true)
    	embed.addField("**defence**", rdmDefence, true)
		message.channel.send(embed)
		
		userDB[message.author.id].sonistat.sonimon[rdm.name] = {
		    totalCashWin: 0,
		    hp: Math.round(rdmDefence*2.5*userDB[message.author.id].sonistat.healboost*userDB[message.author.id].sonistat.boostboost),
		    damage: Math.round(rdmAttaque/2+3*userDB[message.author.id].sonistat.damageboost*userDB[message.author.id].sonistat.boostboost),
		    speed: Math.round((20-rdmEndurance)/4),
		    stat: {
		        endurance: rdmEndurance,
		        defence: rdmDefence,
		        attaque: rdmAttaque
		    }
		}
		rdm.possession++
	} else {
		let rdm3 = ["endurance","attaque","defence"]
		var random3 = Math.floor(Math.random() * rdm3.length);
		let randomed = rdm3[random3]
		if(!userDB[message.author.id].sonistat.sonimon[rdm.name].stat[randomed] === 20){
		userDB[message.author.id].sonistat.sonimon[rdm.name].stat[randomed]+=0.2
		}
		embed.addField("**Possession**:", `you already have this SoniMon on your SoniDex`+ userDB[message.author.id].sonistat.sonimon[rdm.name].stat[randomed] === 20 ? `, I had 0.2 to ${randomed}`:`and you already have 20 point to ${randomed}.`)
		message.channel.send(embed)
	}
	
	client.wait(2000).then(() => {
	    fs.writeFile("./util/database/sonimon.json", JSON.stringify(db, null, 4), (x) => {
	        if(x) console.error(x)
	    })
	    fs.writeFile("./util/database/user.json", JSON.stringify(userDB, null, 4), (x) => {
		    if (x) console.error(x)
	    });
	})
	
};


module.exports.help = MESSAGES.COMMANDS.SONIMON.CAPTURE;