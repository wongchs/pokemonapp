import React from 'react';

const PokemonCard = ({ searchResult, handleViewDetails }) => {
    return (
        <div className="pokemon-card">
            <h2>{searchResult.name}</h2>
            <img src={searchResult.sprite} alt={searchResult.name} />
            <div>
                <strong>Type(s):</strong>
                <div className="type-boxes">
                    {searchResult.types.map((type) => (
                        <div key={type} className="type-box">
                            {type}
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={handleViewDetails}>View Details</button>
        </div>
    );
};

export default PokemonCard;
