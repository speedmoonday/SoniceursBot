const fs = require("fs")

const moment = require("moment")



function userData(client, user){
    client.userDB = JSON.parse(fs.readFileSync("./util/database/user.json"));
    if(!client.userDB[user.id]){
        client.userDB[user.id] = {
            level: {
                xp: 0,
                level: 0,
                msg: 0,
                totalxp: 0
            },
            economy: {
                money: 1000
            },
            userinfo: {
                id: user.user.id,
                username: user.user.username,
                discriminator: user.user.discriminator,
                bot: user.user.bot,
                roles: [],
                joinedServerAt: moment(user.joinedAt).format("DD/MM/YY | hh:mm:ss"),
                joinedDiscordAt: moment(user.user.createdAt).format("DD/MM/YY | hh:mm:ss"),
                VIP: false,
                Super_VIP: false,
                whitelisted: false,
                serverOwner: user.user.id === client.guilds.cache.get("799175308644712449").ownerID,
                botOwner: false
            },
            moderation: {
                warn: 0,
                mute: 0,
                kick: 0,
                ban: 0,
                messageDeleted: 0,
                sanctions: 0,
                isModerator: user.hasPermission("MANAGE_MESSAGE"),
                isAdministrator: user.hasPermission("ADMINISTRATOR")
            },
            sonistat: {
                equipedSonimon: false,
                equipedObject: false,
                healboost: 1,
                speedboost: 1,
                damageboost: 1,
                boostboost: 1,
                battleCount: 0,
                wins: 0,
                defeats: 0,
                sonimonLenght: 0,
                sonimon: {},
                objectLenght: 0,
                object: {},
                aliases: [],
                team: null
            }
        };
    }
    
}


module.exports = {
    userData
}