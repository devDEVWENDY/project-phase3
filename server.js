// import express from 'express';
// import path from 'path';
// const da = require("./data-access");

// NOTE Could NOT use require due to error listed below
// ReferenceError: require is not defined in ES module scope, you can use import instead This file is being treated as an ES module because it has a '.js' file extension and '/Users/wrmdocs/Documents/liberty/projects/phase3/project-phase3/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
const express = require('express');
const path = require('path');
const da = require("./data-access");

// creates an express app object
const app = express();

// sets the port to 4000
const PORT = 4000;

// calls app.use() to implement a static file server
// have static files served from the "public" directory
    // RESOURCE: https://expressjs.com/en/starter/static-files.html
    //  use the following code to serve images, CSS files, and JavaScript files in a directory named public:
app.use(express.static('public'))

// use app.listen(...) to start the server
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:{PORT}/`);
});


// GET customers
app.get("/customers", async (req, res) => {
    const [cust, err] = await da.getCustomers();   // call to get customers
    if(cust){
        res.send(cust);
    }else{
        res.status(500);
        res.send(err);
    }       
});


