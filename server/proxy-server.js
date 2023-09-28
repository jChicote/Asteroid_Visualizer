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
    next();
});

app.get('/proxy', (req, res) => {
    const targetUrl = req.query.url; // Get the target URL from the query parameter

    console.log(targetUrl);

    https.get(targetUrl, (responseFromTarget) => {
        if (responseFromTarget.statusCode !== 200) {
            console.error(`Error: ${responseFromTarget.statusCode} ${responseFromTarget.statusMessage}`);
            res.status(responseFromTarget.statusCode).send(`Error: ${responseFromTarget.statusCode} ${responseFromTarget.statusMessage}`);
            return;
        }

        const contentType = responseFromTarget.headers['content-type'];
        res.setHeader('Content-Type', "text/plain");

        let data = '';
    
        responseFromTarget.on('data', (chunk) => {
            data += chunk;
        });
    
        responseFromTarget.on('end', () => {
            res.send(data);  // Send the response data back to the client
        });
    }).on('error', (error) => {
        console.log(`Error: ${error.message}`);
        res.status(500).send(`Error: ${error.message}`);
    });
 });

app.listen(port, host, () => {
    console.log(`This is a proxy server on port ${port} at host ${host}.`);
});