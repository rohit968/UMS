import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddUpdateUser from './pages/AddUpdateUser'
import axios from 'axios'
import ViewPage from './pages/ViewPage'

const App = () => {
  axios.defaults.baseURL = "http://localhost:4001";
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path="/adduser" element={<AddUpdateUser />} />
        <Route exact path="/edituser/:id" element={<AddUpdateUser />} />
        <Route exact path='/viewuser/:id' element={<ViewPage />} />
        <Route exact path="/adduser/:id" element={<AddUpdateUser />} />
      </Routes>
    </div>
  )
}

export default App