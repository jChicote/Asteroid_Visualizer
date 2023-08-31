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