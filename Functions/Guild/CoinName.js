const admin = require('firebase-admin');
var db = admin.firestore();
const functions = require("../FunctionHandler.js");
const CoinNameCheck = async (message) => {
    var GetRef = db.collection("guilds").doc(message.guild.id);
    let doc = await GetRef.get()
    if (doc.exists) {
        const CoinNameState = doc.data().CoinName;
        if (CoinNameState == null) return false;
        if (CoinNameState != null) return doc.data().CoinName;

        
    } else {
        functions.AddGuild(message)
    }
}
module.exports = CoinNameCheck;