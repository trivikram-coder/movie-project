import React from 'react'
import { Link } from 'react-router-dom';
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
    
     <Link to='/signin' className='btn btn-danger'>Signin</Link>
      </div>
 </div>   
  )
}

export default Page1
