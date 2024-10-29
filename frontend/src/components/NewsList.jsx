import React from "react";
import NewsItem from "./NewsItem";

const NewsList = ({ news }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((newsItem) => (                
                <NewsItem
                    key={newsItem._id}
                    // key={index}
                    title={newsItem.title}
                    summary={newsItem.summary}
                    date={newsItem.date}
                    link={newsItem.link}
                    category={newsItem.id_category.type}
                />
            ))}
        </div>
    );
};

export default NewsList;
