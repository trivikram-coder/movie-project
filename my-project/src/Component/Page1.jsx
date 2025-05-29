import React from 'react'
import {  useLocation } from 'react-router-dom'
const Page1 = () => {
 const location=useLocation();
    const {data}=location.state||{};
  return (
    <div>
      
      <h1>
        {data.original_title}
      </h1>
      <div className="img-container">
      <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt="Poster" className='img-movie'/>
      </div>
 </div>   
  )
}

export default Page1
