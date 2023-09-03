
const apiUrl = "http://localhost:8080/proxy?url=https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=Eros";

export async function InvokeSmallBodyDatabase() {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the HTTP method (GET, POST, PUT, etc.) and the API endpoint URL
    var method = "GET";
    var url = apiUrl;

     // Initialize the request
    xhr.open(method, url, true);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer YOUR_ACCESS_TOKEN");

    // Define a function to handle the response when it's received
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // Check if the request is complete
        if (xhr.status === 200) { // Check if the request was successful (HTTP status code 200)
            // Parse and use the response data
            var response = JSON.parse(xhr.responseText);
            console.log(response);
        } else {
            // Handle errors here (e.g., display an error message)
            console.error("Error: " + xhr.status + " " + xhr.statusText);
        }
        }
    };
    
    // Send the request (with optional request body for POST or PUT requests)
    xhr.send();
}