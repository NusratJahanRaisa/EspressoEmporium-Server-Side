const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const Port = process.env.PORT || 5000;


// middleware
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.bwtwuxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// console.log(uri)



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    
    const coffeeDatabaseCollection = client.db("coffeeDB").collection('coffees');
    
    app.post('/coffees', async(req,res)=>{

        const newCoffee = req.body;
        console.log(newCoffee)

        const result = await coffeeDatabaseCollection.insertOne(newCoffee)

        res.send(result)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}



run().catch(console.dir);






// server side
app.get('/', async(req,res) => {
    res.send("I'm working!!");
})

app.listen(Port, ()=>{
    console.log(`server is running on port : ${Port}`)
})