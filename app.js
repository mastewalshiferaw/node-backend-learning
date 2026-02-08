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
  const id = parseInt(req.params.id); // Get ID from URL
  const updatedItemData = req.body; // Get updated data from request body

  // Basic validation: ensure updated data has a name
  if (!updatedItemData || !updatedItemData.name) {
    return res.status(400).send('Item name is required for update');
  }

  let itemFound = false;
  items = items.map(item => {
    if (item.id === id) {
      itemFound = true;
      // Merge existing item with updated data.
      // The spread operator `...` copies properties from one object to another.
      // `item` are existing properties, `updatedItemData` are new/overwriting properties.
      return { ...item, ...updatedItemData, id: item.id }; // Ensure ID isn't changed if sent in body
    }
    return item;
  });

  if (itemFound) {
    // Find the updated item to send it back in the response
    const updatedItem = items.find(item => item.id === id);
    res.json(updatedItem); // Send the updated item with a 200 OK status
  } else {
    res.status(404).send('Item not found'); // If item not found, send 404
  }
});