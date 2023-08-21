import React from 'react';

const PokemonDetails = ({ name, pokedexNumber, types, sprite, baseStats, onNext, onPrevious }) => (
  <div className="pokemon-details">
    <div className="pokemon-details-header">
      <h2>{name} - <span className="pokedex-number">#{pokedexNumber}</span></h2>
    </div>
    <div className="pokemon-details-content">
      <div className="sprite-container">
        <img src={sprite} alt={name} className="pokemon-sprite" />
      </div>
      <div className="info-container">
        <div className="type-container">
          <strong>Type(s):</strong>
          <div className="type-boxes">
            {types.map((type) => (
              <div key={type} className="type-box">
                {type}
              </div>
            ))}
          </div>
        </div>
        <div className="base-stats-container">
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
      </div>
    </div>
    <div className="navigation-buttons">
      <button onClick={onPrevious} className="navButton">Previous</button>
      <button onClick={onNext} className="navButton">Next</button>
    </div>
  </div>
);

export default PokemonDetails;
