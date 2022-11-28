/*
 * Copyright (c) 27 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

export interface IValidationError {
    path: (string | number)[];
    type: string;
    message: string;
    context?: object
}

export interface IErrorResponseData {
    internalCode: number;
    message: string;
    errors?: IValidationError[]
}
