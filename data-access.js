// import mongodb 
import mongodb from 'mongodb';

// access the mongodb client
const MongoClient = mongodb.MongoClient;        
var url = "mongodb://127.0.0.1:27017";

const custdb = "custdb";
const customers = "customers";

async function dbStartup() {
    // connects to the "custdb" database in mongodb
    const client = new MongoClient(url+"/"+custdb);     // pass IP url & MongoDB name to MongoClient
    await client.connect();
    collection = client.db(custdb).collection(customers);

    // const collection = client.db(custdb).collection(customers);
    // return collection;
}

async function getCustomers() {
    return await collection.find().toArray();
}

dbStartup();
module.exports = { getCustomers };

