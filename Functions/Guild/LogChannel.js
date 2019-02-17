const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const LogChannelCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const LogChannelState = doc.data().DelAllLinks;
        if (LogChannelState == null) return false;
        if (LogChannelState == true) return doc.data().DelAllLinks;
    } else {
        functions.AddGuild(message)
    }
}
module.exports = LogChannelCheck;