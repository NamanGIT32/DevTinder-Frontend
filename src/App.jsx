import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Body from './Body'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'

const App = () => {

  return (
    <>
      <BrowserRouter basename='/' >
        <Routes>
          {/* this is a body route and childrens of body route */}
          <Route path='/' element={<Body/>} >
            <Route path='/login' element={<Login/>} />
            <Route path='signup' element={<Signup/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  ) 
}

export default App
