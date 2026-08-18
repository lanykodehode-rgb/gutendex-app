import { Link } from "react-router-dom";

function BookCard({ book }) {
  const cover = book.formats["image/jpeg"];
  const author = book.authors.length > 0 ? book.authors[0].name : "Ukjent forfatter";

  return (
    <div className="bookCard">
      {cover && <img src={cover} alt={book.title} />}

      <div>
        <h3>{book.title}</h3>
        <p>{author}</p>
        <p>Nedlastinger: {book.download_count}</p>

        <Link to={`/book/${book.id}`} className="button">
          Se detaljer
        </Link>
      </div>
    </div>
  );
}

export default BookCard;