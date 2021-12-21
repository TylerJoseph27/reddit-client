import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store.js';
import { BrowserRouter } from "react-router-dom";
import Post from './Post.js';
import { getPostComments } from '../../app/reddit.js';
import { render, screen, waitFor } from '@testing-library/react';

// mock api
jest.mock('../../app/reddit.js');

// store component for render
const post = (
  <Provider store={store}>
    <BrowserRouter>
      <Post />
    </BrowserRouter>
  </Provider>
);

describe('Post', () => {
  beforeEach(() => {
    // mock async function
    getPostComments.mockImplementation(async () => (
      {
        postId: '',
        comments: []
      }
    ));
  });

  it('Should render without errors', async () => {
    // render component
    await waitFor(() => render(post));

    // use jest-dom matcher in assertion
    expect(getPostComments).toHaveBeenCalled();
    expect(screen.getByRole('heading')).toBeVisible();
  });
});