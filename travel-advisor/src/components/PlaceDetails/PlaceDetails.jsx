import React from 'react';
import {Box,Typography,Button,Card,CardMedia,CardContent,CardActions} from '@material-ui/core'

import PhoneIcon from '@material-ui/icons/Phone';
import Rating  from '@material-ui/lab/Rating';
import useStyles from './styles';
import LocationOnIcon from '@material-ui/icons/LocationOn'
const PlaceDetails=({place,selected,refprop})=>{
    const classes=useStyles();
    if (selected) refprop?.current?.scrollIntoView({behaviour:"smooth",block:"start"})
    return(
        <Card elevation={10}>
            <CardMedia 
            style={{height:250}}
            image={place.photo ? place.photo.images.large.url: 'https://customthermoelectric.com/media/catalog/product/cache/1/image/500x500/17f82f742ffe127f42dca9de82fb58b1/placeholder/default/notfound.jpg'}
            title={place.name}
            
            />
             <CardContent>
             <Typography gutterBottom variant='h5'>{place.name}</Typography>
             <Box display="flex" justifyContent='space-between'>
                 <Rating size="small" value={Number(place.rating)} readOnly />
          
                 <Typography gutterBottom variant='subtitle1'>out of {place.num_reviews}</Typography>
             </Box>
             <Box display="flex" justifyContent='space-between'>
                 <Typography variant="subtitle1" >Price</Typography>
                 <Typography gutterBottom variant='subtitle1'>{place.price}</Typography>
             </Box>
             <Box display="flex" justifyContent="space-between">
                 <Typography variant="subtitle1" >Ranking</Typography>
                 <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
            
             </Box>
             {/* {place?.awards?.map((award)=>{
                    <Box my={1} display="flex" justifyContent="space-between" align='center'> 
                        <img src={award.images.small} alt={award.display_name}/>
                        <Typography variant="subtitle2">{place.ranking}</Typography>
                    </Box>
             })}
             
             {place?.cuisine?.map((name)=>{
                <Chip   key={name} size="small" label={name} className={classes.chip}/>
               // <Typography gutterBottom variant='subtitle1' className={classes.subtitle}>{name.name}</Typography>
            
            })} */}


             
             {place?.address && (
                <Typography gutterBottom variant="subtitle1" color="textSecondary" className={classes.subtitle}>
                    <LocationOnIcon/>{place.address}
                </Typography>
             )}
             {place?.phone && (
                <Typography gutterBottom variant="subtitle1" color="textSecondary" className={classes.spacing}>
                    <PhoneIcon/>{place.phone}
                </Typography>
             )}
             <CardActions >
                 <Button size="small" color="primary" onClick={()=>window.open(place.web_url,'_blank')} >
                     Trip Advisor
                 </Button>
                 <Button size="small" color="primary" onClick={()=>window.open(place.website,'_blank')} >
                     Website
                 </Button>
             </CardActions>
            </CardContent>
        </Card>
    )
}

export default PlaceDetails;