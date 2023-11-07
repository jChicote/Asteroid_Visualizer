/**
 * Provides a simplified mechanism of mapping one object to another.
 */
export class ObjectMapper {
    constructor() {
        this.configurations = new Map();
    }

    /**
     * Registers a mapping configuration to map the source type to the destination type.
     * @param {*} sourceType
     * @param {*} destinationType
     * @param {*} mappingFunction The function responsible for mapping.
     */
    AddConfiguration(sourceType, destinationType, mappingFunction) {
        const key = `${sourceType.name}-${destinationType.name}`;
        this.configurations.set(key, mappingFunction);
    }

    /**
     * Maps the source object to an instance of the destination object.
     * @param {*} sourceObject
     * @param {*} destinationType
     */
    Map(sourceObject, destinationType) {
        if (sourceObject == null) {
            throw new Error("Source objects must be defined.");
        } else if (destinationType == null) {
            throw new Error("Destination type must be defined.");
        }

        const sourceType = sourceObject.constructor;
        const key = `${sourceType.name}-${destinationType.name}`;
        const mappingFunction = this.configurations.get(key);

        if (mappingFunction == null) {
            throw new Error(`Mapping configuration not found for ${sourceType.name} to ${destinationType.name}.`);
        }

        return mappingFunction(sourceObject, new destinationType.prototype.constructor());
    }
}
