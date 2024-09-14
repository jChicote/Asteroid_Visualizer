export class GatewayClient {
    async SendAsync(apiUrl) {
        try {
            const response = await fetch(apiUrl);

            // Check if the response has a JSON content type
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                return { content: data, status: response.status };
            } else {
                // Handle non-JSON response (e.g., HTML error page)
                const text = await response.text();
                console.error("Non-JSON response:", text);
                throw new Error(`Expected JSON but received: ${contentType}`);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
}
