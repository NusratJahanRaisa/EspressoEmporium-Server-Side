const express = require('express');
const cors = require('cors');
const app = express();
const Port = process.env.PORT || 5000;


// middleware
app.use(cors())
app.use(express.json())


// server side
app.get('/', async(req,res) => {
    res.send("I'm working!!");
})

app.listen(Port, ()=>{
    console.log(`server is running on port : ${Port}`)
})