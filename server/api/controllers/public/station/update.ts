/*
 * Copyright (c) 27 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import * as Joi from 'joi';
import {IDependencies} from "../../../IDependencies";
import {Controller} from "../../../Controller";
import {Handler} from "express";
import {IStationUpdate} from "../../../../dao/models/IStation";

export = new Controller(
    '/api/v1/public/stations/:id',
    'put',
    Joi.object({
        name: Joi.string().max(128),
        pumps: Joi.array().items(Joi.object({
            id: Joi.number().required(),
            price: Joi.number().min(0),
            available: Joi.boolean()
        }))
    }),
    function ({DB, Log, ApplicationError, Constants}: IDependencies): Handler {
        return async function(req, res, next) {
            const updateBody: IStationUpdate = req.body;
            await DB.updateStation(req.params.id, updateBody)

            return {}
        }
    }
)
