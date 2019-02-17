const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const UnveriRoleCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const UnveriRoleState = doc.data().UnverifiedRole;
        if (UnveriRoleState == null) return false;
        if (UnveriRoleState == true) return doc.data().UnverifiedRole;
    } else {
        functions.AddGuild(message)
    }
}
module.exports = UnveriRoleCheck;