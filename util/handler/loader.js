const fs = require("fs")

const loadCommands = (client, dir = "./commands/") => {
    console.log(" _____________________")
	console.log("/")
	fs.readdirSync(dir).forEach(dirs => {
	    console.log(dirs)
		const commandsFiles = fs.readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith('.js'));
		
		for(const file of commandsFiles) {
		const getFileName = require(`../../${dir}/${dirs}/${file}`);
		client.commands.set(getFileName.help.name, getFileName);
		console.log(`| command load : ${getFileName.help.name} `);
		};
	});
	console.log("|—————————————————————");
};


const loadEvents = (client, dir = "./events/") => {
	fs.readdirSync(dir).forEach(dirs => {
		const events = fs.readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith('.js'));

		for(const event of events) {
		const evt = require(`../../${dir}/${dirs}/${event}`);
		const evtName = event.split(".")[0];
		client.on(evtName, evt.bind(null, client))
		console.log(`| event load : ${evtName} `);
		};
	});
	console.log("\\_____________________")

};

module.exports = {
    loadCommands,
    loadEvents
}