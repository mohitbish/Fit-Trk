import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Welcome from './Pages/Welcome';
import Home from './Pages/Home';

function App() {
  return (
  <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />}/>
          <Route path="/home" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
