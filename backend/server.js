const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(cors({ origin: "https://your-site.netlify.app" }));
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create table if it doesn't exist (with an 'isDone' column and new 'address' field)
db.run(`
    CREATE TABLE IF NOT EXISTS form_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        phoneNumber TEXT,
        address TEXT,  -- Added new address column
        category TEXT,
        additionalMessage TEXT,
        startDate TEXT,
        endDate TEXT,
        isDone INTEGER DEFAULT 0
    )
`, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('Table "form_submissions" is ready.');
    }
});

// Create table if it doesn't exist (for contact info)
db.run(`
    CREATE TABLE IF NOT EXISTS contact_info (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phoneNumber TEXT,
        message TEXT,
        isDone INTEGER DEFAULT 0
    )
`, (err) => {
    if (err) {
        console.error('Error creating contact_info table:', err.message);
    } else {
        console.log('Table "contact_info" is ready.');
    }
});

// POST route to handle form submission for form_submissions
app.post('/submit-form', (req, res) => {
    const { firstName, lastName, phoneNumber, address, category, additionalMessage, startDate, endDate } = req.body;

    console.log('Form Data Received:', req.body);

    // Insert data into the database
    const query = `
        INSERT INTO form_submissions (
            firstName, lastName, phoneNumber, address, category, additionalMessage, startDate, endDate
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [firstName, lastName, phoneNumber, address, category, additionalMessage, startDate, endDate];

    db.run(query, values, function (err) {
        if (err) {
            console.error('Error inserting data into table:', err.message);
            res.status(500).json({ message: 'Failed to store data in the database.' });
        } else {
            console.log('Data inserted successfully with ID:', this.lastID);
            res.status(200).json({
                message: 'Form data received and stored successfully!',
                insertedId: this.lastID
            });
        }
    });
});

// POST route to handle form submission for contact_info
app.post('/submit-contact-form', (req, res) => {
    const { name, phoneNumber, message } = req.body;

    console.log('Contact Form Data Received:', req.body);

    // Insert data into the contact_info table
    const query = `
        INSERT INTO contact_info (name, phoneNumber, message)
        VALUES (?, ?, ?)
    `;
    const values = [name, phoneNumber, message];

    db.run(query, values, function (err) {
        if (err) {
            console.error('Error inserting data into contact_info table:', err.message);
            res.status(500).json({ message: 'Failed to store data in the database.' });
        } else {
            console.log('Contact data inserted successfully with ID:', this.lastID);
            res.status(200).json({
                message: 'Contact info received and stored successfully!',
                insertedId: this.lastID
            });
        }
    });
});

// GET route to fetch all submissions from form_submissions
app.get('/get-submissions', (req, res) => {
    const query = "SELECT * FROM form_submissions";
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching data from form_submissions table:', err.message);
            res.status(500).json({ message: 'Failed to fetch data from the database.' });
        } else {
            res.status(200).json(rows);
        }
    });
});

// GET route to fetch all contact info from contact_info
app.get('/get-contact-info', (req, res) => {
    const query = "SELECT * FROM contact_info";
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching data from contact_info table:', err.message);
            res.status(500).json({ message: 'Failed to fetch contact info from the database.' });
        } else {
            res.status(200).json(rows);
        }
    });
});

// POST route to update the "done" status in form_submissions
app.post("/update-status", (req, res) => {
    const { id, isDone, dataType } = req.body;
    let table;
  
    if (dataType === "admin") {
      table = "form_submissions";
    } else if (dataType === "contact") {
      table = "contact_info";
    }
  
    const query = `UPDATE ${table} SET isDone = ? WHERE id = ?`;
    db.run(query, [isDone, id], function (err) {
      if (err) {
        console.error('Error updating status:', err.message);
        return res.status(500).json({ error: "Failed to update status" });
      }
      res.json({ message: "Status updated successfully" });
    });
  });

// Route to clear the form_submissions table
app.get("/clear-table", (req, res) => {
    const query = "DELETE FROM form_submissions";
    
    db.run(query, (err) => {
        if (err) {
            console.error('Error clearing form_submissions table:', err.message);
            return res.status(500).json({ message: 'Error clearing form_submissions table' });
        }
        res.status(200).json({ message: 'form_submissions table cleared successfully' });
    });
});

// Route to clear the contact_info table
app.get("/clear-contact-info", (req, res) => {
    const query = "DELETE FROM contact_info";
    
    db.run(query, (err) => {
        if (err) {
            console.error('Error clearing contact_info table:', err.message);
            return res.status(500).json({ message: 'Error clearing contact_info table' });
        }
        res.status(200).json({ message: 'contact_info table cleared successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
