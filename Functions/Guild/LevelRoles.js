const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const LevelRolesCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const LevelRolesState = doc.data().LevelRoles;
        if (LevelRolesState == []) return false;
        if (LevelRolesState == true) return doc.data().LevelRoles;
    } else {
        functions.AddGuild(message)
    }
}
module.exports = LevelRolesCheck;