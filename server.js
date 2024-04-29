// import express from 'express';
// import path from 'path';
// const da = require("./data-access");

// NOTE Could NOT use require due to error listed below but switched back to require after removing module type from package.json
// ReferenceError: require is not defined in ES module scope, you can use import instead This file is being treated as an ES module because it has a '.js' file extension and '/Users/wrmdocs/Documents/liberty/projects/phase3/project-phase3/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
const express = require('express');
const path = require('path');
const da = require("./data-access");
const bodyParser = require('body-parser');

// enable .env
const dotenv = require('dotenv');
dotenv.config();

// creates an express app object
const app = express();

// sets the port to 4000
const PORT = 4000;

// environment variables access values in .env
const port = process.env.PORT;
const api_key = process.env.API_KEY;
const mongodb_url = process.env.MONGO_URL;



// read the request body that's the received data from the incoming request body 
app.use(bodyParser.json());

// calls app.use() to implement a static file server
// have static files served from the "public" directory
    // RESOURCE: https://expressjs.com/en/starter/static-files.html
    //  use the following code to serve images, CSS files, and JavaScript files in a directory named public:
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

// use app.listen(...) to start the server
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
});

// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
//     // console.log("staticDir: " + staticDir);
//   });


// API key handler
function apiKeyAuth (req, res, next) {
    const apiKeyHeader = req.headers['x-api-key']; // Assuming the API key is sent in the header named 'x-api-key'
  

    // Check if API key is present
    if (!apiKeyHeader) {
        // if (!req.header("x-api-key")) {
            res.status(401)
        return res.json({ message: 'Invalid API key' });
    } else {
        if (apiKeyHeader === api_key){
            keyValid = true;
        }

    }

    // // If valid key, continue processing the request
    next();
  }



// GET customers
app.get("/customers", apiKeyAuth, async (req, res) => {
    const [cust, err] = await da.getCustomers();   // call to get all customers
    if(cust){
        res.send(cust);
    }else{
        res.status(500);
        res.send(err);
    }       
});


// GET reset customers
app.get("/reset", apiKeyAuth, async (req, res) => {
    const [result, err] = await da.resetCustomers();   // call to reset to 3 customers
    if(result){
        res.send(result);
    }else{
        res.status(500);
        res.send(err);
    }     
});


// POST add a new customer
// POST add a new customer
app.post('/customers', apiKeyAuth, async (req, res) => {
    const newCustomer = await req.body;
    // console.log(newCustomer.id);
    const customers = await da.getCustomers();
    const customerIds = customers[0].map(a => a.id)
    console.log(customerIds);

    // console.log(newCustomer);
    if (newCustomer.id === undefined || customerIds.includes(newCustomer.id)) {
        res.status(400);
        res.send("provide unique id in the request body");
    } else {
        // return array format [status, id, errMessage]
        const [status, id, errMessage] = await da.addCustomer(newCustomer);
        if (status === "success") {
            res.status(201);
            let response = { ...newCustomer };
            response["_id"] = id;
            res.send(response);
        } else {
            res.status(400);
            res.send(errMessage);
        }
    }
});




// GET customer by id
app.get("/customers/:id", apiKeyAuth, async (req, res) => {
    const id = req.params.id;
    // return array [customer, errMessage]
    const [cust, err] = await da.getCustomerById(id);
    if(cust){
        res.send(cust);
    }else{
        res.status(404);
        res.send(err);
    }   
});


// PUT edit/update a customer's data
// PUT edit/update a customer's data
app.put('/customers/:id', apiKeyAuth, async (req, res) => {
    const id = await req.params.id;
    const updatedCustomer = await req.body;


    if (updatedCustomer.id === undefined) {
        // if (updatedCustomer === null || req.body != {}) {
            res.status(400);
        res.send("provide a valid customer id value in the request body");
    } else {
        delete updatedCustomer._id;
        // return array format [message, errMessage]
        const [message, errMessage] = await da.updateCustomer(updatedCustomer);
        if (message) {
            res.send(message);
        } else {
            res.status(400);
            res.send(errMessage);
        }
    }

});



// DELETE a customer
app.delete("/customers/:id", apiKeyAuth, async (req, res) => {
    const id = req.params.id;
    // return array [message, errMessage]
    const [message, errMessage] = await da.deleteCustomerById(id);
    if (message) {
        res.send(message);
    } else {
        res.status(404);
        res.send(errMessage);
    }
});



console.log("api key:", api_key);
console.log("mongodb url:", mongodb_url);



