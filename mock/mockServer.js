const express = require('express');
const app = express();

app.get('/stream', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Transfer-Encoding', 'chunked');

    const data = Array.from({ length: 150000 }, (_, i) => JSON.stringify({ id: i, value: `item${i}` }));

    data.forEach((chunk, index) => {
        setTimeout(() => res.write(chunk + '\n'), index * 0.1);
    });

    setTimeout(() => res.end(), data.length);
});

app.listen(3001, () => {
    console.log('Mock server running on http://localhost:3001');
});