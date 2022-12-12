import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from "@material-ui/core";
import {LocationOnOutlined} from "@material-ui/icons";
import {Rating} from "@material-ui/lab";

import useStyles from './styles';
import mapStyles from './mapStyles'

const Map = ({coordinates, setCoordinates, setBounds, places, setChildClicked, weatherData}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width: 600px)');

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
                onChange={(e) => {
                    setCoordinates({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
                onChildClick={(child) => setChildClicked(child)}>
                {places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}>
                        {
                            !isDesktop ? (
                                <LocationOnOutlined color="primary" fontSize="large"/>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="subtitle2">
                                        {place.name}
                                    </Typography>
                                    <img className={classes.pointer}
                                         src={place.photo ? place.photo.images.large.url : 'https://via.placeholder.com/200?text=No+Image'}
                                         alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly/>
                                </Paper>
                            )
                        }
                    </div>
                ))}
                {weatherData?.list?.map((data, i) => (
                    <div lat={data.coord.lat} lng={data.coord.lon} key={i}>
                        <img height="100" src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    )
}

export default Map;