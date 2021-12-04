import React, { useEffect } from 'react';
import Card from '../card/Card.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectPosts, changePosts } from './cardListSlice.js';
import { selectActiveSubreddit } from '../navbar/navbarSlice.js';
import { selectSearchTerm } from '../searchBar/searchBarSlice.js';
import { getSubredditPosts } from '../../app/reddit.js';
import { getPostDate } from '../../app/utils.js';

export default function CardList() {
  const posts = useSelector(selectPosts);
  const activeSubreddit = useSelector(selectActiveSubreddit);
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => getSubredditPosts(activeSubreddit).then(data => {
    // check for new posts
    if (data.length > 0) {
      // array to store posts
      const newPosts = [];

      // run through array and add each post object to array
      data.forEach(post => newPosts.push({
        id: post.id,
        author: post.author,
        time: getPostDate(post.created_utc),
        title: post.title,
        description: post.selftext,
        preview: post.url,
        type: post.post_hint || post.gallery_data,
        comments: post.num_comments,
        url: post.permalink
      }));

      // change posts state to newPosts array
      dispatch(changePosts(newPosts));
    } else {
      // return to home page
      navigate('/');
    }
  }).catch(error => console.log(error)), [activeSubreddit, dispatch, navigate]);

  if (filteredPosts.length > 0) {
    return (
      <section className='card-list'>
        <ul className='subreddit'>
          {filteredPosts.map(post => (
            <li key={post.id}>
              <Card 
                author={post.author}
                time={post.time}
                title={post.title}
                description={post.description}
                preview={post.preview}
                type={post.type}
                comments={post.comments}
                url={post.url}
              />
            </li>
          ))}
        </ul>
      </section>
    );
  } else {
    return (
      <section className='loading'>
        <h2>Loading...</h2>
      </section>
    );
  }
}