import {useContext, useState} from "react";
import {TravelContext} from "../contexts/TravelContext.jsx";
import {ProfileContext} from "../contexts/ProfileContext.jsx";
import {Button, Container, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import DataContext from "../contexts/DataContext.jsx";
import fetchRequest from "../util/fetchRequest.jsx";

function StopForm ({ newStop, biggestOrder, stopData }) {
    const { travel } = useContext(TravelContext);
    const { state } = useContext(ProfileContext)
    const { cities, places } = useContext(DataContext);

    let defaultType;
    if (newStop || stopData.placeId) {
        defaultType = 'place';
    }
    else {
        defaultType = 'city'
    }
    const [stopType, setStopType] = useState(defaultType);
    const [days, setDays] = useState(newStop ? 1 : stopData.days);

    let defaultLocId;
    if (stopType === 'place' && newStop) {
        defaultLocId = places[0].id;
    }
    else if (stopType === 'place' && !newStop) {
        defaultLocId = stopData.placeId;
    }
    else if (newStop) {
        defaultLocId = cities[0].id;
    }
    else {
        defaultLocId = stopData.cityId;
    }
    const [locationId, setLocationId] = useState(defaultLocId);

    const formHandler = async (e) => {
        e.preventDefault();

        try {
            const stopBody = {
                days,
                stopOrder: newStop ? biggestOrder + 1 : stopData.stopOrder,
                cityId: stopType === 'city' ? locationId : null,
                placeId: stopType === 'place' ? locationId : null,
                travelId: travel.travel_id,
            }

            const requestPath = newStop ? 'create' : `edit/${stopData.stopId}`;
            const requestMethod = newStop ? 'POST' : 'PUT';

            const res = await fetchRequest(`stops/${requestPath}`, {
                method: requestMethod,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state.token}`,
                },
                body: JSON.stringify(stopBody)
            })
            const response = await res.json();

            if (response.success) {
                alert('Gestión de Parada exitosa.')
                window.location.reload();
            }
            else {
                throw new Error(response.error)
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <Container component='main' maxWidth='xs'>
            <h3>{newStop ? 'Crear' : 'Editar'} Parada</h3>
            <form onSubmit={formHandler}>
                {newStop && (
                    <Button
                        fullWidth
                        variant='outlined'
                        onClick={(e) => {
                            e.preventDefault()
                            setStopType(stopType === 'place' ? 'city' : 'place')
                            setLocationId(stopType === 'place' ? cities[0].id : places[0].id)
                        }}
                    >
                        {stopType === 'place' ? 'Tipo: Lugar (Recomendado)' : 'Tipo: Ciudad'}
                    </Button>
                )}

                <TextField
                    margin="normal"
                    required
                    id="days-input"
                    fullWidth
                    value={days}
                    label="Días de Viaje"
                    inputProps={{ inputMode:'numeric', min: 1, step: 1}}
                    onChange={(e) => setDays(e.target.value)}
                />

                <FormControl fullWidth>
                    <InputLabel id="location-label">Lugar</InputLabel>
                    <Select
                        labelId="location-label"
                        required
                        id="location-select"
                        name="location"
                        onChange={(e) => setLocationId(e.target.value)}
                        value={locationId}
                        label="Lugar"
                    >
                        {(stopType === 'place') ? (
                            places.map(pl => {
                                return <MenuItem key={pl.id} value={pl.id}>{pl.name}</MenuItem>
                            })
                        ) : (
                            cities.map(ct => {
                                return <MenuItem key={ct.id} value={ct.id}>{ct.name}</MenuItem>
                            })
                        )}
                    </Select>
                </FormControl>

                <Button variant='contained' fullWidth type="submit">
                    Guardar
                </Button>
            </form>
        </Container>
    )
}

export default StopForm;