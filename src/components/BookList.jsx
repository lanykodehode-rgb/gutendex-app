import BookCard from "./BookCard.jsx";

function BookList({ books }) {
  return (
    <div className="bookGrid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
        />
      ))}
    </div>
  );
}

export default BookList;