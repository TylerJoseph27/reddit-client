import React from 'react';
//import ReactMarkdown from 'react-markdown';

export default function Comment(props) {
  return (
    <article className='comment'>
      <div className='content'>
        <p className='title'>{props.author} <span>· {props.time}</span></p>
        <p className='body'>{props.body}</p>
      </div>
      {props.replies ? <ul className='replies'>
        {props.replies.map(reply => (
          <li key={reply.id} className='reply'>
            <p className='title'>{reply.author} <span>· {reply.time}</span></p>
            <p className='body'>{reply.body}</p>
          </li>
        ))}
      </ul> : null}
    </article>
  );
}