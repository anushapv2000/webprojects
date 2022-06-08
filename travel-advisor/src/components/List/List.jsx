import React,{useState,useEffect,createRef} from 'react';
import { CircularProgress,Grid,Typography,InputLabel,MenuItem,FormControl,Select} from '@material-ui/core';
import useStyles from './styles'
import PlaceDetails from '../PlaceDetails/PlaceDetails'
const List=({places,childclicked,isloading,type,setType,rating,setRating})=>{
    const classes=useStyles();
    
    const [elrefs,setelrefs]=useState([])
    console.log({childclicked});
    useEffect(()=>{
        const refs=Array(places?.length).fill().map((_,i)=> elrefs[i] || createRef());
        setelrefs(refs)
    },[places])
    return(
        <div >
           <Typography variant="h4"> Restaurants,Hotels & Attractions around you</Typography>
           {isloading? (
           <div className={classes.loading}>
               <CircularProgress size ="5rem"/>
           </div>
           ):(
               <>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e)=>setType(e.target.value)}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>        
                </Select>
                </FormControl> 
                <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>        
                </Select>
                </FormControl>   
                <Grid container spacing={3} className={classes.list}>  
                {places?.map((place,i)=>(
                    <Grid  item key={i} xs={12}>
                        <PlaceDetails place={place}
                        selected = {Number(childclicked)===i}
                        refprop={elrefs[i]}/>                                                                         
                    </Grid> 
               ))} 
              </Grid>  
              </>
           )}       
        </div>
    )
}

export default List;
