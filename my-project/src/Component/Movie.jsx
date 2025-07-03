import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Movie = () => {
  
  const [details, setDetails] = useState([]);
  const[search,setSearch]=useState("")
  const [filter,setFilter]=useState([])
  useEffect(() => {
    // Fetch both pages and merge results
    Promise.all([
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=0622da2897cdf0945e7b0d44ca79982c&page=1").then(res => res.json()),
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=0622da2897cdf0945e7b0d44ca79982c&page=2").then(res => res.json()),
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=0622da2897cdf0945e7b0d44ca79982c&page=3").then(res => res.json())
    ])
      .then(([data1, data2,data3]) => {
        const mergedResults = [...data1.results, ...data2.results,...data3.results];
        setDetails(mergedResults);
        setFilter(mergedResults);
      })
      .catch(error => console.error(error));
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

return (
    <>
    <header>
    <nav className="navbar bg-body-light">
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
</div>

  </div>
</nav>
    </header>
    <div className="container mt-4">
      <div className="row">
        {filter.map(item => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
            <div className="card h-100 w-120" onClick={()=>page(item)}>
              <img 
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} 
                className="card-img-top" 
                alt={item.title || "Movie Poster"} 
              />
              <div className="card-body">
                <h5 className="card-title text-primary">{item.original_title}</h5>
                <h5 className='card-title text-success'>{item.release_date}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div class="col-md-4 d-flex align-items-center">
      <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1" aria-label="Bootstrap">
        <svg class="bi" width="30" height="24" aria-hidden="true"><use xlink:href="#bootstrap"></use></svg>
      </a>
      <span class="mb-3 mb-md-0 text-body-secondary">© 2025 VK, Inc</span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3"><a class="text-body-secondary" href="#" aria-label="Instagram"><svg className="bi" width="24" height="24" aria-hidden="true"><use xlink:href="#instagram"></use></svg></a></li>
      <li className="ms-3"><a class="text-body-secondary" href="#" aria-label="Facebook"><svg className="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></a></li>
    </ul>
  </footer>
    </>
  );
};

export default Movie;
