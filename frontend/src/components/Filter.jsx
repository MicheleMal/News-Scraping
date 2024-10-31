import React, { useEffect, useState } from "react";
import axios from "axios";

const Filter = ({ onApplyFilters }) => {
    const [categories, setCategories] = useState([]);

    const [filters, setFilters] = useState({
        category: "",
        initialDate: "",
        finalDate: "",
    });

    const fetchCategories = async () => {
        try {
            const allCategory = await axios.get(
                "http://localhost:3000/categories-news"
            );

            setCategories(allCategory.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Gestisce i cambiamenti del select e degli input
    const handleChange = (e) => {
        const name = e.target.name;
        if (name === "category") {
            setFilters({
                ...filters,
                category: e.target.value,
            });
        } else if (name === "start") {
            setFilters({
                ...filters,
                initialDate: e.target.value,
            });
        } else if (name === "end") {
            setFilters({
                ...filters,
                finalDate: e.target.value,
            });
        }
    };

    const handleApplyFilters = () => {
        onApplyFilters(filters);
    };

    // Reset dei vari campi filtri
    const handleResetFilters = () => {
        const resetFilters = {
            category: "",
            initialDate: "",
            finalDate: "",
        };
        setFilters(resetFilters);

        onApplyFilters(resetFilters);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-64 mt-6 ml-6">
            {/* Filtro per Categoria */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                    Filtra per Categoria
                </h3>
                <select
                    className="w-full bg-gray-700 text-gray-300 p-2 rounded-lg"
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                >
                    <option key="0" value="">
                        Tutte le categorie
                    </option>
                    {categories.map((category) => (
                        <option key={category._id} value={category.type}>
                            {category.type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Filtro per Data */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                    Filtra per Data
                </h3>
                <div className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor="start" className="block text-gray-400">
                            Data Inizio
                        </label>
                        <input
                            type="date"
                            id="start"
                            name="start"
                            className="w-full bg-gray-700 text-gray-300 p-2 rounded-lg"
                            value={filters.initialDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="end" className="block text-gray-400">
                            Data Fine
                        </label>
                        <input
                            type="date"
                            id="end"
                            name="end"
                            className="w-full bg-gray-700 text-gray-300 p-2 rounded-lg"
                            value={filters.finalDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* Button per applicare i filtri */}
            <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                onClick={handleApplyFilters}
            >
                Applica Filtri
            </button>
            {/* Button per resettare i filtri */}
            <button
                className="w-full bg-red-600 mt-5 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                onClick={handleResetFilters}
            >
                Reset Filtri
            </button>
        </div>
    );
};

export default Filter;
