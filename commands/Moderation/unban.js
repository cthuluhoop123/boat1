let colors = require("../../utils/colors.json");
const Discord = require("discord.js");
var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
var date = new Date();

module.exports.run = async (bot, message, args) => {
    let punished = message.guild.member(message.mentions.users.first());
    let moderator = message.member;

    // Checking for perms
    if (!moderator.hasPermission("BAN_MEMBERS", false, true, true)) return message.channel.send("<:error:534790448204611603> **You don't have permissions to use this command.**");

    // Checking if user exists in the bot user base
    if (!bot.users.get(punished.id)) return message.channel.send("<:error:534790448204611603> **I couldn't find that user.**");


    let getPunished = message.guild.fetchBans()
        .then((bans) => {
            return bans.find(x => x.id == punished.id)
        });

        if(!getPunished) ("<:error:534790448204611603> **That user is not banned on this server.**");


    // Checking for reason.
    let reason = args.slice(2).join(" ");
    if (!reason) {
        reason = "No reason.";
    } else {
        reason = args.slice(1).join(" ");
    };

    // Logging the ban
    let LogChannel = message.guild.channels.find(x => x.name == "logs");
    let BanEm = new Discord.RichEmbed()
        .setAuthor("MEMBER UNBANNED", message.author.displayAvatarURL)
        .setThumbnail(punished.user.displayAvatarURL)
        .setFooter(`ID: ${punished.id} || ${date.toLocaleDateString('eng-GB', options)}`)
        .setColor(`${colors.error}`)
        .addField("Moderator:", message.author.tag, true)
        .addField("Unbanned:", punished.user.tag, true)
        .addField("Reason:", reason)
    if (!LogChannel) return;
    LogChannel.send(BanEm);

    // Actually banning
    message.delete();
    message.guild.member(punished).unban();
    message.channel.send(`<:success:534808897706393600> **Banned ${punished.user.tag}.**`);
}

module.exports.command = {
    name: "unban",
    aliases: [""],
    usable: "Moderators",
    description: "unban a user.",
    usage: "unban <@user/ID>",
    category: "Moderation",
    enabled: false
};
