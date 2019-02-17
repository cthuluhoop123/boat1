const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const StaffCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const StaffState = doc.data().Staff;
        if (StaffState == false) return false;
        if (StaffState == true) return true;
    } else {
        functions.AddGuild(message)
    }
}
module.exports = StaffCheck;