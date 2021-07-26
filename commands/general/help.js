const {MessageEmbed} = require("discord.js")
const { MESSAGES } = require("../../util/handler/constant.js")

const fs = require("fs");
	
const pagination = require("discord.js-pagination")


module.exports.run = (client, message, args, userDB) => {
	
	
	if(!args.length){
	const summary = new MessageEmbed()
	.setColor("#0099FF")
	.setTitle("LISTE DES COMMANDES")
	.setThumbnail(`${message.author.avatarURL({dynamic: true})}`)
	.setDescription("**summary**")
	.addField("Help for only one command ?", "try \`.help <command_name>\`")
	.addField("prefix :","**.**")
	.setTimestamp()
	
	
	const sumHelp = (dir = "./commands/") => {
        i = 1
    	fs.readdirSync(dir).forEach(dirs => {
    		if(i >= 23)return;
    		i++
    		summary.addField("page "+i, `**${dirs.toUpperCase()}'s commands**`)
    		
    	});
    };
    
    sumHelp();
	
	const pages = [
		summary,
		
	]
	
	
	const cmdHelp = (dir = "./commands/") => {
    	fs.readdirSync(dir).forEach(dirs => {
    		const commandsFiles = fs.readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith('.js'));
            const embed = new MessageEmbed()
            .setColor("#0099FF")
        	.setTitle("LISTE DES COMMANDES")
        	.setThumbnail(`${message.author.avatarURL({dynamic: true})}`)
        	.setDescription(`**${dirs.toUpperCase()}'s** commands`)
        	.setTimestamp()
    		for(const file of commandsFiles) {
    		    console.log(file);
    		const getFileName = require(`../../${dir}/${dirs}/${file}`);
    		if(!getFileName.help.enable) continue
    		embed.addField(`**${getFileName.help.name}**`, getFileName.help.info);
    		};
    		if(embed.fields.length === 0 ) embed.addField("\u200B", "coming soon...\n")
    		pages.push(embed)
    	});
    };
    
    cmdHelp();
    
    
    
	
	const emoji = ["⏪", "⏩"]
	
	const timeout = "600000"
	
	pagination(message, pages, emoji, timeout)
	
	} else {
		const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]))
		if(command === undefined) return message.channel.send("this command does not exist.")
		if(command.help.cooldown >= 3600) {
			const hours = Math.floor(command.help.cooldown/60/60)
			const minutes = Math.floor(command.help.cooldown/60)-(hours*60)
			const seconds = Math.floor(command.help.cooldown % 60)
			var time = `${hours}h ${minutes}min ${seconds}s`
		}else if(command.help.cooldown >= 60){
			const minutes = Math.floor(command.help.cooldown/60)
			const seconds = Math.floor(command.help.cooldown % 60)
			var time = `${minutes}min ${seconds}s`
		} else var time = command.help.cooldown
		
		if(!command.help.permission) {
			var perm = "false"
		} else var perm = command.help.permission
		const embed = new MessageEmbed()
		.setTitle("this is the information of the command asked")
		.setColor("#BF00FF")
		.addField("**Name :**", `\`${command.help.name}\``, true)
		.addField("**Aliases :**", command.help.aliases.includes(command.help.name) ? "no aliases" : `\`${command.help.aliases}\``, true)
		.addField("**Type :**", `\`${command.help.category}\``)
		.addField("**Usage :**", command.help.usage ? `\`.${command.help.name} ${command.help.usage}\`` : `\`.${command.help.name}\``)
		.addField("**Description :**", `\`${command.help.info}\``, false)
		.addField("**Cooldown :**", `\`${time}\``)
		.addField("**Permission :**", `\`${perm}\``)
		message.channel.send("\u200B", embed)
	}
};

module.exports.help = MESSAGES.COMMANDS.GENERAL.HELP;