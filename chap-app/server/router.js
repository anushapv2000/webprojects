
//for all sort of express applications
const express=require('express')
const router=express.Router();
//get reuest to root route
//to check whether our server is running in 5000 or not
router.get('/',(req,res)=>{
    res.send('server is up and running');
});
//we r exporting the router
module.exports=router;