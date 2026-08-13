import { useState } from "react";
import BookList from "../components/BookList.jsx";

function FavoritesPage() {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  function clearFavorites() {
    localStorage.removeItem("favorites");
    setFavorites([]);
  }

  return (
    <div>
      <h1>Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorite books yet.</p>
      ) : (
        <>
          <BookList books={favorites} />

          <button onClick={clearFavorites}>
            Clear Favorites
          </button>
        </>
      )}
    </div>
  );
}

export default FavoritesPage;