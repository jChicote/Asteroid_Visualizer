export const hostUrl = "http://localhost:80/api/nasa"; // This is temporary. Point Url to AWS server instance??

export const textContentOptions = [
    { name: "Authorization", value: "Bearer YOUR_ACCESS_TOKEN" },
    { name: "Content-Type", value: "text/plain" }
];

export const jsonContentOptions = [
    { name: "Authorization", value: "Bearer YOUR_ACCESS_TOKEN" },
    { name: "Content-Type", value: "application/json" }
];

export const HTTPMethods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};
