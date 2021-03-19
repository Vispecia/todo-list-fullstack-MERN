const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const Todo = new mongoose.Schema({
    desc:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
});

mongoose.model("Todo",Todo);