import React,{ useEffect, useState } from 'react'

import {Button, TextField, FormControl, FormControlLabel, FormGroup, Switch} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

//css
import '../css/todolist.css'

export function Todolist(props) {
    
    const [todo,setTodo] = useState()
    const [newTodo,setNewTodo] = useState()
    const [flagUpdate,setFlagToGetUpdatedResult] = useState(0)
    
    const {userid} = props.match.params
    
    
    useEffect(()=>{
        fetch(`/getUserTodos/${userid}`)
        .then(res=>res.json())
        .then(data=>{       
            setTodo(data)
        })
        .catch(err=>console.log(err))
    },[flagUpdate])

    const switchToComplete = (id)=>{
        
            let value;
            for(let i=0;i<todo.length;i++){
                if(todo[i]._id === id){
                    value = todo[i].completed
                    break;
                }
            }
          

          fetch('/switch',{
            method:'put',
            body:JSON.stringify({
                id,
                value
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(res2=>{
            setFlagToGetUpdatedResult(prev=>{
                return !prev
            })
        })
        .catch(err=>console.log(err))
         
    }

    const addTodo = ()=>{
        fetch('/addTodo',{
            method:'post',
            body:JSON.stringify({
                desc:newTodo,
                _id:userid
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(res2=>{
            setNewTodo("")
            setFlagToGetUpdatedResult(prev=>{
                return !prev
            })
        })
        .catch(err=>console.log(err))
    }

    const deleteTodo = (id)=>{
        fetch(`/deleteTodo/${id}`,{
            method:'delete',
        })
        .then(res=>res.json())
        .then(res2=>{       
            setFlagToGetUpdatedResult(prev=>{
                return !prev
            })
        })
        .catch(err=>console.log(err))
    }
    
    return (
        <div className="todolist">
            <h1 className="todolist__heading">Todo list</h1>
            <div className="todolist__add">
                <TextField
                label="Todo"
                multiline
                variant="outlined"
                name="todo" value={newTodo} onChange={(e)=>setNewTodo(e.target.value)}
                style={{width:'900px'}}/>
                <Button value="Add" variant="contained" onClick={()=>addTodo()}>Add</Button>
            </div>
            
            {
                todo && todo.length ? todo.map(item=>{
                    return (
                        <div key={item._id} className="todolist__all">
                            <h1 className="todolist__todoinfo">{item.desc}</h1>
                            <FormControl component="fieldset">                                
                                <FormGroup>
                                    <DeleteIcon style={{color:'maroon',marginBottom:'12px'}} onClick={()=>deleteTodo(item._id)}/>
                                    <FormControlLabel
                                    control={<Switch checked={item.completed} onChange={()=>switchToComplete(item._id)} name="isComplete" />}
                                    label={item.completed ? "Completed" : "Incomplete"}
                                    />                                    
                                </FormGroup>                                
                            </FormControl>
                        </div>
                    )
                }) : null
            }
        </div>
    )
}
