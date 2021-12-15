import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store.js';
import { BrowserRouter } from "react-router-dom";
import Navbar from './Navbar.js';
import { getSubreddits } from '../../app/reddit.js';
import { render, screen } from '@testing-library/react';
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
  beforeEach(() => {
    getSubreddits.mockImplementation(async () => [
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
    ]);
  });
  
  it('Should render without errors', async () => {
    // render component
    await render(navbar);   // update userEvent to get waitFor
    
    screen.debug();

    // grab list item elements
    const listItems = screen.getAllByRole('listitem');

    // use jest-dom matcher in assertions
    expect(screen.getByRole('navigation')).toBeVisible();
    expect(screen.getByRole('heading')).toBeVisible();
    expect(screen.getByRole('list')).toBeVisible();
    // loop through array
    listItems.forEach(item => expect(item).toBeVisible());
  });
});