import {Link} from "react-router-dom";
import {Toolbar, MenuItem, Link as StyleLink, Container, Typography, Box} from "@mui/material";
import {useContext} from "react";
import {ProfileContext} from "../contexts/ProfileContext.jsx";

const toolBarStyle = {
    backgroundColor: '#77b9f6',
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row'
};

function Home () {
    const { state } = useContext(ProfileContext)

    return (
        <>
            <Toolbar sx={toolBarStyle}>
                <MenuItem sx={{py: '6px', px: '12px'}}>
                    <StyleLink component={Link} sx={{color: 'primary.main', textDecoration: 'none'}} to="travels">
                        Viajes y Circuitos
                    </StyleLink>
                </MenuItem>
                <MenuItem sx={{py: '6px', px: '12px'}}>
                    <StyleLink component={Link} sx={{color: 'primary.main', textDecoration: 'none'}} to="festivals">
                        Fiestas y Festivales
                    </StyleLink>
                </MenuItem>
                <MenuItem sx={{py: '6px', px: '12px'}}>
                    <StyleLink component={Link} sx={{color: 'primary.main', textDecoration: 'none'}} to="museums">
                        Museos y Artesanías
                    </StyleLink>
                </MenuItem>
                <MenuItem sx={{py: '6px', px: '12px'}}>
                    <StyleLink component={Link} sx={{color: 'primary.main', textDecoration: 'none'}} to="foods">
                        Comedores
                    </StyleLink>
                </MenuItem>
                {(state.isAuthenticated && state.profile.role === 'admin') &&
                    (<MenuItem sx={{py: '6px', px: '12px'}}>
                        <StyleLink component={Link} sx={{ color: 'whiteColor.main', textDecoration: 'none' }} to="create-place">
                            Crear Lugar
                        </StyleLink>
                    </MenuItem>)}
            </Toolbar>

            <Container width='md' maxWidth='lg'>
                <Typography variant="h1" align='center' sx={{my: 3}} fontSize={50}>
                    ¡Con
                    <Typography sx={{
                        color: 'primary.secondary',
                        margin: '0 1vw',
                    }} variant='h1' fontSize={50} component='i'>
                        Las 2M Travel
                    </Typography>
                    podrás vivir grandes experiencias!
                </Typography>

                <div id='banner'>
                    <img id='img-banner' src="../../src/assets/banner_argentina.jpg" alt="Bus de viaje"/>
                </div>

                <h2>Quienes Somos</h2>
                <p>
                    Con nuestra trayectoria, te ayudamos a armar tu viaje y cuidar cada detalle para que tu única
                    preocupación sea sacar fotos para registrar cada momento de tu experiencia.
                </p>
                <p>
                    Ven a disfrutar de tus vacaciones, del resto nos ocupamos nosotros.
                </p>

                <h2>Nuestros Transportes</h2>
                <Box sx={{display: 'flex'}}>
                    <img style={{maxWidth: '50%'}} src="../../src/assets/bus_grande.jpg" alt="Bus de viaje"/>
                    <img style={{maxWidth: '50%'}} src="../../src/assets/auto_4x4.jpg" alt="Automovil 4 por 4"/>
                </Box>
                <p>
                    Poseemos minibuses y camionetas 4x4.
                </p>
            </Container>
        </>
    )
}

export default Home;