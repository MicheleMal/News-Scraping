import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import useNews from "../hooks/useNews";
import Navbar from "../components/Navbar";
import NewsList from "../components/NewsList";
import axios, { all } from "axios";
import Pagination from "../components/Pagination";

const News = () => {
    const { news, nPageTotal, error, loading } = useNews();

    const [applyFilters, setApplyFilters] = useState({
        category: "",
        initialDate: "",
        finalDate: "",
    });

    const [filteredNews, setFilteredNews] = useState(news);

    const [totalPages, setTotalPages] = useState(nPageTotal);
    const [currentPage, setCurrentPage] = useState(1);
    const [errorPage, setErrorPage] = useState(error);

    const handleApplyFilters = (filters) => {
        setCurrentPage(1);
        setErrorPage(null);
        setApplyFilters(filters);
    };

    const handlePageChange = async (current) => {
        setCurrentPage(current);
    };

    // Si attiva quando si cambiano i filtri
    useEffect(() => {
        // Chiamata endpoint, prelevare numero totale di pagine
        const fetchCountPage = async () => {
            let url = `http://localhost:3000/scraping/news?`;

            // Aggiorna la URL con i filtri correnti
            if (applyFilters.category) {
                url += `t=${applyFilters.category}&`;
            }
            if (applyFilters.initialDate && applyFilters.finalDate) {
                url += `dateI=${applyFilters.initialDate}&dateF=${applyFilters.finalDate}&`;
            }

            try {
                const countPage = (await axios.get(url)).data.countPage;
                setTotalPages(countPage);
            } catch (error) {
                if (
                    error.response &&
                    (error.response.status === 404 ||
                        error.response.status === 400)
                ) {
                    setErrorPage(error.response.data.message);
                }
            }
        };

        fetchCountPage();
    }, [applyFilters]);

    // Si attiva quando cambiano i filtri o news in generale o cambio pagina
    useEffect(() => {
        if (
            currentPage === 1 &&
            !(
                applyFilters.category ||
                applyFilters.initialDate ||
                applyFilters.finalDate
            )
        ) {
            setFilteredNews(news.slice(0, 10));
            return;
        }
        // Chiamata endopoint filtro notizie
        const fetchFilteredNews = async () => {
            let url = `http://localhost:3000/scraping/news?page=${currentPage}`;

            // Aggiorna la URL con i filtri correnti
            if (applyFilters.category) {
                url += `&t=${applyFilters.category}`;
            }
            if (applyFilters.initialDate && applyFilters.finalDate) {
                url += `&dateI=${applyFilters.initialDate}&dateF=${applyFilters.finalDate}&`;
            }

            try {
                const news = await axios.get(url);
                setFilteredNews(news.data.news);
            } catch (error) {
                if (
                    error.response &&
                    (error.response.status === 404 ||
                        error.response.status === 400)
                ) {
                    setErrorPage(error.response.data.message);
                }
            }
        };

        fetchFilteredNews();
    }, [applyFilters, news, currentPage]);

    return (
        <>
            <Navbar></Navbar>
            <div className="flex min-h-screen bg-gray-900 text-gray-300">
                <div className="sticky top-0 h-screen">
                    <Filter onApplyFilters={handleApplyFilters} />
                </div>

                <div className="flex-1 p-6">
                    {/* Container per le card */}
                    {loading ? (
                        <h4>Caricamento delle notizie...</h4>
                    ) : errorPage ? (
                        <h4>{errorPage}</h4>
                    ) : news.length > 0 ? (
                        <NewsList news={filteredNews}></NewsList>
                    ) : (
                        <h4>{error}</h4>
                    )}
                </div>
            </div>

            {news.length > 0 && !errorPage && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
};

export default News;
