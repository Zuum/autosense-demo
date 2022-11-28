/*
 * Copyright (c) 25 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import * as mongoose from "mongoose";
import {IPoint, IPump, IStation} from "./IStation";

const pointSchema = new mongoose.Schema<IPoint>({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true,
        validate: {
            validator: function(v: number[]) {
                if (v.length !== 2) {
                    return false;
                }

                if (v[0] < -90 || v[0] > 90) {
                    return false
                }

                if (v[1] < -180 || v[1] > 180) {
                    return false
                }

                return true;
            }
        }
    }
}, {
    _id: false
});

const PumpSchema = new mongoose.Schema<IPump>({
    id: {
      type: Number,
    },
    fuel_type: {
        type: String,
        enum: ['BENZIN_95', 'BENZIN_98', 'DIESEL'],
        index: true
    },
    price: {
        type: Number,
        min: 0
    },
    available: {
        type: Boolean,
        default: false,
        index: true
    }
}, {
    _id: false
})

const StationSchema = new mongoose.Schema<IStation>({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
        maxLength: 64
    },
    name: {
        type: String,
        required: true,
        maxLength: 128
    },
    address: {
        type: String,
        required: true,
        maxLength: 128
    },
    city: {
        type: String,
        required: true,
        maxLength: 128
    },
    location: {
        type: pointSchema,
        index: '2dsphere'
    },
    latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90
    },
    longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180
    },
    pumps: {
        type: [PumpSchema],
        default: []
    }
});

// middleware to assign composite location of GeoJSON type
// while preserving verbose long \ latt fields
// Has a limitation of only working if save() function is called
// and add performed on application level
StationSchema.pre('save', async function(next) {
    this.location = {
        type: 'Point',
        // this is correct oder per docs: https://www.mongodb.com/docs/manual/reference/geojson/
        coordinates: [
            this.longitude,
            this.latitude
        ]
    }

    next();
});



export = mongoose.model<IStation>('Station', StationSchema);
