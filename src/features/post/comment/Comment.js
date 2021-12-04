import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function Comment(props) {
  return (
    <article className='comment'>
      <p className='title'>{props.author} <span>{`· ${props.time}`}</span></p>
      <ReactMarkdown className='content'>{props.content}</ReactMarkdown>
      {props.replies ? <ul className='replies'>
        {props.replies.map(reply => (
          <li key={reply.id} className='reply'>
            <p className='title'>{reply.author} <span>{`· ${reply.time}`}</span></p>
            <ReactMarkdown className='content'>{reply.content}</ReactMarkdown>
          </li>
        ))}
      </ul> : null}
    </article>
  );
}