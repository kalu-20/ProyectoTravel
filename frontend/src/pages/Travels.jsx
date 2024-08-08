import {useContext, useState} from "react";
import TravelCard from "../components/TravelCard.jsx";
import DataContext from "../contexts/DataContext.jsx";
import TravelForm from "../components/TravelForm.jsx";
import {ProfileContext} from "../contexts/ProfileContext.jsx";
import {Box, Button, Container, Grid, Modal} from "@mui/material";

function Travels () {
    const { state } = useContext(ProfileContext)
    const { travels } = useContext(DataContext);
    const [travelFormOpen, setTravelFormOpen] = useState(false);

    return (
        <Container width="md" maxWidth="lg">
            <h2>Viaja por Argentina con <i>Las 2M Travel</i></h2>

            <h3>Viajes disponibles</h3>

            {(state.isAuthenticated && state.profile.role === 'admin') && (
                <Button variant='outlined' sx={{marginBottom: '20px'}} onClick={() => setTravelFormOpen(!travelFormOpen)}>
                    Crear Nuevo Viaje
                </Button>
            )}

            <Modal
                open={travelFormOpen}
                onClose={() => setTravelFormOpen(!travelFormOpen)}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'whiteColor.main',
                    borderRadius: '20px',
                    boxShadow: 24,
                    padding: '0 30px 30px',
                }}>
                    <TravelForm newTravel={true}/>
                </Box>
            </Modal>

            <Grid container spacing={4}>
                {travels.map(travel => {
                    return (
                        <TravelCard key={travel.travel_id} travel={travel} showPromo={false}/>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default Travels;