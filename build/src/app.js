"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
function getApp() {
    return typeorm_1.createConnection().then((dbConnection) => __awaiter(this, void 0, void 0, function* () {
        // create express app
        const app = express();
        app.use(bodyParser.json());
        // register express routes from defined application routes
        routes_1.Routes.forEach(route => {
            ;
            app[route.method](route.route, (req, res, next) => {
                const result = new route.controller()[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined
                        ? res.send(result)
                        : undefined);
                }
                else if (result !== null && result !== undefined) {
                    res.send(result);
                }
            });
        });
        // start express server
        return { express: app, dbConnection };
    }));
}
exports.getApp = getApp;
//# sourceMappingURL=app.js.map