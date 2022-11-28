/*
 * Copyright (c) 27 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import {Middleware} from "../api/Middleware";
import {Controller} from "../api/Controller";

export interface IApplication {
    registerMiddleware(middleware: Middleware): void
    registerController(controller: Controller): void
    start(): void
}
