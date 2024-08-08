import StopCard from "../components/StopCard.jsx";
import {useContext, useEffect, useState} from "react";
import DataContext from "../contexts/DataContext.jsx";
import {TravelContext} from "../contexts/TravelContext.jsx";
import {useParams} from "react-router-dom";
import TravelForm from "../components/TravelForm.jsx";
import {ProfileContext} from "../contexts/ProfileContext.jsx";
import PromoForm from "../components/PromoForm.jsx";
import StopForm from "../components/StopForm.jsx";
import {Box, Button, Container, Grid, Modal, Typography} from "@mui/material";

import '../App.css'
import fetchRequest from "../util/fetchRequest.jsx";

const modalBoxSx = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'whiteColor.main',
    borderRadius: '20px',
    boxShadow: 24,
    padding: '0 30px 30px',
};

function Travel () {

    const { id } = useParams();

    const [stops, setStops] = useState([]);
    const [myTravels, setMyTravels] = useState([]);
    const [travelFormOpen, setTravelFormOpen] = useState(false);
    const [promoFormOpen, setPromoFormOpen] = useState(false);
    const [stopFormOpen, setStopFormOpen] = useState(false);

    const { cities, places} = useContext(DataContext);
    const { travel, setTravel } = useContext(TravelContext);
    const { state } = useContext(ProfileContext)

    useEffect(() => {
        const getTravel = async () => {
            const res = await fetchRequest(`travels/${id}`, {
                method: 'GET'
            });
            const response = await res.json();

            if (response.success) {
                setTravel(response.data[0])
            }
        }

        if (!travel.travel_id && !isNaN(id)) {
            getTravel();
        }
    }, []);

    useEffect(() => {
        const getStops = async () => {
            const res = await fetchRequest('stops', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    travelId: travel.travel_id,
                })
            })

            const response = await res.json();
            if (response.success) {
                setStops(response.data)
            }
        }

        if (travel.travel_id) {
            getStops()
        }
    }, [travel]);

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
            });
            const response = await res.json();

            if (response.success) {
                setMyTravels(response.data)
            }
        }

        if (state.profile?.profileId) {
            getMyTravels();
        }
    }, []);

    const deleteTravelHandler = async (e) => {
        e.preventDefault();

        if (!confirm('¿Deseas borrar este viaje?')) {
            return;
        }

        try {
            const res = await fetchRequest(`travels/delete/${travel.travel_id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state.token}`,
                },
            })
            const response = await res.json();

            if (response.success) {
                alert('Viaje borrado correctamente.')
                window.location.assign('/travels');
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const deletePromoHandler = async (e) => {
        e.preventDefault();

        if (!confirm('¿Deseas borrar la promoción de este viaje?')) {
            return;
        }

        try {
            const res = await fetchRequest(`promos/delete/${travel.promo_id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${state.token}`,
                }
            })
            const response = await res.json();

            if (response.success) {
                alert('Promoción borrada exitosamente.')
                window.location.reload();
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const purchaseTravelHandler = async (e) => {
        e.preventDefault();

        if (!confirm(`¿Deseas comprar el viaje "${travel.name}" por $${travel.cost}?`)) {
            return;
        }

        try {
            const res = await fetchRequest('passengers/create', {
                method: 'POST',
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
                alert('Viaje comprado correctamente.');
                window.location.assign('/my-travels');
            }
            else {
                throw new Error(response.error);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const stopInfos = stops.map(stop => {
        let stopLocation;
        if (stop.cities_id) {
            stopLocation = cities.find(city => city.id === stop.cities_id)
            return {
                stopId: stop.id,
                days: stop.days,
                stopOrder: stop.stop_order,
                cityId: stopLocation.id,
                name: stopLocation.name,
                imgUrl: stopLocation.img_url,
            }
        }
        else if (stop.places_id) {
            stopLocation = places.find(place => place.id === stop.places_id)
            return {
                stopId: stop.id,
                days: stop.days,
                stopOrder: stop.stop_order,
                placeId: stopLocation.id,
                name: stopLocation.name,
                imgUrl: stopLocation.img_url,
                address: stopLocation.address,
                cityId: stopLocation.cities_id,
                category: stopLocation.category,
            }
        }
    });

    let lastStopOrder;
    if (stops.length > 2) {
        lastStopOrder = stops.reduce((prevStop, currStop) => {
            return prevStop.stop_order < currStop.stop_order ? currStop : prevStop;
        }).stop_order
    }
    else if (!stops.length) {
        lastStopOrder = 0;
    }
    else {
        lastStopOrder = stops[0].stop_order;
    }

    return (
        <Container width="md" maxWidth="lg">
            <div className={"container header-section flex"}>
                <div className="header-left">
                    <h2>{travel.name}</h2>
                    <p>
                        Inicia el {travel.start_dt}
                    </p>
                    <p>
                        Termina el {travel.end_dt}
                    </p>
                    <p>
                        Precio: ${travel.cost}
                    </p>
                    {(state.isAuthenticated && state.profile.role === 'admin') && (
                        <Box sx={{display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
                            <Button variant='outlined' onClick={() => setTravelFormOpen(!travelFormOpen)}>
                                Editar Viaje
                            </Button>
                            <Button sx={{bgcolor: 'primary.main'}} variant='contained' onClick={deleteTravelHandler}>
                                Borrar Viaje
                            </Button>
                        </Box>
                    )}
                    {(state.isAuthenticated && !myTravels.some(tr => tr.travel_id === travel.travel_id) && state.profile.profileId) && (
                        <Button fullWidth sx={{marginTop: '10px', bgcolor: 'secondary.secondary'}} variant='contained'
                                onClick={purchaseTravelHandler}>
                            Comprar Viaje
                        </Button>
                    )}

                    <Modal
                        open={travelFormOpen}
                        onClose={() => setTravelFormOpen(!travelFormOpen)}
                    >
                        <Box sx={modalBoxSx}>
                            <TravelForm newTravel={false}/>
                        </Box>
                    </Modal>
                </div>

                <div className="header-right">
                    {travel.promo_id ? (
                        <div className="promo-container">
                            <h3>Promoción</h3>
                            <Typography variant="h6" color="primary.secondary" gutterBottom>
                                Descuento del {travel.discount}% !!!
                            </Typography>
                            <p>
                                Aplica desde el {travel.start_tm} hasta {travel.end_tm}.
                            </p>
                            {(state.isAuthenticated && state.profile.role === 'admin') && (
                                <Box sx={{display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
                                    <Button variant='outlined'
                                            onClick={() => setPromoFormOpen(!promoFormOpen)}
                                    >
                                        Editar Promoción
                                    </Button>
                                    <Button sx={{bgcolor: 'secondary.secondary'}} variant='contained' onClick={deletePromoHandler}>
                                        Borrar Promoción
                                    </Button>
                                </Box>
                            )}
                            <Modal
                                open={promoFormOpen}
                                onClose={() => setPromoFormOpen(!promoFormOpen)}
                            >
                                <Box sx={modalBoxSx}>
                                    <PromoForm newPromo={false}/>
                                </Box>
                            </Modal>
                        </div>
                    ) : (
                        (state.isAuthenticated && state.profile.role === 'admin') && (
                            <Box>
                                <Button sx={{marginBottom: '20px', bgcolor: 'secondary.secondary'}} variant='contained'
                                        onClick={() => setPromoFormOpen(!promoFormOpen)}
                                >
                                    Crear Promoción
                                </Button>
                                <Modal
                                    open={promoFormOpen}
                                    onClose={() => setPromoFormOpen(!promoFormOpen)}
                                >
                                    <Box sx={modalBoxSx}>
                                        <PromoForm newPromo={true}/>
                                    </Box>
                                </Modal>
                            </Box>)
                    )}
                </div>
            </div>

            <h3>Paradas</h3>
            {(state.isAuthenticated && state.profile.role === 'admin') && (
                <>
                    <Button variant='outlined' sx={{marginBottom: '40px', bgcolor: 'secondary.secondary'}}
                            onClick={() => setStopFormOpen(!stopFormOpen)}>
                        Crear Parada
                    </Button>
                    <Modal
                        open={stopFormOpen}
                        onClose={() => setStopFormOpen(!stopFormOpen)}
                    >
                        <Box sx={modalBoxSx}>
                            <StopForm newStop={true} biggestOrder={lastStopOrder}/>
                        </Box>
                    </Modal>
                </>
            )}
            <Grid container spacing={4}>
                {stopInfos
                    .sort((s1, s2) => s1.stopOrder < s2.stopOrder)
                    .map(stop => {
                        const cityName = cities.length ? cities.find(city => city.id === stop.cityId)?.name : ''
                        return (
                            <StopCard key={stop.stopId} stopData={stop} cityName={cityName}
                                      biggestOrder={lastStopOrder}/>
                        );
                    })}
            </Grid>
        </Container>
    )
}

export default Travel;
