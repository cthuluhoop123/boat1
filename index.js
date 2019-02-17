/* --------------------------------------------------------------------------------------------------
                                        CALLING THE MODULES                                                 
   --------------------------------------------------------------------------------------------------
*/

const Discord = require("discord.js");
const bot = new Discord.Client({
    disableEveryone: true
});
const fs = require('fs');
const admin = require('firebase-admin');

/*const firestore = new Firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);*/
var serviceAccount = {
    "type": process.env.type,
    "project_id": process.env.project_id,
    "private_key_id": process.env.private_key_id,
    "private_key": process.env.private_key.replace(/\\n/g, '\n'),
    "client_email": process.env.client_email,
    "client_id": process.env.client_id,
    "auth_uri": process.env.auth_uri,
    "token_uri": process.env.token_uri,
    "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
    "client_x509_cert_url": process.env.client_x509_cert_url
  }
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
const functions = require("./Functions/FunctionHandler.js");

/* --------------------------------------------------------------------------------------------------
                                        USEFUL                                               
   --------------------------------------------------------------------------------------------------
*/

const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
const date = new Date();
const JoeID = "208688963936845824";
const colors = require("./utils/colors.json");


/* --------------------------------------------------------------------------------------------------
                                        EVENTS CALLER                                                
   --------------------------------------------------------------------------------------------------
*/

require('./events/handler')(bot)

/* --------------------------------------------------------------------------------------------------
                                        COMMAND HANDLER                                                 
   --------------------------------------------------------------------------------------------------
*/

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

try {
    const loadCommands = module.exports.loadCommands = (dir = "./commands/") => {
        fs.readdir(dir, (error, files) => { // Reading the Dir
            if (error) {
                console.log(error)
            }

            files.forEach((file) => { // reading Files from each dir
                if (fs.lstatSync(dir + file).isDirectory()) {
                    loadCommands(dir + file + "/");
                    return;
                }

                delete require.cache[require.resolve(`${dir}${file}`)];

                let props = require(`${dir}${file}`); // defining props for each file for each dir

                bot.commands.set(props.command.name, props); // giving name to the command

                if (props.command.aliases) props.command.aliases.forEach(alias => {
                    bot.aliases.set(alias, props.command.name); // giving aliases to the command [second name]
                });
            });
        });
    };
    loadCommands();
} catch (eee) {
    console.log(eee)
}
/* --------------------------------------------------------------------------------------------------
                                        MESSAGE EVENT                                                 
   --------------------------------------------------------------------------------------------------
*/


bot.on("message", async message => {

    // Ignore bots.
    if (message.author.bot) return;
    // ignore DMs
    if (message.channel.type == "dm") return;

    /* --------------------------------------------------------------------------------------------------
                                        XP ADDING                                                 
   --------------------------------------------------------------------------------------------------
    */

    var GetRef = await db.collection("xp").doc(message.guild.id + "-" + message.author.id);

    GetRef.get().then(function (doc) {
        if (doc.exists) {
            let CurrXP = doc.data().xp;
            let xpAdd = Math.floor(Math.random() * 2) + 7
            let xpAdd4Real = CurrXP + xpAdd
            let level = 0
            if (CurrXP <= 5000) {
                level = 1
            } else if (CurrXP <= 10000) {
                level = 2
            } else if (CurrXP <= 15000) {
                level = 3
            } else if (CurrXP <= 20000) {
                level = 4
            } else {
                level = 99
              }
            db.collection("xp").doc(message.guild.id + "-" + message.author.id).set({
                ServerID: message.guild.id,
                UserID: message.author.id,
                xp: xpAdd4Real,
                level: level
            })

        } else {
            db.collection("xp").doc(message.guild.id + "-" + message.author.id).set({
                    ServerID: message.guild.id,
                    UserID: message.author.id,
                    xp: 0,
                    level: 0
                })
                .catch(function (error) {
                    console.error("Error adding xp to database: ", error);
                });
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });



    /* --------------------------------------------------------------------------------------------------
                                        GUILD ADDING                                                 
   --------------------------------------------------------------------------------------------------
    */

   functions.AddGuild(message);

    /* --------------------------------------------------------------------------------------------------
                                        COINS ADDING                                                 
   --------------------------------------------------------------------------------------------------
    */

    var GetMon = await db.collection("economy").doc(message.guild.id + "-" + message.author.id);

    GetMon.get().then(function (doc) {
        if (doc.exists) {
            let CurrMon = doc.data().money;
            let CurrCash =doc.data().cash;
            let CurrBank = doc.data().bank;
            let monAdd = Math.floor(Math.random() * 2) + 1
            let monAdd4Real = CurrCash + CurrBank + monAdd;
            let cashAdd4Real = doc.data().cash + monAdd;
            let wealth = 0
            if (CurrMon <= 5000) {
                wealth = 1
            } else if (CurrMon <= 20000) {
                wealth = 2
            } else if (CurrMon <= 35000) {
                wealth = 3
            } else if (CurrMon <= 50000) {
                wealth = 4
            } else if (CurrMon >= 75000){
                wealth = 5
            }
            db.collection("economy").doc(message.guild.id + "-" + message.author.id).update({
                money: monAdd4Real,
                cash: cashAdd4Real,
                wealth: wealth
            })


        } else {
            db.collection("economy").doc(message.guild.id + "-" + message.author.id).set({
                    ServerID: message.guild.id,
                    UserID: message.author.id,
                    bank: 0,
                    cash: 0,
                    money: 0,
                    wealth: 0
                })
                .catch(function (error) {
                    console.error("Error adding cois to database: ", error);
                });
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });


    /* --------------------------------------------------------------------------------------------------
                                        LEVEL ROLES                                                 
   --------------------------------------------------------------------------------------------------
    */

    var GetRef = await db.collection("xp").doc(message.guild.id + "-" + message.author.id);

    GetRef.get().then(function (doc) {
        if (doc.exists) {
            let CurrLevel = doc.data().level;
            let gibLevel;
            if (CurrLevel < 1) {
                gibLevel = "0"
            } else if (CurrLevel == 2) {
                gibLevel = "1"
            } else if (CurrLevel == 3) {
                gibLevel = "2"
            } else if (CurrLevel == 4) {
                gibLevel = "3"
            } else if (CurrLevel == 5) {
                gibLevel = "4"
            } else if (CurrLevel == 6) {
                gibLevel = "5"
            } else if (CurrLevel == 7) {
                gibLevel = "6"
            } else if (CurrLevel == 8) {
                gibLevel = "7"
            } else if (CurrLevel == 9) {
                gibLevel = "8"
            } else if (CurrLevel == 10) {
                gibLevel = "9"
            } else if (CurrLevel == 11) {
                gibLevel = "10"
            } else if (CurrLevel > 11) {
                gibLevel = "99"
            }

            let RoleToAdd = message.guild.roles.find(x => x.name == "Level " + gibLevel);
            if (!RoleToAdd) return;
            if (message.member.roles.has(message.guild.roles.find(x => x.name == `Level ${gibLevel}`).id)) return;
            message.member.addRole(RoleToAdd.id).then(() => {
                let LevelUpEm = new Discord.RichEmbed()
                    .setTitle("LEVEL UP!")
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                    .setColor('RANDOM')
                    .setThumbnail(message.guild.iconURL)
                    .addField('LEVEL', gibLevel, true)
                message.channel.send(LevelUpEm).then((msg) => {
                    msg.delete(10000);
                })
            })

        } else {
            db.collection("xp").doc(message.guild.id + "-" + message.author.id).set({
                    ServerID: message.guild.id,
                    UserID: message.author.id,
                    xp: 0,
                    level: 0
                })
                .catch(function (error) {
                    console.error("Error adding xp to database: ", error);
                });
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

    /* --------------------------------------------------------------------------------------------------
                                            PREFIX DEFINED                                                 
       --------------------------------------------------------------------------------------------------
    */

    let prefixes = ['stan. ', 'stan ', '>', `<@${bot.user.id}> `];
    if (message.author.id === ("208688963936845824")) {
        prefixes = ['stan. ', 'stan ', '>', `<@${bot.user.id}> `, 'dev.'];
    } else {
        prefixes = ['stan. ', 'stan ', '>', `<@${bot.user.id}> `];
    }
    let prefix = false;
    for (const thisPrefix of prefixes) {
        if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
    }



    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let command;

    if (bot.commands.has(cmd)) {
        command = bot.commands.get(cmd);
    } else if (bot.aliases.has(cmd)) {
        command = bot.commands.get(bot.aliases.get(cmd));
    } else if (!bot.commands.has(cmd)) {
        return;
    }


    if (!message.content.startsWith(prefix)) return;

    /* --------------------------------------------------------------------------------------------------
                                            RUNNING THE COMMAND                                                
       --------------------------------------------------------------------------------------------------
    */

    if (command) {
        if (!command.command.enabled) return;
    }
    try {
        command.run(bot, message, args);
        let CommandUsedEm = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setFooter(date.toLocaleDateString('eng-GB', options))
            .setDescription(`<@${message.author.id}> used \`${command.command.name}\` in <#${message.channel.id}>`)
            .setColor("#76EE00")
        if (message.author.id == JoeID) {
            bot.channels.get("532942584625233940").send(CommandUsedEm).then((msg) => {
                msg.delete(10000)
            })
        } else {
            bot.channels.get("532942584625233940").send(CommandUsedEm)
        }


    } catch (e) {
        console.log(e)
    }

    /* --------------------------------------------------------------------------------------------------
                                            END OF MESSAGE EVENT                                                
       --------------------------------------------------------------------------------------------------
    */
});

/* --------------------------------------------------------------------------------------------------
                                        LOGGING IN                                                 
   --------------------------------------------------------------------------------------------------
*/
bot.on("guildMemberAdd", async member => {
    let unvRole = member.guild.roles.find(x => x.name == "Unverified");
    if (!unvRole) {
        try {
            await member.guild.createRole({
                name: "Unverified",
                color: colors.muted,
                permissions: [],
                mentionable: false
            });
            await member.guild.channels.forEach(channel => {
                channel.overwritePermissions(unvRole, {
                    READ_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (error) {
            console.log(error);
        };
    }
    let CreatedD = Math.floor((Date.now() - (member.user.createdAt)) / (60 * 60 * 24 * 1000))
    let CreatedH = Math.floor((Date.now() - (member.user.createdAt)) / (1000 * 60 * 60))
    let CreatedM = Math.floor((Date.now() - (member.user.createdAt)) / (1000 * 60))
    let CreatedS = Math.floor((Date.now() - (member.user.createdAt)) / 1000)
    if (CreatedD < 3) {
        await member.addRole(unvRole);
        member.user.send(`${emotes.Warning} **You have been given the "Unverified" role in ${member.guild.name} due to your account age being less than 3 days. To get verified please move over to #verify and mention the \`S-Verify Squad\` role with the following:\n\`1)\` How did you find the server?\n\`2)\` Who invited you?\n And wait for your verification. Mean while take this time to read the rules and understand them!**`);
        let NewAccEm = new Discord.RichEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setTitle("NEW ACCOUNT ALERT!")
            .setFooter(`ID: ${member.id} || ${date.toLocaleDateString('eng-GB', options)}`)
            .setColor(colors.error)
            .setDescription(`**Account created (${CreatedD} Days | ${CreatedH} Hours | ${CreatedM} Minutes | ${CreatedS} Seconds) ago.**`)
        member.guild.channels.find(x => x.name == "s-logs").send(NewAccEm)
    } else {
        let welcomechannel = member.guild.channels.find(c => c.name === "s-welcoming");
        if (!welcomechannel) return;
        welcomechannel.send(`**Welcome <@${member.id}>, make sure to read the rules and have a good time!**`);
        let UserJoinEm = new Discord.RichEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setTitle("MEMBER JOINED!")
            .setFooter(`ID: ${member.id} || ${date.toLocaleDateString('eng-GB', options)}`)
            .setColor("#76EE00")
            .setDescription(`**Account created at: ${member.user.createdAt.toLocaleDateString('eng-GB', options)}**\nJoin Position: ${member.guild.members.size}`)
        member.guild.channels.find(x => x.name == "s-logs").send(UserJoinEm)



        /* --------------------------------------------------------------------------------------------------
                                        AUTO ROLE                                                 
             --------------------------------------------------------------------------------------------------
        */

        let UserRole = member.guild.roles.find(cr => cr.name == "User");
        if (!UserRole) return;
        member.addRole(UserRole)
        let AutoRoleEm = new Discord.RichEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setFooter(`ID: ${member.user.id}`)
            .setColor("0x76EE00")
            .setDescription(`Added ${UserRole.name} to ${member.user.tag}.`)
            .addField("Reason:", "Autorole")
        member.guild.channels.find(x => x.name == "s-logs").send(AutoRoleEm);
    }

});


bot.on("guildCreate", (guild) => {
    db.collection("guilds").doc(message.guild.id).set({
            ServerID: guild.id,
            OwnerID: guild.owner.id,
            VerificationChannelID: null,
            VerificationRoleID: null,
            UnverifiedRoleID: null,
            WelcomeChannelID: null,
            EventsChannelID: null,
            EventsChannelID: null,
            Mods: [],
            Modmail: false,
            Partner: false,
            Premium: false,
            Staff: false
        })
        .catch(function (error) {
            console.error("Error adding guild to database: ", error);
        });

    guild.createRole({
        name: "S-Muted",
        color: "#777777",
        permissions: [],
        mentionable: false
    }).then((mutedRole) => {
        guild.channels.forEach(channel => {
            channel.overwritePermissions(mutedRole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
    });

})


/* --------------------------------------------------------------------------------------------------
                                        LOGGING IN                                                 
   --------------------------------------------------------------------------------------------------
*/

bot.login(process.env.token);
