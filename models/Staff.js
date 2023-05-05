const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    staffname: {
        type: String,
        required: true
    },
    photo: {
        type: String
        
    },
    designation: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    }

});

const Staffs = mongoose.model("Staff", StaffSchema);

module.exports = Staffs;