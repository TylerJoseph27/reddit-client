import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { BrowserRouter } from "react-router-dom";
import App from './App.js';
import { getSubreddits, getSubredditPosts, getPostComments } from './app/reddit.js';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// mock api
jest.mock('./app/reddit.js');

// store component for render
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

describe('App', () => {
  beforeEach(() => {
    // mock async functions
    getSubreddits.mockImplementation(async () => subredditsMock);
    getSubredditPosts.mockImplementation(async () => apiPostsMock);
    getPostComments.mockImplementation(async () => (
      {
        postId: 'post1',
        comments: apiCommentsMock
      }
    ));

    // mock window.matchMedia
    window.matchMedia = query => ({
      matches: true,
      media: query,
      onChange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    });
  });

  it('Should render without errors', async () => {
    // render component
    await waitFor(() => render(app));

    // use jest-dom matcher in assertions
    expect(screen.getByRole('banner')).toBeVisible();
    expect(screen.getByRole('main')).toBeVisible();
    expect(screen.getByRole('navigation')).toBeVisible();
    expect(screen.getByRole('contentinfo')).toBeVisible();
  });

  it('Should toggle the menu button on user click', async () => {
    // render component
    await waitFor(() => render(app));

    // grab img element
    const menu = screen.getByAltText('menu icon');
    // use jest-dom matcher in assertion
    expect(menu.src).toBe(window.location.origin + '/images/openMenu.png');

    // simulate user click
    userEvent.click(menu);
    // use jest-dom matcher in assertion
    expect(menu.src).toBe(window.location.origin + '/images/closeMenu.png');

    // simulate user click
    userEvent.click(menu);
    // use jest-dom matcher in assertion
    expect(menu.src).toBe(window.location.origin + '/images/openMenu.png');
  });

  it('Should display filtered cardList based on search term', async () => {
    // render component
    const { unmount } = await waitFor(() => render(app));

    // grab link elements
    const links = within(screen.getByRole('navigation')).getAllByRole('link');
    // simulate user clicking first link
    userEvent.click(links[0]);

    // unmount component
    unmount();

    // rerender component for route change
    await waitFor(() => render(app));

    // grab header and input elements
    const header = screen.getByRole('banner');
    const searchBox = within(header).getByRole('searchbox');
    let lists = within(screen.getByRole('main')).getAllByRole('list');
    // use jest-dom matcher in assertions
    expect(lists.length).toBe(2);
    expect(lists[0].childElementCount).toBe(7);

    // simulate user typing in input element
    userEvent.type(searchBox, 'example search term');
    // simulate user clicking button
    userEvent.click(within(header).getByRole('button'));

    lists = within(screen.getByRole('main')).getAllByRole('list');
    // use jest-dom matcher in assertion
    expect(lists.length).toBe(1);
    
    // simulate user retyping in input element
    userEvent.type(searchBox, '{selectall}{backspace}1{enter}');

    lists = within(screen.getByRole('main')).getAllByRole('list');
    // use jest-dom matcher in assertions
    expect(lists.length).toBe(2);
    expect(lists[0].childElementCount).toBe(1);
  });

  it('Should display post on user clicking card in cardList', async () => {
    // render component
    const { unmount } = await waitFor(() => render(app));

    // simulate user clicking link
    userEvent.click(within(screen.getByRole('article')).getByRole('link'));

    // unmount component
    unmount();

    // rerender component for route change
    await waitFor(() => render(app));

    const article = within(screen.getByRole('main')).getByRole('article');

    // use jest-dom matcher in assertion
    expect(article).toBeVisible();
    expect(article.nextElementSibling).toBeVisible();
  });
});