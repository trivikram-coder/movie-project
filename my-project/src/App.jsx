import React from 'react'
import Movie from './Component/Movie'
import './App.css';
import Page1 from './Component/Page1';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signin from './Authentication/SIgin';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Movie/>}/>
      <Route path='/home' element={<Page1/>}/>
      <Route path='/signin' element={<Signin/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
