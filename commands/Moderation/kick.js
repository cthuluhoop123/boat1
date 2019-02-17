let colors = require("../../utils/colors.json");
const Discord = require("discord.js");
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var date = new Date();

module.exports.run = async (bot,message,args) => {
    let punished = message.guild.member(message.mentions.users.first());
    let moderator = message.member;

    // Checking for reason.
    let reason = args.slice(1).join(" ");
    if(!reason){
        reason = "No reason.";
    } else {
        reason = args.slice(1).join(" ");
    };

    // Checking if user exists in the guild
    if(!punished) return message.channel.send("<:error:534790448204611603> **I couldn't find that user.**");

    // Checking for perms
    if(!moderator.hasPermission("KICK_MEMBERS", false, true, true)) return message.channel.send("<:error:534790448204611603> **You don't have permissions to use this command.**");
    if(punished.hasPermission("KICK_MEMBERS", false, true, true)) return message.channel.send("<:error:534790448204611603> **I can't kick that user.**");
    if(!punished.kickable) return message.channel.send("<:error:534790448204611603> **I can't kick that user.**");

    // Logging the kick
    let LogChannel = message.guild.channels.find(x => x.name == "logs");
    let KickEm = new Discord.RichEmbed()
    .setAuthor("MEMBER KICKED", message.author.displayAvatarURL)
    .setThumbnail(punished.user.displayAvatarURL)
    .setFooter(`ID: ${punished.id} || ${date.toLocaleDateString('eng-GB', options)}`)
    .setColor(`${colors.error}`)
    .addField("Moderator:", message.author.tag, true)
    .addField("Kicked:", punished.user.tag, true)
    .addField("Reason:", reason)
    if(!LogChannel) return;
    LogChannel.send(KickEm);

    // Actually kicking
    message.delete();
    await punished.send(`**<:warning:534821779991166986> You have been kicked in \`${message.guild.name}\` by \`${moderator.displayName}\` for:\n\`${reason}\`.**`)
    message.guild.member(punished).kick(reason);
    message.channel.send(`<:success:534808897706393600> **Kicked ${punished.user.tag}.**`);
}

module.exports.command = {
name: "kick",
aliases: [""],
usable: "Moderators",
description: "Kick a user.",
usage: "kick <@user/ID>",
category: "Moderation",
enabled: true
};