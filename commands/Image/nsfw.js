const Discord = require("discord.js");
const {
    get
} = require("superagent");
const emotes = require("../../utils/emotes.json");
const randomPuppy = require("random-puppy");
const request = require("snekfetch");

module.exports.run = async (bot, message, args) => {

    if (message.channel.nsfw == false) return message.channel.send(`${emotes.Error} **This is not the correct channel to use this command, must be in a NSFW channel.**`);
    let UserInput = args[0]
    let baseURL = "https://nekos.life/api/v2/img/";

    function nsfwURL(category) {
        let finalLink = baseURL + category
        return finalLink
    }

    let allowed = ["femdom", "classic", "ngif", "erofeet", "erok", "les", "hololewd", "lewdk", "keta",
        "feetg", "nsfw_neko_gif", "kuni", "tits", "pussy_jpg", "cum_jpg", "pussy", "lewd", "lewdkemo",
        "cum", "spank", "Random_hentai_gif", "gecg", "boobs", "feet", "kemonomimi", "bj", "femdom", "holo", "yuri", "trap",
        "anal", "blowjob", "holoero", "neko", "hentai", "futanari", "ero", "solo", "pwankg", "eron", "erokemo", "irl"
    ]
    let allowedList = allowed.map(x => `**${x}**`).join("   ⌇⌇  ")


    if (!UserInput || UserInput.toLowerCase() == "help") {
        let nsfwHelpEm = new Discord.RichEmbed()
            .setAuthor(`NSFW HELP`)
            .setThumbnail(bot.user.displayAvatarURL)
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL)
            .setColor('RANDOM')
            .setDescription(`These are the only subcommands avilable right now, do \`+nsfw <subcommand>\` to use them (like \`+nsfw tits\`)!\n\n${allowedList}`)

        message.channel.send(nsfwHelpEm);
        return;
    }

    if (UserInput.toLowerCase() == "irl") {
        try {
            let sReddits = ["RealGirls", "Amateur", "HomeMadeXXX", "Nsfw_Amateurs", "RandomSexiness", "AmateurBondage", "CollegeSluts", "CollegeAmaterus",
                "CollegeNSFW", "FuckYeahDrunkSluts", "LockerRoom", "GoneWild", "Gonewild18", "GoneWildTube", "GoneWildCouples", "GWCumSluts", "WorkGoneWild",
                "SnapchatGW", "GoneWild30Plus", "WeddingsGoneWild", "AnalGoneWild", "LegalTeens", "Just18", "BarelyLegalTeens", "BarelyLegal", "Milf",
                "Cougars", "rule34", "rule34gifs", "NSFWFunny", "ChangingRooms", "CellShots", "SelfShots", "ss", "ss", "ss", "ss", "ss", "ss",
                "Ass", "Anal", "Asshole", "LipsThatGrip", "RearPussy", "Pussy", "CumSluts", "CumFetish", "AmateurCumSluts", "CreamPies", "GirlsFinishingTheJob",
                "FacialFun", "60FPSPorn", "iWantToFuckHer", "HighResNSFW", "CelebNSFW", "EuroGirls"
            ];
            let s1 = sReddits[Math.round(Math.random() * (sReddits.length - 1))];
            randomPuppy(s1)
                .then(url => {
                    request.get(url).then(res => {
                        message.channel.send({
                            file: res.body
                        });
                    })
                })
        } catch (e) {
            let sReddits = ["RealGirls", "Amateur", "HomeMadeXXX", "Nsfw_Amateurs", "RandomSexiness", "AmateurBondage", "CollegeSluts", "CollegeAmaterus",
                "CollegeNSFW", "FuckYeahDrunkSluts", "LockerRoom", "GoneWild", "Gonewild18", "GoneWildTube", "GoneWildCouples", "GWCumSluts", "WorkGoneWild",
                "SnapchatGW", "GoneWild30Plus", "WeddingsGoneWild", "AnalGoneWild", "LegalTeens", "Just18", "BarelyLegalTeens", "BarelyLegal", "Milf",
                "Cougars", "rule34", "rule34gifs", "NSFWFunny", "ChangingRooms", "CellShots", "SelfShots", "ss", "ss", "ss", "ss", "ss", "ss",
                "Ass", "Anal", "Asshole", "LipsThatGrip", "RearPussy", "Pussy", "CumSluts", "CumFetish", "AmateurCumSluts", "CreamPies", "GirlsFinishingTheJob",
                "FacialFun", "60FPSPorn", "iWantToFuckHer", "HighResNSFW", "CelebNSFW", "EuroGirls"
            ];
            let s2 = sReddits[Math.round(Math.random() * (sReddits.length - 2))];
            randomPuppy(s2)
                .then(url => {
                    request.get(url).then(res => {
                        message.channel.send({
                            file: res.body
                        });
                    })
                })
        }
    }

    if (UserInput.toLowerCase() == "kacey" || UserInput.toLowerCase() == "joe") return message.channel.send(`${emotes.Error} **BEGONE!!!**`);
    if (!allowed.includes(UserInput)) return message.channel.send(`${emotes.Error} **Sorry I don't have that sub-command yet, try using \`+nsfw help\`!**`);

    let img;
    if (UserInput.toLowerCase() == "femdom") {
        img = nsfwURL("femdom")
    } else if (UserInput.toLowerCase() == "classic") {
        img = nsfwURL("classic")
    } else if (UserInput.toLowerCase() == "ngif") {
        img = nsfwURL("ngif")
    } else if (UserInput.toLowerCase() == "erofeet") {
        img = nsfwURL("erofeet")
    } else if (UserInput.toLowerCase() == "erok") {
        img = nsfwURL("erok")
    } else if (UserInput.toLowerCase() == "les") {
        img = nsfwURL("les")
    } else if (UserInput.toLowerCase() == "hololewd") {
        img = nsfwURL("hololewd")
    } else if (UserInput.toLowerCase() == "lewdk") {
        img = nsfwURL("lewdk")
    } else if (UserInput.toLowerCase() == "keta") {
        img = nsfwURL("keta")
    } else if (UserInput.toLowerCase() == "feetg") {
        img = nsfwURL("feetg")
    } else if (UserInput.toLowerCase() == "nsfw_neko_gif") {
        img = nsfwURL("nsfw_neko_gif")
    } else if (UserInput.toLowerCase() == "eroyuri") {
        img = nsfwURL("eroyuri")
    } else if (UserInput.toLowerCase() == "kuni") {
        img = nsfwURL("kuni")
    } else if (UserInput.toLowerCase() == "pussy_jpg") {
        img = nsfwURL("pussy_jpg")
    } else if (UserInput.toLowerCase() == "cum_jpg") {
        img = nsfwURL("cum_jpg")
    } else if (UserInput.toLowerCase() == "pussy") {
        img = nsfwURL("pussy")
    } else if (UserInput.toLowerCase() == "lewdkemo") {
        img = nsfwURL("lewdkemo")
    } else if (UserInput.toLowerCase() == "lewd") {
        img = nsfwURL("lewd")
    } else if (UserInput.toLowerCase() == "cum") {
        img = nsfwURL("cum")
    } else if (UserInput.toLowerCase() == "smallboobs") {
        img = nsfwURL("smallboobs")
    } else if (UserInput.toLowerCase() == "spank") {
        img = nsfwURL("spank")
    } else if (UserInput.toLowerCase() == "feetg") {
        img = nsfwURL("feetg")
    } else if (UserInput.toLowerCase() == "nsfw_neko_gif") {
        img = nsfwURL("nsfw_neko_gif")
    } else if (UserInput.toLowerCase() == "random_hentai_gif") {
        img = nsfwURL("Random_hentai_gif")
    } else if (UserInput.toLowerCase() == "nsfw_avatar") {
        img = nsfwURL("nsfw_avatar")
    } else if (UserInput.toLowerCase() == "pussy_jpg") {
        img = nsfwURL("pussy_jpg")
    } else if (UserInput.toLowerCase() == "cum_jpg") {
        img = nsfwURL("cum_jpg")
    } else if (UserInput.toLowerCase() == "gecg") {
        img = nsfwURL("gecg")
    } else if (UserInput.toLowerCase() == "erok") {
        img = nsfwURL("erok")
    } else if (UserInput.toLowerCase() == "boobs") {
        img = nsfwURL("boobs")
    } else if (UserInput.toLowerCase() == "feet") {
        img = nsfwURL("feet")
    } else if (UserInput.toLowerCase() == "kemonomimi") {
        img = nsfwURL("kemonomimi")
    } else if (UserInput.toLowerCase() == "solog") {
        img = nsfwURL("solog")
    } else if (UserInput.toLowerCase() == "holo") {
        img = nsfwURL("holo")
    } else if (UserInput.toLowerCase() == "bj") {
        img = nsfwURL("bj")
    } else if (UserInput.toLowerCase() == "trap") {
        img = nsfwURL("trap")
    } else if (UserInput.toLowerCase() == "yuri") {
        img = nsfwURL("yuri")
    } else if (UserInput.toLowerCase() == "anal") {
        img = nsfwURL("anal")
    } else if (UserInput.toLowerCase() == "cum_jpg") {
        img = nsfwURL("cum_jpg")
    } else if (UserInput.toLowerCase() == "blowjob") {
        img = nsfwURL("blowjob")
    } else if (UserInput.toLowerCase() == "neko") {
        img = nsfwURL("neko")
    } else if (UserInput.toLowerCase() == "hentai") {
        img = nsfwURL("hentai")
    } else if (UserInput.toLowerCase() == "futanari") {
        img = nsfwURL("futanari")
    } else if (UserInput.toLowerCase() == "ero") {
        img = nsfwURL("ero")
    } else if (UserInput.toLowerCase() == "solo") {
        img = nsfwURL("solo")
    } else if (UserInput.toLowerCase() == "pwankg") {
        img = nsfwURL("pwankg")
    } else if (UserInput.toLowerCase() == "eron") {
        img = nsfwURL("eron")
    } else if (UserInput.toLowerCase() == "erokemo") {
        img = nsfwURL("erokemo")
    }

    await get(img).then(res => {
        let embed = new Discord.RichEmbed()
            .setAuthor("Heh, naughty", "https://image.spreadshirtmedia.com/image-server/v1/mp/designs/1013634778,width=178,height=178,version=1511170035/sexy-lips.png")
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL)
            .setImage(res.body.url)
            .setColor('RANDOM')

        message.channel.send(embed);
    });

}
module.exports.command = {
    name: 'nsfw',
    aliases: [],
    usable: "Users",
    description: "Send NSFW Pics.",
    usage: "+nsfw <category>",
    category: "NSFW",
    enabled: true
};
