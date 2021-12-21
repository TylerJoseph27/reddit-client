import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveSubreddit } from '../navbar/navbarSlice.js';
import { changeSearchTerm } from './searchBarSlice.js';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const activeSubreddit = useSelector(selectActiveSubreddit);
  const dispatch = useDispatch();

  return (
    <form className='search-bar' onSubmit={event => {
      event.preventDefault();
      dispatch(changeSearchTerm(searchTerm));
    }}>
      <input type='search' value={searchTerm} onChange={({ target }) => setSearchTerm(target.value)} placeholder={`Search ${activeSubreddit.slice(1)}`} />
      <button type='submit' className='icon-container'>
        <img src={'/images/search.png'} alt='search icon' />
      </button>
    </form>
  );
}