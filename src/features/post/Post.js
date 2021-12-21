import React, { useEffect } from 'react';
import Card from '../card/Card.js';
import Comment from '../comment/Comment.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectCurrentPost, changeCurrentPost, selectComments, changeComments } from './postSlice.js';
import { selectActivePost, selectPosts } from '../cardList/cardListSlice.js';
import { getPostComments } from '../../app/reddit.js';
import { getPostDate } from '../../app/utils.js';
import { motion } from 'framer-motion';

export default function Post() {
  const activePost = useSelector(selectActivePost);
  const posts = useSelector(selectPosts);
  const currentPost = useSelector(selectCurrentPost);
  const comments = useSelector(selectComments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // create mediaQueryList object with matchMedia 
  const mediaQuery = window.matchMedia('only screen and (min-width: 1600px)');

  useEffect(() => {
    // flag for mounted component
    let isSubscribed = true;

    // fetch data
    getPostComments(activePost).then(data => {
      // check for new comments
      if (data.postId && posts.length > 0) {
        // filter array of objects to get correct object
        const filteredPosts = posts.filter(post => post.id === data.postId);
        
        // check for mounted component
        if (isSubscribed) {
          // change current post to active post
          dispatch(changeCurrentPost(filteredPosts[0]));
        }
        
        // array to store comments
        const newComments = [];

        // check if post has comments
        if (data.comments.length > 0) {
          // run through array and add each comment object to array
          data.comments.forEach(comment => newComments.push({
            id: comment.id,
            author: comment.author,
            time: getPostDate(comment.created_utc),
            body: comment.body,
            replies: comment.replies ? comment.replies.data.children.map(reply => {
              return {
                id: reply.data.id,
                author: reply.data.author,
                time: getPostDate(reply.data.created_utc),
                body: reply.data.body
              };
            }) : []
          }));
        }
  
        // change comments state to newComments array
        dispatch(changeComments(newComments));
      } else {
        // return to home page
        navigate('/');
      }
    }).catch(error => console.log(error));

    // async cleanup
    return () => isSubscribed = false;
  }, [activePost, posts, dispatch, navigate]);

  if (currentPost.id) {
    return (
      <motion.div className='post' 
        initial={{ opacity: 0, translateX: mediaQuery.matches ? -100 : 0, translateY: 100 }} 
        animate={{ opacity: 1, translateX: 0, translateY: 0 }} 
        exit={{ opacity: 0, translateX: mediaQuery.matches ? -100 : 0, translateY: 100 }} 
        transition={{ duration: 0.3 }}
      >
        <Card 
          author={currentPost.author}
          time={currentPost.time}
          title={currentPost.title}
          body={currentPost.body}
          preview={currentPost.preview}
          type={currentPost.type}
          comments={currentPost.comments}
        />
        {comments.length > 0 ? <ul className='comments'>
          {comments.map(comment => (
            <li key={comment.id} className='comment'>
              <Comment 
                author={comment.author}
                time={comment.time}
                body={comment.body}
                replies={comment.replies}
              />
            </li>
          ))}
        </ul> : null}
      </motion.div>
    );
  } else {
    return (
      <section className='loading'>
        <h2>Loading...</h2>
      </section>
    );
  }
}