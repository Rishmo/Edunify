// Import the Express framework for creating the server and handling HTTP requests
const express = require('express'); 

// Import the MySQL2 library to interact with a MySQL database
const mysql = require('mysql2'); 

// Import the CORS middleware to allow cross-origin requests
const cors = require('cors'); 

// Create an instance of an Express application
const app = express(); 

// Enable CORS middleware to allow requests from different origins (frontend-backend communication)
app.use(cors()); 

// Middleware to parse incoming JSON request bodies
app.use(express.json()); 

// Create a MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',        // The hostname of the database server (local machine)
    user: 'root',             // The username to connect to the database
    password: 'Nov@38MySQL24', // The password for the database user
    database: 'schools_db',   // The name of the database to connect to
});

// Connect to the MySQL database and handle connection success or failure
db.connect((err) => {
    if (err) {
        // Log the error if the connection fails
        console.error('Database connection failed:', err);
    } else {
        // Log a success message if the connection is successful
        console.log('Connected to database');
    }
});

// POST route to add a new school to the database
app.post('/api/schools', (req, res) => {
    // Destructure the request body to extract school details
    const { name, address, city, state, contact_number, image, email_id } = req.body;

    // Define the SQL query to insert the new school into the database
    const query = `
        INSERT INTO schools (name, address, city, state, contact_number, image, email_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the query with the provided values
    db.query(query, [name, address, city, state, contact_number, image, email_id], (err, result) => {
        if (err) {
            // If an error occurs, send a 500 status and the error message
            return res.status(500).send(err);
        }

        // If the query succeeds, send a success message
        res.status(200).send('School added successfully');
    });
});

// GET route to retrieve all schools from the database
app.get('/api/schools', (req, res) => {
    // Define the SQL query to fetch all schools from the `schools` table
    const query = 'SELECT * FROM schools';

    // Execute the query
    db.query(query, (err, results) => {
        if (err) {
            // If an error occurs, send a 500 status and the error message
            return res.status(500).send(err);
        }

        // If the query succeeds, send the results as JSON
        res.status(200).json(results);
    });
});

// Start the server on port 5000 and log a message when it's running
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
