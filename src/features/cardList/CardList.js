import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveSubreddit } from '../navbar/navbarSlice.js';
import { getSubredditPosts } from '../../app/reddit.js';

export default function CardList() {
  const activeSubreddit = useSelector(selectActiveSubreddit);

  useEffect(() => getSubredditPosts(activeSubreddit).then(data => {
    console.log(data)
  }).catch(error => console.log(error)), [activeSubreddit]);

  return (
    <ul></ul>
  );
}