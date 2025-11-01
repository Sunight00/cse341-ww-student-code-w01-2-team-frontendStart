const express = require('express');
const cors = require('cors');
// MongoDB Connection Setup, Import MongoClient
const {MongoClient} = require('mongodb');
require("dotenv").config()

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const json = require('./user.json');

const uri = process.env.MONGODB_URI;
let data =[];
let client;

async function connectDB() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('data');
    const collection = db.collection('user');

    data = await collection.find({}).toArray();
    console.log('Documents found:', data);

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}
connectDB();
app.get('/professional', (req, res) => {
    res.json(data[0].user);
});




app.listen(process.env.PORT || 8080, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 8080));
});