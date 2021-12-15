import React from 'react';
import HomePage from './HomePage';
import { render, screen } from '@testing-library/react';

describe('HomePage', () => {
  it('Should render without errors', () => {
    // render component
    render(<HomePage />);

    // use jest-dom matcher in assertion
    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});