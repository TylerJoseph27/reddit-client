import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store.js';
import SearchBar from './SearchBar.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// store component for render
const searchBar = (
  <Provider store={store}>
    <SearchBar />
  </Provider>
);

describe('SearchBar', () => {
  it('Should render without errors', () => {
    // render component
    render(searchBar);

    // use jest-dom matcher in assertions
    expect(screen.getByRole('searchbox')).toBeVisible();
    expect(screen.getByRole('button')).toBeVisible();
  });

  it('Should store user input', () => {
    // render component
    render(searchBar);

    // grab input element
    const searchBox = screen.getByRole('searchbox');

    // simulate typing in search bar
    const searchTerm = 'example search term';
    userEvent.type(searchBox, searchTerm);
    expect(searchBox.value).toBe(searchTerm);

    // simulate clicking button
    userEvent.click(screen.getByRole('button'));
  });
});