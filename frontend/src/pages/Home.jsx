// src/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import NewsList from "../components/NewsList";
import useNews from "../hooks/useNews";
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Typography,
} from "@mui/material";

const Home = () => {
    const nRecentNews = 3;
    const { news, error, loading } = useNews(nRecentNews);

    return (
        <>
            <Navbar />
            <Container className="p-4">
                {/* Avviso */}
                <Card elevation={3} style={{ marginBottom: "24px" }}>
                    <CardContent>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Avviso
                        </Typography>
                        <Typography variant="body1">
                            Le notizie sono prese dal sito Ansa Sicilia.
                            Inoltre, tutto il frontend è creato da intelligenza
                            artificiale.
                        </Typography>
                    </CardContent>
                </Card>
                <h2 className="text-2xl font-bold mb-4">Ultime Notizie</h2>
                {/* Container per le card */}
                {loading ? (
                    <h4>
                        Caricamento delle notizie{" "}
                        <CircularProgress color="prinary" />{" "}
                    </h4>
                ) : error ? (
                    <h4>{error}</h4>
                ) : news.length > 0 ? (
                    <NewsList news={news} />
                ) : (
                    <h4>{error}</h4>
                )}
            </Container>
        </>
    );
};

export default Home;
