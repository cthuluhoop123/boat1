const admin = require('firebase-admin');
var db = admin.firestore();

const AddPrem = async (message) => {
    var GetGuild = db.collection("guilds").doc(message.guild.id);

    let doc = await GetGuild.get()
    if (doc.exists) {
        return
    } else {
        db.collection("guilds").doc(message.guild.id).set({
                ServerID: message.guild.id,
                OwnerID: message.guild.owner.id,
                VerificationChannelID: null,
                VerificationRoleID: null,
                UnverifiedRoleID: null,
                WelcomeChannelID: null,
                EventsChannelID: null,
                Mods: [],
                ModMail: false,
                Partner: false,
                Premium: false,
                Staff: false,
                BannedWords: ["nigger", "nigga"],
                WhiteListedLinks: [],
                DelAllLinks: false,
                LogChannel: null,
                LevelRoles: [],
                LevelXPs: [],
                CoinName: "Leus"
            })
            .catch(function (error) {
                console.error("Error adding guild to database: ", error);
            });
    }

}

module.exports = AddPrem;