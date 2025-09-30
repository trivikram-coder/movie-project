import React, { useEffect, useState } from 'react';

const Favorites = () => {
  // Hardcoded favorite movies to demonstrate the UI
  const [favoriteMovies,setFavoriteMovies]=useState([])
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (!stored) {
      setFavoriteMovies([]);
      return;
    }
    const favoriteIds = JSON.parse(stored);
    if (!Array.isArray(favoriteIds) || favoriteIds.length === 0) {
      setFavoriteMovies([]);
      return;
    }
    Promise.all(
      favoriteIds.map(id =>
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0622da2897cdf0945e7b0d44ca79982c`)
          .then(res => res.json())
      )
    ).then(movies => {
      setFavoriteMovies(movies);
    }).catch(() => setFavoriteMovies([]));
  }, []);
  function removeFav(movie) {
    // Remove the movie from the current favoriteMovies state
    const updatedMovies = favoriteMovies.filter(m => m.id !== movie.id);
    setFavoriteMovies(updatedMovies);
    // Update localStorage to remove the movie id
    const stored = localStorage.getItem("favorites");
    if (stored) {
      let favoriteIds = JSON.parse(stored);
      favoriteIds = favoriteIds.filter(id => id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(favoriteIds));
    }
  }
  return (
    <div className="bg-gradient" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)", padding: "40px 0" }}>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />
      <div className="container" style={{ maxWidth: 600 }}>
        <h1 className="text-center mb-5" style={{ color: "#0d6efd", fontWeight: 700, letterSpacing: 1, fontSize: "2.8rem" }}>
          <i className="bi bi-heart-fill me-2" style={{ color: "#e63946" }}></i>
          My Favorites
        </h1>

        {favoriteMovies.length === 0 ? (
          <div className="card shadow-sm p-4 rounded-4 border-0" style={{ background: "#fff" }}>
            <p className="text-center text-muted fs-5">
              <i className="bi bi-emoji-frown me-2"></i>
              You haven't added any favorite movies yet.
            </p>
          </div>
        ) : (
          <div className="card shadow-sm p-4 rounded-4 border-0" style={{ background: "#fff" }}>
            <ul className="list-group list-group-flush rounded-3">
              {favoriteMovies.map(movie => (
                <li
                  key={movie.id}
                  className="list-group-item d-flex justify-content-between align-items-center py-3 bg-light"
                  style={{
                    borderRadius: 12,
                    marginBottom: 12,
                    background: "#f8fafc",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
                  }}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                      style={{
                        width: 40,
                        height: 56,
                        objectFit: "cover",
                        borderRadius: 6,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        marginRight: 16
                      }}
                    />
                    <span className="fw-semibold text-primary" style={{ fontSize: "1.1rem" }}>
                      {movie.title}
                    </span>
                  </div>
                  <button
                    className="btn btn-link p-0 text-decoration-none"
                    aria-label="Remove from favorites"
                    onClick={() => removeFav(movie)}
                    style={{ marginLeft: 12 }}
                  >
                    <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: '1.7rem', transition: "transform 0.1s" }}></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
