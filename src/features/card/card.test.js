import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store.js';
import { BrowserRouter } from "react-router-dom";
import Card from './Card.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// store component for render
const cards = (
  <Provider store={store}>
    <BrowserRouter>
      <ul>
        {propPostsMock.map(post => (
          <li key={post.id}>
            <Card 
              author={post.author}
              time={post.time}
              title={post.title}
              body={post.body}
              preview={post.preview}
              type={post.type}
              comments={post.comments}
              url={post.url}
            />
          </li>
        ))}
      </ul>
    </BrowserRouter>
  </Provider>
);

describe('Card', () => {
  it('Should render without errors', () => {
    // render component
    render(cards);

    // grab article, heading, link, and img elements
    const articles = screen.getAllByRole('article');
    const headings = screen.getAllByRole('heading');
    const links = screen.getAllByRole('link');
    const img = screen.getByAltText('post preview');

    // use jest-dom matcher in assertions
    articles.forEach(article => expect(article).toBeVisible());
    headings.forEach(heading => expect(heading).toBeVisible());
    links.forEach(link => expect(link).toBeVisible());
    expect(img).toBeVisible();
  });

  it('Should display link to post with comments', () => {
    // render component
    render(cards);

    // grab link elements
    const links = screen.getAllByRole('link');
    // simulate user clicking link
    userEvent.click(links[links.length - 1]);
  });
});