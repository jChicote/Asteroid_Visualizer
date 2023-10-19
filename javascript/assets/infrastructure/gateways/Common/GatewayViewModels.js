
export class GatewayViewModel {
    constructor(isSuccessful, data, error){
        this.isSuccessful = isSuccessful,
        this.data = data,
        this.error = error;
    }
}