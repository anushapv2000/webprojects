import React ,{useState} from 'react';//using hook feature of react
//hooks are func based component,u can convert class based component to 
//func based component
import {Link} from 'react-router-dom';
import './Join.css';
const Join=()=>{
//name is variable and setName is a function,and inside usestate initialize
//initial value as empty string

//PASS Parameter using '?'
//u rpassing the data as an url to chat component using room and name
//if the name and  room is not correct then link should be prevented,elese all values
//will be transferred to chat component.

    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    return(
       <div className="joinOuterContainer">
           <div className="joinInnerContainer">
               <h1 className="heading">Join </h1>
                <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={event=>setName(event.target.value)}/></div>                    
                  <div>  <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event)=>setRoom(event.target.value) }/></div>                    
                <Link onClick={event=>(!name||!room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                  <button className="button mt-20" type="submit">Sign In</button>
                  </Link> 
                </div>
           </div>
       
    )
} 
 
export default Join;