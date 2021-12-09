# Reddit Client

A React app, which uses the reddit JSON API, that allows users to view popular subreddit posts along with comments and replies.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Table of Contents

* [General Info](#general-info)
* [Technologies](#technologies)
* [Available Scripts](#available-scripts)
* [Learn More](#learn-more)

## General Info

This site was made with the [React](https://reactjs.org/) with the intent to be deployed with [Netlify](https://www.netlify.com/).
It uses the undocumented [reddit](https://www.reddit.com/) JSON API to display subreddits, posts on those subreddits, comments on those posts, and some replies to those comments.
The viewer can only view the data and cannot interact with it, there are no plans to change this as that would involve switching to the documented reddit API that uses OAuth.

[React Router](https://reactrouter.com/) is used to switch between displaying the subreddit posts and the subreddit comments (with replies).
The API returns a string in markdown format for the post content so [React Markdown](https://remarkjs.github.io/react-markdown/) is used, but the content is not always formatted correctly due to the API returning incorrectly formatted markdown (possibly due to it using reddit specific markdown).

## Technologies

This project was created with:

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* React
* Redux
* [React Redux](https://react-redux.js.org/)
* Redux Toolkit
* React Router
* React Markdown

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
