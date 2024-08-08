import {useContext, useState} from "react";
import {TravelContext} from "../contexts/TravelContext.jsx";
import {ProfileContext} from "../contexts/ProfileContext.jsx";
import {Button, Container, TextField} from "@mui/material";
import fetchRequest from "../util/fetchRequest.jsx";

function TravelForm ({ newTravel }) {

    const { state } = useContext(ProfileContext)
    const { travel } = useContext(TravelContext);

    const [name, setName] = useState(newTravel ? "" : travel.name)
    const [startDate, setStartDate] = useState(
        newTravel ? "2024-08-01" : travel.start_dt.split('-').reverse().join('-'))
    const [endDate, setEndDate] = useState(
        newTravel ? "2024-08-01" : travel.end_dt.split('-').reverse().join('-'))
    const [cost, setCost] = useState(newTravel ? 0.0 : travel.cost)

    const newTravelHandler = async (e) => {
        e.preventDefault();

        const travelBody = {
            name,
            startDate: startDate.split('-').reverse().join('-'),
            endDate: endDate.split('-').reverse().join('-'),
            cost,
        }

        try {
            const requestPath = newTravel ? 'create' : `edit/${travel.travel_id}`;
            const requestMethod = newTravel ? 'POST' : 'PUT';

            const res = await fetchRequest(`travels/${requestPath}`, {
                method: requestMethod,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state.token}`
                },
                body: JSON.stringify(travelBody),
            });
            const response = await res.json();

            if (response.success) {
                alert('Gestion de viaje exitosa.')
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
        <Container component="main" maxWidth="xs">
            <form onSubmit={newTravelHandler}>
                <TextField
                    sx={{margin: '40px 0 0'}}
                    required
                    id="travel-name-input"
                    fullWidth
                    value={name}
                    label="Nombre"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    margin="normal"
                    required
                    id="start-trav-input"
                    fullWidth
                    value={startDate}
                    type='date'
                    label="Fecha Inicio del Viaje"
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <TextField
                    margin="normal"
                    required
                    id="end-trav-input"
                    fullWidth
                    value={endDate}
                    type='date'
                    label="Fecha Fin del Viaje"
                    onChange={(e) => setEndDate(e.target.value)}
                />

                <TextField
                    margin="normal"
                    required
                    id="cost-input"
                    fullWidth
                    value={cost}
                    label="Precio"
                    type='numeric'
                    inputProps={{ inputMode: 'numeric', min: 0 }}
                    onChange={(e) => setCost(e.target.value)}
                />

                <Button fullWidth variant='contained' type="submit">
                    {newTravel ? "Crear" : "Editar"} Viaje
                </Button>
            </form>
        </Container>
    )
}

export default TravelForm;