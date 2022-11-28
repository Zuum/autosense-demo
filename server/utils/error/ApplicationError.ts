/*
 * Copyright (c) 26 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import {IErrorResponseData, IValidationError} from "./IErrorResponseData";
import {Logger} from "../log/Logger";
import Joi from 'joi';

export class ApplicationError extends Error {
    message: string
    statusCode: number
    internalCode: number
    errorsList: IValidationError[]
    originalError: Error

    constructor(internalCode: number,
                httpStatusCode: number,
                message: string,
                errorsList: IValidationError[] = [],
                originalError: Error = null) {
        super();
        this.internalCode = internalCode;
        this.statusCode = httpStatusCode;
        this.message = message;
        this.name = this.constructor.name;
        this.errorsList = errorsList;
        this.originalError = originalError;

        // optimization: make this optional. Capturing stack is expensive.
        Error.captureStackTrace(this, this.constructor);
    }

    public formatDataForResponse(): IErrorResponseData {
        return {
            internalCode: this.internalCode,
            message: this.message,
            errors: this.errorsList || []
        }
    }

    static JsonValidation = (e: Joi.ValidationError) => new ApplicationError(400, 400, 'There was an error with data provided', e.details);
    static Forbidden = () => new ApplicationError(403, 403, 'Secret does not match')
    static NotFound = () => new ApplicationError(404, 404, 'Route-method combination does not have associated handler');
    static UnhandledException = (e: Error) => new ApplicationError(-1, 500, 'Unknown error on service side', [], e);

    static parseError(e: Error): ApplicationError {
        const exception = ApplicationError.UnhandledException(e);

        Logger.fatal(e);

        return exception;
    }
}
