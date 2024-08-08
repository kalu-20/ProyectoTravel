import {useContext} from "react";
import {TravelContext} from "../contexts/TravelContext.jsx";
import {Link} from "react-router-dom";
import {Box, CardContent, Grid, Link as StyleLink, Typography} from "@mui/material";

function TravelCard ({ travel, showPromo }) {

    const { setTravel } = useContext(TravelContext);

    return (
        <Grid item xs={12} sm={6} md={4}>
            <CardContent style={{backgroundColor: '#77b9f6', borderRadius: '10px'}}>
                <Typography gutterBottom variant="h5" component="h2" >
                    <StyleLink component={Link} color='secondary' to={`/travels/${travel.travel_id}`}
                               onClick={() => setTravel(travel)}>
                        {travel.name}
                    </StyleLink>
                </Typography>
                {(showPromo && travel.promo_id) && (
                    <Box style={{
                        backgroundColor: '#ffd440',
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '10px',
                    }}>
                        <Typography variant="h6" color='primary'>
                            ¡Descuento del {travel.discount}%
                            desde el {travel.start_tm} hasta {travel.end_tm}!
                        </Typography>
                    </Box>
                )}
                <Typography>Precio: ${travel.cost}</Typography>
                <Typography>Inicia {travel.start_dt}</Typography>
                <Typography>Termina {travel.end_dt}</Typography>
            </CardContent>
        </Grid>
    )
}

export default TravelCard;