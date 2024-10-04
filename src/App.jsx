
import "./App.css";
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import TajPage from './components/Information/TajPage';
import Home from './DashBoard/Home';
import QutubPage from "./components/Information/QutubPage";
import AlbertPage from "./components/Information/AlbertPage";
import SignIn from "./Login/SignIn";
import Register from "./Login/Register";


function App() {
  return (
    <>

    <Routes>
      <Route extact path= '/' element={<Home></Home>}></Route>
      <Route path='/TajPage' element={<TajPage></TajPage>}></Route>
      <Route path='/SignIn' element={<SignIn></SignIn>}></Route>
      <Route path='/Register' element={<Register></Register>}></Route>
      <Route path='/QutubPage' element={<QutubPage></QutubPage>}></Route>
      <Route path='/AlbertPage' element={<AlbertPage></AlbertPage>}></Route>


    </Routes>
    </>
  );
} 

export default App;
