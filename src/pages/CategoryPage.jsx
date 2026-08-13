import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookList from "../components/BookList.jsx";

function CategoryPage() {
  const { category } = useParams();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://gutendex.com/books/?topic=${encodeURIComponent(category)}`
        );

        if (!response.ok) {
          throw new Error("Could not fetch books");
        }

        const data = await response.json();
        setBooks(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [category]);

  if (loading) {
    return <h2>Loading books...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>{category}</h1>

      <BookList books={books} />
    </div>
  );
}

export default CategoryPage;