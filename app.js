const express = require('express'); //express module imported
const app = express(); //express app created (instance)
const port = 3000; //port number defined


//define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!, first practice'); //send response
});

//start the server and listen and listen for incoming requests
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
