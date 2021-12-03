import React from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import SearchBar from './features/searchBar/SearchBar.js';
import HomePage from './features/homePage/HomePage.js';
import CardList from './features/cardList/CardList.js';
import Navbar from './features/navbar/Navbar.js';
import logo from './app/logo.png';

function App() {
  return (
    <>
      <header>
        <Link to='/' >
          <div className='icon-container'>
            <img src={logo} alt='reddit logo' />
          </div>
          <h1>Reddit<span>Minimal</span></h1>
        </Link>
        <SearchBar />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/r/:subreddit' element={<CardList />} />
        </Routes>
        <Navbar />
      </main>
      <footer>
        <p>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>.</p>
      </footer>
    </>
  );
}

export default App;
