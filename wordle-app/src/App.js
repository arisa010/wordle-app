import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Game from "./components/Game";
// import HomePage from "./components/HomePage"
import { Home } from "@mui/icons-material";
// import HomePage from "./components/Pages/HomePage";


// import SplinePage from "./components/Pages/Spline";

function App() {
	return (
  
    <Router>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/game" element={<Game />} />
        </Routes>
    </Router>
    
	);
}

export default App;