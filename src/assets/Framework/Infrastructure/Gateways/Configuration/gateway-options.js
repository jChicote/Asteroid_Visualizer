export const isInDevelopment = false;

export const hostName = window.location.host;
export const protocol = "https://";
export const routePath = "/api/nasa";

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
