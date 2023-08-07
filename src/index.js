import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import reportWebVitals from './reportWebVitals';
import { Canvas } from '@react-three/fiber';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from'./Components/Navbar/navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Canvas>
          <Router>
            <Routes>
              <Route exact path='/' element={<App />} />
            </Routes>
          </Router>
        </Canvas>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
