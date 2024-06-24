// TODO: Make this file ESM syntax when Node.js supports it.

const cors = require("cors");
const express = require("express");
const https = require("https");
const app = express();
const port = 8080;
const host = "http://solarsystemvisualizer-test-bucket.s3-website-ap-southeast-2.amazonaws.com";

const httpsAgent = new https.Agent({
    keepAlive: true,
    maxSockets: 50 // Adjust this based on your load requirements
});

const allowedOrigins = [
    "https://ssd-api.jpl.nasa.gov/sbdb_query.api/*",
    "https://ssd-api.jpl.nasa.gov/sbdb_query.api"
]

app.use(cors({
    origin: "https://ssd-api.jpl.nasa.gov/sbdb_query.api/*"
}));

app.use((req, res, next) => {
    next();
});

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     cors();
//     next();
// });

app.get("/proxy", (req, res) => {
    const targetUrl = decodeURI(req.query.url);

    const options = {
        agent: httpsAgent // Reuse connections
    };

    https.get(targetUrl, options, (responseFromTarget) => {
        console.log(targetUrl);

        if (responseFromTarget.statusCode !== 200) {
            console.error(`Error: ${responseFromTarget.statusCode} ${responseFromTarget.statusMessage}`);
            res.status(responseFromTarget.statusCode).send(`Error: ${responseFromTarget.statusCode} ${responseFromTarget.statusMessage}`);
            return;
        }

        responseFromTarget.pipe(res);
    });
}).on("error", (error) => {
    console.log(`Error: ${error}`);
    res.status(500).send(`Error: ${error.message}`);
});

app.listen(port, host, () => {
    console.log(`This is a proxy server on port ${port} at host ${host}.`);
});
