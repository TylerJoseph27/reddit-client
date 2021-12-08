import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { changeActiveSubreddit } from './features/navbar/navbarSlice.js';
import SearchBar from './features/searchBar/SearchBar.js';
import HomePage from './features/homePage/HomePage.js';
import CardList from './features/cardList/CardList.js';
import Post from './features/post/Post';
import Navbar from './features/navbar/Navbar.js';
import logo from './app/logo.png';
import openMenu from './app/openMenu.png';
import closeMenu from './app/closeMenu.png';

function App() {
  const dispatch = useDispatch();
  // create mediaQueryList object with matchMedia 
  const mediaQuery = window.matchMedia('(min-width: 1280px)');

  // toggle menu button
  const toggleMenu = ({ target }) => {
    // check if menu button is open
    if (target.src === openMenu) {
      // change open menu button to close menu
      target.src = closeMenu;
      // open drop-down menu
      document.querySelector('.navbar').style.transform = 'scaleY(1)';
    } else if (target.src === closeMenu) {
      // change close menu button to open menu
      target.src = openMenu;
      // close drop-down menu
      document.querySelector('.navbar').style.transform = 'scaleY(0)';
    }
  };

  const toggleNavbar = event => {
    // check if the media query is true
    if (event.matches) {
      // make navbar visible
      document.querySelector('.navbar').style.transform = 'scaleY(1)';
    } else {
      // set menu button to open
      document.querySelector('.menu img').src = openMenu;
      // make navbar invisible
      document.querySelector('.navbar').style.transform = 'scaleY(0)';
    }
  };

  useEffect(() => {
    mediaQuery.addEventListener('change', toggleNavbar);
    // event listener cleanup
    return () => mediaQuery.removeEventListener('change', toggleNavbar);
  });

  return (
    <>
      <header>
        <Link to='/' onClick={() => dispatch(changeActiveSubreddit(''))}>
          <div className='icon-container'>
            <img src={logo} alt='reddit logo' />
          </div>
          <h1>Reddit<span>Minimal</span></h1>
        </Link>
        <SearchBar />
        <div className='icon-container menu'>
          <img src={openMenu} alt='menu icon' onClick={toggleMenu} />
        </div>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/r/:subreddit' element={<CardList />} />
          <Route path='/r/:subreddit/comments/:id/:comment' element={<Post />} />
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
