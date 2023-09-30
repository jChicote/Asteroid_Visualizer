const express = require('express');
const https = require('https');
const cors = require('cors');
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
    const targetUrl = req.query.url; // Get the target URL from the query parameter

    console.log(targetUrl);

    const contentType = req.headers['content-type'];
    res.setHeader('Content-Type', contentType);

    const targetRequest = https.request(targetUrl, (targetResponse) => {
        res.status(targetResponse.statusCode);
        res.set(targetResponse.headers);

        targetResponse.pipe(res, {
            end: true,
        })
    });

    targetRequest.on('error', (error) => {
        console.error(`Error: ${error.message}`);
        res.status(500).send(`Error: ${error.message}`);
    });

    if (req.method === 'POST' || req.method === 'PUT') {
        console.log('Forwarding request body...');
        req.pipe(targetRequest, {
            end: true,
        });
    } else {
        console.log('No request body to forward');
        targetRequest.end();
    }
}).on('error', (error) => {
    console.log(`Error: ${error.message}`);
    res.status(500).send(`Error: ${error.message}`);
});

//     https.get(targetUrl, (responseFromTarget) => {
//         if (responseFromTarget.statusCode !== 200) {
//             console.error(`Error: ${responseFromTarget.statusCode} ${responseFromTarget.statusMessage}`);
//             res.status(responseFromTarget.statusCode).send(`Error: ${responseFromTarget.statusCode} ${responseFromTarget.statusMessage}`);
//             return;
//         }

//         //res.writeHead(targetRes.statusCode, responseFromTarget.headers);

//         // const contentType = responseFromTarget.headers['content-type'];
//         // res.setHeader('Content-Type', "text/plain");

//         // console.log(req.headers['content-type']);

//         // let data = '';

//         // // responseFromTarget.on('data', (chunk) => {
//         // //     data += chunk;
//         // // });
//         // responseFromTarget.pipe;

//         responseFromTarget.on('end', () => {
//             res.send(data);  // Send the response data back to the client
//         });
//     }).on('error', (error) => {
//         console.log(`Error: ${error.message}`);
//         res.status(500).send(`Error: ${error.message}`);
//     });
//  });

app.listen(port, host, () => {
    console.log(`This is a proxy server on port ${port} at host ${host}.`);
});