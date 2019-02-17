const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const PremCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const PremState = doc.data().Premium;
        if (PremState == false) return false;
        if (PremState == true) return true;
    } else {
        functions.AddGuild(message)
    }
}
module.exports = PremCheck;