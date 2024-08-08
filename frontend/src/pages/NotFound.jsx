import {Box, Container, Typography} from "@mui/material";

function NotFound () {
    return (
        <Container width='md' maxWidth='lg' sx={{
            display: 'flex',
            padding: '30px',
            justifyContent: 'space-evenly'}}
        >
            <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <Typography variant='h3' >
                    Vaya, parece que te has perdido :/
                </Typography>
                <Typography variant='h5' >
                    Error 404: Recurso no encontrado.
                </Typography>
            </Box>
            <Box sx={{maxWidth: '50%'}}>
                <img style={{width: '100%'}} src='../../src/assets/404.avif' alt='Imagen de Error 404' />
            </Box>
        </Container>
    )
}

export default NotFound;