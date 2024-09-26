
import "./App.css";
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import TajPage from './components/Information/TajPage';
import Home from './components/Home';
import QutubPage from "./components/Information/QutubPage";


function App() {
  return (
    <>

    <Routes>
      <Route extact path= '/' element={<Home></Home>}></Route>
      <Route path='/TajPage' element={<TajPage></TajPage>}></Route>
      <Route path='/QutubPage' element={<QutubPage></QutubPage>}></Route>
    </Routes>
    </>
  );
} 

export default App;
