const express=require('express');//requiring all dependencies through require and no import keyword
const socketio=require('socket.io');
const http=require('http');


const {addUser,removeUser,getUser,getUserRoom} = require('./users.js');
//Socket.io u can do anything that is real time
//instant messaging,real time analytics
//ANYTHiNG REAL TIME ,USE SOCKETS NOT HTTP REQUEST
//
const PORT=process.env.PORT || 5000;//PROCESS.ENV.PORT FOR DEPLOYING THE APP
const router=require('./router');//we r requiring it not importing
//const { callbackify } = require('util');
const app=express(); 
 
//initiliaze server to  use sockets
//pass in app where we initialize express
//io which is instance of socket io,pass server in it
//io can do lot of stuff
const server=http.createServer(app);
const io=socketio(server,{
    cors:{
        origin:"*"
    }
});
//we need to specify the port for deployment need specific port or use 5000
app.use(router);//we can call it as a middle wear
//below socket is specific client instance
io.on('connection',(socket)=>{
    //console.log('We have a new connection!!');
    
    socket.on('join',({name,room},callback)=>{
    //console.log(name,room);
    const {error,user}=addUser({id:socket.id,name,room});
    if(error) return callback(error);
    socket.join(user.room)
    socket.emit('message',{user:'admin',text:`${user.name},welcome to the room ${user.room}`}); 
    socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name},has joined`});
    
    io.to(user.room).emit('roomdata',{room:user.room,users:getUserRoom(user.room)})
        callback();//when no errors
    });
    socket.on('sendMessage',(message,callback)=>{
        const user=getUser(socket.id)
      
        io.to(user.room).emit('message',{user:user.name,text:message});
        
        callback();
    });
    //specifying the event we mentioned
    //in emit in client side along with the parameters
    socket.on('disconnect',()=>{
        const user=removeUser(socket.id);
        if (user){
            io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left`});
            io.to(user.room).emit('roomdata',{room:user.room,users:getUserRoom(user.room)});
       
        }
     console.log('User had left!!!');   
    })

});

server.listen(PORT,()=>console.log(`Server has started on Port ${PORT}`));



//now we need to integrate the socket.io,we need to use th e
//instance we created