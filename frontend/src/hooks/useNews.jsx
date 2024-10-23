import { useEffect, useState } from "react";
import axios, { all } from "axios"

const useNews = (limit = null) => {
    const [news, setNews] = useState([
        {
            title: "Incendio devasta una foresta in California",
            content:
                "Un grande incendio ha colpito una foresta nella California settentrionale, costringendo all'evacuazione di centinaia di residenti.",
            date: "2024-10-15",
            link: "https://esempio.com/incendio-california",
            category: "Cronaca",
        },
        {
            title: "Elezioni politiche: il partito al potere in testa nei sondaggi",
            content:
                "Le ultime rilevazioni mostrano il partito al potere in testa nei sondaggi a pochi giorni dalle elezioni politiche.",
            date: "2024-10-14",
            link: "https://esempio.com/elezioni-politiche",
            category: "Politica",
        },
        {
            title: "L'andamento dell'economia italiana nel 2024",
            content:
                "Analisi delle previsioni economiche per l'Italia nel 2024 e le sfide che il paese dovrà affrontare.",
            date: "2024-10-13",
            link: "https://esempio.com/economia-italiana-2024",
            category: "Economia",
        },
        {
            title: "Nuove rotte turistiche in Europa",
            content:
                "Scopri le nuove rotte turistiche in Europa per il 2024, dalle città storiche alle mete meno conosciute.",
            date: "2024-10-12",
            link: "https://esempio.com/nuove-rotte-europa",
            category: "Viaggi",
        },
        {
            title: "Manifestazioni contro la riforma del lavoro",
            content:
                "Proteste in diverse città italiane contro la recente riforma del lavoro proposta dal governo.",
            date: "2024-10-11",
            link: "https://esempio.com/proteste-riforma-lavoro",
            category: "Politica",
        },
        {
            title: "Aumento dei prezzi dei beni alimentari",
            content:
                "Un rapporto rivela un aumento significativo dei prezzi dei beni alimentari nel mercato italiano.",
            date: "2024-10-10",
            link: "https://esempio.com/aumento-prezzi-alimentari",
            category: "Economia",
        },
    ]);

    if (limit !== null) {
        return news.slice(0, limit);
    }

    return news;
};

export default useNews;
