import {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../contexts/ProfileContext.jsx";
import {Button, CardContent, Container, Grid, Typography} from "@mui/material";
import fetchRequest from "../util/fetchRequest.jsx";

function MyTravels () {

    const [myTravels, setMyTravels] = useState([]);

    const { state } = useContext(ProfileContext);

    useEffect(() => {
        const getMyTravels = async () => {
            const res = await fetchRequest('travels/passenger', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state.token}`,
                },
                body: JSON.stringify({
                    profileId: state.profile.profileId,
                })
            })
            const response = await res.json();

            if (response.success) {
                setMyTravels(response.data)
            }
        }

        if (state.profile?.profileId) {
            getMyTravels();
        }
    }, []);

    const deleteHandler = async (e, travel) => {
        e.preventDefault();

        if (!confirm(`¿Deseas cancelar tu viaje "${travel.name}"?`)) {
            return;
        }

        try {
            const res = await fetchRequest('passengers/delete', {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state.token}`,
                },
                body: JSON.stringify({
                    profileId: state.profile.profileId,
                    travelId: travel.travel_id,
                })
            })
            const response = await res.json();

            if (response.success) {
                alert('Viaje cancelado exitosamente.');
                window.location.reload();
            }
            else {
                throw new Error(response.error)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }
    return (
        <Container width="md" maxWidth="lg">
            <h2>Mis Viajes</h2>

            <Grid container spacing={4}>
                { myTravels.map(travel => {
                    return (
                        <Grid key={travel.travel_id} item xs={12} sm={6} md={4}>
                            <CardContent sx={{backgroundColor: 'secondary.secondary', borderRadius: '10px'}}>
                                <Typography gutterBottom color="secondary" variant="h5" component="h2">
                                    {travel.name}
                                </Typography>
                                <p>Fechas: {travel.start_dt} / {travel.end_dt}</p>
                                <p>Precio: ${travel.cost}</p>
                                <Button variant='contained' color="primary" onClick={(e) => deleteHandler(e, travel)}>
                                    Cancelar Viaje
                                </Button>
                            </CardContent>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default MyTravels;