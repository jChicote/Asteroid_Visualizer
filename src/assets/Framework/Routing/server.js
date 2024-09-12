import express from "express";
import cors from "cors";
const fetch = (await import("node-fetch")).default;
const app = express();

app.use(cors());

app.get("/api/nasa", async (req, res) => {
    const { apiUrl } = req.query;
    console.log(apiUrl);

    try {
        // Fetch data
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return res.status(500).json({ error: "Error fetching data from API" });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching data from API" });
    }
});

app.listen(80, function() {
    console.log("CORS-enabled web server listening on port 80");
});
