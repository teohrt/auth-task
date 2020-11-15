"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var v1Statuses = ['New', 'Completed'];
exports.default = (function (logger, dbClient) { return ({
    createTask: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, status, name, description, userId, result, taskId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logger.info('Task Controller: createTask');
                    _a = req.body, status = _a.status, name = _a.name, description = _a.description;
                    userId = req.user.id;
                    // Validate status input
                    if (!v1Statuses.includes(status)) {
                        logger.info("User " + userId + " input bad status value: " + status);
                        res.status(400).send({ inputError: 'Status may only be \'New\' or \'Completed\'' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, dbClient.createTask(userId, status, name, description)];
                case 1:
                    result = _b.sent();
                    taskId = result.rows[0].id;
                    res.status(201).send({ taskId: taskId });
                    return [2 /*return*/];
            }
        });
    }); },
    getAllTasksFromUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var ownerId, result, tasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger.info('Task Controller: getAllTasksFromUser');
                    ownerId = req.user.id;
                    return [4 /*yield*/, dbClient.getAllTasksFromUser(ownerId)];
                case 1:
                    result = _a.sent();
                    tasks = result.rows;
                    res.status(200).send({ tasks: tasks });
                    return [2 /*return*/];
            }
        });
    }); },
    getTask: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var taskId, userId, result, task, taskOwnerId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger.info('Task Controller: getTask');
                    taskId = req.params.taskId;
                    userId = req.user.id;
                    return [4 /*yield*/, dbClient.getTask(Number(taskId))];
                case 1:
                    result = _a.sent();
                    task = result.rows[0];
                    taskOwnerId = task.owner_id;
                    if (taskOwnerId === userId) {
                        res.status(200).send({ task: task });
                    }
                    else {
                        res.status(403).send({ forbiddenError: 'Unable to retrieve task - Differing task owner' });
                    }
                    return [2 /*return*/];
            }
        });
    }); },
    updateTask: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, status, name, description, taskId, userId, result, task, taskOwnerId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logger.info('Task Controller: updateTask');
                    _a = req.body, status = _a.status, name = _a.name, description = _a.description;
                    taskId = req.params.taskId;
                    userId = req.user.id;
                    // Validate status input
                    if (!v1Statuses.includes(status)) {
                        logger.info("User " + userId + " input bad status value: " + status);
                        res.status(400).send({ inputError: 'Unable to update task - Status may only be \'New\' or \'Completed\'.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, dbClient.getTask(Number(taskId))];
                case 1:
                    result = _b.sent();
                    if (result.rowCount < 1) {
                        logger.info("User " + userId + " requested a non existant task id: " + taskId);
                        res.status(404).send({ resourceNotFound: 'Unable to update task - Task not found' });
                        return [2 /*return*/];
                    }
                    task = result.rows[0];
                    taskOwnerId = task.owner_id;
                    if (taskOwnerId !== userId) {
                        res.status(403).send({ forbiddenError: 'Unable to update task - Differing task owner' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, dbClient.updateTask(Number(taskId), status, name, description)];
                case 2:
                    _b.sent();
                    res.status(200).send();
                    return [2 /*return*/];
            }
        });
    }); },
    deleteTask: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var taskId, userId, result, task, taskOwnerId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger.info('Task Controller: deleteTask');
                    taskId = req.params.taskId;
                    userId = req.user.id;
                    return [4 /*yield*/, dbClient.getTask(Number(taskId))];
                case 1:
                    result = _a.sent();
                    if (result.rowCount < 1) {
                        logger.info("User " + userId + " requested a non existant task id: " + taskId);
                        res.status(404).send({ resourceNotFound: 'Unable to delete task - Task not found' });
                        return [2 /*return*/];
                    }
                    task = result.rows[0];
                    taskOwnerId = task.owner_id;
                    if (taskOwnerId !== userId) {
                        res.status(403).send({ forbiddenError: 'Unable to delete task - Differing task owner' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, dbClient.deleteTask(Number(taskId))];
                case 2:
                    _a.sent();
                    res.status(200).send();
                    return [2 /*return*/];
            }
        });
    }); },
}); });
