import React,{useEffect,useState} from 'react';
import { CssBaseline, Grid} from '@material-ui/core';//
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

import {getPlacesData,getWeatherData}  from './api';
const App=()=>{
    const [places,setPlaces]=useState([])
    const [WeatherData,setWeatherData]=useState([])
    const [filterplaces,setfilterplaces]=useState([]);
    const [childclicked,setchildclicked]=useState(null);
    const [coordinates,setCoordinates]=useState({})
    const [bounds,setBounds]=useState({})

    const[isloading,setIsLoading]=useState(false)
    const [type,setType]=useState('restaurants')
    const [rating,setRating]=useState('')
;    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
            setCoordinates({lat:latitude,lng:longitude})
        })
    },[]);
    useEffect(()=>{
        const filterplaces=places?.filter((place)=>place.rating > rating);
        setfilterplaces(filterplaces);
    },[rating])
    useEffect(()=>{
        if(bounds.sw && bounds.ne){
        setIsLoading(true);
        console.log('coordinates')
        console.log(coordinates,bounds)
        getWeatherData(coordinates.alt,coordinates.lng)
        .then((data)=>{
            setWeatherData(data)
        });
         getPlacesData(type,bounds.sw,bounds.ne)
         .then((data)=>{
           
             console.log(data)
             setPlaces(data?.filter((place)=>place.name && place.num_reviews > 0))
             setfilterplaces([])
             setIsLoading(false)
         }
         )
        }
    },[type,bounds]);
    return(
    <>
    <CssBaseline/>
    <Header setCoordinates={setCoordinates}/>
    <Grid container spacing ={3} style={{width:'100%'}}>
        <Grid item xs={12} md={4}>
            <List    places={filterplaces?.length ? filterplaces:places}  
            childclicked={childclicked}
            isloading={isloading}
            type={type}     
            setType={setType}
            rating={rating}
            setRating={setRating}/>
        </Grid>
        <Grid item xs={12} md={8}>
            <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds} 
            coordinates={coordinates} 
            places={filterplaces?.length ? filterplaces:places}  
            setchildclicked={setchildclicked}    
            WeatherData={WeatherData}
            />
        </Grid>
    </Grid>
    </>
    );
}


export default App;

