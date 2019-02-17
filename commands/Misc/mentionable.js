const emotes = require("../../utils/emotes.json");
const ids = require("../../utils/ids.json");

module.exports.run = async (bot, message, args) => {
    if(message.author.id != ids.Joe && !message.member.role.has(message.guild.roles.find(x=> x.name == "S-Mod").id) && !message.member.role.has(message.guild.roles.find(x=> x.name == "S-Admin").id) && message.author.id != message.guild.owner.id) return;
    try {
        let role = args.join(" ");

        let ExternalCommands = args[0]
        if (ExternalCommands == "disable" && message.guild.roles.find(x => x.name.toLowerCase() == args.slice(1).join(" "))) {
            await message.guild.roles.find(x => x.name.toLowerCase() == args.slice(1).join(" ")).setMentionable(false, `Disabled by ${message.author.username}`)
            message.delete()
            message.channel.send(`${emotes.Success} **It's now unmentionable!**`);
        } else if (ExternalCommands == "disable" && message.guild.roles.find(x => x.id == args.slice(1).join(" "))) {
            await message.guild.roles.find(x => x.id == args.slice(1).join(" ")).setMentionable(false, `Disabled by ${message.author.username}`)
            message.delete()
            message.channel.send(`${emotes.Success} **It's now unmentionable!**`);


        } else if (!message.guild.roles.find(x => x.name == role) && !message.guild.roles.find(x => x.id == role)) {
            message.channel.send(`${emotes.Error} **Sorry, I couldn't find that role.**`);
        } else if (message.guild.roles.find(x => x.name.toLowerCase() == role) && message.guild.roles.find(x => x.name.toLowerCase() == role).mentionable == false) {
            message.delete()
            await message.guild.roles.find(x => x.name.toLowerCase() == role).setMentionable(true, `Enabled by ${message.author.username}`)
            message.channel.send(`<@&${message.guild.roles.find(x=> x.name.toLowerCase() == role).id}>`).then(() => {
                message.guild.roles.find(x => x.name.toLowerCase() == role).setMentionable(false, `Disabled automatically`)
            });
        } else if (message.guild.roles.find(x => x.name.toLowerCase() == role) && message.guild.roles.find(x => x.name.toLowerCase() == role).mentionable == true) {
            message.channel.send(`${emotes.Error} **Role is already mentionable.**`);
        }
        if (message.guild.roles.find(x => x.id == role) && message.guild.roles.find(x => x.id == role).mentionable == false) {
            message.delete()
            await message.guild.roles.find(x => x.id == role).setMentionable(true, `Enabled by ${message.author.username}`)
            message.channel.send(`<&${message.guild.roles.find(x=> x.id == role).id}>`).then(() => {
                message.guild.roles.find(x => x.id == role).setMentionable(false, `Disabled automatically`)
            });
        } else if (message.guild.roles.find(x => x.id == role) && message.guild.roles.find(x => x.id == role).mentionable == true) {
            message.channel.send(`${emotes.Error} **Role is already mentionable.**`);
        }
    } catch (e) {
        if(e == "DiscordAPIError: Missing Permissions" &&  !message.guild.me.hasPermission("MANAGE_ROLES")){
            message.channel.send(`${emotes.Error} **Sorry, I cannot edit that role to make it mentionable.**`);
        } else if(e == "DiscordAPIError: Missing Permissions") {
            message.channel.send(`${emotes.Error} **Sorry, my role isn't high enough to mention that role.**`);
        }
    }
}

module.exports.command = {
    name: "mentionable",
    aliases: ["mention"],
    usable: "Owner",
    description: "Makes a role unmentionable, mention it then makes it unmentionable again.",
    usage: "mention <role.name/id>",
    category: "Owner",
    enabled: true
};