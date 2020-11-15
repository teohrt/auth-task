"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var v1_1 = __importDefault(require("./v1"));
var v2_1 = __importDefault(require("./v2"));
exports.default = (function (logger, dbClient) {
    var v1Routes = v1_1.default(logger, dbClient);
    var v2Routes = v2_1.default(logger, dbClient);
    var router = express_1.Router();
    router.use('/v1', v1Routes);
    router.use('/v2', v2Routes);
    return router;
});
