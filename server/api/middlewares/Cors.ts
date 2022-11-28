/*
 * Copyright (c) 27 / 11 / 2022
 * Created by Illia Polishchuk for autoSense.ch as demo
 * All rights reserved
 */

import cors from 'cors';
import {Middleware} from "../Middleware";
import {IDependencies} from "../IDependencies";

export const Cors = new Middleware(function(deps: IDependencies) {
    return cors();
})
