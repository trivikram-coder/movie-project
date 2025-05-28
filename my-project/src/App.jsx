import React from 'react'
import Movie from './Component/Movie'
import './App.css';
import Page1 from './Component/Page1';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Movie/>}/>
      <Route path='/home' element={<Page1/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
