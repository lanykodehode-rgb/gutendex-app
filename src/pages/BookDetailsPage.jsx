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
        setError("");

        const response = await fetch(
          `https://gutendex.com/books/${id}`
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

    const alreadyExists = favorites.some(
      (favorite) => favorite.id === book.id
    );

    if (alreadyExists) {
      alert("This book is already in favorites.");
      return;
    }

    const updatedFavorites = [...favorites, book];

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

    alert("Book added to favorites!");
  }

  if (loading) {
    return <h2>Loading book...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!book) {
    return <h2>Book not found.</h2>;
  }

  const cover = book.formats?.["image/jpeg"];

  const author =
    book.authors?.[0]?.name || "Unknown author";

  const category =
    book.subjects?.[0] || "Unknown";

  const language =
    book.languages?.join(", ") || "Unknown";

  const digitalBook =
    book.formats?.["text/html"] ||
    book.formats?.["application/epub+zip"] ||
    book.formats?.["text/plain; charset=utf-8"];

  return (
    <div className="bookDetails">
      {cover && (
        <img
          src={cover}
          alt={book.title}
          className="detailsCover"
        />
      )}

      <div>
        <h1>{book.title}</h1>

        <p>
          <strong>Author:</strong> {author}
        </p>

        <p>
          <strong>Downloads:</strong>{" "}
          {book.download_count}
        </p>

        <p>
          <strong>Category:</strong> {category}
        </p>

        <p>
          <strong>Language:</strong> {language}
        </p>

        {digitalBook && (
          <p>
            <a
              href={digitalBook}
              target="_blank"
              rel="noreferrer"
            >
              Read digital book
            </a>
          </p>
        )}

        <button onClick={addToFavorites}>
          Add to Favorites
        </button>
      </div>
    </div>
  );
}

export default BookDetailsPage;