import PlaceCard from "../components/PlaceCard.jsx";
import {useContext} from "react";
import DataContext from "../contexts/DataContext.jsx";
import {Container, Grid} from "@mui/material";

function Museum () {

    const { cities, places } = useContext(DataContext);

    return (
        <Container width="md" maxWidth="lg">
            <h2>Museos y Artesanías</h2>
            <Grid container spacing={4}>
                {places
                    .filter(pl => pl.category === 'Museo' || pl.category === 'Artesania')
                    .map(place => {
                        const cityName = cities.find(city => city.id === place.cities_id).name
                        return (
                            <PlaceCard key={place.id} place={place} cityName={cityName} />
                        )
                    })
                }
            </Grid>
        </Container>
    )
}

export default Museum;