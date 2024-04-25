// import express from 'express';
// import path from 'path';
// const da = require("./data-access");

// NOTE Could NOT use require due to error listed below
// ReferenceError: require is not defined in ES module scope, you can use import instead This file is being treated as an ES module because it has a '.js' file extension and '/Users/wrmdocs/Documents/liberty/projects/phase3/project-phase3/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
const express = require('express');
const path = require('path');
const da = require("./data-access");
const bodyParser = require('body-parser');

// creates an express app object
const app = express();

// sets the port to 4000
const PORT = 4000;

// read the request body that's the received data from the incoming request body 
app.use(bodyParser.json());

// calls app.use() to implement a static file server
// have static files served from the "public" directory
    // RESOURCE: https://expressjs.com/en/starter/static-files.html
    //  use the following code to serve images, CSS files, and JavaScript files in a directory named public:
app.use(express.static('public'))

// use app.listen(...) to start the server
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
});

// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
//     // console.log("staticDir: " + staticDir);
//   });


// GET customers
app.get("/customers", async (req, res) => {
    const [cust, err] = await da.getCustomers();   // call to get all customers
    if(cust){
        res.send(cust);
    }else{
        res.status(500);
        res.send(err);
    }       
});


// GET reset customers
app.get("/reset", async (req, res) => {
    const [result, err] = await da.resetCustomers();   // call to reset to 3 customers
    if(result){
        res.send(result);
    }else{
        res.status(500);
        res.send(err);
    }     
});


// POST add a new customer
app.post('/customers', async (req, res) => {
    const newCustomer = await req.body;

    if (newCustomer != null || req.body == {}) {
        // return array format [status, id, errMessage]
        const [status, id, errMessage] = await da.addCustomer(newCustomer);
        // throw {"message":"an error occured"};    // testing by forcing error
        if (status === "success") {
            res.status(201);
            let response = { ...newCustomer };
            response["_id"] = id;
            res.send(response);
        } else {
            res.status(400);
            res.send(errMessage);
        }
        
    } else {
        res.status(400);
        res.send("missing request body");
    }
});


// GET customer by id
app.get("/customers/:id", async (req, res) => {
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
app.put('/customers/:id', async (req, res) => {
    const id = await req.params.id;
    const updatedCustomer = await req.body;
    
    if (updatedCustomer != null || req.body == {}) {

        delete updatedCustomer._id;
        // return array format [message, errMessage]
        const [message, errMessage] = await da.updateCustomer(updatedCustomer);
        if (message) {
            res.send(message);
        } else {
            res.status(400);
            res.send(errMessage);
        }

       
    } else {
        res.status(400);
        res.send("missing request body");
    }
});






