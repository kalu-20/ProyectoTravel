import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ProfileContext} from "../contexts/ProfileContext.jsx";
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import fetchRequest from "../util/fetchRequest.jsx";

function RegisterForm ({ editingUser }) {

    const { state, dispatch } = useContext(ProfileContext);

    const [email, setEmail] = useState(editingUser ? state.profile.email : "");
    const [passw, setPassw] = useState("");
    const [role, setRole] = useState(editingUser ? state.profile.role : "user");

    const navigate = useNavigate();

    const formHandler = async (e) => {
        e.preventDefault();

        const userBody = {
            email,
            password: passw,
            type: role,
        }

        try {
            const requestPath = editingUser ? `edit/${state.profile.id}` : 'register';
            const requestMethod = editingUser ? 'PUT' : 'POST';

            const res = await fetchRequest(`users/${requestPath}`, {
                method: requestMethod,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": editingUser ? `Bearer ${state.token}` : undefined,
                },
                body: JSON.stringify(userBody)
            })
            const response = await res.json();

            if (response.success) {
                const msg =
                    editingUser
                        ? 'Edición de la cuenta exitosa.'
                        : 'Creación de usuario exitosa, inicie sesión.';

                alert(msg)
                dispatch({ type: 'LOGOUT' })
                navigate('/login');
            }
            else {
                alert('Creación de usuario fallida.')
                throw new Error(response.error)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <form onSubmit={formHandler}>
                <Box sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <h3>{editingUser ? 'Editar' : 'Registrar'} Usuario</h3>
                    <Avatar sx={{m: 1, bgcolor: "primary.main"}}></Avatar>

                    <TextField
                        margin="normal"
                        required
                        id="email-input"
                        fullWidth
                        value={email}
                        label="Correo Electrónico"
                        autoFocus
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />

                    <TextField
                        margin="normal"
                        required
                        id="passw-input"
                        fullWidth
                        label="Contraseña"
                        value={passw}
                        type="password"
                        onChange={(e) => {
                            setPassw(e.target.value);
                        }}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="role-label">Rol</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role-select"
                            name="role"
                            onChange={(e) => setRole(e.target.value)}
                            value={role}
                            label="Rol"
                        >
                            {
                                ['admin', 'user'].map(rl => {
                                    return <MenuItem key={rl} value={rl}>{rl}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>

                    <Button type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>{editingUser ? 'Guardar' : 'Crear Cuenta'}</Button>
                </Box>
            </form>
        </Container>
    )
}

export default RegisterForm;