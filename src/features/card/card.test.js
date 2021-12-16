import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store.js';
import { BrowserRouter } from "react-router-dom";
import Card from './Card.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// mock props for render
const posts = [
  {
    id: '1',
    author: 'User1',
    time: '5 days ago',
    title: 'Example post 1',
    body: 'example body text',
    preview: '',
    type: 'self',
    comments: '4',
    url: '/r/Home/comments/1/example_post_1'
  },
  {
    id: '2',
    author: 'user2',
    time: '3 hours ago',
    title: 'Example post 2',
    body: '',
    preview: '',
    type: '',
    comments: '0',
    url: '/r/Home/comments/2/example_post_2'
  }
];

const cards = (
  <Provider store={store}>
    <BrowserRouter>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Card 
              author={post.author}
              time={post.author}
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
    </BrowserRouter>
  </Provider>
);

describe('Card', () => {
  it('Should render without errors', () => {
    // render component
    render(cards);
  });
});