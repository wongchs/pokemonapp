const SearchBar = ({
  searchTerm,
  handleInputChange,
  getCurrentPokemon,
  handleRandomPokemon,
  showDetails,
  handleGoBack,
}) => {
  return (
    <div className="search-container">
      {!showDetails ? (
        <>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search Pokemon"
          />
          <button onClick={getCurrentPokemon}>Search</button>
          <button onClick={handleRandomPokemon}>Random</button>
        </>
      ) : (
        <button onClick={handleGoBack}>Back</button>
      )}
    </div>
  );
};

export default SearchBar;
