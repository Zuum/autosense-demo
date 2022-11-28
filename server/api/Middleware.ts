/*
 * Copyright (c) 25 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import {Handler} from "express";
import {IDependencies} from "./IDependencies";

export class Middleware {
    path: string;
    handlerCreator: (deps: IDependencies) => Handler;

    constructor(handlerCreator: (deps: IDependencies) => Handler, path = "*") {
        this.path = path;
        this.handlerCreator = handlerCreator;
    }

    buildAndReturnHandler(dependencies: IDependencies): Handler {
        return this.handlerCreator(dependencies)
    }
}
