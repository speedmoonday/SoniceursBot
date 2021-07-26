const MESSAGES = {
    COMMANDS : {
        ADMINISTRATION : {
            CONFIG : {
                name: 'config',
                aliases: ['settings', 'bot', 'param'],
                info: 'changer les configuration du bot',
                cooldown: 10,
                usage: "<typeOfDefin>{<channel><dbPath><newParam> || <user> || <command> || <typeOfDefin>}",
                category: "administration",
                permission: "ADMINISTRATOR",
                args: true,
                enable: true
            },
            RELOAD : {
                name: 'reload',
                aliases: ['reload'],
                info: 'relance le bot',
                cooldown: 0,
                usage: "",
                category: "administration",
                permission: "ADMINISTRATOR",
                args: false,
                enable: true
            }
        },
        LEVEL : {
            LEADERBOARD : {
                name: 'leaderboard',
                aliases: ['lb'],
                info: 'leaderboard du serveur',
                cooldown: 60,
                usage: "<page>",
                category: "level",
                permission: false,
                args: false,
                enable: true
            },
            LEVEL : {
                name: 'level',
                aliases: ['xp', 'lvl'],
                info: 'show your/mentionned user\'s level.',
                cooldown: 90,
                usage: "<user>",
                category: "level",
                permission: false,
                args: false,
                enable: true
            },
            SETLEVEL : {
                name: 'setlevel',
                aliases: ['setlevel'],
                info: 'set the mentionned user level to argument.',
                cooldown: 30,
                usage: "<user><level>",
                category: "level",
                permission: "MANAGE_MESSAGES",
                args: true,
                enable: true
            }
        },
        GENERAL : {
            HELP : {
                name: 'help',
                aliases: ['cmd','command','aide'],
                info: 'Affiche la liste des commandes disponibles.',
                cooldown: 60,
                usage: "<command_name>",
                category: "general",
                permission: false,
                args: false,
                enable: true
            },
            PING : {
                name: 'ping',
                aliases: ['delay','ms'],
                info: 'the delay between the message author and the bot reply.',
                cooldown: 30,
                usage: "",
                category: "general",
                permission: false,
                args: false,
                enable: true
            },
            SAY : {
                name: 'say',
                aliases: ['speak','repeat'],
                info: 'fait dire au bot le message.',
                cooldown: 0,
                usage: "<message>",
                category: "general",
                permission: false,
                args: true,
                enable: true
            },
            USERINFO : {
                name: 'userinfo',
                aliases: ['userhelp'],
                info: 'the info for you or mentionned user',
                cooldown: 30,
                usage: "<user(optional & for admin)>",
                category: "general",
                permission: false,
                args: false,
                enable: true
            }
        },
        INTERNET : {
            STATS : {
                name: 'stats',
                aliases: ['youtube','ytinfo'],
                info: 'Affiche les stats youtube de Soniceurs',
                cooldown: 60,
                usage: "",
                category: "internet",
                permission: false,
                args: false,
                enable: true
            }
        },
        MODERATION : {
            BAN : {
                name: 'ban',
                aliases: ['ban'],
                info: 'ban a member with option (soft, def, temp)',
                cooldown: 0,
                usage: "<typeOfDefin><user><time(optional)><reason>",
                category: "moderation",
                permission: "BAN_MEMBERS",
                args: true,
                enable: true
            },
            CLEAR : {
                name: 'clear',
                aliases: ['purge'],
                info: 'delete a number of message for a user or a channel',
                cooldown: 10,
                usage: "<user(optional)><number(0;100)>",
                category: "moderation",
                permission: "MANAGE_MESSAGES",
                args: true,
                enable: true
            },
            KICK : {
                name: 'kick',
                aliases: ['eject','expulser'],
                info: 'kick the mentionned user with reason',
                cooldown: 0,
                usage: "<user><reason>",
                category: "moderation",
                permission: "KICK_MEMBERS",
                args: true,
                enable: true
            },
            MUTE : {
                name: 'mute',
                aliases: ['mute'],
                info: 'mute a user with reason',
                cooldown: 10,
                usage: "<typeOfDefin><user><time(optional)><mention>",
                category: "moderation",
                permission: "MANAGE_MESSAGES",
                args: true,
                enable: true
            }
        },
        MUSIC : {
            ADD : {
                name: 'add',
                aliases: ['add'],
                info: 'add a music in a playlist.',
                cooldown: 10,
                usage: "<music>",
                category: "music",
                permission: false,
                args: true,
                enable: false
            },
            CONNECT : {
                name: 'connect',
                aliases: ['connect'],
                info: 'connect the bot in a voice channel.',
                cooldown: 0,
                usage: "",
                category: "music",
                permission: false,
                args: false,
                enable: false
            },
            PLAY : {
                name: 'play',
                aliases: ['play'],
                info: 'rerun the music after a stop.',
                cooldown: 60,
                usage: "",
                category: "music",
                permission: false,
                args: false,
                enable: false
            },
            STOP : {
                name: 'stop',
                aliases: ['pause'],
                info: 'stop the music for time or while the play command isn\'n executed',
                cooldown: 10,
                usage: "<time>",
                category: "music",
                permission: false,
                args: false,
                enable: false
            }
        },
        REACTION : {
            ALLROLES : {
                name: 'allroles',
                aliases: ['allroles'],
                info: 'create a message with reaction role',
                cooldown: 10,
                usage: "",
                category: "reaction",
                permission: "ADMINISTRATOR",
                args: false,
                enable: true
            }
        },
        SONIMON : {
            BATTLE : {
                name: 'battle',
                aliases: ['combat', 'defi'],
                info: 'do a battle with the mentionned user (only if he want)',
                cooldown: 90,
                usage: "<user>",
                category: "sonimon",
                permission: false,
                args: true,
                enable: true
            },
            CAPTURE : {
                name: 'capture',
                aliases: ['get', 'catch'],
                info: 'tente de capturer un pokémon',
                cooldown: 3600,
                usage: "",
                category: "sonimon",
                permission: 'ADMINISTRATOR',
                args: false,
                enable: true
            },
            DAILY : {
                name: 'daily',
                aliases: ['work'],
                info: 'get your money every 24h',
                cooldown: 86400,
                usage: "",
                category: "sonimon",
                permission: false,
                args: false,
                enable: true
            },
            EQUIP : {
                name: 'equip',
                aliases: ['equip','put'],
                info: 'equip your sonimon for do battle',
                cooldown: 0,
                usage: "<sonimon>",
                category: "sonimon",
                permission: false,
                args: true,
                enable: true
            },
            HEAL : {
                name: 'heal',
                aliases: ['soin','regen'],
                info: 'care the equiped sonimon with money',
                cooldown: 30,
                usage: "",
                category: "sonimon",
                permission: false,
                args: false,
                enable: true
            },
            SHOP : {
                name: 'shop',
                aliases: ['magasin'],
                info: 'show the shop of the sonimon\'s items',
                cooldown: 60,
                usage: "",
                category: "sonimon",
                permission: false,
                args: false,
                enable: true
            },
            SONIDEX : {
                name: 'sonidex',
                aliases: ['pokedex','pokelist','sonilist','sonimon'],
                info: 'show your/mentionned user\'s sonidex',
                cooldown: 0,
                usage: "<user><sonimon>",
                category: "sonimon",
                permission: false,
                args: false,
                enable: true
            },
            SONISTAT : {
                name: 'sonistat',
                aliases: ['pokestat'],
                info: 'show your or mentionned user sonimon stat',
                cooldown: 90,
                usage: "<user>",
                category: "sonimon",
                permission: false,
                args: false,
                enable: true
            }
        },
        WHITELIST : {
            WHITELIST : {
                name: 'whitelist',
                aliases: ['white','godmod'],
                info: 'add a user to the whitelist',
                cooldown: 0,
                usage: "<user>",
                category: "whitelist",
                permission: "WHITELIST",
                args: true,
                enable: true
            }
        }
    }
}

exports.MESSAGES = MESSAGES