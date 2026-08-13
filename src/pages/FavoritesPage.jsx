import { useState } from "react";
import BookList from "../components/BookList";

function FavoritesPage() {
  const [favorites, setFavorites] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("favorites")) || []
    );
  });

  function clearFavorites() {
    localStorage.removeItem("favorites");
    setFavorites([]);
  }

  return (
    <section>
      <div className="favoritesHeader">
        <h1>Favorites</h1>

        {favorites.length > 0 && (
          <button onClick={clearFavorites}>
            Clear favorites
          </button>
        )}
      </div>

      <BookList books={favorites} />
    </section>
  );
}

export default FavoritesPage;