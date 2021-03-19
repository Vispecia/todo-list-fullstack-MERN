import React from 'react'
import {Avatar} from '@material-ui/core'
import { useHistory } from 'react-router'

//css
import '../css/card.css'

export function Card({id,name,username}) {  
    
    const history = useHistory()
    
    const getTodos = ()=>{
        history.push(`/user/${id}`)
    }
    
    return (
        <div className="card" id={id} onClick={()=>getTodos()}>
        <Avatar className="card__avatar"/>
        <div className="card__name">
            <h2>{username}</h2>
            <h3 style={{fontWeight:'normal'}}>{name}</h3>
        </div>                          
        </div>
    )
}
