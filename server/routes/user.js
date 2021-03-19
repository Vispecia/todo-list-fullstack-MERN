const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");


router.post('/addUser',(req,res)=>{

    const {name,username} = req.body;
    
    if(!username || !name)
    return res.status(422).json({error:"Empty username or name"});

    User.findOne({username})
    .then(user=>{
        if(user)
        return res.status(422).json({error:"User already exist with this username"});
        
        const newUser = new User({
            name,
            username
        });

        newUser.save().then(success=>{
            res.json({message:"user saved"});
        })
        .catch(err=>{
            console.log(err);
        })
        
    }).catch(err=>{
        console.log(err);
    })
   
});


router.get('/all-users',(req,res)=>{
    User.find()
    .then(users=>{
        res.json(users);
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router;