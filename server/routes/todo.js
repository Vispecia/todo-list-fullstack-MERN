const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = mongoose.model("Todo");
const User = mongoose.model("User");

router.post('/addTodo',(req,res)=>{
    const {desc,_id} = req.body;
    if(!desc) return res.status(422).json({error:"Empty description found"});

    User.findById(_id).then(user=>{
        req.user = user;
        const newTodo = new Todo({
            desc,
            postedBy:req.user
        });
    
        newTodo.save().then(saved=>{
           res.json({todo:saved});
        }).catch(err=>{
            console.log(err);
        })
    })

    

})

router.get('/getUserTodos/:id',(req,res)=>{
    
    Todo.find({postedBy:req.params.id})
    .populate('postedBy','_id')
    .then(todos=>{
        return res.json(todos);
    })
    .catch(err=>{
        console.log(err);
    })
})

// update isComplete

router.put('/switch',(req,res)=>{
    Todo.findByIdAndUpdate(req.body.id,{
        $set:{completed:!req.body.value}
    },{
        new:true
    })
    .exec((err,result)=>{
        if(err)
        return res.status(422).json({error:err})

        res.json({result})
    })

})


router.delete('/deleteTodo/:id',(req,res)=>{
    Todo.findOne({_id:req.params.id})
    .populate("postedBy","_id username name")
    .exec((err,todo)=>{
        if(err || !todo)
        return res.status(422).json({error:err})

        
            todo.remove()
            .then(result=>{
                res.json(result)
            })
            .catch(err=>{
                console.log(err)
            })
        
    })
})




module.exports = router;