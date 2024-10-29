import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange}) => {
    const pageNumbers = [];

    // Calcola i numeri di pagina
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex items-center justify-center space-x-2 mt-6">
            {/* Pulsante "Prev" */}
            <button
                className={`px-3 py-1 rounded ${
                    currentPage === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-700"
                }`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {/* Numeri di pagina */}
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    className={`px-3 py-1 rounded ${
                        currentPage === page
                            ? "bg-blue-700 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                    }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {/* Pulsante "Next" */}
            <button
                className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-700"
                }`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
