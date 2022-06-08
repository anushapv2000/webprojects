import React from "react";
import './Message.css';
const Message=({message:{text,user},name})=>{
    let issentbycurrentuser=false;
    const trimname=name.trim().toLowerCase();

    if(user===trimname){
        issentbycurrentuser=true;
    }
    return(
        issentbycurrentuser?(
        <div className="messageContainer justifyEnd">
            <p className="sentText pr-10 ">{trimname}</p>
            <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">{text}</p>
            </div>
        </div>

        )
        :
        (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                 <p className="messageText colorDark">{text}</p>
                </div>
            <p className="sentText pl-10">{user}</p>
        </div>
        )
    )
}
   


export default Message;