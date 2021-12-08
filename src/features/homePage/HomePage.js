import React from 'react';

export default function HomePage() {
  return (
    <section className='about'>
      <div className='content'>
        <h2>About</h2>
        <p>This app displays popular subreddits using the reddit <abbr title='JavaScript Object Notation'>JSON</abbr> <abbr title='application programming interface'>API</abbr>.</p>
        <p className='menu-prompt'>Use the drop-down menu to display a list of subreddit links then click one of the links to load posts from that subreddit.</p>
        <p className='navbar-prompt'>Click one of the subreddit links to the right to load posts from that subreddit.</p>
        <p>Each post can then display comments, as well as some replies, by clicking the comments link in the bottom left of the post.</p>
        <p>The search bar can be used to filter the posts that are shown in each subreddit. It will not filter comments or replies.</p>
      </div>
    </section>
  );
}