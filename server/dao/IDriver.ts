/*
 * Copyright (c) 27 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import {IStation, IStationFilter, IStationUpdate} from "./models/Station";

export interface IDriver {
    getStations(filterParams: IStationFilter): Promise<IStation[]>
    getStation(id: string): Promise<IStation>
    addStation(station: IStation): Promise<void>
    updateStation(id: string, updateObject: IStationUpdate): Promise<void>
    deleteStation(id: string): Promise<void>
}
