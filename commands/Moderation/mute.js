const Discord = require("discord.js");
const ms = require("ms");
const parse = require("parse-duration");

let colors = require("../../utils/colors.json");
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var date = new Date();

module.exports.run = async (bot,message,args) => {
    let punished = message.guild.member(message.mentions.users.first());
    let moderator = message.member;

    // Checking for reason.
    let reason = args.slice(2).join(" ");
    if(!reason){
        reason = "No reason.";
    } else {
        reason = args.slice(2).join(" ");
    };

    // Checking if user exists in the guild
    if(!punished) return message.channel.send("<:error:534790448204611603> **I couldn't find that user.**");

    // Checking for perms
    if(!moderator.hasPermission("MANAGE_MESSAGES", false, true, true)) return message.channel.send("<:error:534790448204611603> **You don't have permissions to use this command.**");
    //if(punished.hasPermission("MANAGE_MESSAGES", false, true, true)) return message.channel.send("<:error:534790448204611603> **I can't mute that user.**");

    // Checking the muted role
    let MuteRole = message.guild.roles.find(x => x.name == "S-Muted");
    if(!MuteRole){
        try{
        await message.guild.createRole({
            name: "S-Muted",
            color: colors.muted,
            permissions:[],
            mentionable: false
        });
            await message.guild.channels.forEach(channel => {
            channel.overwritePermissions(MuteRole,{
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            }); 
        });
    } catch(error){
        console.log(error);
    };
    }

    // Mute Time
    let MuteTime = parse(args[1]);
    if(!MuteTime || isNaN(MuteTime)) return message.channel.send("<:error:534790448204611603> **Please specify a time to mute for.**");


    // Logging the mute
    let LogChannel = message.guild.channels.find(x => x.name == "logs");
    let MuteEm = new Discord.RichEmbed()
    .setAuthor("MEMBER MUTED", message.author.displayAvatarURL)
    .setThumbnail(punished.user.displayAvatarURL)
    .setFooter(`ID: ${punished.id} || ${date.toLocaleDateString('eng-GB', options)}`)
    .setColor(`${colors.error}`)
    .addField("Moderator:", message.author.tag, true)
    .addField("Muted:", punished.user.tag, true)
    .addField("Duration:", (MuteTime))
    .addField("Reason:", reason)
    if(!LogChannel) return;
    LogChannel.send(MuteEm);

    // Actually Muting
    message.delete();
    punished.addRole(MuteRole.id);
    message.channel.send(`<:success:534808897706393600> **Muted ${punished.user.tag}.**`);
    punished.send(`**<:warning:534821779991166986> You have been Muted in \`${message.guild.name}\` by \`${moderator.displayName}\` for:\n\`${reason}\`.**`)
  
    // Unmuting after x time
    setTimeout(() => {
        punished.removeRole(MuteRole.id);
        let UnMuteEm = new Discord.RichEmbed()
        .setAuthor("MEMBER UNMUTED", message.author.displayAvatarURL)
        .setThumbnail(punished.user.displayAvatarURL)
        .setFooter(`ID: ${punished.id} || ${date.toLocaleDateString('eng-GB', options)}`)
        .setColor(`${colors.error}`)
        .addField("Moderator:", bot.user.tag, true)
        .addField("Muted:", punished.user.tag, true)
        .addField("Reason:", `Auto unmute, Mute time (${MuteTime}) ended.`)
        if(!LogChannel) return;
        LogChannel.send(UnMuteEm);
    }, MuteTime);
};

module.exports.command = {
name: "mute",
aliases: [""],
usable: "Moderators",
description: "Mute a user.",
usage: "mute <@user/ID>",
category: "Moderation",
enabled: true
};