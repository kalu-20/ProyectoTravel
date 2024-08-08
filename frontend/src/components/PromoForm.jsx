import {useContext, useState} from "react";
import {TravelContext} from "../contexts/TravelContext.jsx";
import {ProfileContext} from "../contexts/ProfileContext.jsx";
import {Button, Container, TextField} from "@mui/material";
import fetchRequest from "../util/fetchRequest.jsx";

function PromoForm ({ newPromo }) {
    const { travel } = useContext(TravelContext);
    const { state } = useContext(ProfileContext);

    let defaultStartDate = new Date().toISOString().split('').splice(0,16).join('');
    let defaultEndDate = new Date().toISOString().split('').splice(0,16).join('');
    if (!newPromo) {
        const startDt = travel.start_tm.split(' ')
        defaultStartDate = startDt[0].split('-').reverse().join('-') + 'T' + startDt[1].split(':').splice(0, 2).join(':')

        const endDt = travel.end_tm.split(' ')
        defaultStartDate = endDt[0].split('-').reverse().join('-') + 'T' + endDt[1].split(':').splice(0, 2).join(':')
    }

    const [startTime, setStartTime] = useState(defaultStartDate)
    const [endTime, setEndTime] = useState(defaultEndDate)
    const [discount, setDiscount] = useState(newPromo ? 0.0 : travel.discount)

    const formHandler = async (e) => {
        e.preventDefault();

        try {
            const promoBody = {
                startTime: startTime.split('T')[0].split('-').reverse().join('-')
                    + ' ' + startTime.split('T')[1] + ':00',
                endTime: endTime.split('T')[0].split('-').reverse().join('-')
                    + ' ' + endTime.split('T')[1] + ':00',
                discount,
                travelId: travel.travel_id,
            }

            const requestPath = newPromo ? 'create' : `edit/${travel.promo_id}`;
            const requestMethod = newPromo ? 'POST' : 'PUT';

            const res = await fetchRequest(`promos/${requestPath}`, {
                method: requestMethod,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state.token}`,
                },
                body: JSON.stringify(promoBody),
            })
            const response = await res.json();

            if (response.success) {
                alert('Gestión de promoción exitosa.');
                window.location.reload();
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <Container component='main' maxWidth='xs'>
            <form onSubmit={formHandler}>
                <h3>Promoción válida durante:</h3>

                <TextField
                    margin="normal"
                    required
                    id="start-prom-input"
                    fullWidth
                    value={startTime}
                    label="Inicio"
                    type='datetime-local'
                    autoFocus
                    onChange={(e) => setStartTime(e.target.value)}
                />

                <TextField
                    margin="normal"
                    required
                    id="end-prom-input"
                    fullWidth
                    value={endTime}
                    label="Fin"
                    type='datetime-local'
                    onChange={(e) => setEndTime(e.target.value)}
                />

                <TextField
                    margin="normal"
                    required
                    id="discount-input"
                    fullWidth
                    value={discount}
                    inputProps={{ inputMode: 'numeric', min: 0, max: 100}}
                    label="Descuento"
                    onChange={(e) => setDiscount(e.target.value)}
                />

                <Button fullWidth variant='outlined' type="submit">
                    {newPromo ? 'Crear' : 'Editar'} Promoción
                </Button>
            </form>
        </Container>
    )
}

export default PromoForm;