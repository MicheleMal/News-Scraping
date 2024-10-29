import { useEffect, useState } from "react";
import axios from "axios";

const useNews = (limit = null) => {
    const [news, setNews] = useState([]);
    const [nPageTotal ,setNPageTotal] = useState(1)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const url = limit
        ? `http://localhost:3000/scraping/news?recentN=${limit}`
        : "http://localhost:3000/scraping/news";

    const fetchNews = async () => {
        setLoading(true)
        try {
            const allNews = await axios.get(url);
            setNews(allNews.data.news);
            // setNews(allNews.data.news);
            setNPageTotal(allNews.data.countPage)
        } catch (error) {
            if(error.response && error.response.status === 404){
                setError(error.response.data.message)
            }
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return {
        news,
        nPageTotal,
        error,
        loading
    }
};

export default useNews;
