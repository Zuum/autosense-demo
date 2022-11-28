/*
 * Copyright (c) 25 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import {Middleware} from "../Middleware";
import {IDependencies} from "../IDependencies";

export const Auth = new Middleware(function(deps: IDependencies) {
    return function (req, res, next) {
        const secret = req.headers.authorization;

        if (!secret || secret !== process.env.API_SECRET) {
            return next(deps.ApplicationError.Forbidden())
        }

        return next();
    }
},
    '*')
