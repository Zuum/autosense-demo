/*
 * Copyright (c) 27 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import * as Joi from 'joi';
import {IDependencies} from "../../../IDependencies";
import {Controller} from "../../../Controller";
import {Handler} from "express";
import {IStation, IStationFilter} from "../../../../dao/models/IStation";

export = new Controller(
    '/api/v1/public/stations',
    'get',
    Joi.object({
        fuel_type: Joi.string().valid('BENZIN_95', 'BENZIN_98', 'DIESEL'),
        latitude: Joi.number().min(-90).max(90),
        longitude: Joi.number().min(-180).max(180)
    }),
    function ({DB, Log, ApplicationError, Constants}: IDependencies): Handler {
        return async function(req, res, next) {
            const filterParams: IStationFilter = req.query;
            const records: IStation[] = await DB.getStations(filterParams)

            return {items: records}
        }
    }
)
