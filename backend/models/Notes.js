const {mongoose } = require("mongoose");

const { Schema } = mongoose;

const NotesgSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require : true
    },
    tag : {
        type : String,
        default : "General"
    },
    date : {
        type : Date,
        default : date.now
    }
});
module.exports = mongoose.model('notes',NotesgSchema);