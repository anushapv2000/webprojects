import React from 'react'
import '../App.css';

import {useAuthState} from 'react-firebase-hooks/auth'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {auth} from '../firebase.js'
import {db} from '../firebase.js'
import { useState,useEffect,useRef } from 'react';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SendMessage from './SendMessage';

import {collection,getDocs} from "firebase/firestore"

const Chat=()=>{
    const scroll = useRef()
    const [msg,setMsg]=useState([])
    const msgcollectionref=collection(db,"messages")
    useEffect(()=>{
        const getmsg=async ()=>{
            const data=await getDocs(msgcollectionref);
            console.log(data.docs)
            setMsg(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        }
        // db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot=>{setMsg(snapshot.docs.map(doc=>doc.data()))})
         getmsg();
    },[])
     return (
       

        <div>
            
            <SignOut/>
            <div className='msgs'>
            {msg.map((msgs)=>
             (
            <div>
            <div key={msgs.id} className={`msg ${msgs.uid === auth.currentUser.uid ? 'sent':'recieved'}`}><p>{msgs.text}</p>
            </div>
            </div>
            ))}
         
            
          
            {/* {messages.map(({id,text,photourl})=>{
               <h1>fbkdfb</h1>
                return(
                    <>
                <div key={id}>
                    <img src={photourl} alt=""></img>
                    <p>{messages.messages.text}</p>
                </div>
                </>
                )
            })} */}
            </div>
            <SendMessage  scroll={scroll}/>
            <div ref={scroll}></div>
        </div>
       
    )
}


export default Chat;