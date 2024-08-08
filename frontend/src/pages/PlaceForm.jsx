import {useContext, useState} from "react";
import {ProfileContext} from "../contexts/ProfileContext.jsx";
import {useNavigate} from "react-router-dom";
import DataContext from "../contexts/DataContext.jsx";
import {Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import PlaceCard from "../components/PlaceCard.jsx";
import fetchRequest from "../util/fetchRequest.jsx";

const CATEGORIES = [
    'Hotel', 'Hostel', 'Camping',
    'Senderismo', 'Cabalgata', 'Trakking',
    'Festival', 'Fiesta',
    'Museo', 'Artesania',
    'Comedor', 'Regional',
];

function PlaceForm () {

    const navigate = useNavigate()

    const { state } = useContext(ProfileContext);
    const { cities, places } = useContext(DataContext);

    const [name, setName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [address, setAddress] = useState('')
    const [city, setCity] = useState(cities[0]?.id || '');
    const [category, setCategory] = useState('Hotel')

    if (state.profile?.role !== 'admin') {
        navigate('/');
    }

    const formHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await fetchRequest('places/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state.token}`,
                },
                body: JSON.stringify({
                    name,
                    imgUrl,
                    address,
                    cityId: city,
                    category,
                })
            })
            const response = await res.json();

            if (response.success) {
                alert('Lugar creado correctamente.')
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
        <Container width="md" maxWidth="lg">
            <Container sx={{marginTop: '40px'}} component='main' maxWidth='xs'>
                <form onSubmit={formHandler}>
                    <h2>Nuevo Lugar Turístico</h2>

                    <TextField
                        margin="normal"
                        required
                        id="name-place-input"
                        fullWidth
                        value={name}
                        label="Nombre"
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        id="imgurl-place-input"
                        fullWidth
                        value={imgUrl}
                        label="URL de Imagen"
                        onChange={(e) => setImgUrl(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        id="addr-place-input"
                        fullWidth
                        value={address}
                        label="Dirección"
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <FormControl fullWidth sx={{marginTop: '20px'}}>
                        <InputLabel id="category-label">Categoría</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category-place-select"
                            name="category"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            label="Categoría"
                        >
                            {CATEGORIES.map(cat => {
                                return <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{margin: '20px 0'}}>
                        <InputLabel id="city-label">Ciudad</InputLabel>
                        <Select
                            labelId="city-label"
                            id="city-place-select"
                            name="city"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            label="Ciudad"
                        >
                            {cities.map(ct => {
                                return <MenuItem key={ct.id} value={ct.id}>{ct.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <Button variant='outlined' fullWidth type='submit'>
                        Crear Lugar
                    </Button>
                </form>
            </Container>
            <Container width="md" maxWidth="lg">
                <h2>Lugares Turísticos</h2>
                <Grid container spacing={4}>
                    {places.map(place => {
                        const cityName = cities.find(city => city.id === place.cities_id)?.name || '';
                        return (
                            <PlaceCard key={place.id} place={place} cityName={cityName} showDelete={true} />
                        )
                    })
                    }
                </Grid>
            </Container>
        </Container>
    )
}

export default PlaceForm;