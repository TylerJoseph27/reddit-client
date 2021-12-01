const apiURL = 'https://www.reddit.com';

export const getSubreddits = async () => {
  // fetch popular subreddits data
  const response = await fetch(`${apiURL}/subreddits.json`);
  // convert response to json
  const jsonRespone = await response.json();
  // map json to array of objects
  return jsonRespone.data.children.map(subreddit => subreddit.data);
};

export const getSubredditPosts = async (subredditURL) => {
  if (subredditURL) {
    // fetch subreddit data
    const response = await fetch(`${apiURL}${subredditURL}.json`);
    // convert response to json
    const jsonRespone = await response.json();
    // map json to array of objects
    return jsonRespone.data.children.map(subreddit => subreddit.data);
  } else {
    return [];
  }
};
