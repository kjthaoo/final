const express = require('express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const app = express();
const port = 3000;

// MongoDB connection URL
const mongoURI = 'mongodb+srv://kthao43726:5RUd67PJQX7fPhWl@cluster0.ejq1kfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        const db = client.db('your-database-name');
        const commentsCollection = db.collection('comments');

        // Middleware to parse JSON request body
        app.use(express.json());

        // Route to handle POST requests for saving comments
        app.post('/comments', (req, res) => {
            const newComment = req.body;
            commentsCollection.insertOne(newComment)
                .then(result => {
                    res.status(201).send('Comment saved successfully');
                })
                .catch(error => {
                    console.error('Error saving comment to MongoDB:', error);
                    res.status(500).send('Internal server error');
                });
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


/*
const express = require('express');
const path = require('path');

const app = express();

const portfolioDirectory = path.join(__dirname, 'final');

app.use(express.static(portfolioDirectory));

app.get('/', (req, res) => {
    res.sendFile(path.join(portfolioDirectory, 'index.html'));
});

const PORT = process.env.PORT || 3000;

// then exxpress server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

*/