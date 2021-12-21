import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store.js';
import { BrowserRouter } from "react-router-dom";
import Navbar from './Navbar.js';
import { getSubreddits } from '../../app/reddit.js';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// mock api
jest.mock('../../app/reddit.js');

// store component for render
const navbar = (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  </Provider>
);

describe('Navbar', () => {
  beforeEach(() => {
    // mock async function
    getSubreddits.mockImplementation(async () => subredditsMock).mockImplementationOnce(async () => []);
  });
  
  it('Should render without errors', async () => {
    // render component
    const { unmount } = await waitFor(() => render(navbar));

    // grab heading elements
    const headings = screen.getAllByRole('heading');

    // use jest-dom matcher in assertions
    expect(screen.getByRole('navigation')).toBeVisible();
    expect(screen.getByRole('article')).toBeVisible();
    // loop through array
    headings.forEach(heading => expect(heading).toBeVisible());

    // unmount component
    unmount();

    // rerender component with async fetch
    await waitFor(() => render(navbar));

    // grab list item, link, and img elements
    const listItems = screen.getAllByRole('listitem');
    const links = screen.getAllByRole('link');
    const imgs = screen.getAllByRole('img');

    // use jest-dom matcher in assertions
    expect(getSubreddits).toHaveBeenCalled();
    expect(screen.getByRole('navigation')).toBeVisible();
    expect(screen.getByRole('heading')).toBeVisible();
    expect(screen.getByRole('list')).toBeVisible();
    // loop through arrays
    listItems.forEach(item => expect(item).toBeVisible());
    links.forEach(link => expect(link).toBeVisible());
    imgs.forEach(img => expect(img).toBeVisible());
  });

  it('Should navigate to cardList of clicked subreddit', async () => {
    // render component
    const { unmount } = await waitFor(() => render(navbar));
    // unmount component
    unmount();

    // rerender component with async fetch
    await waitFor(() => render(navbar));

    // grab link elements
    const links = screen.getAllByRole('link');
    // simulate user clicking links
    links.forEach(link => userEvent.click(link));
  });
});