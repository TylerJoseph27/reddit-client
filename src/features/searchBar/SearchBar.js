import React from 'react';
import search from '../../app/search.png';

export default function SearchBar() {
  return (
    <form className='search-bar'>
      <input type='search' placeholder='Search' required />
      <button type='button' className='icon-container'>
        <img src={search} alt='search icon' />
      </button>
    </form>
  );
}