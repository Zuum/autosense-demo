/*
 * Copyright (c) 25 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import {Handler} from "express";
import {Schema} from "joi";
import {IDependencies} from "./IDependencies";
import {IRequest} from "../interfaces/IRequest";
import {IResponse} from "../interfaces/IResponse";

export class Controller{
    path: string;
    method: "get" | "post" | "patch" | "put" | "delete";
    handlerCreator: (deps: IDependencies) => Handler;
    validationSchema: Schema;

    constructor(path: string,
                method: "get" | "post" | "patch" | "put" | "delete",
                validationSchema: Schema,
                handlerCreator: (deps: IDependencies) => Handler) {
        this.path = path;
        this.method = method;
        this.handlerCreator = handlerCreator;
        this.validationSchema = validationSchema
    }

    buildAndReturnHandler(dependencies: IDependencies): Handler {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        return async function(req: IRequest, res: IResponse, next) {
            try {
                await self.validate(req)
                const handler = self.handlerCreator(dependencies)
                const result = await handler(req, res, next)
                if (!res.headersSent) {
                    return res.status(200).json({ success: true, statusCode: 200, data: result })
                }
            } catch (e) {
                return next(dependencies.ApplicationError.JsonValidation(e))
            }
        }
    }

    private async validate (req: IRequest) {
        if (!this.validationSchema) {
            return
        }
        const objectToValidate = this.method === 'get' || this.method === 'delete' ? req.query : req.body

        // will throw on validation, only to be catched higher
        const value = await this.validationSchema.validateAsync(objectToValidate, {
            stripUnknown: false
        })

        if (this.method === 'get') {
            req.query = value
        } else {
            req.body = value
        }
    }

}
