const cors = require('cors');
const express = require('express');
const https = require('https');
const app = express();
const port = 8080;
const host = "localhost";

// Enable CORS for all origins (not recommended for production)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    cors();
    next();
});

app.get('/proxy', (req, res) => {
    var targetUrl = decodeURI(req.query.url);

    https.get(targetUrl, (responseFromTarget) => {
        console.log(targetUrl);

        if (responseFromTarget.statusCode !== 200) {
            console.error(`Error: ${responseFromTarget.statusCode} ${responseFromTarget.statusMessage}`);
            res.status(responseFromTarget.statusCode).send(`Error: ${responseFromTarget.statusCode} ${responseFromTarget.statusMessage}`);
            return;
        }

        responseFromTarget.pipe(res);
        
    });
}).on('error', (error) => {
    console.log(`Error: ${error}`);
    res.status(500).send(`Error: ${error.message}`);
});

app.listen(port, host, () => {
    console.log(`This is a proxy server on port ${port} at host ${host}.`);
});