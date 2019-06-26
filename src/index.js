const express = require('express');
require('./db/mongoose');
const adminRouter = require('./routers/admin');
const userRouter = require('./routers/users');
const groupRouter = require('./routers/group');
// this is definitely uncool.
const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(adminRouter);
app.use(userRouter);
app.use(groupRouter);

app.listen(port, () =>{
    console.log('db is: ' + process.env.MDB + " || " + process.env.MONGODB)
    console.log('Server is up on port number ' + port)
    console.log("Location: " + process.env.LOCATION)
})
