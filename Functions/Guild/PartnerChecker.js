const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const PartnerCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const PartnerState = doc.data().Partner;
        if (PartnerState == false) return false;
        if (PartnerState == true) return true;
    } else {
        functions.AddGuild(message)
    }
}
module.exports = PartnerCheck;