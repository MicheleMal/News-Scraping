// src/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import NewsList from "../components/NewsList";
import useNews from "../hooks/useNews";

const Home = () => {

    const newsData = useNews(3)

    return (
        <>
            <Navbar />
            <div className="p-4">
                <div className="mb-6 p-4 bg-gray-700 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2">Avviso</h2>
                    <p>
                        Le notizie sono prese dal sito Ansa Sicilia. Inoltre,
                        tutto il frontend è creato da intelligenza artificiale.
                    </p>
                </div>

                <h2 className="text-2xl font-bold mb-4">Ultime Notizie</h2>

                {/* Container per le card */}
                <NewsList news={newsData.slice(0,3)}></NewsList>
            </div>
        </>
    );
};

export default Home;
