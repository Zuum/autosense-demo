/*
 * Copyright (c) 27 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import morgan, { StreamOptions } from "morgan";
import {Logger} from "../../utils/log/Logger";
import {Middleware} from "../Middleware";
import {IDependencies} from "../IDependencies";

const stream: StreamOptions = {
    write: (message) => Logger.info(message),
};
export const AccessLog = new Middleware(function (deps: IDependencies) {
    return morgan(
        ":method :url :status :res[content-length] - :response-time ms",
        { stream }
    )
});
