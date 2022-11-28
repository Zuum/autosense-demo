/*
 * Copyright (c) 27 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import * as Joi from 'joi';
import {IDependencies} from "../../IDependencies";
import {Controller} from "../../Controller";
import {Handler} from "express";

export = new Controller(
    '/api/v1/public/health',
    'get',
    Joi.object({}),
    function ({DB, Log, ApplicationError, Constants}: IDependencies): Handler {
        return async function(req, res, next) {
            return { status: 'System operational' }
        }
    }
)
