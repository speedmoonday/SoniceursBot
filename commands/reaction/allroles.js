const { MESSAGES } = require("../../util/handler/constant.js")

const { MessageEmbed } = require("discord.js")
module.exports.run = (client, message, args, userDB) => {
    
    message.delete()
    
    const marioRole = message.guild.roles.cache.get("835523584049807380");
    const sonicRole = message.guild.roles.cache.get("835523584448790539");
    const eggmanRole = message.guild.roles.cache.get("835523585161953311");
    const shadowRole = message.guild.roles.cache.get("835523586340683856");
    const tailsRole = message.guild.roles.cache.get("835523587292135444");
    const creamRole = message.guild.roles.cache.get("835523588042784828");
    const charmyRole = message.guild.roles.cache.get("835523588827643944");
    const vectorRole = message.guild.roles.cache.get("835523589616435250");
    const rougeRole = message.guild.roles.cache.get("835523590258163792");
    const knuklesRole = message.guild.roles.cache.get("835523590962937886");
    const amyRole = message.guild.roles.cache.get("835523591365591062");
    const bigRole = message.guild.roles.cache.get("835523592438939669");
    
    const franceRole = message.guild.roles.cache.get("835523612441575444")
    const englishRole = message.guild.roles.cache.get("835523613154213898")
    
    
    
    const vectorEmoji = client.emojis.cache.get("850496059548500008");
    const tailsEmoji = client.emojis.cache.get("850497367287005194");
    const sonicEmoji = client.emojis.cache.get("850495677007265792");
    const shadowEmoji = client.emojis.cache.get("850495085094240276");
    const rougeEmoji = client.emojis.cache.get("850496242542182431");
    const marioEmoji = client.emojis.cache.get("850495757882490931");
    const knuklesEmoji = client.emojis.cache.get("850496367075524708");
    const creamEmoji = client.emojis.cache.get("850495959414997003");
    const charmyEmoji = client.emojis.cache.get("850496616086765628");
    const bigEmoji = client.emojis.cache.get("850496183884709889");
    const amyEmoji = client.emojis.cache.get("850495827529302016");
    const eggmanEmoji = client.emojis.cache.get("850495163633762306");
    
    const franceEmoji = client.emojis.cache.get("850498240931561512")
    const englishEmoji = client.emojis.cache.get("850497818191462420")
    
    
    
    const embedColor = new MessageEmbed()
    .setTitle("colors roles")
    .setDescription("choose your color role with react to the message")
    .setColor("#36393F")
    .addField(
    "Role list :",
    `${marioEmoji} - ${marioRole.toString()}\n${sonicEmoji} - ${sonicRole.toString()}\n${eggmanEmoji} - ${eggmanRole.toString()}\n${shadowEmoji} - ${shadowRole.toString()}\n${tailsEmoji} - ${tailsRole.toString()}\n${creamEmoji} - ${creamRole.toString()}\n${charmyEmoji} - ${charmyRole.toString()}\n${vectorEmoji} - ${vectorRole.toString()}\n${rougeEmoji} - ${rougeRole.toString()}\n${knuklesEmoji} - ${knuklesRole.toString()}\n${amyEmoji} - ${amyRole.toString()}\n${bigEmoji} - ${bigRole.toString()}`
    );
    
    const embedLanguage = new MessageEmbed()
    .setTitle("languages roles")
    .setDescription("choose your color role with react to the message to unlock general channel")
    .addField(
    "Role list :",
    `${franceEmoji} - ${franceRole.toString()}\n${englishEmoji} - ${englishRole.toString()}`
    );
        
    message.channel.send(embedColor).then(async msg => {
        await msg.react(marioEmoji)
        await msg.react(sonicEmoji)
        await msg.react(eggmanEmoji)
        await msg.react(shadowEmoji)
        await msg.react(tailsEmoji)
        await msg.react(creamEmoji)
        await msg.react(charmyEmoji)
        await msg.react(vectorEmoji)
        await msg.react(rougeEmoji)
        await msg.react(knuklesEmoji)
        await msg.react(amyEmoji)
        await msg.react(bigEmoji)
    })
    
    message.channel.send(embedLanguage).then(async msg => {
        await msg.react(franceEmoji)
        await msg.react(englishEmoji)
    })
    
};


module.exports.help = MESSAGES.COMMANDS.REACTION.ALLROLES