const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const BannedWordsCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const BannedWordsState = doc.data().BannedWords;
        if (BannedWordsState == []) return false;
        if (BannedWordsState == true) return doc.data().BannedWords;
    } else {
        functions.AddGuild(message)
    }
}
module.exports = BannedWordsCheck;