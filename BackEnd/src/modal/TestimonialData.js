const mongoose= require('mongoose');

/**LOCAL BB */
// mongoose.connect('mongodb://localhost:27017/library');

//ATLAS//
// mongoose.connect('mongodb+srv://userone:userone@ictakfiles.gxk2j.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://userone:userone@cluster0.vcc0q.mongodb.net/ProjectICTKWebsite?retryWrites=true&w=majority');

const Schema = mongoose.Schema;

const TestimonialSchema = new Schema({
    course_id               : String,
    course_title            : String,
    name                    : String,
    position                : String,
    organisation            : String,
    testimony               : String,
    image                   : String
});

var Testimonialdata = mongoose.model('testimonial',TestimonialSchema);

module.exports = Testimonialdata;

