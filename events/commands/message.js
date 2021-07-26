const {Client, MessageEmbed, Collection}= require("discord.js");
const {token, prefix, youtubeKey} = require("../../config.json");
const { userData } = require("../../util/raccourci/userDB.js")
const config = require("../../config.json")
const fs = require("fs")

module.exports = async (client, message) => {
    
    function toOrdinalNumber(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }
    
    
	const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const badWorded = []
    for (var badWord of config.badWords) {
        if(badWord[1] !== true && badWord !== false) {
            if(args.toLowerCase().includes(badWord[0]) {
                badWorded.push([badWord[0], args.indexOf(badWord[0])])
            }
        } else if(badWord[1] === true){
            if(args.toLowerCase().includes(badWord[0]) {
                badWorded.push([badWord[0], args.indexOf(badWord[0])])
            }
        } else {
            if(message.content.toLowerCase().includes(badWord[0]) {
                badWorded.push([badWord[0], message.content.indexOf(badWord[0])])
            }
        }
    }
	client.userDB = client.userDB || JSON.parse(fs.readFileSync("./util/database/user.json"));


    if(badWorded.length) return message.delete().then(() => {
        const detectIndex = []
        badWorded.forEach(detected => detectIndex.push(toOrdinalNumber(detected[1])))
        message.channel.send(`__**ALERT : badWord detected at ${message.author.username}'s message !**__\nbad word detected at **${detectIndex.join(", ")}** argument(s), you have been warned (${client.userDB[message.author.id].moderation.warn+1} warn(s))`)
    })
    if(!message.guild || message.guild.id !== "799175308644712449") return;
	if (message.author.bot || message.system) return;
	if (!message.guild) return;
	
	const mention = message.mentions.members.first();
	
	const memberRole = []
	message.member.roles.cache.each(r => {
	    memberRole.push(r.name)
	});
	
	
	
	await userData(client, message.member);
	if(client.userDB[message.author.id].userinfo.roles !== memberRole)client.userDB[message.author.id].userinfo.roles = memberRole;
	if(client.userDB[message.author.id].userinfo.username !== message.author.username)client.userDB[message.author.id].userinfo.username = message.author.username;
	if(client.userDB[message.author.id].userinfo.discriminator !== message.author.discriminator)client.userDB[message.author.id].userinfo.discriminator = message.author.discriminator;
	
	
	
	
	client.userDB[message.author.id].level.xp++;
	client.userDB[message.author.id].level.msg++;
	client.userDB[message.author.id].level.totalxp++;
	fs.writeFile("./util/database/user.json", JSON.stringify(client.userDB, null, 4), (x) => {
		if (x) console.error(x)
	});
	let userInfo = client.userDB[message.author.id].level
	if(userInfo.xp >= userInfo.level*7) {
		userInfo.level++
		userInfo.xp = 0
		const lvl = userInfo.level
		const levelchannel = client.channels.cache.get("835523657517760573");
		const lvlmsg = `GG ${message.author}, tu as atteint le niveau **${lvl}** !`
		await fs.writeFile("./util/database/user.json", JSON.stringify(client.userDB, null, 4), (x) => {
		    if (x) console.error(x)
		});
		const lvlembed = new MessageEmbed()
		.setColor('RANDOM')
		.setAuthor("level system", "https://cdn.discordapp.com/attachments/835523676748775444/837794110718083103/1617469622274.png", "https://youtube.com/c/Soniceurs")
		.setTitle("LEVEL UP !")
		.setDescription(lvlmsg)
		.setTimestamp()
		.setThumbnail(message.author.avatarURL({dynamic: true}))
		.setFooter(message.author.tag, message.author.avatarURL({dynamic: true}))
		if(lvl === 2) var role = "835523596914917397"
		if(lvl === 5) var role = "835523596180127766"
		if(lvl === 10) var role = "835523595605377054"
		if(lvl === 25) var role = "835523594322313298"
		if(lvl === 50) var role = "835523593881780264"
		if(lvl === 2 || lvl === 5 || lvl === 10 || lvl === 25 || lvl === 50){
			lvlembed.setDescription(lvlembed.description+` Tu obtiens le rôle <@&${role}>.`)
			levelchannel.send(lvlembed)
			message.member.roles.add(role)
		} else {
			levelchannel.send(lvlembed)
		}
	}
	if(!message.content.startsWith(prefix))return;
	
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName))
	
	if(!command) return;
	if(!command.help.enable) return message.channel.send("this command is disable on the bot");
	
	if(command.help.permission && command.help.permission === "WHITELIST" &&client.userDB[message.author.id].userinfo.whitelisted === false) return message.channel.send(`you don't have a high enough permissions level to run the command \`${command.help.name}.\`\nYou need to have \`${command.help.permission.toUpperCase()}\` permissions.`)
	
	if(command.help.permission && command.help.permission !== "WHITELIST" && !message.member.hasPermission(command.help.permission)) return message.channel.send(`you don't have a high enough permissions level to run the command \`${command.help.name}.\`\nYou need to have \`${command.help.permission.toUpperCase()}\` permissions`)

	
	if(command.help.args && !args.length) {
		let noArgsReply = `need some args for run`
		
		if(command.help.usage) noArgsReply += `\ntry \`\`\`${prefix}${command.help.name} ${command.help.usage}\`\`\``
		
		return message.channel.send(noArgsReply)
	}
	
	if(!client.cooldowns.has(command.help.name)){
		client.cooldowns.set(command.help.name, new Collection());
	}
	const timeNow = Date.now();
	const tStamps = client.cooldowns.get(command.help.name);
	const cdAmount = (command.help.cooldown || 5)*1000;
	if(tStamps.has(message.author.id)){
		const cdExpirationTime = tStamps.get(message.author.id)+cdAmount;
		if(timeNow < cdExpirationTime){
			timeLeft = (cdExpirationTime-timeNow)/1000
			if(timeLeft.toFixed(0) > 3600) {
				const hours = Math.floor(timeLeft/60/60)
				const minutes = Math.floor(timeLeft/60)-(hours*60)
				const seconds = Math.floor(timeLeft % 60)
				return message.reply(`you're on cooldown, please wait ${hours} hours, ${minutes} minutes and ${seconds} seconds.`)
			}
			timeLeft = (cdExpirationTime-timeNow)/1000
			if(timeLeft.toFixed(0) > 60) {
				const minute = String(timeLeft.toFixed(0)/60)
				console.log(minute)
				const minuteSplit = minute.split(".")[1]
				const minuteSplitted = minuteSplit.split("")[0]
				const second = minuteSplitted*10/100*60
				console.log(minuteSplit)
				if(!message.member.hasPermission("ADMINISTRATOR"))return message.reply(`you're on cooldown, please wait ${minute.split(".")[0]} minutes and ${second.toFixed(0)} seconds.`)
			}
			if(!message.member.hasPermission("ADMINISTRATOR"))return message.reply(`you're on cooldown, please wait ${timeLeft.toFixed(0)} seconds.`)
		}
	}
	
	tStamps.set(message.author.id, timeNow)
	setTimeout(() => tStamps.delete(message.author.id), cdAmount)
	
	command.run(client, message, args, client.userDB);
	
}