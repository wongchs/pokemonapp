const ErrorNotification = ({ pokemonNotFound, isSearchPerformed }) => {
  if (pokemonNotFound && isSearchPerformed) {
    return <p className="error-message">Pokemon Not Found</p>;
  }
  return null;
};

export default ErrorNotification;
