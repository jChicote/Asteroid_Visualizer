
// TODO: Make the function non type specific
export async function SendAsync(method, url, options, isAsync) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
    
        // Initialize the request
        xhr.open(method, url, true);

        options.forEach(element => {
            xhr.setRequestHeader(element.name, element.value);
        });
    
        // Define a function to handle the response when it's received
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // Check if the request is complete
                if (xhr.status === 200) { // Check if the request was successful (HTTP status code 200)
                    // Parse and use the response data
                    resolve(xhr.responseText);
                } else {
                    // Handle errors here (e.g., display an error message)
                    console.error("Error: " + xhr.status + " " + xhr.statusText);
                }
            }
        };

        // Handle network errors
        xhr.onerror = () => {
            reject(new Error("Network error"));
        };
        
        // Send the request (with optional request body for POST or PUT requests)
        xhr.send();
    });
}