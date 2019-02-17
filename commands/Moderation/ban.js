let colors = require("../../utils/colors.json");
const Discord = require("discord.js");
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
        reason = args.slice(1).join(" ");
    };

    // Checking if user exists in the guild
    if(!punished) return message.channel.send("<:error:534790448204611603> **I couldn't find that user.**");

    // Checking for perms
    if(!moderator.hasPermission("BAN_MEMBERS", false, true, true)) return message.channel.send("<:error:534790448204611603> **You don't have permissions to use this command.**");
    if(punished.hasPermission("BAN_MEMBERS", false, true, true)) return message.channel.send("<:error:534790448204611603> **I can't ban that user.**");
    if(!punished.bannable) return message.channel.send("<:error:534790448204611603> **I can't ban that user.**");

    // Logging the ban
    let LogChannel = message.guild.channels.find(x => x.name == "logs");
    let BanEm = new Discord.RichEmbed()
    .setAuthor("MEMBER BANNED", message.author.displayAvatarURL)
    .setThumbnail(punished.user.displayAvatarURL)
    .setFooter(`ID: ${punished.id} || ${date.toLocaleDateString('eng-GB', options)}`)
    .setColor(`${colors.error}`)
    .addField("Moderator:", message.author.tag, true)
    .addField("Banned:", punished.user.tag, true)
    .addField("Reason:", reason)
    if(!LogChannel) return;
    LogChannel.send(BanEm);

    // Actually banning
    message.delete();
    await punished.send(`**<:warning:534821779991166986> You have been banned in \`${message.guild.name}\` by \`${moderator.displayName}\` for:\n\`${reason}\`.**`)
    message.guild.member(punished).ban({
        days: 1,
        reason: reason
    });
    message.channel.send(`<:success:534808897706393600> **Banned ${punished.user.tag}.**`);
}

module.exports.command = {
name: "ban",
aliases: [""],
usable: "Moderators",
description: "ban a user.",
usage: "ban <@user/ID>",
category: "Moderation",
enabled: true
};