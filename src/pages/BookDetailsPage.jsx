import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookDetailsPage() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://gutendex.com/books/${id}/`
        );

        if (!response.ok) {
          throw new Error("Could not fetch book");
        }

        const data = await response.json();
        setBook(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  function addToFavorites() {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadyFavorite = favorites.some(
      (favorite) => favorite.id === book.id
    );

    if (!alreadyFavorite) {
      favorites.push(book);

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      alert("Book added to favorites!");
    } else {
      alert("This book is already in favorites.");
    }
  }

  if (loading) {
    return <h2>Loading book...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!book) {
    return <h2>Book not found</h2>;
  }

  const cover = book.formats["image/jpeg"];

  const author =
    book.authors.length > 0
      ? book.authors[0].name
      : "Unknown author";

  const category =
    book.subjects.length > 0
      ? book.subjects[0]
      : "Unknown";

  const language =
    book.languages.length > 0
      ? book.languages.join(", ")
      : "Unknown";

  const bookLink =
    book.formats["text/html"] ||
    book.formats["application/epub+zip"] ||
    book.formats["text/plain; charset=utf-8"];

  return (
    <div>
      <h1>{book.title}</h1>

      {cover && (
        <img
          src={cover}
          alt={book.title}
          width="250"
        />
      )}

      <h3>Author</h3>
      <p>{author}</p>

      <h3>Downloads</h3>
      <p>{book.download_count}</p>

      <h3>Category</h3>
      <p>{category}</p>

      <h3>Language</h3>
      <p>{language}</p>

      {bookLink && (
        <p>
          <a
            href={bookLink}
            target="_blank"
            rel="noreferrer"
          >
            Read book
          </a>
        </p>
      )}

      <button onClick={addToFavorites}>
        Add to Favorites
      </button>
    </div>
  );
}

export default BookDetailsPage;