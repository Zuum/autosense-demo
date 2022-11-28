/*
 * Copyright (c) 27 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import express, {Express, Request, Response, NextFunction} from 'express';
import {Controller} from "../api/Controller";
import {IApplication} from "./IApplication";
import {IDependencies} from "../api/IDependencies";
import {Middleware} from "../api/Middleware";
import {ApplicationError} from "../utils/error/ApplicationError";

export class ExpressApplication implements IApplication{
    private app: Express;
    private isStarted = false;
    private dependencies: IDependencies

    constructor(dependencies: IDependencies) {
        this.dependencies = dependencies;

        this.app = express()
        this.app.use(express.json());
    }

    registerMiddleware(middleware: Middleware) {
        if (this.isStarted) {
            throw new Error("Registering functionality on started server")
        }

        this.app.use(middleware.path, middleware.buildAndReturnHandler(this.dependencies))
    }

    registerController(controller: Controller) {
        if (this.isStarted) {
            throw new Error("Registering functionality on started server")
        }

        this.app[controller.method](controller.path, controller.buildAndReturnHandler(this.dependencies))
    }

    private register404Handler() {
        const ApplicationError = this.dependencies.ApplicationError
        // Declare 404 handler after all other routes are registered
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            next(ApplicationError.NotFound())
        })
    }

    private registerTopLevelErrorHandler() {
        // Error handler register last
        const ApplicationError = this.dependencies.ApplicationError

        this.app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
            // Already parsed and known error, proceed to respond to client
            if (err.name !== 'ApplicationError') {
                err = ApplicationError.parseError(err)
            }
            const statusCode = (err as ApplicationError).statusCode;
            const data = (err as ApplicationError).formatDataForResponse();

            const payload = {
                statusCode: statusCode,
                success: false,
                data
            }

            return res.status(statusCode).json(payload)
        })
    }

    start() {
        this.isStarted = true

        // this should be registered after all other controllers
        this.register404Handler();
        this.registerTopLevelErrorHandler();

        this.app.listen(process.env.PORT || 3000,
            () => this.dependencies.Log.info(`Listening on ${process.env.PORT || 3000}`))
    }

}
