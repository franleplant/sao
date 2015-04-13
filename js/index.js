import React from 'react';
import router from './router.js';


// Docs: https://github.com/rackt/react-router/blob/master/docs/api/create.md
router.run(function (Handler, state) {
  React.render(<Handler/>, document.getElementById('react'));
});
