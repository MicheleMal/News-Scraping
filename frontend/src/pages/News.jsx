import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import useNews from "../hooks/useNews";
import Navbar from "../components/Navbar";
import NewsList from "../components/NewsList";

const News = () => {
    const allNews = useNews();

    const [applyFilters, setApplyFilters] = useState({
        category: "",
        initialDate: "",
        finalDate: "",
    });

    const [filteredNews, setFilteredNews] = useState(allNews)
 
    const handleApplyFilters = (filters) => {
        setApplyFilters(filters);
    };

    useEffect(()=>{      
        // Sistema filtro notizie
        const filter = allNews.filter((newsItem)=>{
            const date = new Date(newsItem.date)
            // Filtro per categoria
            if(applyFilters.category ){
                if(newsItem.category === applyFilters.category){
                    return true
                }
                // Filtro per date
            }else if(applyFilters.initialDate && applyFilters.finalDate){
                const initialDate = new Date(applyFilters.initialDate)
                const finalDate = new Date(applyFilters.finalDate)
                if(date>=initialDate && date<=finalDate){
                    return true
                }
            }
            
            else{
                return true
            }
        })

        
        setFilteredNews(filter)
    }, [applyFilters, allNews])
    
    return (
        <>
            <Navbar></Navbar>
            <div className="flex min-h-screen bg-gray-900 text-gray-300">
                <div className="sticky top-0 h-screen">
                    {/* Imposta il filtro come sticky */}
                    <Filter onApplyFilters={handleApplyFilters} />
                </div>

                <div className="flex-1 p-6">
                    <NewsList news={filteredNews}></NewsList>
                </div>
            </div>
        </>
    );
};

export default News;
