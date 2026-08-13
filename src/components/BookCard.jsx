import { Link } from "react-router-dom";

function BookCard({ book }) {
  const addToFavorites = () => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadyExists = favorites.some(
      (favorite) => favorite.id === book.id
    );

    if (!alreadyExists) {
      favorites.push(book);

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      alert("Book added to favorites!");
    } else {
      alert("This book is already in favorites.");
    }
  };

  const cover =
    book.formats?.["image/jpeg"];

  const author =
    book.authors?.[0]?.name || "Unknown author";

  return (
    <div className="bookCard">
      <Link to={`/book/${book.id}`}>
        {cover && (
          <img
            src={cover}
            alt={book.title}
            className="bookCover"
          />
        )}

        <h2>{book.title}</h2>
      </Link>

      <p>{author}</p>

      <p>
        Downloads: {book.download_count}
      </p>

      <button onClick={addToFavorites}>
        Add to Favorites
      </button>
    </div>
  );
}

export default BookCard;