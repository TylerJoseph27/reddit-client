import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store.js';
import { BrowserRouter } from "react-router-dom";
import Header from './Header.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// store component for render
const header = (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  </Provider>
);

describe('Header', () => {
  it('Should render without errors', () => {
    // render component
    render(header);

    // use jest-dom matcher in assertions
    expect(screen.getByRole('banner')).toBeVisible();
    expect(screen.getByRole('link')).toBeVisible();
    expect(screen.getByRole('heading')).toBeVisible();
    expect(screen.getByAltText('reddit logo')).toBeVisible();
    expect(screen.getByAltText('menu icon')).toBeVisible();
  });

  // it('Should toggle menu button', () => {
  //   // render component
  //   render(header);
    
  //   // grab img elements
  //   const menu = screen.getByAltText('menu icon');

  //   // simulate user clicking img
  //   userEvent.click(menu);
  //   expect(menu.src).toBe('http://localhost/closeMenu.png');
    
  //   // simulate user clicking img
  //   userEvent.click(menu);
  //   expect(menu.src).toBe('http://localhost/openMenu.png');
  // });

  it('Should navigate to home page', () => {
    // render component
    render(header);

    // simulate user clicking link
    userEvent.click(screen.getByRole('link'));
  });
});