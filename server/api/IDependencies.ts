/*
 * Copyright (c) 26 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import {IDriver} from "../dao/IDriver";
import {ILog} from "../utils/log/ILog";
import {ApplicationError} from "../utils/error/ApplicationError";
import {Constants} from "../configs/constants";

export interface IDependencies {
    DB: IDriver;
    Log: ILog;
    ApplicationError: typeof ApplicationError;
    Constants: typeof Constants;
}
