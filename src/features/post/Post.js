import React, { useState, useEffect } from 'react';
import Card from '../card/Card.js';
import Comment from './comment/Comment.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectComments, changeComments } from './postSlice.js';
import { selectActivePost, selectPosts } from '../cardList/cardListSlice.js';
import { getPostComments } from '../../app/reddit.js';
import { getPostDate } from '../../app/utils.js';

export default function Post() {
  const [post, setPost] = useState({});
  const comments = useSelector(selectComments);
  const activePost = useSelector(selectActivePost);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => getPostComments(activePost).then(data => {
    // check for new comments
    if (data.postId) {
      // filter array of objects to get correct object
      const filteredPosts = posts.filter(post => post.id === data.postId);
      // store post object in state
      setPost(filteredPosts[0]);

      // array to store comments
      const newComments = [];

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
          }) : ''
        }));
      }

      // change comments state to newComments array
      dispatch(changeComments(newComments));
    } else {
      // return to home page
      navigate('/');
    }
  }).catch(error => console.log(error)), [activePost, posts, post, dispatch, navigate]);

  if (post.id) {
    return (
      <section className='post'>
        <Card 
          author={post.author}
          time={post.time}
          title={post.title}
          body={post.body}
          preview={post.preview}
          type={post.type}
          comments={post.comments}
        />
        {comments.length > 0 ? <ul className='comments'>
          {comments.map(comment => (
            <li key={comment.id}>
              <Comment 
                author={comment.author}
                time={comment.time}
                body={comment.body}
                replies={comment.replies}
              />
            </li>
          ))}
        </ul> : null}
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