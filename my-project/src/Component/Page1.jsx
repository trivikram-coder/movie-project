import React from 'react'
import {  useLocation } from 'react-router-dom'
const Page1 = () => {
 const location=useLocation();
    const {data}=location.state||{};
  return (
    <div>
      <h1>HELLO</h1>
      <h1>
        {data.overview}
      </h1>
    </div>
  )
}

export default Page1
