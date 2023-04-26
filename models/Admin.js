const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    adminusername: {
        type: String
    },
    adminpassword: {
        type: String,
    }
});

const Admins = mongoose.model("Admin", AdminSchema);

module.exports = Admins;