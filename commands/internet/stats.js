const { MESSAGES } = require("../../util/handler/constant.js")
const { MessageEmbed } = require("discord.js")
const {token, prefix, youtubeKey} = require("../../config.json");
const config = require("../../config.json")
var fetch = require('node-superfetch')

module.exports.run = async (client, message, args, userDB) => {
    const name = args.join(" ")
    if(!name) return message.channel.send("unknow channel name")
    
    const channel = await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${youtubeKey}&maxResults=1&type=channel`)
    .catch(() => message.channel.send("unknow channel error"));
    
    
    if(!channel.body.items[0]) return message.channel.send("no channel result, try again.");
    
    
    const data = await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${youtubeKey}`)
    .catch(() => message.channel.send("unknow channel data error"));
    
    
    const embed = new MessageEmbed()
    .setTitle(channel.body.items[0].snippet.channelTitle+" Stats")
    .setColor("#FF0000")
    .setThumbnail(channel.body.items[0].snippet.thumbnails.high.url)
    .setTimestamp()
    .setFooter(channel.body.items[0].snippet.channelTitle, channel.body.items[0].snippet.thumbnails.high.url)
    .addField("Channel name :", channel.body.items[0].snippet.channelTitle, true)
    .addField("Channel description :", channel.body.items[0].snippet.description, true)
    .addField("Subcriber count :", parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString(), true)
    .addField("Total views :", parseInt(data.body.items[0].statistics.viewCount).toLocaleString(), true)
    .addField("Total videos :", parseInt(data.body.items[0].statistics.videoCount).toLocaleString(), true)
    .addField("Date created :", new Date(channel.body.items[0].snippet.publishedAt).toDateString(), true)
    .addField("Link :", `[${channel.body.items[0].snippet.channelTitle}](https://www.youtube.com/channel/${channel.body.items[0].id.channelId})`)
    message.channel.send(embed)
};

module.exports.help = MESSAGES.COMMANDS.INTERNET.STATS;