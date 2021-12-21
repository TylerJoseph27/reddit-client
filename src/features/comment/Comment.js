import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function Comment(props) {
  return (
    <>
      <div className='content'>
        <p className='title'>{props.author} <span>· {props.time}</span></p>
        <ReactMarkdown className='body'>{props.body}</ReactMarkdown>
      </div>
      {props.replies.length > 0 ? <ul className='replies'>
        {props.replies.map(reply => (
          <li key={reply.id} className='reply'>
            <p className='title'>{reply.author} <span>· {reply.time}</span></p>
            <ReactMarkdown className='body'>{reply.body}</ReactMarkdown>
          </li>
        ))}
      </ul> : null}
    </>
  );
}