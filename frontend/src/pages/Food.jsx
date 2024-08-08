import PlaceCard from "../components/PlaceCard.jsx";
import {useContext} from "react";
import DataContext from "../contexts/DataContext.jsx";
import {Container, Grid} from "@mui/material";

function Food () {

    const { places, cities } = useContext(DataContext)

    return (
        <Container width="md" maxWidth="lg">
            <h2>Comedores y Comidas Regionales</h2>
            <Grid container spacing={4}>
                {places
                    .filter(pl => pl.category === 'Comedor' || pl.category === 'Regional')
                    .map(place => {
                        const cityName = cities.find(city => city.id === place.cities_id).name
                        return (
                            <PlaceCard key={place.id} place={place} cityName={cityName} />
                        )
                    })}
            </Grid>
        </Container>
    )
}

export default Food;