import React, { useEffect } from 'react';
import Card from '../card/Card.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectPosts, changePosts } from './cardListSlice.js';
import { selectActiveSubreddit } from '../navbar/navbarSlice.js';
import { selectSearchTerm } from '../searchBar/searchBarSlice.js';
import { getSubredditPosts } from '../../app/reddit.js';
import { getPostDate } from '../../app/utils.js';
import { motion } from 'framer-motion';

export default function CardList() {
  const posts = useSelector(selectPosts);
  const activeSubreddit = useSelector(selectActiveSubreddit);
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
  // create mediaQueryList object with matchMedia 
  const mediaQuery = window.matchMedia('only screen and (min-width: 1600px)');

  useEffect(() => {
    getSubredditPosts(activeSubreddit).then(data => {
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
          body: post.selftext,
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
    }).catch(error => console.log(error));
  }, [activeSubreddit, dispatch, navigate]);

  if (posts.length > 0) {
    if (filteredPosts.length > 0) {
      return (
        <motion.div className='card-list' 
          initial={{ opacity: 0, translateX: mediaQuery.matches ? -100 : 0, translateY: 100 }} 
          animate={{ opacity: 1, translateX: 0, translateY: 0 }} 
          exit={{ opacity: 0, translateX: mediaQuery.matches ? -100 : 0, translateY: 100 }} 
          transition={{ duration: 0.3 }}
        >
          <ul className='subreddit'>
            {filteredPosts.map(post => (
              <li key={post.id}>
                <Card 
                  author={post.author}
                  time={post.time}
                  title={post.title}
                  body={post.body}
                  preview={post.preview}
                  type={post.type}
                  comments={post.comments}
                  url={post.url}
                />
              </li>
            ))}
          </ul>
        </motion.div>
      );
    } else {
      return (
        <section>
          <h2>No posts with <i>{searchTerm}</i> in their title.</h2>
        </section>
      );
    }
  } else {
    return (
      <section className='loading'>
        <h2>No posts found in {activeSubreddit.slice(1)}.</h2>
      </section>
    );
  }
}