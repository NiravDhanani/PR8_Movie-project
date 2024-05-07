import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./Pages/Home";
import { Trending } from "./Pages/Trending";
import { Upcoming } from "./Pages/Upcoming";
import { Favorite } from "./Pages/Favorites";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/trending' element={<Trending/>}></Route>
        <Route path='/upcoming' element={<Upcoming/>}></Route>
        <Route path='/favorite' element={<Favorite/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
