const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

// userName: mshakil5352
// password: TEgKcjd8cVQjQkfQ


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mshakil5352:TEgKcjd8cVQjQkfQ@cluster0.u7o1gfd.mongodb.net/?retryWrites=true&w=majority";

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

        const userCollection = client.db('usersDB');
        const haiku = userCollection.collection("users");


        app.post('/users', async (req, res) => {

            const user = req.body;
            console.log('new user', user);
            const result = await haiku.insertOne(user);
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




app.get('/', (req, res) => {
    res.send('simple curd is running')
})

app.listen(port, () => {
    console.log(`simple crud is running on port ${port}`)
})