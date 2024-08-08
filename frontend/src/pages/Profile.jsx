import {useContext, useState} from "react";
import {ProfileContext} from "../contexts/ProfileContext.jsx";
import DataContext from "../contexts/DataContext.jsx";
import ProfileForm from "../components/ProfileForm.jsx";
import {useNavigate} from "react-router-dom";
import RegisterForm from "../components/RegisterForm.jsx";
import {Box, Button, Container, Modal} from "@mui/material";
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

function Profile () {
    const [profileFormOpen, setProfileFormOpen] = useState(false);
    const [userFormOpen, setUserFormOpen] = useState(false)
    const { state, dispatch } = useContext(ProfileContext);
    const { cities } = useContext(DataContext)

    const navigate = useNavigate();

    const deleteHandler = async (e) => {
        e.preventDefault();

        if (!confirm('¿Desea borrar la cuenta? Es una accion irreversible.')) {
            return;
        }

        try {
            const res = await fetchRequest(`users/delete/${state.profile.id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state.token}`,
                },
                body: JSON.stringify({
                    profileId: state.profile.profileId
                })
            })
            const response = await res.json();

            if (response.success) {
                alert('Cuenta borrada exitosamente.')
                dispatch({type: 'LOGOUT'})
                navigate('/sign-up')
            }
            else {
                throw new Error(response.error)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <Container width='md' maxWidth='lg' sx={{display: 'flex', padding: '30px', justifyContent: 'space-evenly'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Box>
                    <h2>Usuario</h2>

                    <h3>Correo</h3>
                    <p>{state.profile.email}</p>

                    {(state.profile.role === 'admin') && (
                        <>
                            <b>Rol</b>
                            <p>Administrador</p>
                        </>
                    )}
                </Box>
                <Modal
                    open={userFormOpen}
                    onClose={() => setUserFormOpen(!userFormOpen)}
                >
                    <Box sx={modalBoxSx}>
                        <RegisterForm editingUser={true} />
                    </Box>
                </Modal>

                <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <Button variant='outlined' onClick={() => setUserFormOpen(!userFormOpen)}>
                        Editar Cuenta
                    </Button>
                    <Button variant='outlined' onClick={() => dispatch({type: 'LOGOUT'})}>
                        Cerrar Sesión
                    </Button>
                    <Button sx={{color: 'secondary.secondary'}} variant='contained' onClick={deleteHandler}>
                        Borrar Usuario
                    </Button>
                </Box>
            </Box>

            {state.profile.name ? (
                <Box>
                    <h2>Perfil</h2>

                    <h3>Nombre</h3>
                    <p>
                        {state.profile.name}
                    </p>

                    <b>DNI</b>
                    <p>{state.profile.dni}</p>

                    <b>Número Telefónico</b>
                    <p>{state.profile.phone}</p>

                    <b>Ciudad de residencia</b>
                    <p>{cities.find(city => city.id === state.profile.cityId)?.name || ''}</p>

                    <Button variant='outlined' onClick={() => {
                        setProfileFormOpen(!profileFormOpen)
                    }}>Editar Perfil
                    </Button>
                    <Modal
                        open={profileFormOpen}
                        onClose={() => setProfileFormOpen(!profileFormOpen)}
                    >
                        <Box sx={modalBoxSx}>
                            <ProfileForm newProfile={false}/>
                        </Box>
                    </Modal>
                </Box>
            ) : (
                <Box>
                    <h3 style={{maxWidth: '200px'}}>
                        Vaya, parece que aún no cuentas con
                        un perfil, vamos a crear uno:
                    </h3>

                    <Button variant='outlined' onClick={() => {
                        setProfileFormOpen(!profileFormOpen)
                    }}>
                        Crear Perfil
                    </Button>
                    <Modal
                        open={profileFormOpen}
                        onClose={() => setProfileFormOpen(!profileFormOpen)}
                    >
                        <Box sx={modalBoxSx}>
                            <ProfileForm newProfile={true} openFormHandler={setProfileFormOpen}/>
                        </Box>
                    </Modal>
                </Box>
            )}
        </Container>
    )
}

export default Profile;