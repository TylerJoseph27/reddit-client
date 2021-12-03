import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveSubreddit } from '../navbar/navbarSlice.js';
import { changeSearchTerm } from './searchBarSlice.js';
import search from '../../app/search.png';

export default function SearchBar() {
  const activeSubreddit = useSelector(selectActiveSubreddit);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <form className='search-bar' onSubmit={event => {
      event.preventDefault();
      dispatch(changeSearchTerm(searchTerm));
    }}>
      <input type='search' value={searchTerm} onChange={({ target }) => setSearchTerm(target.value)} placeholder={`Search ${activeSubreddit.slice(1)}`} />
      <button type='submit' className='icon-container'>
        <img src={search} alt='search icon' />
      </button>
    </form>
  );
}