'use strict';

const express = require('./server/config/express.js');
const app     = express();

// CONNECT ROUTES //
require('./server/server.routes.js')(app);

const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log('Listening on port', port);
});