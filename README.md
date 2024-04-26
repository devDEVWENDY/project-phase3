INSTRUCTIONS

General: 
- ALWAYS run MogoDB (my path):  sudo mongod --dbpath=/Users/w**/data/db
    - stores the customer data
- Run Mongosh or Compass:       mongodb://localhost:27017/
    - admin shell to update/test MongoDB database
- ALWAYS cd into project directory when working with or running app
    - code base for the project
    - npm install to load all dependencies

How to run project server.js file:
- start the server in terminal: npm run start
    - in terminal should see console.log message from app.listen in FILE server.js
- browser http://localhost:4000 or http://localhost:4000/index.html
    - in browser should see contents of FILE public/index.html
- stop the server in terminal: ctrl + c



How to use Postman
- start the server in terminal: npm run start -or- npm start
    - in terminal should see console.log message from app.listen in FILE server.js
- open Postman and select the method you want to test (ex, GET, POST, PUT etc)
- enter the url endpoint you are testing
- if the request has Body data, enter the data in the appropriate fields (ex. Body, raw, JSON, etc )
- click Send and check results in Response



Application can make database changes using:
- browser (ex. Chrome)
- Postman
- Compass MongoDB



- Node.js

