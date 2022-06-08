//this is where all request for connection and disconnetion happens
// deal with all socket.io logic
//use effect is used to  
import React,{useState,useEffect} from 'react';
import queryString from 'query-string';//helps to retrieve data from url
import io from 'socket.io-client';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar.js';

import Input from '../Input/Input.js';

import Messages from '../Messages/Messages.js';

let socket;//defining a variable
const Chat=({location})=>{
    const[name, setName]=useState(null);
    const [room, setRoom]=useState(null);
    const [users, setUsers] = useState(null);
    const [message,setMessage]=useState(null);//specifying every single message
    const [messages,setMessages]=useState([])
    const ENDPOINT='localhost:5000';//this is where endpoint is located 
    useEffect(()=>{//when component renders and need to retrieve data from url
        const {name,room}=queryString.parse(location.search);//here we get location url
        socket=io.connect(ENDPOINT);//need to pass an endpoint to the server
        setName(name);
        setRoom(room);
        console.log(socket);
        //we are sending this data to backend,ES6 syntax
        socket.emit('join',{name,room},()=>{

        }  );
    //when useeffect is called,request are made twice,so need to make sure
//when useffect is called    
//done by passing by array,if these two values change then 
//we need to rerender useeffect.


//function for sending messages

 //return ()=>//to disonnect event,unmounting 
 //    {
 //   socket.emit('disconnect');
 //   socket.off();//turn off one client Chat.
 //}
    },[ENDPOINT,location.search]
    );
    

useEffect(()=>{//listening to message
    socket.on('message',(message)=>{
        setMessages([...messages,message]);
    })
    socket.on("roomdata", ({ users }) => {
        setUsers(users);
      });
  }, [messages]);


    const sendMessage=(e)=>{
        e.preventDefault();//we dont need to refresh the whole page
        if (message){
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
    }
    console.log(message,messages);
     return(
       <div className='outerContainer'>
           <div className='container'>
               <InfoBar room={ room } />
               <Messages messages={messages} name={name}/>
               <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
           </div>
       </div>

    )
}


export default Chat;