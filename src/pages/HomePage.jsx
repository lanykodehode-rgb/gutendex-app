import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookList from "../components/BookList.jsx";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");

  async function fetchBooks(url) {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Could not fetch books");
      }

      const data = await response.json();

      setBooks(data.results);
      setNext(data.next);
      setPrevious(data.previous);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let url = "https://gutendex.com/books/";

    if (search) {
      url += `?search=${encodeURIComponent(search)}`;
    }

    fetchBooks(url);
  }, [search]);

  if (loading) {
    return <h2>Loading books...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>
        {search
          ? `Search results for "${search}"`
          : "Popular Books"}
      </h1>

      <BookList books={books} />

      <div>
        <button
          disabled={!previous}
          onClick={() => fetchBooks(previous)}
        >
          Previous
        </button>

        <button
          disabled={!next}
          onClick={() => fetchBooks(next)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HomePage;