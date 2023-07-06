import { useState, useEffect } from 'react';

import './Card.css';

function Card({ pokemon }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [pokemonColour, setPokemonColour] = useState('white');

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        console.log('Error:', error);
      }
    }

    async function fetchPokemonColor() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`);
        const data = await response.json();
        const color = data.color.name;
        setPokemonColour(color);
      } catch (error) {
        console.log('Error:', error);
      }
    }

    fetchPokemonDetails();
    fetchPokemonColor();
  }, []);

  if (!pokemonDetails) {
    return;
  }

  const { name, types, abilities, stats } = pokemonDetails;

  return (
    <div className="card" style={{ backgroundColor: pokemonColour.toString() }}>
      <h2>{name.charAt(0).toUpperCase().concat(name.slice(1))}</h2>
      <strong>Type:</strong> {types.map((type) => type.type.name).join(', ')}
      <strong>Abilities:</strong> {abilities.map((ability) => ability.ability.name).join(', ')}
      <strong>Stats:</strong> {stats.map((stat) => stat.stat.name).join(', ')}
      <button>
        <a href={pokemon.url}>More info</a>
      </button>
    </div>
  );
}

export default Card;
