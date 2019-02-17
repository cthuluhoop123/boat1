const beautify = require("beautify");
const ids = require("../../utils/ids.json")

module.exports.run = async (bot, message, args) => {
    message.delete();
    let lang = args[0].toLowerCase();
    let x = args.slice(1).join(" ");
    let y = `\`\`\`${lang}\n${beautify(x, {format: "js"})}\n\`\`\``;
    message.channel.send(y);
}

module.exports.command = {
    name: 'beautify',
    aliases: ["btfy"],
    usable: "Owner",
    description: "Beautify code.",
    usage: "+beautify <code>",
    category: "Owner",
    enabled: true
};