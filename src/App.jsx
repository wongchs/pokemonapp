import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonDetails from './PokemonDetails';
import './style.css';

const Pokedex = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  const [pokemonNotFound, setPokemonNotFound] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const { results } = response.data;
        setPokemonList(results);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchPokemonList();
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = () => {
    setShowDetails(true);
  };

  const handleGoBack = () => {
    setShowDetails(false);
  };

  const getCurrentPokemon = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      const { name, id, sprites, types, stats } = response.data;
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      const elementTypes = types.map((type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1));
      const baseStats = stats.reduce((acc, stat) => {
        acc[stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)] = stat.base_stat;
        return acc;
      }, {});
      const pokemonData = {
        name: capitalizedName,
        sprite: sprites.front_default,
        types: elementTypes,
        baseStats,
        pokedexNumber: id
      };
      setCurrentPokemonIndex(id - 1);
      setSearchResult(pokemonData);
      setPokemonNotFound(false);
      setIsSearchPerformed(true);
    } catch (error) {
      console.log('Error:', error);
      setSearchResult(null);
      setPokemonNotFound(true);
      setIsSearchPerformed(true);
    }
  };

  const handleRandomPokemon = () => {
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    setSearchTerm(pokemonList[randomIndex].name);
    setCurrentPokemonIndex(randomIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentPokemonIndex + 1) % pokemonList.length;
    setSearchTerm(pokemonList[nextIndex].name);
    setCurrentPokemonIndex(nextIndex);
  };

  const handlePrevious = () => {
    const previousIndex = (currentPokemonIndex - 1 + pokemonList.length) % pokemonList.length;
    setSearchTerm(pokemonList[previousIndex].name);
    setCurrentPokemonIndex(previousIndex);
  };

  useEffect(() => {
    if (isSearchPerformed) {
      getCurrentPokemon();
    }
  }, [currentPokemonIndex, isSearchPerformed]);

  return (
    <div className="pokedex">
      <h1>Pokedex</h1>
      <div className="search-container">
        {!showDetails && (
          <>
            <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search Pokemon" />
            <button onClick={getCurrentPokemon}>Search</button>
            <button onClick={handleRandomPokemon}>Random</button>
          </>
        )}
        {showDetails && (
          <button onClick={handleGoBack}>Back</button>
        )}
      </div>
      {!showDetails && searchResult && (
        <div className="pokemon-card">
          <h2>{searchResult.name}</h2>
          <img src={searchResult.sprite} alt={searchResult.name} />
          <div>
            <strong>Type(s):</strong>
            <ul>
              {searchResult.types.map((type) => (
                <li key={type}>{type}</li>
              ))}
            </ul>
          </div>
          <button onClick={handleViewDetails}>View Details</button>
        </div>
      )}
      {pokemonNotFound && isSearchPerformed && <p className='error-message'>Pokemon Not Found</p>}
      {showDetails && (
        <PokemonDetails
          {...searchResult}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
};

export default Pokedex;
