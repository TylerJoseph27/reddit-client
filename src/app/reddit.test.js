import { getSubreddits, getSubredditPosts, getPostComments } from "./reddit";

describe('reddit api', () => {
  beforeEach(() => {
    // mock fetch
    global.fetch = jest.fn().mockImplementationOnce(() => {
      return new Promise(resolve => {
        resolve(new Response(JSON.stringify({
          data: {
            children: [
              {
                data: {
                  id: 'subreddit1',
                  display_name: 'Home',
                  display_name_prefixed: 'r/Home',
                  url: '/r/Home/',
                  community_icon: ''
                }
              },
              {
                data: {
                  id: 'subreddit2',
                  display_name: 'AskReddit',
                  display_name_prefixed: 'r/AskReddit',
                  url: '/r/AskReddit/',
                  community_icon: ''
                }
              },
              {
                data: {
                  id: 'subreddit3',
                  display_name: 'Minecraft',
                  display_name_prefixed: 'r/Minecraft',
                  url: '/r/Minecraft/',
                  community_icon: ''
                }
              }
            ]
          }
        })));
      });
    }).mockImplementationOnce(() => {
      return new Promise(resolve => {
        resolve(new Response(JSON.stringify({
          data: {
            children: [
              {
                data: {
                  id: 'post1',
                  author: 'User1',
                  time: '5 days ago',
                  title: 'Example post 1',
                  body: 'example body text',
                  preview: '',
                  type: 'self',
                  comments: '3',
                  url: '/r/Home/comments/1/example_post_1'
                }
              },
              {
                data: {
                  id: 'post2',
                  author: 'User2',
                  time: '3 hours ago',
                  title: 'Example post 2',
                  body: '',
                  preview: 'https://en.wikipedia.org/wiki/Rickrolling',
                  type: 'link',
                  comments: '6',
                  url: '/r/Home/comments/2/example_post_2'
                }
              },
              {
                data: {
                  id: 'post3',
                  author: 'User3',
                  time: '20 minutes ago',
                  title: 'Example post 3',
                  body: '',
                  preview: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
                  type: 'image',
                  comments: '2',
                  url: '/r/Home/comments/2/example_post_3'
                }
              },
              {
                data: {
                  id: 'post4',
                  author: 'User4',
                  time: '1 hour ago',
                  title: 'Example post 4',
                  body: '',
                  preview: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                  type: 'rich:video',
                  comments: '5',
                  url: '/r/Home/comments/2/example_post_4'
                }
              },
              {
                data: {
                  id: 'post5',
                  author: 'User5',
                  time: '55 minutes ago',
                  title: 'Example post 5',
                  body: '',
                  preview: 'https://youtu.be/dQw4w9WgXcQ',
                  type: 'rich:video',
                  comments: '1',
                  url: '/r/Home/comments/2/example_post_5'
                }
              },
              {
                data: {
                  id: 'post6',
                  author: 'User6',
                  time: '1 minute ago',
                  title: 'Example post 6',
                  body: '',
                  preview: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be',
                  type: 'rich:video',
                  comments: '4',
                  url: '/r/Home/comments/2/example_post_6'
                }
              },
              {
                data: {
                  id: 'post7',
                  author: 'User7',
                  time: 'less than a minute ago',
                  title: 'Example post 7',
                  body: '',
                  preview: '',
                  type: undefined,
                  comments: '0',
                  url: ''
                }
              }
            ]
          }
        })));
      });
    }).mockImplementationOnce(() => {
      return new Promise(resolve => {
        resolve(new Response(JSON.stringify([
          {
            data: {
              children: [
                {
                  data: {
                    id: 'post1'
                  }
                }
              ]
            }
          },
          {
            data: {
              children: [
                {
                  data: {
                    id: 'comment1',
                    author: 'User1',
                    time: '40 minutes ago',
                    body: 'example comment 1',
                    replies: []
                  }
                },
                {
                  data: {
                    id: 'comment2',
                    author: 'User2',
                    time: '3 hours ago',
                    body: 'example comment 2',
                    replies: [
                      {
                        id: 'reply1',
                        author: 'User3',
                        time: '2 hours ago',
                        body: 'example reply'
                      }
                    ]
                  }
                },
                {
                  data: {
                    id: 'comment3',
                    author: 'User4',
                    time: '1 hour ago',
                    body: 'example comment 3',
                    replies: [
                      {
                        id: 'reply2',
                        author: 'User5',
                        time: '15 minutes ago',
                        body: 'example reply 1'
                      },
                      {
                        id: 'reply3',
                        author: 'User6',
                        time: 'less than a minute ago',
                        body: 'example reply 2'
                      }
                    ]
                  }
                }
              ]
            }
          }
        ])));
      });
    });
  });

  it('calls fetch without errors', async () => {
    // call mock fetch
    let data = await getSubreddits();
    // use jest-dom matchers in assertions
    expect(fetch).toHaveBeenCalled();
    expect(data).toStrictEqual(subredditsMock);

    // call mock fetch
    data = await getSubredditPosts('/subredditURl');
    // use jest-dom matchers in assertions
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(data).toEqual(propPostsMock);

    // call mock fetch with no parameters
    data = await getSubredditPosts();
    // use jest-dom matchers in assertions
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(data).toEqual([]);

    // call mock fetch
    data = await getPostComments('/postURl');
    // use jest-dom matchers in assertions
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(data.comments).toEqual(propCommentsMock);

    // call mock fetch with no parameters
    data = await getPostComments();
    // use jest-dom matchers in assertions
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(data).toEqual({
      postId: '',
      comments: []
    });
  });
});