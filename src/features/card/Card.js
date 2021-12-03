import React from 'react';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import comments from '../../app/comments.png';

export default function Card(props) {
  // variable to hold url string
  let videoURL = '';

  // check for video post
  if (props.type === 'rich:video') {
    if (props.preview.includes('https://www.youtube.com/')) {
      // split url string and remove 'watch?v='
      let tempArray1 = props.preview.split('watch?v=');
      // store second half of url as string
      const tempString = String(tempArray1[1]);
      // check for ampersand
      if (tempString.toString().includes('&')) {
        // split url string and remove ampersand
        const tempArray2 = tempString.split('&');
        // replace second half of url
        tempArray1[1] = tempArray2[0];
      }
      // store url string with '/embed/' between two halves
      videoURL = `${tempArray1[0]}embed/${tempArray1[1]}`;
    } else if (props.preview.includes('https://youtu.be/')) {
      // split url to get id
      let tempArray1 = props.preview.split('/');
      // add id to correct url
      videoURL = `https://www.youtube.com/embed/${tempArray1[3]}`;
    }
  }

  return (
    <article className='card'>
      <p className='intro'>{`Posted by u/${props.author} ${props.time}`}</p>
      <h2>{props.title}</h2>
      {props.type === 'link' || props.type === 'hosted:video' || typeof props.type === 'object' ? <a href={props.preview} rel='noreferrer' target='_blank'>{props.preview}</a> : null}
      {props.type === 'self' || (props.type === undefined && props.description.length > 0) ? <ReactMarkdown className='description'>{props.description}</ReactMarkdown> : null}
      {props.type === 'image' ? <div className='img-container'><img src={props.preview} alt='post preview' /></div> : null}
      {props.type === 'rich:video' && videoURL.length > 0 ? <iframe src={videoURL} title={props.title} width='640' height='360'></iframe> : null}
      <Link to={props.url} className='comments'>
        <div className='icon-container'><img src={comments} alt='comments icon' /></div>
        <p>{`Comments ${props.comments}`}</p>
      </Link>
    </article>
  );
}