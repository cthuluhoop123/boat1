const functions = require("../../Functions/FunctionHandler.js");

module.exports.run = async (bot,message,args) => {
    let check = await functions.LevelXPsCheck(message);
    if(check == false) return message.channel.send("It returned false");
    if(check == true) return message.channel.send("It returned true");
}

module.exports.command = {
name: "test",
aliases: [],
usable: "Owner",
description: ".",
usage: "",
category: "",
enabled: true
};