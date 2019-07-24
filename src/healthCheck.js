const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
require('./db/mongoose');
const adminRouter = require('./routers/admin');
const userRouter = require('./routers/users');
const groupRouter = require('./routers/group');
const droneRouter = require('./routers/drones');

const DispatchController = require('./controllers/dispatch/dispatchControler');
const dispatchController = new DispatchController().initiateWatch();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(session({  
    secret: 'row\ row\ row\ Your# #Boat!#',
    key: 'vinz_clortho', 
    cookie: {
      httpOnly: true,
      secure: true,
      domain: 'mylendpro.com',
      path: '/node/app/',
      // Cookie will expire in 1 hour from when it's generated 
      expires: new Date( Date.now() + 60 * 60 * 1000 )
    }
  }));
app.use(adminRouter);
app.use(userRouter);
app.use(groupRouter);
app.use(droneRouter);

module.exports = app;
