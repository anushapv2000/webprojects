//to manage users login,removing,adding ,signing,basically helper functions
const users=[];


const addUser=({id,name,room})=>{
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();
    

    const existuser=users.find((user)=>user.room===room && user.name===name);
    if (existuser)
    {
        return{error:'username is taken'};
    }
    const user={id,name,room}
    users.push(user);
    return {user};
}

const removeUser=(id)=>{
    const index=users.find((user)=>
    user.id===id
    );
    if (index !=-1)
{
    return users.splice(index,1)[0];//[0] return the spliced user
}
}

const getUser=(id)=>users.find((user)=> user.id===id  );
  




const getUserRoom=(room)=>users.filter((user)=>
    user.room==room
);



module.exports ={addUser,removeUser,getUser,getUserRoom};