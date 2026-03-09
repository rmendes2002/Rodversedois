const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve all static files from the current directory
app.use(express.static(__dirname));

// Send index.html for any remaining requests (SPA behavior if needed)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Rodverse server running on port ${PORT}`);
});
