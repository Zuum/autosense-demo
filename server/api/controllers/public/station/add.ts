/*
 * Copyright (c) 27 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import * as Joi from 'joi';
import {IDependencies} from "../../../IDependencies";
import {Controller} from "../../../Controller";
import {Handler} from "express";
import {IStation} from "../../../../dao/models/IStation";

export = new Controller(
    '/api/v1/public/stations',
    'post',
    Joi.object({
        id: Joi.string().optional().max(64).required(),
        name: Joi.string().max(128).required(),
        address: Joi.string().max(256).required(),
        city: Joi.string().max(128).required(),
        latitude: Joi.number().min(-90).max(90).required(),
        longitude: Joi.number().min(-180).max(180).required(),
        pumps: Joi.array().items(Joi.object({
            id: Joi.number().required(),
            fuel_type: Joi.string().valid('BENZIN_95', 'BENZIN_98', 'DIESEL'),
            price: Joi.number().min(0.01),
            available: Joi.boolean()
        })).required()
    }),
    function ({DB, Log, ApplicationError, Constants}: IDependencies): Handler {
        return async function(req, res, next) {
            const stationBody: IStation = req.body;
            await DB.addStation(stationBody);

            return {}
        }
    }
)
