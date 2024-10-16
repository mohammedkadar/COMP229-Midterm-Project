const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Serve static files (e.g., images, CSS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Array of strings (books)
let books = ['The Hobbit', '1984', 'To Kill a Mockingbird', 'Moby Dick', 'Pride and Prejudice'];

// Set the port for the server
const PORT = 8080;

// Serve the instructions HTML file (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// API Endpoints

// GET /api/items
// Description: Get all items (books)
// Task: Implement logic to return the full list of books
app.get('/api/items', (req, res) => {
 res.json(books); 
});

// GET /api/items?title=[<<partial title name>>]
// Description: Search for books by partial title match
// Task: Implement logic to return books matching the partial title
app.get('/api/items/search', (req, res) => {
const title = req.query.title.toLowerCase();
const filteredBooks = books.filter(book => book.toLowerCase().includes(title)); 
res.json(filteredBooks); 
});

// GET /api/items/:id
// Description: Get a specific item by ID
// Task: Implement logic to return a book by its index (ID)
app.get('/api/items/:id', (req, res) => {
 const id = parseInt(req.params.id); 
 if (id >= 0 && id < books.length) {
  res.json(books[id]);
 } else {
  res.status(404).send('Book Not Found'); 
 }
});

// POST /api/items
// Description: Add a new item
// Task: Implement logic to add a new book to the array
app.post('/api/items', (req, res) => {
 const newBook = req.body.title;
 if (newBook) {
  books.push(newBook);
  res.status(201).json(newBook);
 } else {
  res.status(400).send('Invalid book title');
 }
});

// PUT /api/items/:id
// Description: Update an item by ID
// Task: Implement logic to update a book by its index (ID)
app.put('/api/items/:id', (req, res) => {
const id = parseInt(req.params.id);
const updatedTitle = req.body.title;
if (id >= 0 && id < books.length && updatedTitle) {
  books[id] = updatedTitle;
  res.json(books[id]);
} else {
  res.status(400).send('Invalid request');
}
});

// DELETE /api/items/:id
// Description: Remove an item by ID
// Task: Implement logic to remove a book by its index (ID)
app.delete('/api/items/:id', (req, res) => {
const id = parseInt(req.params.id);
if (id >= 0 && id < books.length) {
  const removedBook = books.splice(id, 1);
  res.status(204).send();
} else {
  res.status(404).send('Book not found');
}
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//Mohammed Sadiq Ahamed Kadar, 301 430 160 // 