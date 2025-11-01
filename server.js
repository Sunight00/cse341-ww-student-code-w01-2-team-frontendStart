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

const d = require('./user.json');

const uri = process.env.MONGODB_URI;

async function main() {
	// we'll add code here soon
    const client = new MongoClient(uri);
    try {
        await client.connect();
    data = await listDatabases(client);
    return data;
    } catch (e) {
        console.error(e);
    }
    finally {
    await client.close();
}
}
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    console.log(databasesList.databases);

    //Accessing of my custom db and collection
    const db = client.db("data"); 
    const collection = db.collection("user");
    const documents = await collection.find({}).toArray();
    console.log("📄 Documents in 'data.profiles':", documents[0].user);
    return documents;
};

main().catch(console.error);
var data = main();
app.get('/professional', (req, res) => {
    res.json(data.user);
});




app.listen(process.env.PORT || 8080, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 8080));
});