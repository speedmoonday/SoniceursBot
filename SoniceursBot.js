const {Client, Collection}= require("discord.js");
const {token, prefix, youtubeKey} = require("./config.json");
const { loadCommands, loadEvents } = require("./util/handler/loader.js")


const client = new Client({ partials: ["MESSAGE", "CHANNEL","REACTION"]});
["commands", "cooldowns", "util"].forEach(x => client[x] = new Collection());
const disbut = require("discord-buttons")
disbut(client)

console.log(process.cwd());

loadCommands(client);
loadEvents(client);

client.login(token);
