import {useContext} from "react";
import DataContext from "../contexts/DataContext.jsx";
import TravelCard from "../components/TravelCard.jsx";
import {Container, Grid} from "@mui/material";

function Promos () {

    const { travels } = useContext(DataContext)

    return (
        <Container width="md" maxWidth="lg">
            <h2>Promociones de Viajes y Circuitos</h2>
            <Grid container spacing={4}>
                {travels
                    .filter(tr => tr.promo_id)
                    .map(travel => {
                        return (
                            <TravelCard key={travel.promo_id} travel={travel} showPromo={true} />
                        )
                    })}
            </Grid>
        </Container>
    )
}

export default Promos