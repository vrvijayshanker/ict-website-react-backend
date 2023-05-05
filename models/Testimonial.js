const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TestimonialSchema = new Schema({
    testimonial: {
        type: String,
        required: true
    },
    student_name: {
        type: String,
        required: true        
    },
    student_photo: {
        type: String
    },
    student_course: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    }

});

const Testimonials = mongoose.model("Testimonial", TestimonialSchema);

module.exports = Testimonials;