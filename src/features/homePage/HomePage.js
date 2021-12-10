import React from 'react';
import { motion } from 'framer-motion';

export default function HomePage() {
  // create mediaQueryList object with matchMedia 
  const mediaQuery = window.matchMedia('(min-width: 1600px)');

  return (
    <motion.div 
      className='about' 
      initial={{ opacity: 0, translateX: mediaQuery.matches ? -100 : 0, translateY: 100 }} 
      animate={{ opacity: 1, translateX: 0, translateY: 0 }} 
      exit={{ opacity: 0, translateX: mediaQuery.matches ? -100 : 0, translateY: 100 }} 
      transition={{ duration: 0.6 }}
    >
      <div className='content'>
        <h2>About</h2>
        <p>This app displays popular subreddits using the reddit <abbr title='JavaScript Object Notation'>JSON</abbr> <abbr title='application programming interface'>API</abbr>.</p>
        <p className='menu-prompt'>Use the drop-down menu to display a list of subreddit links then click one of the links to load posts from that subreddit.</p>
        <p className='navbar-prompt'>Click one of the subreddit links to the right to load posts from that subreddit.</p>
        <p>Each post can then display comments, as well as some replies, by clicking the comments link in the bottom left of the post.</p>
        <p>The search bar can be used to filter the posts that are shown in each subreddit. It will not filter comments or replies.</p>
      </div>
    </motion.div>
  );
}