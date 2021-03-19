import React, { useEffect, useState } from 'react'
import {Button, Grid, TextField} from '@material-ui/core'
import { Card } from './Card';

//css
import '../css/home.css'


export function Home() {

    const [users,setUsers] = useState([]);
    const [username,setUsername] = useState();
    const [name,setName] = useState();
    const [duplicateUsernameFlag,setDuplicateUsernameFlag] = useState(false)
    const [duplicateUsernameErrorHelperText,setDuplicateUsernameErrorHelperText] = useState("")

    useEffect(()=>{
        fetch('/all-users')
        .then(res=>res.json())
        .then(usersList=>{

            setUsers(usersList)
        })
        .catch(err=>{
            console.log(err)
        })
    })

    const addUser = ()=>{
        fetch('/addUser',{
            method:'post',
            body:JSON.stringify({
                name,
                username
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(res2=>{

            if(!res2.error){
                console.log(res2)
                setName("")
                setUsername("")
                setDuplicateUsernameFlag(false)
                setDuplicateUsernameErrorHelperText("")
            }
            else{
                setDuplicateUsernameFlag(true)
                setDuplicateUsernameErrorHelperText(res2.error)
            }
            
        })
    }

    return (
        <div className="home">
            <h1>USERS</h1>
            <div className="home__addUser">
                <TextField name="username" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}
                error={duplicateUsernameFlag}
                helperText={duplicateUsernameErrorHelperText}/>
                <TextField name="name" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>                
                <Button variant="outlined" onClick={()=>addUser()}>Add</Button>
            </div>
            <div>
                <Grid container style={{flexGrow:'1'}} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={10}>
                        {
                        users.length ? users.map(user=>{
                            return (
                                <Grid key={user._id} item>
                                    <Card id={user._id} name={user.name} username={user.username}/>
                                </Grid>                        
                                )
                            }) : null
                        }
                    </Grid>
                </Grid>
                </Grid>

                
            </div>
            
        </div>
    )
}
