import React from "react";
import NewsItem from "./NewsItem";

const NewsList = ({ news }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((news, index) => (
                <NewsItem
                    key={index}
                    title={news.title}
                    summary={news.content}
                    date={news.date}
                    link={news.link}
                />
            ))}
        </div>
    );
};

export default NewsList;
