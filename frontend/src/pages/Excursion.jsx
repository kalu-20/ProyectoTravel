import {useContext, useState} from "react";
import DataContext from "../contexts/DataContext.jsx";
import PlaceCard from "../components/PlaceCard.jsx";
import {Button, Container, Grid, Toolbar} from "@mui/material";

const toolBarStyle = {
    backgroundColor: 'secondary.secondary',
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row'
};

function Excursion () {
    const { places, cities } = useContext(DataContext);
    const [category, setCategory] = useState("Senderismo");

    return (
        <>
            <Toolbar sx={toolBarStyle}>
                <Button value="Senderismo" sx={{color: 'primary', textDecoration: 'none'}}
                        onClick={(e) => setCategory(e.target.value)}>
                    Senderismo
                </Button>
                <Button value="Cabalgata" sx={{color: 'primary', textDecoration: 'none'}}
                        onClick={(e) => setCategory(e.target.value)}>
                    Cabalgata
                </Button>
                <Button value="Trakking" sx={{color: 'primary', textDecoration: 'none'}}
                        onClick={(e) => setCategory(e.target.value)}>
                    Trakking
                </Button>
            </Toolbar>

            <Container width="md" maxWidth="lg">
                <h2>Excursiones Particulares - {category}</h2>
                <Grid container spacing={4}>
                    {places
                        .filter(pl => pl.category === category)
                        .map(place => {
                            const cityName = cities.find(city => city.id === place.cities_id).name
                            return (
                                <PlaceCard key={place.id} place={place} cityName={cityName}/>
                            )
                        })
                    }
                </Grid>
            </Container>
        </>
    )
}

export default Excursion;