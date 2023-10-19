
class BaseResult {
    constructor(errorMessage, result, success){
        this.errorMessage = errorMessage;
        this.result = result;
        this.success = success;
    }
}

export class SuccessfulResult extends BaseResult {
    constructor(viewModel){
        super("", viewModel, true);
    }
}

export class ErrorResult extends BaseResult {
    constructor(errorMessage){
        super(errorMessage, null, false);
    }
}