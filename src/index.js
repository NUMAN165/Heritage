import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import { Card } from 'react-bootstrap';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <App />
    <Home />
    <Card />
  </React.StrictMode>
);
