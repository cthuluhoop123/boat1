module.exports = async bot => {
    const {
        get
    } = require("snekfetch");
    await get(`http://artii.herokuapp.com/make?text=STAN++RECONNECTING&font=big`).then(res => {
       console.log(res.body.toString())
    });
}