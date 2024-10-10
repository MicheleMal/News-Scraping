import { useState } from "react";

const useNews = (limit = null) => {
    const [news, setNews] = useState([
        {
            title: "Notizia 1: Importante aggiornamento sulla situazione economica",
            content:
                "Le ultime notizie sull’andamento dell’economia mostrano segni di ripresa...",
            date: "26 Settembre 2024",
            link: "https://www.ansa.it/sicilia/notizia1",
        },
        {
            title: "Notizia 2: Nuove scoperte nel campo della tecnologia",
            content:
                "Un team di ricercatori ha annunciato una scoperta rivoluzionaria...",
            date: "25 Settembre 2024",
            link: "https://www.ansa.it/sicilia/notizia2",
        },
        {
            title: "Notizia 3: Eventi culturali in Sicilia",
            content:
                "La Sicilia si prepara ad accogliere una serie di eventi culturali imperdibili...",
            date: "24 Settembre 2024",
            link: "https://www.ansa.it/sicilia/notizia3",
        },
        {
            title: "Notizia 4: Eventi culturali in Sicilia",
            content:
                "La Sicilia si prepara ad accogliere una serie di eventi culturali imperdibili...",
            date: "24 Settembre 2024",
            link: "https://www.ansa.it/sicilia/notizia3",
        },
        {
            title: "Notizia 5: Eventi culturali in Sicilia",
            content:
                "La Sicilia si prepara ad accogliere una serie di eventi culturali imperdibili...",
            date: "24 Settembre 2024",
            link: "https://www.ansa.it/sicilia/notizia3",
        },
        {
            title: "Notizia 6: Eventi culturali in Sicilia",
            content:
                "La Sicilia si prepara ad accogliere una serie di eventi culturali imperdibili...",
            date: "24 Settembre 2024",
            link: "https://www.ansa.it/sicilia/notizia3",
        },
    ]);

    if (limit !== null) {
        return news.slice(0, limit);
    }

    return news

};

export default useNews;
