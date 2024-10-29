import React from "react";

const NewsItem = ({ id, title, summary, date, link, category }) => {
    return (
        <>
            <div
                key={id}
                className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition-transform hover:-translate-y-2 hover:shadow-2xl"
            >
                {/* Titolo della notizia */}
                <h3 className="text-xl font-semibold mb-2 text-white">
                    {title}
                </h3>

                {/* Data */}
                <p className="text-gray-400 text-sm mb-4">{new Date(date).toLocaleString()}</p>

                {/* Descrizione */}
                <p className="text-gray-400 mb-4">{summary}</p>

                {/* Categoria notizia */}
                <p className="text-gray-400 mb-4">{category}</p>

                {/* Link alla notizia */}
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                >
                    Leggi di più
                </a>
            </div>
        </>
    );
};

export default NewsItem;
