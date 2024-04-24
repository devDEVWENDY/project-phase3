// import express from 'express';
// import path from 'path';
const express = require('express');
const path = require('path');

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

