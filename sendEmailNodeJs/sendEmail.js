import express from 'express';
import mysql from 'mysql2'; // Import mysql2 instead of mysql
import cors from 'cors';

const app = express();
const port = 3000;

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'bhrs96ubdnkhowlpmxrh-mysql.services.clever-cloud.com',
  user: 'u0malzlowdqkyc6o',
  password: '8mr61C4ArlkhXSxccG5T',
  database: 'bhrs96ubdnkhowlpmxrh',
  multipleStatements: true // Enable multiple statements if needed
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Enable CORS for all routes
app.use(cors());

// Express middleware to parse incoming JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle form submissions
app.post('/store-data', (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Replace with your frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Retrieve form data
  const { name, email, phone, date, department, message } = req.body;

  console.log('Received Form Data:', { name, email, phone, date, department, message });

  // Insert form data into MySQL database using prepared statements
  const sql = 'INSERT INTO appointments (name, email, phone, appointment_date, department, message) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, email, phone, date, department, message], (err, result) => {
    if (err) {
      console.error('Error storing data in the database:', err);
      return res.status(500).send('Error storing data in the database'); // Send an error response
    }

    console.log('Data stored successfully in the database');
    return res.status(200).send('Form submitted successfully'); // Send a success response
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});