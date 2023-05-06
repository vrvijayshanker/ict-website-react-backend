const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SubEmailSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }

});

const Subemails = mongoose.model("Subemail", SubEmailSchema);

module.exports = Subemails;