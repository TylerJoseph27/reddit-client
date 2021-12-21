import React from 'react';
import Comment from './Comment.js';
import { render, screen } from '@testing-library/react';

// store component for render
const comments = (
  <ul>
    {propCommentsMock.map(comment => (
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

    // grab list and list item elements
    const lists = screen.getAllByRole('list');
    const listItems = screen.getAllByRole('listitem');

    // use jest-dom matcher in assertions
    lists.forEach(list => expect(list).toBeVisible());
    listItems.forEach(item => expect(item).toBeVisible());
  });
});