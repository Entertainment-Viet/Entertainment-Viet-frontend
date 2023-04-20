/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
import './locales/i18n';
import { ChakraProvider } from '@chakra-ui/react';

// Import root app
import App from 'containers/App';

import theme from './theme';

// import WalletListener from 'components/WalletListener';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./firebase-messaging-sw.js';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');
// const myFontObserver = new FontFaceObserver('MyFont');
// const myFontBoldObserver = new FontFaceObserver('MyFont-Bold');

// Promise.all([myFontObserver.load(), myFontBoldObserver.load()]).then(
//   () => {
//     document.body.classList.add('fontLoaded');
//   },
//   function() {
//     console.log('Font is not available');
//   },
// );

const root = ReactDOM.createRoot(MOUNT_NODE);
if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

root.render(
  <ChakraProvider theme={theme} cssVarsRoot="body">
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {/* <WalletListener /> */}
        <App />
      </ConnectedRouter>
    </Provider>
  </ChakraProvider>,
);

// Chunked polyfill for browsers without Intl support

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// if (process.env.NODE_ENV === 'production') {
//   require('offline-plugin/runtime').install(); // eslint-disable-line global-require
// }
