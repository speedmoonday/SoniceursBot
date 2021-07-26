const fetch = require("node-fetch")
const fs = require("fs");
const { needMSG } = require("../../util/database/level.json")
const {
    Client,
    MessageEmbed,
    Collection
} = require("discord.js");
const {
    userDB
} = require("../../util/raccourci/userDB.js")
const rss = require('rss-converter');
const {
    token,
    prefix,
    youtubeKey
} = require("../../config.json");
const config = require("../../config.json")
const moment = require("moment")
const superfetch = require("node-superfetch")
const ms = require("ms")

module.exports = async (client) => {
    
    
    
    
    
    console.log(`loadded ${client.commands.size} commands`);
    console.log(`Hi, ${client.user.username} is now online!`);
    
    
    
    
    
    client.sleep = (milliseconds) => {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }
    
    
    
    
    
    client.wait = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    
    
    
    
    const live = []
    setInterval(async () => {
        var twitchToken = null
        await fetch('https://id.twitch.tv/oauth2/token?client_id=662xwa95zlcwr31xa8wqtpy4hso0b5&client_secret=j07akje2g1dla2w6ge1mey8zte3w6z&grant_type=client_credentials', {
            method: 'POST'
        })
        .then(res => res.json())
        .then(res => {
            twitchToken = res.access_token
        })
        var twitchID = null
        await fetch('https://api.twitch.tv/helix/users?login=soniceursTV', {
            method: 'GET',
            headers: {
                'Client-Id': "662xwa95zlcwr31xa8wqtpy4hso0b5",
                'Authorization': 'Bearer ' + twitchToken
            }
        })
        .then(res => res.json())
        .then(res => {
            twitchID = res.data[0].id
        });
        await fetch(`https://api.twitch.tv/helix/streams?user_id=${twitchID}`, {
            method: 'GET',
            headers: {
                'Client-Id': "662xwa95zlcwr31xa8wqtpy4hso0b5",
                'Authorization': 'Bearer ' + twitchToken
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.data[0] = []) return
            if(live.includes(res.data[0].id)) return
            if (res.data.length) {
                live.push(res.data[0].id)
                client.channels.cache.get(config.channel_id).send(`<@&838463559092142090>\n ${res.data[0].user_login} est en live, vient le rejoindre !!! \n https://twitch.tv/${res.data[0].user_login}`)
            }
        });
    }, 60000)
    
    
    
    
    
    setInterval(() => {
        
        var today = new Date();
        client.logs = {}
        client.logs.date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        
        client.logs.hours = client.logs.date+'__'+today.getHours()+'_hours_UTC+2';
        fs.access(`./logs/${client.logs.date}/`, (x) => {
            if(x){
                fs.mkdir(`./logs/${client.logs.date}/`, (x) => {
                    if(x) console.error(x);
                })
                fs.access(`./logs/${client.logs.date}/${client.logs.hours}/`, (err) => {
                    if(err){
                        fs.mkdir(`./logs/${client.logs.date}/${client.logs.hours}`, (error) => {
                            if(error) console.error(error);
                        })
                        if(!fs.existsSync(`./logs/${client.logs.date}/${client.logs.hours}/${client.logs.hours}_logs.txt`)){
                            fs.appendFile(`./logs/${client.logs.date}/${client.logs.hours}/${client.logs.hours}_logs.txt`, `————————${client.logs.hours}'s LOGS————————`, (x) => {
                                if(x) console.error(x);
                            })
                        }
                    }else{
                        if(!fs.existsSync(`./logs/${client.logs.date}/${client.logs.hours}/${client.logs.hours}_logs.txt`)){
                            fs.appendFile(`./logs/${client.logs.date}/${client.logs.hours}/${client.logs.hours}_logs.txt`, `————————${client.logs.hours}'s LOGS————————`, (x) => {
                                if(x) console.error(x);
                            })
                        }
                    }
                })
            }else{
                fs.access(`./logs/${client.logs.date}/${client.logs.hours}/`, (err) => {
                    if(err){
                        fs.mkdir(`./logs/${client.logs.date}/${client.logs.hours}`, (error) => {
                            if(error) console.error(error);
                        })
                        if(!fs.existsSync(`./logs/${client.logs.date}/${client.logs.hours}/${client.logs.hours}_logs.txt`)){
                            fs.appendFile(`./logs/${client.logs.date}/${client.logs.hours}/${client.logs.hours}_logs.txt`, `————————${client.logs.hours}'s LOGS————————`, (x) => {
                                if(x) console.error(x);
                            })
                        }
                    }else{
                        if(!fs.existsSync(`./logs/${client.logs.date}/${client.logs.hours}/${client.logs.hours}_logs.txt`)){
                            fs.appendFile(`./logs/${client.logs.date}/${client.logs.hours}/${client.logs.hours}_logs.txt`, `————————${client.logs.hours}'s LOGS————————`, (x) => {
                                if(x) console.error(x);
                            })
                        }
                    }
                })
            }
        })
        
        
        
        
        
        client.logs.save = (action, author, mention) => {
            const log = fs.readFileSync(`./logs/${client.logs.date}/${client.logs.hours}/${client.logs.hours}_logs.txt`)
            const message = mention ? "Date : "+client.logs.date+" || "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()+"\nAuthor : "+author.username+" || "+author.id+"\nAction : \n"+action : "Date : "+client.logs.date+" || "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()+"\nAuthor : "+author.username+" || "+author.id+"\nMention : "+mention.user.username+" || "+mention.user.id+"\nAction : \n"+action

            fs.writeFile(`./logs/${client.logs.date}/${client.logs.hours}/${client.logs.hours}_logs.txt`, log+"\n\n"+message, (x) => {
                if(x) console.error(x)
            })
        }
        
        
    }, 5000)
    
    
    
    //speed garden playlist id = UU1T8NN6IOvj0YVx2TXGWBog
    
    setInterval(async() => {
        const yt = await superfetch.get("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=5&playlistId=UUcLUeE6Ocl1ByWaBl2EN2tA&key=AIzaSyD_urB-VwkYMavfWGiNJ-3GMDAaY3lZbrU&")
        .catch(err => console.log(err))
        const youtubeItems = fs.readFileSync("./util/database/youtube.json");
        var parsed = JSON.parse(youtubeItems);
        if(!yt.body) return
        for(var item of yt.body.items){
            if(parsed.includes(item.contentDetails.videoId)) continue
            parsed.push(item.contentDetails.videoId)
            client.channels.cache.get("835523631873785897").send(`**${item.snippet.channelTitle}** posted a new video : \n**${item.snippet.title}** \n ||<@&835523598474149988>||\n https://youtu.be/${item.contentDetails.videoId}`)
        }
        fs.writeFile("./util/database/youtube.json", JSON.stringify(parsed, null, 4), (x) => {
            if(x) console.error(x);
        })
    }, 20000)
    
    const guild = client.guilds.cache.get('799175308644712449');
    const memberCount = guild.memberCount
    console.log(`${memberCount.toLocaleString()} users`)


    let i = 0
    setInterval(() => {

        const memberCount = guild.memberCount

        const statuses = [
            `${memberCount.toLocaleString()} users`,
            'https://discord.gg/4DgbnqPwM9',
            `${client.commands.size} commands`,
            `by ${client.users.cache.get("709849788094349363").username}#${client.users.cache.get("709849788094349363").discriminator}`,
            `bot version 2.0.0`
        ];
        client.user.setActivity(`.help | ${statuses[i++ % statuses.length]}`, {
            type: 'PLAYING'
        })
    }, 15000);


    const db = JSON.parse(fs.readFileSync("./util/database/channel.json"));
    setInterval(() => channelDB(client),
        2000)
    function channelDB(client) {
        client.guilds.cache.get("799175308644712449").channels.cache.each(channel => {
            if (channel.type !== "text") return
            if (!db[channel.id]) db[channel.id] = {
                id: channel.id,
                description: null,
                name: channel.name,
                guild: channel.guild.id,
                createdAt: moment(channel.createdTimestamp).format("DD/MM/YY | hh:mm:ss"),
                nsfw: channel.nsfw,
                type: channel.type,
                rateLimit: channel.rateLimitPerUser,
                permission: channel.permissionOverwrites,
                position: {
                    guildPosition: channel.rawPosition,
                    parentPosition: channel.position
                }
            }
            if (channel.parentID !== null) {
                db[channel.id].parent = {
                    name: channel.parent.name,
                    id: channel.parent.id,
                    position: channel.parent.rawPosition
                }
            } else {
                db[channel.id].parent = null
            }
        })
        fs.writeFile("./util/database/channel.json",
            JSON.stringify(db, null, 4),
            (x) => {
                if (x) console.error(x);
            })
        for (var channel in db) {
            if (!client.guilds.cache.get("799175308644712449").channels.cache.has(db[channel].id)) {
                delete db[channel];
                console.log("channel deleted so i deleted it from the db.");
            }
        }
    }


    setInterval(async () => {
        const shop = JSON.parse(fs.readFileSync("./util/database/shop.json"))
        const now = new Date()
        const number = []
        if (shop.data.nextShop <= now) {
            shop.data.lastShop = shop.data.nextShop
            shop.data.nextShop += 7*24*60*60*1000

            delete shop.data.todayShop
            shop.data.todayShop = {}
            console.log("new shop")
            for (var i = 0; i < 3; i++) {
                do {
                    var rdm = Math.floor(Math.random()*shop.data.items.length)
                } while (number.includes(rdm) === true)
                console.log(number.includes(rdm));
                number.push(rdm)
                if (shop.body.items[shop.data.items[rdm]].duration) {
                    const rdmTime = Math.floor(Math.random()*shop.body.items[shop.data.items[rdm]].duration.length)
                    shop.data.todayShop[shop.data.items[rdm]] = {
                        duration: shop.body.items[shop.data.items[rdm]].duration[rdmTime][shop.data.price[rdmTime]].time,
                        price: shop.body.items[shop.data.items[rdm]].duration[rdmTime][shop.data.price[rdmTime]].price
                    }
                } else {
                    shop.data.todayShop[shop.data.items[rdm]] = {
                        duration: 0,
                        price: shop.body.items[shop.data.items[rdm]].price
                    }
                }
            }
            fs.writeFile("./util/database/shop.json", JSON.stringify(shop, null, 4), (x) => {
                if (x) console.error(x);
            })
        }
    }, 10000)


    setInterval(async() => {
        const channel = await client.channels.cache.get("835523629877952512");
        const users = await client.guilds.cache.get("799175308644712449").members.cache
        const OWNER = []
        const COOWNER = []
        const staffLead = []
        const modoSimple = []
        const ModoTest = []
        const isOWNER = await users.filter(u => u.roles.highest.id === '835523569781571584');
        const isCOOWNER = await users.filter(u => u.roles.highest.id === '835523570406129715');
        const isStaffLead = await users.filter(u => u.roles.highest.id === '835523571496386600');
        const isModoSimple = await users.filter(u => u.roles.highest.id === '835523574625337384');
        const isModoTest = await users.filter(u => u.roles.highest.id === '835523575188422668');
        isOWNER.array().forEach(u => OWNER.push(u.user.username))
        isCOOWNER.array().forEach(u => COOWNER.push(u.user.username))
        isStaffLead.array().forEach(u => staffLead.push(u.user.username))
        isModoSimple.array().forEach(u => modoSimple.push(u.user.username))
        isModoTest.array().forEach(u => ModoTest.push(u.user.username))
        channel.messages.fetch().then(messages => {
            if (messages.size === 0) {
                const adminEmbed = new MessageEmbed()
                .setTitle("Admin Speed Garden")
                .setFooter("update every 1min")
                .setColor("#0099FF")
                .setDescription(`<@&835523569781571584> \n-${OWNER.join("\n-")}\n<@&835523570406129715> \n-${COOWNER.join("\n-")}\n<@&835523571496386600> \n-${staffLead.join("\n-")}\n<@&835523574625337384> \n-${modoSimple.join("\n-")}\n<@&835523575188422668> \n-${ModoTest.join("\n-")}`)
                client.channels.cache.get("835523629877952512").send("\u200B", adminEmbed)
            } else {
                for (const message of messages) {
                    const adminEmbed = new MessageEmbed()
                    .setTitle("Admin Speed Garden")
                    .setFooter("update every 1min")
                    .setColor("#0099FF")
                    .setDescription(`<@&835523569781571584> \n-${OWNER.join("\n-")}\n<@&835523570406129715> \n-${COOWNER.join("\n-")}\n<@&835523571496386600> \n-${staffLead.join("\n-")}\n<@&835523574625337384> \n-${modoSimple.join("\n-")}\n<@&835523575188422668> \n-${ModoTest.join("\n-")}`)
                    message[message.length-1].edit("\u200B", adminEmbed)
                }
            }
        })
    }, 60000)
    setInterval(async () => {
        return
        let feed = await rss.toJson('https://www.youtube.com/feeds/videos.xml?channel_id='+config.channel_yt).catch(err => console.log("err : "+err));
        let jsonOpen = fs.readFileSync('./util/database/youtube.json');
        let json = JSON.parse(jsonOpen);
        if (jsonOpen.includes(feed.items[0].yt_videoId)) return;
        json.push(feed.items[0].yt_videoId);
        let jsonLink = JSON.stringify(json);
        fs.writeFileSync('./util/database/youtube.json', jsonLink);
        client.channels.cache.get(config.channel_id).send(`New video by **${feed.author.name}** \n<@&793971008792297493> \n**${feed.items[0].title}**!\n\nhttps://www.youtube.com/watch?v=${feed.items[0].yt_videoId}`)
    }, 180000);
    setInterval(() => {
    const levelInfoChannel = client.channels.cache.get("835523656226308097")
        levelInfoChannel.messages.fetch().then(messages => {
            const message = messages.filter(msg => msg.author.id === client.user.id)
            if(message.size === 0){
                const embed = new MessageEmbed()
                .setTitle("LEVEL ROLES INFO")
                .setDescription("for every message that you sent, you win 1xp, for each level you need to do *level x 7* to find the number of xp that you need for the next level or use `.level` to know your level and your number of xp.\n\n**at level 1 (need "+needMSG[1]+"messages)**\nyou win the role <@&835523596914917397>, with this one, you will unlock a channel that is <#835523658922590248>\n\n**at level 5 (need "+needMSG[5]+" messages)**\nyou win the role <@&835523596180127766>, with this one, you will unlock a channel that is <#835523661141770320>\n\n**at level 10 (need "+needMSG[10]+" messages)**\nyou win the role <@&835523596914917397>, with this one, you will unlock a channel that is <#835523659724357663>\n\n**at level 20 (need "+needMSG[20]+" messages)**\nyou win the role <@&835523594322313298>, with this one, you don't will unlock a channel but at all the other roles, you win a channel.\n\n**at level 50 (need "+needMSG[50]+" messages)**\nyou win the role <@&835523593881780264>, with this one, you will unlock two channel that are <#835523662111178773> and <#865337902387822592>")
                .setColor("#FF0000")
                levelInfoChannel.send(embed)
            }
        })
    }, 20000)
}