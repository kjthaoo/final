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
