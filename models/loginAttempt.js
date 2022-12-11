const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const attemptSchema = new mongoose.Schema({
    attemptStatus:{
        type:String,
        required:true,
        enum: ["Success", "Error"]
    },
    ReasonForError: {
        type: String
    },
    userId: {
        type:ObjectId
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model('loginattempt',attemptSchema);