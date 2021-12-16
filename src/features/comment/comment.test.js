import React from 'react';
import Comment from './Comment.js';
import { render, screen } from '@testing-library/react';

// mock props for render
const mockComments = [
  {
    id: '1',
    author: 'User1',
    time: '40 minutes ago',
    body: 'example comment 1',
    replies: []
  },
  {
    id: '2',
    author: 'User2',
    time: '2 months ago',
    body: 'example comment 2',
    replies: [
      {
        id: '1',
        author: 'User3',
        time: '3 hours ago',
        body: 'example reply'
      }
    ]
  },
  {
    id: '3',
    author: 'User4',
    time: '1 hour ago',
    body: 'example comment 3',
    replies: [
      {
        id: '1',
        author: 'User5',
        time: '15 minutes ago',
        body: 'example reply 1'
      },
      {
        id: '2',
        author: 'User6',
        time: 'less than a minute ago',
        body: 'example reply 2'
      }
    ]
  }
];

// store component for render
const comments = (
  <ul>
    {mockComments.map(comment => (
      <li key={comment.id}>
        <Comment 
          author={comment.author}
          time={comment.time}
          body={comment.body}
          replies={comment.replies}
        />
      </li>
    ))}
  </ul>
);

describe('Comment', () => {
  it('Should render without errors', () => {
    // render component
    render(comments);

    // grab article, list, and list item elements
    const articles = screen.getAllByRole('article');
    const lists = screen.getAllByRole('list');
    const listItems = screen.getAllByRole('listitem');

    // use jest-dom matcher in assertions
    articles.forEach(article => expect(article).toBeVisible());
    lists.forEach(list => expect(list).toBeVisible());
    listItems.forEach(item => expect(item).toBeVisible());
  });
});