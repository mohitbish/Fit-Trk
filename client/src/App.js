import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Welcome from './Pages/Welcome';
import Home from './Pages/Home';
import Profile from './Pages/Profile';


function App() {
  return (
  <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
