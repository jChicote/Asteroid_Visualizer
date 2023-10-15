
class BaseResult {
    constructor(errorMessage, viewModel, success){
        this.errorMessage = errorMessage;
        this.viewModel = viewModel;
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