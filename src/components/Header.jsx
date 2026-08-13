import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    navigate(`/?search=${encodeURIComponent(search)}`);
  }

  return (
    <header>
      <div>
        <Link to="/">
          <h2>BookFinder</h2>
        </Link>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for books..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button type="submit">
            Search
          </button>
        </form>

        <Link to="/favorites">
          Favorites
        </Link>
      </div>

      <nav>
        {categories.map((category) => (
          <Link
            key={category}
            to={`/category/${category}`}
          >
            {category}{" "}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;