import { useState } from "react";
import Filter from "../Filter/Filter";
import Navbar from "../Navbar/Navbar";
import useNews from "../hooks/useNews";
import NewsList from "./NewsList";

const News = () => {
    const allNews = useNews();

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen bg-gray-900 text-gray-300">
                <div className="sticky top-0 h-screen">
                    {/* Imposta il filtro come sticky */}
                    <Filter />
                </div>

                <div className="flex-1 p-6">
                    <NewsList news={allNews}></NewsList>
                </div>
            </div>
        </>
    );
};

export default News;
