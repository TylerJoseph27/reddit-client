import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { changeActiveSubreddit } from '../navbar/navbarSlice.js';
import SearchBar from '../searchBar/SearchBar.js';

export default function Header() {
  const dispatch = useDispatch();
  // create mediaQueryList object with matchMedia 
  const mediaQuery = window.matchMedia('only screen and (min-width: 1280px)');

  // toggle navbar on window resize
  const toggleNavbar = event => {
    // get navbar
    const navbar = document.querySelector('.navbar');

    // check if the media query is true
    if (event.matches) {
      // make navbar visible
      navbar.style.opacity = '1';
      navbar.style.transform = 'scaleY(1)';
    } else {
      // reset menu button
      document.querySelector('.menu img').src = '/images/openMenu.png';
      // make navbar invisible
      navbar.style.opacity = '0';
      navbar.style.transform = 'scaleY(0)';
    }
  };

  // toggle menu button on click
  const toggleMenu = ({ target }) => {
    // get navbar and menu button
    const navbar = document.querySelector('.navbar');

    // check if menu button is clicked
    if (target.src === (window.location.origin + '/images/openMenu.png')) {
      // toggle menu button
      target.src = '/images/closeMenu.png';
      // open drop-down menu
      navbar.style.opacity = '1';
      navbar.style.transform = 'scaleY(1)';
    } else if (target.src === (window.location.origin + '/images/closeMenu.png')) {
      // reset menu button
      target.src = '/images/openMenu.png';
      // close drop-down menu
      navbar.style.opacity = '0';
      navbar.style.transform = 'scaleY(0)';
    }
  };

  useEffect(() => {
    mediaQuery.addEventListener('change', toggleNavbar);
    // event listener cleanup
    return () => mediaQuery.removeEventListener('change', toggleNavbar);
  });

  return (
    <header>
      <Link to='/' onClick={() => dispatch(changeActiveSubreddit(''))}>
        <div className='icon-container'>
          <img src={'/images/logo.png'} alt='reddit logo' />
        </div>
        <h1>Reddit<span>Minimal</span></h1>
      </Link>
      <SearchBar />
      <div className='menu-bg'>
        <div className='icon-container menu'>
          <img src={'/images/openMenu.png'} alt='menu icon' onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
}