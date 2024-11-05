import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate("/"); // Torna alla homepage
    };

    return (
        <Container maxWidth="md" style={{ textAlign: 'center', paddingTop: '50px' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '70vh',
                }}
            >
                {/* Titolo 404 */}
                <Typography variant="h1" component="h1" color="primary">
                    404
                </Typography>

                {/* Messaggio di errore */}
                <Typography variant="h5" component="h2" color="white">
                    Oops! La pagina che stai cercando non esiste.
                </Typography>

                {/* Suggerimento */}
                <Typography variant="body1" color="white">
                    Potresti aver digitato male l'URL o la pagina potrebbe essere stata rimossa.
                </Typography>

                {/* Bottone per tornare alla Home */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGoHome}
                    sx={{ mt: 3 }}
                >
                    Torna alla Homepage
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;
