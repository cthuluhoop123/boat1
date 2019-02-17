const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const WelcomeChannelCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const WelcomeChannelState = doc.data().WelcomeChannelID;
        if (WelcomeChannelState == null) return false;
        if (WelcomeChannelState == true) return doc.data().WelcomeChannelID;
    } else {
        functions.AddGuild(message)
    }
}
module.exports = WelcomeChannelCheck;