
import "./App.css";
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import TajPage from './components/Information/TajPage';
import Home from './DashBoard/Home';
import QutubPage from "./components/Information/QutubPage";
import AlbertPage from "./components/Information/AlbertPage";
import SignIn from "./Login/SignIn";
import Register from "./Login/Register";
import HumayunsPage from "./components/Information/HumayunsPage";
import PatnaPage from "./components/Information/PatnaPage";
import AjantaPage from "./components/Information/AjantaPage";


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
      <Route path='/HumayunsPage' element={<HumayunsPage></HumayunsPage>}></Route>
      <Route path='/PatnaPage' element={<PatnaPage></PatnaPage>}></Route>
      <Route path='/AjantaPage' element={<AjantaPage></AjantaPage>}></Route>


    </Routes>
    </>
  );
} 

export default App;
