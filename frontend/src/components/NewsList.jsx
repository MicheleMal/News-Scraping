import React from "react";
import NewsItem from "./NewsItem";

const NewsList = ({ news }) => {
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl px-4">
                {news.map((newsItem) => (
                    <NewsItem
                        key={newsItem._id}
                        // key={index}
                        title={newsItem.title}
                        summary={newsItem.summary}
                        date={newsItem.date}
                        link={newsItem.link}
                        image={newsItem.image}
                        category={newsItem.id_category.type}
                    />
                ))}
            </div>
        </div>
    );
};

export default NewsList;
