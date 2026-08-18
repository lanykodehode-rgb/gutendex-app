import { Link } from "react-router-dom";

const categories = [
  "Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Fantasy",
  "Morality",
  "Society",
  "Power",
  "Justice",
  "Adventure",
  "Tragedy",
  "War",
  "Philosophy",
];

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">Gutendex Books</Link>

      <nav className="nav">
        {categories.map((category) => (
          <Link key={category} to={`/category/${category}`}>
            {category}
          </Link>
        ))}

        <Link to="/favorites" className="favoriteLink">
          Favoritter
        </Link>
      </nav>
    </header>
  );
}

export default Header;