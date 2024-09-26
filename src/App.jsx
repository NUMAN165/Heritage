
import "./App.css";
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import TajPage from './components/Information/TajPage';
import Home from './DashBoard/Home';
import QutubPage from "./components/Information/QutubPage";
import SignIn from "./Login/SignIn";


function App() {
  return (
    <>

    <Routes>
      <Route extact path= '/' element={<Home></Home>}></Route>
      <Route path='/TajPage' element={<TajPage></TajPage>}></Route>
      <Route path='/QutubPage' element={<QutubPage></QutubPage>}></Route>
      <Route path='/SignIn' element={<SignIn></SignIn>}></Route>


    </Routes>
    </>
  );
} 

export default App;