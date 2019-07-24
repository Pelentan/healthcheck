const app = require('./healthCheck');

const port = process.env.APP_PORT ;

app.listen(port, () =>{
    console.log('db is: ' + process.env.MDB + " || " + process.env.MONGODB)
    console.log('Server is up on port number ' + port)
    console.log("Location: " + process.env.LOCATION);
    console.log(process.env.JWT_SECRET);
})
