import React from 'react';
import router from './router.js';
import osutils from './osutils.js';

// This is to make material-ui framework work
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Chain here all the things that need to be loaded before the app starts
//
// First load the OSs
osutils.promise
    .then(function() {
        // Main render:
        // Docs: https://github.com/rackt/react-router/blob/master/docs/api/create.md
        router.run(function (Handler, state) {
            React.render(<Handler/>, document.getElementById('react'));
        });
    })
