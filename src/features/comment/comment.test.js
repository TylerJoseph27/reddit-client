import React from 'react';
import Comment from './Comment.js';
import { render, screen } from '@testing-library/react';

describe('Comment', () => {
  it('Should render without errors', () => {
    // render component
    render(<Comment />);
    screen.debug();
  });
});