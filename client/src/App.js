import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Welcome from './Pages/Welcome';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Workout from './Pages/Workout';


function App() {
  return (
  <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/workout" element={<Workout />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
