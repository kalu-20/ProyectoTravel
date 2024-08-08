import {useContext, useState} from "react";
import {ProfileContext} from "../contexts/ProfileContext.jsx";
import {Button, Container, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import DataContext from "../contexts/DataContext.jsx";
import fetchRequest from "../util/fetchRequest.jsx";

function ProfileForm ({ newProfile, openFormHandler }) {

    const { state, dispatch } = useContext(ProfileContext);
    const { cities } = useContext(DataContext);

    const [name, setName] = useState(newProfile ? "" : state.profile.name);
    const [dni, setDni] = useState(newProfile ? "" : state.profile.dni);
    const [phone, setPhone] = useState(newProfile ? "" : state.profile.phone);
    const [city, setCity] = useState(newProfile ? "" : state.profile.cityId);

    const formHandler = async (e) => {
        e.preventDefault();

        const profileBody = {
            name,
            dni,
            phone,
            cityId: city,
            userId: state.profile.id,
        }

        try {
            const requestPath = newProfile ? 'create' : `edit/${state.profile.profileId}`;
            const requestMethod = newProfile ? 'POST' : 'PUT';

            const res = await fetchRequest(`profiles/${requestPath}`, {
                method: requestMethod,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state.token}`,
                },
                body: JSON.stringify(profileBody)
            })
            const response = await res.json();

            if (response.success) {
                alert('Perfil guardado correctamente.')

                dispatch({
                    type: 'PROFILE',
                    profile: {
                        profileId: newProfile ? response.data.insertId : state.profile.profileId,
                        name,
                        dni,
                        phone,
                        cityId: Number(city),
                    }
                })
                openFormHandler(false);
            }
            else {
                alert('Gestión de perfil fallida.')
                throw new Error(response.error)
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <h3>{newProfile ? 'Crear' : 'Editar'} Perfil</h3>
            <form onSubmit={formHandler}>
                <TextField
                    margin="normal"
                    required
                    id="name-input"
                    fullWidth
                    value={name}
                    label="Nombre"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                />

                <FormControl fullWidth>
                    <InputLabel id="city-label">Ciudad</InputLabel>
                    <Select
                        labelId="city-label"
                        id="city-select"
                        name="city"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        label="Ciudad"
                    >
                        {
                            cities.map(ct => {
                                return <MenuItem key={ct.id} value={ct.id}>{ct.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>

                <TextField
                    margin='normal'
                    id='dni-input'
                    required
                    fullWidth
                    value={dni}
                    label='DNI'
                    onChange={(e) => setDni(e.target.value)}
                />

                <TextField
                    margin='normal'
                    id='phone-input'
                    required
                    fullWidth
                    value={phone}
                    label='Número Telefónico'
                    onChange={(e) => setPhone(e.target.value)}
                />

                <Button variant='contained' fullWidth type="submit">
                    {newProfile ? 'Crear' : 'Editar'}
                </Button>
            </form>
        </Container>
    )
}

export default ProfileForm;