import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {

  const categories = ["Tutte le categorie", "Cronaca", "Politica", "Economia", "Viaggi"]

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-64 mt-6 ml-6 ">
      {/* Filtro per Categoria */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Filtra per Categoria</h3>
        <select
          className="w-full bg-gray-700 text-gray-300 p-2 rounded-lg"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro per Data */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Filtra per Data</h3>
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="start" className="block text-gray-400">Data Inizio</label>
            <input
              type="date"
              id="start"
              name="start"
              className="w-full bg-gray-700 text-gray-300 p-2 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="end" className="block text-gray-400">Data Fine</label>
            <input
              type="date"
              id="end"
              name="end"
              className="w-full bg-gray-700 text-gray-300 p-2 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
