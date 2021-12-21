// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// mock window.matchMedia
window.matchMedia = query => ({
  matches: false,
  media: query,
  onChange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn()
});

// mock component props and api return values
const subredditsMock = [
  {
    id: 'subreddit1',
    display_name: 'Home',
    display_name_prefixed: 'r/Home',
    url: '/r/Home/',
    community_icon: ''
  },
  {
    id: 'subreddit2',
    display_name: 'AskReddit',
    display_name_prefixed: 'r/AskReddit',
    url: '/r/AskReddit/',
    community_icon: ''
  },
  {
    id: 'subreddit3',
    display_name: 'Minecraft',
    display_name_prefixed: 'r/Minecraft',
    url: '/r/Minecraft/',
    community_icon: ''
  }
];

const propPostsMock = [
  {
    id: 'post1',
    author: 'User1',
    time: '5 days ago',
    title: 'Example post 1',
    body: 'example body text',
    preview: '',
    type: 'self',
    comments: '3',
    url: '/r/Home/comments/1/example_post_1'
  },
  {
    id: 'post2',
    author: 'User2',
    time: '3 hours ago',
    title: 'Example post 2',
    body: '',
    preview: 'https://en.wikipedia.org/wiki/Rickrolling',
    type: 'link',
    comments: '6',
    url: '/r/Home/comments/2/example_post_2'
  },
  {
    id: 'post3',
    author: 'User3',
    time: '20 minutes ago',
    title: 'Example post 3',
    body: '',
    preview: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    type: 'image',
    comments: '2',
    url: '/r/Home/comments/2/example_post_3'
  },
  {
    id: 'post4',
    author: 'User4',
    time: '1 hour ago',
    title: 'Example post 4',
    body: '',
    preview: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'rich:video',
    comments: '5',
    url: '/r/Home/comments/2/example_post_4'
  },
  {
    id: 'post5',
    author: 'User5',
    time: '55 minutes ago',
    title: 'Example post 5',
    body: '',
    preview: 'https://youtu.be/dQw4w9WgXcQ',
    type: 'rich:video',
    comments: '1',
    url: '/r/Home/comments/2/example_post_5'
  },
  {
    id: 'post6',
    author: 'User6',
    time: '1 minute ago',
    title: 'Example post 6',
    body: '',
    preview: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be',
    type: 'rich:video',
    comments: '4',
    url: '/r/Home/comments/2/example_post_6'
  },
  {
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
];

const apiPostsMock = [
  {
    id: 'post1',
    author: 'User1',
    created_utc: ((Date.now() / 1000) - 432000).toString(),
    title: 'Example post 1',
    selftext: 'example body text',
    url: '',
    post_hint: 'self',
    num_comments: '3',
    permalink: '/r/Home/comments/1/example_post_1'
  },
  {
    id: 'post2',
    author: 'User2',
    created_utc: ((Date.now() / 1000) - 10800).toString(),
    title: 'Example post 2',
    selftext: '',
    url: 'https://en.wikipedia.org/wiki/Rickrolling',
    post_hint: 'link',
    num_comments: '6',
    permalink: '/r/Home/comments/2/example_post_2'
  },
  {
    id: 'post3',
    author: 'User3',
    created_utc: ((Date.now() / 1000) - 1200).toString(),
    title: 'Example post 3',
    selftext: '',
    url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    post_hint: 'image',
    num_comments: '2',
    permalink: '/r/Home/comments/2/example_post_3'
  },
  {
    id: 'post4',
    author: 'User4',
    created_utc: ((Date.now() / 1000) - 3600).toString(),
    title: 'Example post 4',
    selftext: '',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    post_hint: 'rich:video',
    num_comments: '5',
    permalink: '/r/Home/comments/2/example_post_4'
  },
  {
    id: 'post5',
    author: 'User5',
    created_utc: ((Date.now() / 1000) - 3300).toString(),
    title: 'Example post 5',
    selftext: '',
    url: 'https://youtu.be/dQw4w9WgXcQ',
    post_hint: 'rich:video',
    num_comments: '1',
    permalink: '/r/Home/comments/2/example_post_5'
  },
  {
    id: 'post6',
    author: 'User6',
    created_utc: ((Date.now() / 1000) - 60).toString(),
    title: 'Example post 6',
    selftext: '',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be',
    post_hint: 'rich:video',
    num_comments: '4',
    permalink: '/r/Home/comments/2/example_post_6'
  },
  {
    id: 'post7',
    author: 'User7',
    created_utc: ((Date.now() / 1000) - 30).toString(),
    title: 'Example post 7',
    selftext: '',
    url: '',
    post_hint: undefined,
    num_comments: '0',
    permalink: ''
  }
];

const propCommentsMock = [
  {
    id: 'comment1',
    author: 'User1',
    time: '40 minutes ago',
    body: 'example comment 1',
    replies: []
  },
  {
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
  },
  {
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
];

const apiCommentsMock = [
  {
    id: 'comment1',
    author: 'User1',
    created_utc: ((Date.now() / 1000) - 2400).toString(),
    body: 'example comment 1',
    replies: {
      data: {
        children: []
      }
    }
  },
  {
    id: 'comment2',
    author: 'User2',
    created_utc: ((Date.now() / 1000) - 10800).toString(),
    body: 'example comment 2',
    replies: {
      data: {
        children: [
          {
            data: {
              id: 'reply1',
              author: 'User3',
              created_utc: ((Date.now() / 1000) - 7200).toString(),
              body: 'example reply'
            }
          }
        ]
      }
    }
  },
  {
    id: 'comment3',
    author: 'User4',
    created_utc: ((Date.now() / 1000) - 3600).toString(),
    body: 'example comment 3',
    replies: {
      data: {
        children: [
          {
            data: {
              id: 'reply2',
              author: 'User5',
              created_utc: ((Date.now() / 1000) - 900).toString(),
              body: 'example reply 1'
            }
          },
          {
            data: {
              id: 'reply3',
              author: 'User6',
              created_utc: ((Date.now() / 1000) - 30).toString(),
              body: 'example reply 2'
            }
          }
        ]
      }
    }
  }
];

global.subredditsMock = subredditsMock;
global.propPostsMock = propPostsMock;
global.apiPostsMock = apiPostsMock;
global.propCommentsMock = propCommentsMock;
global.apiCommentsMock = apiCommentsMock;