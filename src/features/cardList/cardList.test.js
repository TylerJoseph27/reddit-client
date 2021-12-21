import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store.js';
import { BrowserRouter } from "react-router-dom";
import CardList from './CardList.js';
import { getSubredditPosts, getSubreddits } from '../../app/reddit.js';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// mock api
jest.mock('../../app/reddit.js');

// store component for render
const cardList = (
  <Provider store={store}>
    <BrowserRouter>
      <CardList />
    </BrowserRouter>
  </Provider>
);

describe('CardList', () => {
  beforeEach(() => {
    // mock async function
    getSubredditPosts.mockImplementation(async () => apiPostsMock).mockImplementationOnce(async () => []);
  });

  it('Should render without errors', async () => {
    // render component
    const { unmount } = await waitFor(() => render(cardList));
    // unmount component
    unmount();

    // rerender component with async fetch
    await waitFor(() => render(cardList));

    // grab article, heading, link, and img elements
    const articles = screen.getAllByRole('article');
    const headings = screen.getAllByRole('heading');
    const links = screen.getAllByRole('link');
    const img = screen.getByAltText('post preview');

    // use jest-dom matcher in assertions
    expect(getSubredditPosts).toHaveBeenCalled();
    articles.forEach(article => expect(article).toBeInTheDocument());
    headings.forEach(heading => expect(heading).toBeInTheDocument());
    links.forEach(link => expect(link).toBeInTheDocument());
    expect(img).toBeInTheDocument();
  });
});