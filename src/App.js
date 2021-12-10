import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './features/header/Header.js';
import HomePage from './features/homePage/HomePage.js';
import CardList from './features/cardList/CardList.js';
import Post from './features/post/Post';
import Navbar from './features/navbar/Navbar.js';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <main>
        <AnimatePresence exitBeforeEnter initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<HomePage />} />
            <Route path='/r/:subreddit' element={<CardList />} />
            <Route path='/r/:subreddit/comments/:id/:comment' element={<Post />} />
          </Routes>
        </AnimatePresence>
        <Navbar />
      </main>
      <footer>
        <p>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>.</p>
      </footer>
    </>
  );
}

export default App;
