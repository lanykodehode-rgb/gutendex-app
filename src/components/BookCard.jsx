import { Link } from "react-router-dom";

function BookCard({ book }) {
  const cover = book.formats["image/jpeg"];

  const author =
    book.authors.length > 0
      ? book.authors[0].name
      : "Unknown author";

  return (
    <div>
      <Link to={`/book/${book.id}`}>
        {cover && (
          <img
            src={cover}
            alt={book.title}
            width="150"
          />
        )}

        <h3>{book.title}</h3>
      </Link>

      <p>{author}</p>

      <p>
        Downloads: {book.download_count}
      </p>
    </div>
  );
}

export default BookCard;