/*
 * Copyright (c) 26 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import {ILog} from "../log/ILog";

const mandatoryEnvVariables: string[] = [
    'NODE_ENV',
    'PORT',
    'API_SECRET',
    'MONGO_CONNECTION_STRING'
];

export function CheckEnv(Log: ILog): void {
    const missingEnvs: string[] = [];

    mandatoryEnvVariables.forEach(varName => {
        if (!process.env[varName]) {
            missingEnvs.push(varName)
        }
    })

    if (missingEnvs.length > 0) {
        Log.fatal(`Following env variables are required, but not present: ${missingEnvs}`);
        process.exit(-1);
    }
}
