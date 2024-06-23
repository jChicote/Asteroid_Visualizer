export class ProxyServerUrlProvider {
    Provide() {
        return "http://localhost:" + 8080 + "/proxy?url=";
    }
}
