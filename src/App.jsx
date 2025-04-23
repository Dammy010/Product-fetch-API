import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Products from './page/Products'
import ViewDetails from './page/ViewDetails'

const App = () => {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Products' element={<Products/>}/>
      <Route path='/Product/:id' element={<ViewDetails/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
