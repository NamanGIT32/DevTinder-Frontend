import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Body from './Body'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import { Provider } from 'react-redux'
import appStore from './redux/appStore'
import Feed from './components/Feed'

const App = () => {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename='/' >
        <Routes>
          {/* this is a body route and childrens of body route */}
          <Route path='/' element={<Body/>} >
            <Route path='/' element={<Feed/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  ) 
}

export default App
