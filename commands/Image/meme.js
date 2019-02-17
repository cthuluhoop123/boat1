const randomPuppy = require("random-puppy");
const request = require("snekfetch");

module.exports.run = async (bot, message, args) => {
    try {
        module.exports.run = async (bot, message, args) => {
            let sReddits = ["MemeEconomy", "dankmemes", "meme", "memes", "MemesIRL", "me_irl"];
            let s = sReddits[Math.round(Math.random() * (sReddits.length - 1))];
            randomPuppy(s)
                .then(url => {
                    request.get(url).then(res => {
                        message.channel.send({
                            file: res.body
                        });
                    })
                })
        }
    } catch (err) {
        console.log(err);
    }
}
module.exports.command = {
    name: 'meme',
    aliases: ["m3m3"],
    usable: "Users",
    description: "Send a random meme.",
    usage: "+meme",
    category: "Image",
    enabled: true
};