import React, { useEffect } from 'react';
import Card from '../card/Card.js';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveSubreddit } from '../navbar/navbarSlice.js';
import { selectPosts, changePost } from './cardListSlice.js';
import { getSubredditPosts } from '../../app/reddit.js';
import { getPostDate } from '../../app/utils.js';

export default function CardList() {
  const activeSubreddit = useSelector(selectActiveSubreddit);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let isLoading = true;

  useEffect(() => getSubredditPosts(activeSubreddit).then(data => {
    console.log(data);

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

    // check for new posts
    if (newPosts.length > 0) {
      // change post state to newPosts array
      dispatch(changePost(newPosts));
    } else {
      // return to home page
      navigate('/');
    }
  }).catch(error => console.log(error)), [activeSubreddit, dispatch, navigate]);

  if (posts.length > 0) {
    // done loading
    isLoading = false;
  }

  if (!isLoading) {
    return (
      <section className='card-list'>
        <ul className='subreddit'>
          {posts.map(post => (
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
      <section>
        <h2>Loading...</h2>
      </section>
    );
  }
}