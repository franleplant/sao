import React from 'react';
import router from './router.js';

// This is to make material-ui framework work
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Docs: https://github.com/rackt/react-router/blob/master/docs/api/create.md
router.run(function (Handler, state) {
  React.render(<Handler/>, document.getElementById('react'));
});
