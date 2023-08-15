import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { React } from 'react';
import LandingPage from './Components/LandingPage/landingpage';
import About from './Components/AboutUs/about';
import Blogs from './Components/Blogs/blogs';
import Projects from './Components/Projects/projects';
import Joinus from './Components/JoinUs/joinus';

function App() {

  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route exact path='/About' element={<About />} />
        <Route exact path='/Blogs' element={<Blogs />} />
        <Route exact path='/Projects' element={<Projects />} />
        <Route exact path='/joinus' element={<Joinus />} />
      </Routes>
  </Router>
  );
}

export default App;