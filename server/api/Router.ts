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
        const res: string[] = this.getFiles(__dirname + '/controllers');
        return res.map((file: string) => (
            // to make it synchronous. Only ran once - on startup
            // in some cases may be considered a vulnerability - if attacker can add file to
            // controllers folder - this can execute code with application user rights and envs
            // but generally this would mean that attacker can change any other file to execute
            // code anyway
            require(file)
        ));
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
