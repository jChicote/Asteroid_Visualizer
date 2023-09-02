// Note: Please used the more general SBDB database over the close-approach-neo database.
// This generalised database should provide information of the orbital elements of the small-body objects and filters for neo

const apiUrl = "https://ssd-api.jpl.nasa.gov/sbdb.api";

// This might not work as it will need to be compliant to the restrictions set by NASA
var requestOptions = {
    'content-type': 'application/json',
    method: 'GET',
    // mode: 'no-cors',
    redirect: 'follow'
}

export async function GetSmallBodyObjects() {
    var response = await fetch(apiUrl, requestOptions);

    // if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    var data = await response.json();

    return data;
}

export async function TestGetRequest() {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the HTTP method (GET, POST, PUT, etc.) and the API endpoint URL
    var method = "GET";
    var url = "https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=Eros";

     // Initialize the request
    xhr.open(method, url, true);

    // Set any request headers if needed (e.g., authentication headers)
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
    xhr.send(/* request_body_if_needed */);
}