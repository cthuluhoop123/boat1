const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const VerChannelCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const VerChannelState = doc.data().VerificationChannelID;
        if (VerChannelState == null) return false;
        if (VerChannelState == true) return doc.data().VerificationChannelID;
    } else {
        functions.AddGuild(message)
    }
}
module.exports = VerChannelCheck;