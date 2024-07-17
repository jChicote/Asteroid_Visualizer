var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());

// Start the server
const PORT = 5173;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
