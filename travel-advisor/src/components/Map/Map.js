import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper,Typography,useMediaQuery} from '@material-ui/core';

import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import mapStyles from './mapStyles';

import useStyles from './styles';
import Rating  from '@material-ui/lab/Rating';


const Map=({setCoordinates,setBounds,coordinates,places,setchildclicked,WeatherData})=>{
    const classes=useStyles()
    const isMobile=useMediaQuery('(min-width:600px)');
   
    return(
      <div className={classes.mapContainer}>
        <GoogleMapReact
        
        bootstrapURLKeys={{key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={8}
        margin={[50,50,50,50]}
        options={{disableDefaultUI:true,zoomControl:true,styles:mapStyles}}
        
        onChange={(e)=>{
          console.log('hai')
          setCoordinates({lat:e.center.lat,lng:e.center.lng});
          setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw});
        }}
        onChildClick={(child)=>
            setchildclicked(child)
        }
        >
         {places?.map((place,i)=>(
          <div
          className={classes.markerContainer}
          lat={Number(place.latitude)}
          lng={Number(place.longitude)}
          key={i}
          >
            {
              isMobile ? (
                <LocationOnOutlinedIcon color="primary" fontsize="large"/>
              ):(
                <Paper elevation={3} className={classes.paper} >
            <Typography gutterBottom className={classes.typography} variant="subtitle1">{place.name}</Typography>
            <img  
            className={classes.pointer}
            src={place.photo ? place.photo.images.large.url: 'https://customthermoelectric.com/media/catalog/product/cache/1/image/500x500/17f82f742ffe127f42dca9de82fb58b1/placeholder/default/notfound.jpg'}
              alt={place.name}/>
              <Rating size="small" value={Number(place.rating)} readOnly />
          
            </Paper>
              )}
                </div>
        ))} 
        {WeatherData?.list?.map((data,i)=>(
          <div key={i} lat={data.coord.lat} lng={data.coord.lng}>
            <img height ={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
          </div>
        ))}
        </GoogleMapReact>
      </div>
    )
  }

export default Map;
// export class MapContainer extends Component {
// render() {
//     return (
//         <Map
//           google={this.props.google} 
//           zoom={8}
//           style={useStyles}
//           margin={[50,50,50,50]}
//           options={''}
//           onChange={(e)=>{
//             console.log('hai')
//             this.setCoordinates({lat:e.center.lat,lng:e.center.lng})
//             this.setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw})
//           }}
//           onChildClick={''}
//         />
//     );}}
// export default GoogleApiWrapper({
        
//         apiKey: 'AIzaSyB5Er76qSNRv_8qPYCUc9Tq6S14H-epCz8'
//       })(MapContainer);

