import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectSubreddits, addSubreddit, changeActiveSubreddit } from './navbarSlice.js';
import { getSubreddits } from '../../app/reddit.js';
import logo from '../../app/logo.png';
import openMenu from '../../app/openMenu.png';

export default function Navbar() {
  const subreddits = useSelector(selectSubreddits);
  const dispatch = useDispatch();
  // create mediaQueryList object with matchMedia 
  const mediaQuery = window.matchMedia('only screen and (max-width: 1279px)');

  useEffect(() => getSubreddits().then(data => {
    // run through array and add each element to state
    data.forEach(subreddit => dispatch(addSubreddit({
      id: subreddit.id,
      name: subreddit.display_name,
      prefix: subreddit.display_name_prefixed,
      url: subreddit.url.slice(0, -1),
      icon: subreddit.community_icon.split("?")[0]
    })));
  }).catch(error => console.log(error)), [dispatch]);

  return (
    <section className='navbar'>
      <nav>
        <h2>Subreddits</h2>
        <ul>
          {subreddits.map(subreddit => (
            <li key={subreddit.id} className='subreddit-link' onClick={() => {
              dispatch(changeActiveSubreddit(subreddit.url));
              // check if the media query is true
              if (mediaQuery.matches) {
                // set menu button to open
                document.querySelector('.menu img').src = openMenu;
                // make navbar invisible
                document.querySelector('.navbar').style.transform = 'scaleY(0)';
              }
            }}>
              <NavLink to={subreddit.url} className={({ isActive }) => isActive ? 'active' : 'inactive'}>
                <div className='icon-container'>
                  <img src={subreddit.icon || logo} alt={`${subreddit.prefix} icon`} />
                </div>
                <p>{subreddit.name}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}