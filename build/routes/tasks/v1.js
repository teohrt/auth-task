"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var taskController_1 = __importDefault(require("../../controllers/taskController"));
exports.default = (function (logger, dbClient) {
    var taskController = taskController_1.default(logger, dbClient);
    var router = express_1.Router();
    router.post('/tasks', taskController.createTask);
    router.get('/tasks', taskController.getAllTasksFromUser);
    router.get('/tasks/:taskId', taskController.getTask);
    router.put('/tasks/:taskId', taskController.updateTask);
    router.delete('/tasks/:taskId', taskController.deleteTask);
    return router;
});
