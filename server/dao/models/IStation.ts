/*
 * Copyright (c) 28 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

export type FUEL_TYPE = 'BENZIN_95' | 'BENZIN_98' | 'DIESEL'

interface IPumpUpdate {
    id: number;
    available?: boolean;
    price?: number
}

export interface IStationUpdate {
    name?: string;
    pumps?: IPumpUpdate[]
}

export interface IStationFilter {
    fuel_type?: FUEL_TYPE,
    latitude?: number,
    longitude?: number
}

export interface IPoint {
    type: 'Point',
    coordinates: number[]
}

export interface IPump extends IPumpUpdate{
    id: number;
    fuel_type: FUEL_TYPE,
    price: number;
    available: boolean;
}

export interface IStation extends IStationUpdate {
    id: string;
    name: string;
    address: string;
    city: string;
    location: IPoint;
    latitude: number;
    longitude: number;
    pumps: IPump[];
}
