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
  // mock async function
  beforeEach(() => getSubreddits.mockImplementation(async () => [
    {
      id: '1',
      display_name: 'Home',
      display_name_prefixed: 'r/Home',
      url: '/r/Home/',
      community_icon: ''
    },
    {
      id: '2',
      display_name: 'AskReddit',
      display_name_prefixed: 'r/AskReddit',
      url: '/r/AskReddit/',
      community_icon: ''
    },
    {
      id: '3',
      display_name: 'Minecraft',
      display_name_prefixed: 'r/Minecraft',
      url: '/r/Minecraft/',
      community_icon: ''
    }
  ]));
  
  it('Should render without errors', async () => {
    // render component with async fetch
    await waitFor(() => render(navbar));

    // grab list item, link, and img elements
    const listItems = screen.getAllByRole('listitem');
    const links = screen.getAllByRole('link');
    const imgs = screen.getAllByRole('img');

    // use jest-dom matcher in assertions
    expect(screen.getByRole('navigation')).toBeVisible();
    expect(screen.getByRole('heading')).toBeVisible();
    expect(screen.getByRole('list')).toBeVisible();
    // loop through arrays
    listItems.forEach(item => expect(item).toBeVisible());
    links.forEach(link => expect(link).toBeVisible());
    imgs.forEach(img => expect(img).toBeVisible());
  });

  it('Should navigate to cardList of clicked subreddit', async () => {
    // render component with async fetch
    await waitFor(() => render(navbar));

    // grab link elements
    const links = screen.getAllByRole('link');
    // simulate user clicking links
    links.forEach(link => userEvent.click(link));
  });

  // it('Should change activeSubreddit state to clicked subreddit', async () => {
  //   // render component with async fetch
  //   await waitFor(() => render(navbar));

  //   // grab list item elements
  //   const listItems = screen.getAllByRole('listitem');
  //   // simulate user clicking list items
  //   listItems.forEach(item => userEvent.click(item));
  // });
});