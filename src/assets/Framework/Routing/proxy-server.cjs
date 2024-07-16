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

const allowedOrigins = ["*"];

// Configure CORS to allow only GET requests from the specified origins
app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'OPTIONS'] // Restrict to GET requests only
}));

// Handle OPTIONS requests for preflight
app.options('*', cors({ origin: allowedOrigins }));

app.use((req, res, next) => {
    next();
});

app.get("/proxy", (req, res) => {
    const targetUrl = decodeURI(req.query.url);

    const options = {
        agent: httpsAgent // Reuse connections
    };

    https.get(targetUrl, options, (responseFromTarget) => {
        console.log(targetUrl);

        if (responseFromTarget.statusCode!== 200) {
            console.error(`Error: ${responseFromTarget.statusCode} ${responseFromTarget.statusMessage}`);
            res.status(responseFromTarget.statusCode).send(`Error: ${responseFromTarget.statusCode} ${responseFromTarget.statusMessage}`);
            return;
        }

        responseFromTarget.pipe(res);
    }).on("error", (error) => {
        console.log(`Error: ${error}`);
        res.status(500).send(`Error: ${error.message}`);
    });
});

app.listen(port, host, () => {
    console.log(`This is a proxy server on port ${port} at host ${host}.`);
});
