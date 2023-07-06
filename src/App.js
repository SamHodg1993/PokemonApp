import React, { useState, useEffect } from 'react';
import Card from './Card';

import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();
        setPokemonData(data.results);
      } catch (error) {
        console.log('Error:', error);
      }
    }

    fetchPokemonData();
  }, []);

  useEffect(() => {
    if (!pokemonData.length) return;
    setSearchResults(pokemonData.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [pokemonData, searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="app">
      <h1>Pokémon List</h1>
      <div className="search-container">
        <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleChange} className="search-input" />
      </div>
      <div className="main-content-container">
        {searchResults.map((pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <div>
        <h2 style={{ marginTop: '3rem' }}>Notes for reviewer</h2>
        <ul>
          <li>I know this looks BAD! Thankfully, I'm not a designer. I'm hoping that I set the background color using the API is some form of redemption</li>
          <li>I was adamant to stay within the time limit and wanted to focus more on the functionality than styling as this is where I'm strongest</li>
          <li>The more info button would obviously point towards the wiki page for the relevent pokemon</li>
          <li>Next steps would include filter options, getting design input, linking the wiki properly</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
