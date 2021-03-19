const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/vishesh888/image/upload/v1598882085/default-profile-picture_vyarmw.jpg"
    }
});

mongoose.model('User',User);