import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookDetailsPage() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://gutendex.com/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2>Loading book...</h2>;
  }

  if (!book) {
    return <h2>Book not found.</h2>;
  }

  const cover = book.formats?.["image/jpeg"];

  const author =
    book.authors?.[0]?.name || "Unknown author";

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
          <strong>Downloads:</strong> {book.download_count}
        </p>

        <p>
          <strong>Languages:</strong>{" "}
          {book.languages?.join(", ")}
        </p>

        <p>
          <strong>Subjects:</strong>
        </p>

        <ul>
          {book.subjects?.slice(0, 5).map((subject) => (
            <li key={subject}>{subject}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BookDetailsPage;