const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const EventsChannelCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const EventsChannelState = doc.data().EventsChannelID;
        if (EventsChannelState == null) return false;
        if (EventsChannelState == true) return doc.data().EventsChannelID;
    } else {
        functions.AddGuild(message)
    }
}
module.exports = EventsChannelCheck;