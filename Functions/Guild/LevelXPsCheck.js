const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const LevelXPsCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const LevelXPsState = doc.data().LevelXPs;
        if (LevelXPsState == []) return false;
        if (LevelXPsState == true) return doc.data().LevelXPs;
    } else {
        functions.AddGuild(message)
    }
}
module.exports = LevelXPsCheck;