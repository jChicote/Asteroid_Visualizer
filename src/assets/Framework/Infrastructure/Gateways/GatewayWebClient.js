export class GatewayWebClient {
    async SendAsync(method, url, options, isAsync) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            try {
                const fetchOptions = {
                    method: method,
                    headers: options.headers || {}
                };

                if (options.body) {
                    fetchOptions.body = JSON.stringify(options.body);
                    fetchOptions.headers["Content-Type"] = "application/json";
                    fetchOptions.headers.Accept = "application/json";
                    fetchOptions.headers["Access-Control-Allow-Origin"] = "https://www.solarsystemvisualizer.com";
                }

                const response = await fetch(url, fetchOptions);

                // Compose the response object
                const responseObject = {
                    ResponseStatus: response.status,
                    responseText: response.json()
                };

                resolve(responseObject);
            } catch (error) {
                const errorResponse = {
                    ResponseStatus: error.response.status || 500, // Default to 500 if status not available
                    responseText: error.message || 'Unknown error occurred'
                };

                reject(errorResponse);
            }
        });
    }
}
