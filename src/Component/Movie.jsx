import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Movie = () => {
  const navigate=useNavigate();
  const[favorites,setFavorites]=useState([]);
  const[addFav,setAddFav]=useState([]);
  const [details, setDetails] = useState([]);
  const[search,setSearch]=useState("")
  const [filter,setFilter]=useState([])
  useEffect(() => {
    // Fetch both pages and merge results
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=0622da2897cdf0945e7b0d44ca79982c&page=1")
      .then(res => res.json())
      .then((data) => {
        setDetails(data.results);
        setFilter(data.results);
      })
      .catch(error => console.error(error));
  }, []);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        setFavorites([]);
      }
    }
  }, []);

const handleSearch = (e) => {
  e.preventDefault();
  search(search);
};

const searchMovie = (searchTerm) => {
  const filteredData = details.filter((item) =>
    item.original_title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilter(filteredData);
};
const toggleFavorite = (movie) => {
  let updatedFavorites;
  if (favorites.includes(movie.id)) {
    updatedFavorites = favorites.filter(id => id !== movie.id);
    setFavorites(updatedFavorites);
    
    toast.success("Removed from favorites");
  } else {
    updatedFavorites = [...favorites, movie.id];
    setFavorites(updatedFavorites);
    toast.success("Added to favorites");
  }
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  console.log(movie);
}

return (
    <>
    <header>
    <nav className="navbar bg-dark">
  <div className="container-fluid">
  <div className="d-flex justify-content-center w-100" role="search">
  <div className="d-flex" style={{ width: "50%" }}>
    <input
      className="form-control me-2 input"
      type="search"
      placeholder="Search"
      aria-label="Search"
      onChange={(e) => setSearch(e.target.value)}
      value={search}
    />
    <button className="btn btn-outline-success" onClick={()=>searchMovie(search)}>Search</button>
  </div>
  <button  className='btn btn-outline-danger' onClick={()=>navigate("/favorites")}>
    <Heart size={29}/>    Favorites</button>
</div>

  </div>
</nav>
    </header>
    <div className="container mt-4">
      <div className="row">
        {filter.map((item,index) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4"  key={`${item.id}-${index}`}>
            <div className="card h-100 w-120" >
              <img 
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} 
                className="card-img-top" 
                alt={item.title || "Movie Poster"} 
              />
              <div className="card-body">
                <h5 className="card-title text-primary">{item.original_title}</h5>
                <h5 className='card-title text-success'>{item.release_date}</h5>
               <i
  className={`bi ${favorites.includes(item.id) ? 'bi-heart-fill text-danger' : 'bi-heart'}`}
  onClick={(e) => { 
    e.stopPropagation(); // prevent card click if needed
    toggleFavorite(item); 
  }}
  style={{ cursor: 'pointer', fontSize: '1.5rem' }}
></i>


              </div>
            </div><div></div>
          </div>
        ))}
      </div>
    </div>
   <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top bg-dark text-light">
  <div className="col-md-4 d-flex align-items-center">
    <a href="/" className="mb-3 me-2 mb-md-0 text-light text-decoration-none lh-1" aria-label="Bootstrap">
      <svg className="bi" width="30" height="24" aria-hidden="true">
        <use xlinkHref="#bootstrap"></use>
      </svg>
    </a>
    <span className="mb-3 mb-md-0">&copy; 2025 VK, Inc</span>
  </div>

  <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
    <li className="ms-3">
      <a className="text-light" href="#" aria-label="Instagram">
        <i className="bi bi-instagram" style={{ fontSize: '1.2rem' }}></i>
      </a>
    </li>
    <li className="ms-3">
      <a className="text-light" href="#" aria-label="Facebook">
        <i className="bi bi-facebook" style={{ fontSize: '1.2rem' }}></i>
      </a>
    </li>
  </ul>
</footer>

    </>
  );
};

export default Movie;
