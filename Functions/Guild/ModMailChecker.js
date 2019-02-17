const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const ModMailCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const ModMailState = doc.data().ModMail;
        if (ModMailState == false) return false;
        if (ModMailState == true) return true;
    } else {
        functions.AddGuild(message)
    }
}
module.exports = ModMailCheck;