import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store.js';
import { BrowserRouter } from "react-router-dom";
import Header from './Header.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Header', () => {
  it('Should render without errors', () => {
    // // render component
    // render(
    //   <Provider store={store}>
    //     <BrowserRouter>
    //       <Header />
    //     </BrowserRouter>
    //   </Provider>
    // );
    // // grab header element
    // const header = screen.getByRole('banner');
    // // use jest-dom matcher in assertion
    // expect(header).toBeVisible();
  });
});