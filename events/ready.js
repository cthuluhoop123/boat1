module.exports = async bot => {
    bot.user.setActivity("Underdogs | NEW UPDATES SOON", {
        type: "WATCHING"
    });

    /*
    setInterval(() => {
        bot.guilds.filter(y => !y.roles.some(x => x.name == "S-Muted")).forEach((guild) => {
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
        });
    }, 10000);


    setInterval(() => {
        bot.guilds.filter(y => !y.roles.some(x => x.name == "S-Mod")).forEach((guild) => {
            guild.createRole({
                name: "S-Mod",
                permissions: [],
                mentionable: false
            })
        });
    }, 10000);


    setInterval(() => {
        bot.guilds.filter(y => !y.roles.some(x => x.name == "S-Admin")).forEach((guild) => {
            guild.createRole({
                name: "S-Admin",
                permissions: [],
                mentionable: false
            })
        });
    }, 10000);


    setInterval(() => {
        bot.guilds.filter(y => !y.roles.some(x => x.name == "S-Unverified")).forEach((guild) => {
            guild.createRole({
                name: "S-Unverified",
                color: "#777777",
                permissions: [],
                mentionable: false
            }).then((unvrole) => {
                guild.channels.forEach(channel => {
                    channel.overwritePermissions(unvrole, {
                        SEND_MESSAGES: false,
                        READ_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            });
        });
    }, 10000);  

*/

    const {
        get
    } = require("snekfetch");
    await get(`http://artii.herokuapp.com/make?text=UD++IS++READY&font=big`).then(res => {
        console.log(res.body.toString())
    });
    const Discord = require('discord.js');
    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    var event = new Date();
    let embed = new Discord.RichEmbed()
        .setAuthor('UD is Ready!', 'https://img.icons8.com/cotton/2x/checkmark.png')
        .setColor('0x659EC7')
        .setThumbnail(bot.user.displayAvatarURL)
        .setFooter(event.toLocaleDateString('eng-GB', options))
        .setDescription(`**Users:** ${bot.users.size}\n**Servers:** ${bot.guilds.size}\n${bot.guilds.map(x => "° "+ x.name).join("\n")}\n\n**Channels:** ${bot.channels.size}\n**Commands:** ${bot.commands.map(x => x.command).length}`)

    bot.channels.get("546679905145061376").send(embed)
};
