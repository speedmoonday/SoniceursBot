

module.exports = async (client, messageReaction, user) => {
    
    const message = messageReaction.message;
    const member = message.guild.members.cache.get(user.id);
    const emoji = messageReaction.emoji.name
    const channel = message.guild.channels.cache.find(c => c.id === "835523626765254676");
    
    
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
    
    
    if(messageReaction.partial){
        await messageReaction.fetch();
    }
    
    if(member.user.bot) return;
    
    
    if(["mario","sonic","eggman","shadow","tails","cream","charmy","vector","rouge","knukles","amy","big"].includes(emoji) && message.channel.id === channel.id){
        switch (emoji) {
            case 'mario':
                member.roles.add(marioRole)
                break;
            case 'sonic':
                member.roles.add(sonicRole)
                break;
            case 'eggman':
                member.roles.add(eggmanRole)
                break;
            case 'shadow':
                member.roles.add(shadowRole)
                break;
            case 'tails':
                member.roles.add(tailsRole)
                break;
            case 'cream':
                member.roles.add(creamRole)
                break;
            case 'charmy':
                member.roles.add(charmyRole)
                break;
            case 'vector':
                member.roles.add(vectorRole)
                break;
            case 'rouge':
                member.roles.add(rougeRole)
                break;
            case 'knukles':
                member.roles.add(knuklesRole)
                break;
            case 'amy':
                member.roles.add(amyRole)
                break;
            case 'big':
                member.roles.add(bigRole)
                break;
        }
    }
    
    if(["france","english"].includes(emoji) && message.channel.id === channel.id){
        switch (emoji) {
            case 'france':
                member.roles.add(franceRole)
                break;
            case 'case':
                member.roles.add(englishRole)
                break;
        }
    }
};