const express = require('express')
//require('./db/mongoose')
const adminRouter = require('./routers/admin')
// this is definitely uncool.
const app = express()
const port = process.env.APP_PORT || 3000

app.use(express.json())
app.use(adminRouter)


app.post('/users', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

app.get('/', (req, res) => {
    res.send('Hello Dave!  Would you like to play a game? How about Jumanji? Yes please. \n');
});
  

app.listen(port, () =>{
    console.log(`Server is up on ${port}`)
})
