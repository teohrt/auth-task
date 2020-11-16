"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// import getTaskController from '../../controllers/taskController';
exports.default = (function (logger, dbClient) {
    // const taskController = getTaskController(logger, dbClient);
    var router = express_1.Router();
    // router.use('/add', taskController.addTask);
    return router;
});
