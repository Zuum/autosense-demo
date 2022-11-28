/*
 * Copyright (c) 25 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import {Controller} from "./Controller";
import {Middleware} from "./Middleware";
import {AccessLog} from "./middlewares/AccessLog";
import {Cors} from "./middlewares/Cors";
import {SecurityHeaders} from "./middlewares/SecurityHeaders";
import {Auth} from "./middlewares/Auth";
import * as fs from 'fs';
import path from "path";

export class Router {
    private static getFiles(dir: string): string[] {
        const dirents = fs.readdirSync(dir, { withFileTypes: true });
        const files: string[][] = dirents.map((dirent) => {
            const res = path.resolve(dir, dirent.name);
            return dirent.isDirectory() ? this.getFiles(res) : [res];
        });
        return Array.prototype.concat(...files);
    }


    static getAllControllers(): Controller[] {
        // issues with auto walk folder, falling back to manual
        return [
            require('./controllers/public/Health'),
            require('./controllers/public/station/delete'),
            require('./controllers/public/station/add'),
            require('./controllers/public/station/update'),
            require('./controllers/public/station/get'),
            require('./controllers/public/station/list'),
        ]
    }
    static getMiddlewaresOrdered(): Middleware[] {
        return [
            AccessLog,
            SecurityHeaders,
            Cors,
            Auth
        ]
    }
}
