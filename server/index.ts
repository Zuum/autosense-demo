/*
 * Copyright (c) 27 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import * as dotenv from 'dotenv'
dotenv.config()

import {Logger} from "./utils/log/Logger";
import {CheckEnv} from "./utils/env/MandatoryEnvChecker";
CheckEnv(Logger)

import {MongoDB} from "./dao/drivers/MongoDB";
const dbDriver = new MongoDB(Logger);

import {ApplicationError} from "./utils/error/ApplicationError";
import {Constants} from "./configs/constants"
import {IDependencies} from "./api/IDependencies";

const dependencies: IDependencies = {
    DB: dbDriver,
    Log: Logger,
    ApplicationError,
    Constants
}

import {ExpressApplication} from "./providers/Express";
const application = new ExpressApplication(dependencies);


import {Router} from "./api/Router";

const orderedMiddlewares = Router.getMiddlewaresOrdered()
orderedMiddlewares.forEach(mw => application.registerMiddleware(mw))

const controllers = Router.getAllControllers()
controllers.forEach(ctrl => application.registerController(ctrl))

application.start();
