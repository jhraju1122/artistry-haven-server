const express = require('express');
const cors = require('cors');
require('dotenv').config()
 const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;


// middewere
app.use(cors());
app.use(express.json());
 
 
 
console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)
 
 
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.avtmd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const craftCollection =client.db('craftDB').collection('craft');
    
    // read operation 
    app.get('/craft', async(req, res) =>{
      const cursor = craftCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    // create 
    app.post('/craft', async(req, res) =>{
      const addItems = req.body;
      console.log(addItems);
      const result = await craftCollection.insertOne(addItems);
      res.send(result);
    })

    // delete operation
    app.delete('/craft/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await craftCollection.deleteOne(query);
      res.send(result);
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



app.get('/', (req, res) =>{
    res.send('Artisty haven server is running ')
})

app.listen(port, () =>{
    console.log(`craft server is running on: ${port}`)
})

 
 

