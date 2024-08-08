import {Button, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {useContext} from "react";
import {ProfileContext} from "../contexts/ProfileContext.jsx";
import fetchRequest from "../util/fetchRequest.jsx";

function PlaceCard ({ place, cityName, showDelete }) {

    const { state } = useContext(ProfileContext)

    const deleteHandler = async (e) => {
        e.preventDefault();

        if (!confirm(`¿Deseas borrar el lugar "${place.name}"?`)) {
            return;
        }

        try {
            const res = await fetchRequest(`places/delete/${place.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            })
            const response = await res.json();

            if (response.success) {
                alert('Lugar borrado correctamente');
                window.location.reload();
            }
            else {
                throw new Error(response.error);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }} >
                <CardMedia
                    component='img'
                    image={place.img_url}
                    alt={`Imagen de ${place.name}`}
                    sx={{align: 'bottom'}}
                />
                <CardContent sx={{
                    backgroundColor: 'secondary.secondary',
                    height: 'min-content'
                }}>
                    <Typography gutterBottom variant="h5" component="h2" >{place.name}</Typography>
                    <Typography>Ciudad: {cityName}</Typography>
                    <Typography variant="h6">{place.address}</Typography>
                    {showDelete && (
                        <Button onClick={deleteHandler} variant='contained' sx={{marginTop: '15px'}}>
                            Borrar
                        </Button>
                    )}
                </CardContent>
            </Card>
        </Grid>
    )
}

export default PlaceCard;