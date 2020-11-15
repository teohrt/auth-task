"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = __importDefault(require("../../controllers/authController"));
exports.default = (function (logger, dbClient) {
    var authController = authController_1.default(logger, dbClient);
    var router = express_1.Router();
    router.post('/register', authController.register);
    router.post('/login', authController.login);
    return router;
});
