const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CouseSchema = new Schema({
    coursetitle: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    thumbImage: {
        type: String,
        required: true
    },
    syllabusfile:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    internship:{
        type: String,
        required: true
    },
    fee:{
        type: String,
        required: true
    },
    cmode:{
        type: String,
        required: true
    },
    startdate: {
        type: String,
        required: true
    },
    enddate: {
        type: String,
        required: true
    },
    cstatus: {
        type: String,
        required: true
    }
})