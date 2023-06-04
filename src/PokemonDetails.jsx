import React from 'react';

const PokemonDetails = ({ name, pokedexNumber, types, sprite, baseStats, onNext, onPrevious }) => (
  <div className="pokemon-details">
    <h2>{name} - <span className="pokedex-number">#{pokedexNumber}</span></h2>
    <img src={sprite} alt={name} />
    <div>
      <strong>Type(s):</strong>
      <ul>
        {types.map((type) => (
          <li key={type}>{type}</li>
        ))}
      </ul>
    </div>
    <div>
      <strong>Base Stats:</strong>
      <table>
        <thead>
          <tr>
            <th>Stat</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(baseStats).map(([stat, value]) => (
            <tr key={stat}>
              <td>{stat}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>
      <button onClick={onPrevious} className='navButton'>Previous</button>
      <button onClick={onNext} className='navButton'>Next</button>
    </div>
  </div>
);

export default PokemonDetails;
