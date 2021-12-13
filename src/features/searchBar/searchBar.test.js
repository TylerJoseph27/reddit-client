import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store.js';
import SearchBar from './SearchBar.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SearchBar', () => {
  // store component for render
  const searchBar = (
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );

  it('Should render without errors', () => {
    // render component
    render(searchBar);

    // grab input and button elements
    const searchBox = screen.getByRole('searchbox');
    const searchBtn = screen.getByRole('button');

    // use jest-dom matcher in assertions
    expect(searchBox).toBeVisible();
    expect(searchBtn).toBeVisible();
  });

  it('Should store user input', () => {
    // render component
    render(searchBar);

    // grab input and button elements
    const searchBox = screen.getByRole('searchbox');
    const searchBtn = screen.getByRole('button');

    // simulate typing in search bar
    const searchTerm = 'example search term';
    userEvent.type(searchBox, searchTerm);
    expect(searchBox.value).toBe(searchTerm);

    // simulate clicking button
    userEvent.click(searchBtn);
  });
});