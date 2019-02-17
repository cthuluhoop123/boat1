const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const WhiteListedLinksCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const WhiteListedLinksState = doc.data().WhiteListedLinks;
        if (WhiteListedLinksState == []) return false;
        if (WhiteListedLinksState == true) return doc.data().WhiteListedLinks;
    } else {
        functions.AddGuild(message)
    }
}
module.exports = WhiteListedLinksCheck;