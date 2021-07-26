const {
    MESSAGES
} = require("../../util/handler/constant.js")
const fs = require("fs")
const {
    MessageButton
} = require("discord-buttons")
const {
    MessageEmbed
} = require("discord.js")
const ms = require("ms")

module.exports.run = async (client, message, args, userDB) => {

    const shop = JSON.parse(fs.readFileSync("./util/database/shop.json"));

    const embed = new MessageEmbed()
    .setTitle("**Speed Garden's SHOP**")
    .setColor("#36393F")
    .setTimestamp(shop.data.nextShop)
    .setFooter("next shop")

    for (var items in shop.data.todayShop) {
        embed.addField(items, shop.data.todayShop[items].duration === 0 ? `__**price :**__ ${shop.data.todayShop[items].price}`: `__**price :**__ ${shop.data.todayShop[items].price}\n__**duration :**__ ${ms(shop.data.todayShop[items].duration)}`)
    }
    const buttons = []
    for (let i = 0; i <= shop.data.items.length; i++) {

        const btn = new MessageButton()
        .setID(shop.data.items[i])
        .setStyle("blurple")
        .setLabel(shop.data.items[i])
        if (userDB[message.author.id].sonistat.object[shop.data.items[i]] || userDB[message.author.id].economy.money < shop.data.todayShop[items].price) btn.setDisabled()
        if (shop.data.todayShop[shop.data.items[i]]) buttons.push(btn)
    }

    let m = await message.channel.send({
        embed: embed,
        buttons: buttons
    })

    const filter = (button) => button.clicker.user.id === message.author.id;
    const collector = m.createButtonCollector(filter, {
        time: 500000
    });
    collector.on('collect', async b => {
        b.defer()
        const accept = new MessageButton()
        .setLabel("accept")
        .setStyle("green")
        .setID("buy accept")

        const deny = new MessageButton()
        .setLabel("deny")
        .setStyle("red")
        .setID("buy deny")
        const msg = await message.channel.send(`do you really want to buy __***${b.id}***__ ?`, {
            buttons: [accept, deny]})

        const btnCollector = msg.createButtonCollector(filter, {
            time: 500000
        });

        btnCollector.on("collect", btn => {
            btn.defer()
            if (btn.id === "buy accept") {
                userDB[message.author.id].economy.money-= shop.data.todayShop[b.id].price
                message.channel.send(`you buy ${b.id}`)
                userDB[message.author.id].sonistat.object[b.id] = {
                    time: shop.body.items[b.id].duration !== 0 ? shop.body.items[btn.id].duration: 0
                }
                if(b.id.endsWith("ring")){
                    const btnIdSplit = b.id.split(" ")
                    userDB[message.author.id].sonistat[btnIdSplit[0]+"boost"]+=0.2
                }
                
                
                client.wait(2000).then(() =>{ 
                    fs.writeFile("./util/database/user.json", JSON.stringify(userDB, null, 4), (x) => {
                        if(x) console.error(x);
                    })
                })
            } else {
                message.channel.send("bye, see you later.")
            }
        })
        btnCollector.on('end',
            collected => {
                if (collected.size !== 0) return
                message.channel.send("you run out of time, re run the command")
            })
    });
    collector.on('end', collected => {
        if (collected.size !== 0) return
        message.channel.send("you run out of time, re run the command")

    });
};


module.exports.help = MESSAGES.COMMANDS.SONIMON.SHOP