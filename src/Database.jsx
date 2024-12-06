import React, { useState } from "react";

/**
 *
 * Funktionell komponent med hooks
 * - movies: innehåller ett antal filmer
 * - setMovie: uppdaterar listan av filmer.
 *
 * - newMovie: innehåller ett objekt med tomma strängar.
 *  Används för att lägga in nya filmer.
 * - setNewMovie: uppdaterar nya filmer.
 *
 * - editMovie: index för den film som ska redigeras, är initialt null.
 * - setEditMovie: hanterar och uppdaterar av redigerad film.
 */
function Database() {
  const [movies, setMovie] = useState([
    { title: "Hero", year: "2012", rating: "201" },
    { title: "Hello", year: "1956", rating: "109" },
    { title: "Good Bye", year: "2021", rating: "902" },
    { title: "Hello Sir!", year: "1987", rating: "89" },
    { title: "Mr Charles", year: "2011", rating: "321" },
    { title: "Combat One", year: "2023", rating: "78" },
  ]);

  const [newMovie, setNewMovie] = useState({
    title: "",
    year: new Date().getFullYear(),
    rating: "",
  });

  const [editMovie, setEditMovie] = useState(null);

  /**
   * Funktion som hanterar inputfälten.
   * Värden kommer från inputfält.
   * - setNewMovie: kopierar nuvarande objekt samt uppdaterar med nya.
   */
  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewMovie((prev) => ({ ...prev, [name]: value }));
  }

  /**
   * Funktion som lägger till eller redigerar film i listan.
   * 
   * - Om: något av fälten är tomma visas ett meddelande för användaren.
   * - Om: editMovie inte är null uppdateras vald film i listan. 
   * - Annars: läggs en ny film till i listan.
   * Efter att film lagts till eller uppdaterats töms listan.
   */
  function addMovie() {
    if (!newMovie.title || !newMovie.year || !newMovie.rating) {
      alert("Fill out form");
      return;
    }
    if (editMovie !== null) {
      const updateMovies = [...movies];
      updateMovies[editMovie] = newMovie;
      setMovie(updateMovies);
      setEditMovie(null);
    } else {
      setMovie((prev) => [...prev, newMovie]);
      setNewMovie({ title: "", year: new Date().getFullYear(), rating: "" });
    }
  }

  /**
   * Rensar samtliga input-fält
   */
  function clearForm() {
    setNewMovie({ title: "", year: new Date().getFullYear(), rating: "" });
  }

  /**
   *
   * Funktionen hanterar borttagning av film.
   * - Filter: filtrerar bort den film vars index matchar valt index.
   */
  function deleteMovie(index) {
    setMovie((prev) => prev.filter((_, i) => i !== index));
  }

  /**
   * Funktionen hanterar redigering av filmer.
   * - setNewMovie: uppdaterar newMovie med information om vilken film som ska redigeras.
   *  - movies[index]: hämtar filmobjektet från listan med index.
   * - setEditMovie: sparar indexet för den film som redigeras.
   */
  function editMovies(index) {
    setNewMovie(movies[index]);
    setEditMovie(index);
  }

  return (
    <div className="database-container">
      <h1>Movie Database</h1>

      <div>
        <input
          name="title"
          type="text"
          value={newMovie.title}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <input
          name="year"
          type="number"
          value={newMovie.year}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <input
          name="rating"
          type="number"
          value={newMovie.rating}
          onChange={handleInputChange}
        />
      </div>
      <button className="add-button" onClick={addMovie}>
        {editMovie !== null ? "Save" : "Add"}
      </button>
      <button className="clear-button" onClick={clearForm}>
        Clear
      </button>

      <ol>
        {movies.map((movie, index) => (
          <li key={index}>
            <span className="text">
              {movie.title} ({movie.year}) Rating: {movie.rating}
            </span>

            <button className="edit-button" onClick={() => editMovies(index)}>
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => deleteMovie(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Database;
