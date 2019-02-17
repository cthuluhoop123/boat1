const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const DelAllLinksCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const DelAllLinksState = doc.data().DelAllLinks;
        if (DelAllLinksState == false) return false;
        if (DelAllLinksState == true) return true;
    } else {
        functions.AddGuild(message)
    }
}
module.exports = DelAllLinksCheck;