import { ObjectMapper } from "../Infrastructure/Mapper/ObjectMapper.js";
import { ServiceScopes } from "./ServiceContainer.js";

export function RegisterSharedServices(container) {
    container.RegisterService(ObjectMapper, {}, ServiceScopes.Singleton);
}
