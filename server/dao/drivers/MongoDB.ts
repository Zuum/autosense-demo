/*
 * Copyright (c) 25 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import {IDriver} from "../IDriver";
import {IStation, IStationFilter, IStationUpdate} from "../models/IStation";
import * as mongoose from 'mongoose';
import {ILog} from "../../utils/log/ILog";
import * as fs from 'fs';
import path from "path";
import {Model} from "mongoose";

export class MongoDB implements IDriver {
    Station: Model<IStation>;

    constructor(Log: ILog) {
        const connectionOptions: mongoose.ConnectOptions = {}

        // Create the database connection
        mongoose.connect(process.env.MONGO_CONNECTION_STRING, connectionOptions)

        // CONNECTION EVENTS
        // When successfully connected
        mongoose.connections[0].on('connected', function () {
            Log.info('Mongoose default connection open to ' + process.env.MONGO_CONNECTION_STRING)
        })

        // If the connection throws an error
        mongoose.connections[0].on('error', function (err) {
            Log.info('Mongoose default connection error: ' + err)
            mongoose.disconnect()
        })

        // When the connection is disconnected
        mongoose.connections[0].on('disconnected', function () {
            Log.info('Mongoose default connection disconnected')
            mongoose.connect(process.env.MONGO_CONNECTION_STRING, connectionOptions)
        })

        // register all models
        const dirPath = path.resolve(__dirname + './../models' )
        const files = fs.readdirSync(dirPath)
        files.forEach((file) => {
            require(dirPath + '/' + file)
        })

        this.Station = mongoose.models.Station;
    }

    async addStation(station: IStation): Promise<void> {
        const newStation = new this.Station(station);

        await newStation.save();
    }

    async deleteStation(id: string): Promise<void> {
        await this.Station.deleteOne({id})
    }

    async getStation(id: string): Promise<IStation> {
        return this.Station.findOne({id})
    }

    async getStations(filterParams: IStationFilter): Promise<IStation[]> {
        const filter: { location?: object, 'pumps.fuel_type'?: string } = {};
        if (filterParams.longitude && filterParams.latitude) {
            // https://www.mongodb.com/docs/manual/reference/operator/query/near/
            filter.location = {
                $near: {
                    $maxDistance: 10000,
                    $geometry: {
                        type: "Point",
                        coordinates: [filterParams.longitude, filterParams.latitude]
                    }
                }
            }
        }
        if (filterParams.fuel_type) {
            filter['pumps.fuel_type'] = filterParams.fuel_type
        }
        return this.Station.find(filter)
    }

    async updateStation(id: string, updateObject: IStationUpdate): Promise<void> {
        // This update is not atomic. Race conditions are possible.
        const station = await this.Station.findOne({id})

        if (updateObject.name) {
            station.name = updateObject.name;
        }

        // This is not an optimal lookup of O(n*log(n)) complexity
        // But arrays generally should be no more than 10 elements
        if (updateObject.pumps.length > 0) {
            updateObject.pumps.forEach(pumpUpdate => {
                const toUpdate = station.pumps.find(pump => pump.id === pumpUpdate.id)

                if (pumpUpdate.price) {
                    toUpdate.price = pumpUpdate.price
                }
                if (typeof pumpUpdate.available !== 'undefined') {
                    toUpdate.available = pumpUpdate.available
                }
            })
        }

        await station.save();
    }

}
