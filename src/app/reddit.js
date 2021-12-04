const apiURL = 'https://www.reddit.com';

export const getSubreddits = async () => {
  // fetch popular subreddits data
  const response = await fetch(`${apiURL}/subreddits.json`);
  // convert response to json
  const jsonRespone = await response.json();

  // map json to array of objects with api data
  return jsonRespone.data.children.map(subreddit => subreddit.data);
};

export const getSubredditPosts = async (subredditURL) => {
  if (subredditURL) {
    // fetch subreddit data
    const response = await fetch(`${apiURL}${subredditURL}.json`);
    // convert response to json
    const jsonRespone = await response.json();

    // map json to array of objects with api data
    return jsonRespone.data.children.map(subreddit => subreddit.data);
  } else {
    // return empty array
    return [];
  }
};

export const getPostComments = async (postURL) => {
  if (postURL) {
    // fetch subreddit data
    const response = await fetch(`${apiURL}${postURL}.json`);
    // convert response to json
    const jsonResponse = await response.json();

    // return object with two properties
    return {
      // object with api data
      postId: jsonResponse[0].data.children[0].data.id,
      // map json to array of objects with api data
      comments: jsonResponse[1].data.children.map(comment => comment.data)
    }
  } else {
    // return empty object
    return {
      postId: '',
      comments: []
    };
  }
};
