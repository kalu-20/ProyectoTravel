import StopForm from "./StopForm.jsx";
import {useContext, useState} from "react";
import {ProfileContext} from "../contexts/ProfileContext.jsx";
import {Box, Button, CardContent, CardMedia, Grid, Modal, Typography} from "@mui/material";
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

function StopCard ({ stopData, cityName, biggestOrder }) {

    const { state } = useContext(ProfileContext)
    const [formOpen, setFormOpen] = useState(false)

    const deleteHandler = async (e) => {
        e.preventDefault();

        if (!confirm(`¿Deseas borrar la parada en ${stopData.name}?`)) {
            return;
        }

        try {
            const res = await fetchRequest(`stops/delete/${stopData.stopId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${state.token}`,
                }
            })
            const response = await res.json();

            if (response.success) {
                alert('Parada borrada correctamente.')
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
        <Grid item xs={12} sm={6} md={4}>
            <CardMedia
                component='img'
                image={stopData.imgUrl}
                alt={`Imagen de ${stopData.name}`}
                sx={{align: 'bottom', borderRadius: '10px 10px 0 0'}}
            />
            <CardContent style={{backgroundColor: '#77b9f6', borderRadius: '0 0 10px 10px'}}>
                <Typography gutterBottom variant="h5" component="h2" >{stopData.name}</Typography>
                <Typography variant="h6">Dias: {stopData.days}</Typography>
                <Typography>Ciudad: {cityName}</Typography>
                {stopData.address && (
                    <>
                        <Typography>Direccion: {stopData.address}</Typography>
                        <Typography>Categoría: {stopData.category}</Typography>
                    </>
                )}
                {(state.isAuthenticated && state.profile.role === 'admin') && (
                    <Box sx={{display: 'flex', justifyContent: 'space-around', paddingTop: '20px'}}>
                        <Button sx={{bgcolor: 'secondary.main'}} variant='outlined' onClick={() => setFormOpen(!formOpen)}>Editar</Button>
                        <Button variant='contained' onClick={deleteHandler}>Borrar</Button>
                        <Modal
                            open={formOpen}
                            onClose={() => setFormOpen(!formOpen)}
                        >
                            <Box sx={modalBoxSx}>
                                <StopForm newStop={false} biggestOrder={biggestOrder} stopData={stopData}/>
                            </Box>
                        </Modal>
                    </Box>
                )}
            </CardContent>
        </Grid>
    )
}

export default StopCard