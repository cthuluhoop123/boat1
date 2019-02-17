const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const VerRoleCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const VerRoleState = doc.data().VerificationRoleID;
        if (VerRoleState == null) return false;
        if (VerRoleState == true) return doc.data().VerificationRoleID;
    } else {
        functions.AddGuild(message)
    }
}
module.exports = VerRoleCheck;