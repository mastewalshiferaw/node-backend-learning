const express = require('express'); //express module imported
const app = express(); //express app created (instance)
const port = 3000; //port number defined


app.use(express.json()); //middleware to parse JSON bodies

let items = [
  {id: 1, name: 'Learn Node.js Basics', completed: false},
  {id: 2, name: 'Build a Simple API', completed: false},
  {id: 3, name: 'Push code to GitHub', completed: true}
];

// Route route (already done)

app.get('/', (req, res) => {
  res.send('Hello World!, first practice'); //send response
});

// Get a single item by ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id); //id is extracted from URL and converted to integer
  const item = items.find(item => item.id === id); //item is found in the array based on ID

  if (item) {
    res.json(item); //if item is found, it is sent as JSON response
  } else {
    res.status(404).json({'message': 'Item not found'}); //if item is not found, a 404 error is sent
  }});


// POST a new item
app.post('/items', (req, res) => {
  const newItem = req.body; // Get the new item data from the request body
  if (!newItem || !newItem.name) {
    return res.status(400).send('Item name is required');
  }
  const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  newItem.id = newId;
  newItem.completed = newItem.completed || false; // Default completed to false if not provided
  items.push(newItem);
  res.status(201).json(newItem); // Send the newly created item with 201 Created status
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// PUT a specific item by ID (Update an item)
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItemData = req.body; // Data to update with

  const itemIndex = items.findIndex(item => item.id === id); // Find the index of the item

  if (itemIndex > -1) { // If item is found (findIndex returns -1 if not found)
    // Merge existing item with updated data
    items[itemIndex] = { ...items[itemIndex], ...updatedItemData, id: id };
    res.json(items[itemIndex]);
  } else {
    res.status(404).send('Item not found');
  }
});