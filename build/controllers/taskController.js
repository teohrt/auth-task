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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var taskValidator_1 = __importDefault(require("./taskValidator"));
var errorHandler_1 = __importDefault(require("../utilities/errorHandler"));
exports.default = (function (logger, dbClient) {
    var validator = taskValidator_1.default(logger, dbClient);
    var errorHandler = errorHandler_1.default(logger);
    return {
        v1CreateTask: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, name, description, dueDate, userId, status, validatorResult, result, taskId, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger.info('Task Controller: v1CreateTask');
                        _a = req.body, name = _a.name, description = _a.description, dueDate = _a.dueDate;
                        userId = req.user.id;
                        status = req.body.status;
                        if (status === undefined || status === '') {
                            status = 'New';
                        }
                        try {
                            validatorResult = validator.v1ValidateCreateTask(status);
                            if (!validatorResult.isValid) {
                                res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
                                return [2 /*return*/];
                            }
                        }
                        catch (err) {
                            errorHandler.serverError(res, err);
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        logger.info('Creating task');
                        return [4 /*yield*/, dbClient.createTask(userId, status, name, description, dueDate)];
                    case 2:
                        result = _b.sent();
                        taskId = result.rows[0].id;
                        res.status(201).send({ taskId: taskId });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        errorHandler.serverError(res, err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); },
        v2CreateTask: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, name, description, dueDate, userId, status, validatorResult, result, taskId, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger.info('Task Controller: v2CreateTask');
                        _a = req.body, name = _a.name, description = _a.description, dueDate = _a.dueDate;
                        userId = req.user.id;
                        status = req.body.status;
                        if (status === undefined || status === '') {
                            status = 'New';
                        }
                        try {
                            validatorResult = validator.v2ValidateCreateTask(status);
                            if (!validatorResult.isValid) {
                                res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
                                return [2 /*return*/];
                            }
                        }
                        catch (err) {
                            errorHandler.serverError(res, err);
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        logger.info('Creating task');
                        return [4 /*yield*/, dbClient.createTask(userId, status, name, description, dueDate)];
                    case 2:
                        result = _b.sent();
                        taskId = result.rows[0].id;
                        res.status(201).send({ taskId: taskId });
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _b.sent();
                        errorHandler.serverError(res, err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); },
        getAllTasksFromUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var ownerId, result, tasks, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.info('Task Controller: getAllTasksFromUser');
                        ownerId = req.user.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dbClient.getAllTasksFromUser(ownerId)];
                    case 2:
                        result = _a.sent();
                        tasks = result.rows;
                        res.status(200).send({ tasks: tasks });
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        errorHandler.serverError(res, err_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); },
        getTask: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var taskId, userId, validatorResult, err_4, result, task, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.info('Task Controller: getTask');
                        taskId = req.params.taskId;
                        userId = req.user.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, validator.validateGetTask(userId, Number(taskId))];
                    case 2:
                        validatorResult = _a.sent();
                        if (!validatorResult.isValid) {
                            res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        errorHandler.serverError(res, err_4);
                        return [3 /*break*/, 4];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, dbClient.getTask(Number(taskId))];
                    case 5:
                        result = _a.sent();
                        task = result.rows[0];
                        res.status(200).send({ task: task });
                        return [3 /*break*/, 7];
                    case 6:
                        err_5 = _a.sent();
                        errorHandler.serverError(res, err_5);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); },
        v1UpdateTask: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, status, name, description, dueDate, taskId, userId, validatorResult, err_6, err_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger.info('Task Controller: v1UpdateTask');
                        _a = req.body, status = _a.status, name = _a.name, description = _a.description, dueDate = _a.dueDate;
                        taskId = req.params.taskId;
                        userId = req.user.id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, validator.v1ValidateUpdateTask(userId, Number(taskId), status)];
                    case 2:
                        validatorResult = _b.sent();
                        if (!validatorResult.isValid) {
                            res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _b.sent();
                        errorHandler.serverError(res, err_6);
                        return [3 /*break*/, 4];
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, dbClient.updateTask(Number(taskId), status, name, description, dueDate)];
                    case 5:
                        _b.sent();
                        res.status(200).send();
                        return [3 /*break*/, 7];
                    case 6:
                        err_7 = _b.sent();
                        errorHandler.serverError(res, err_7);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); },
        v2UpdateTask: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, status, name, description, dueDate, taskId, userId, validatorResult, err_8, err_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger.info('Task Controller: v2UpdateTask');
                        _a = req.body, status = _a.status, name = _a.name, description = _a.description, dueDate = _a.dueDate;
                        taskId = req.params.taskId;
                        userId = req.user.id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, validator.v2ValidateUpdateTask(userId, Number(taskId), status)];
                    case 2:
                        validatorResult = _b.sent();
                        if (!validatorResult.isValid) {
                            res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_8 = _b.sent();
                        errorHandler.serverError(res, err_8);
                        return [3 /*break*/, 4];
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, dbClient.updateTask(Number(taskId), status, name, description, dueDate)];
                    case 5:
                        _b.sent();
                        res.status(200).send();
                        return [3 /*break*/, 7];
                    case 6:
                        err_9 = _b.sent();
                        errorHandler.serverError(res, err_9);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); },
        deleteTask: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var taskId, userId, validatorResult, err_10, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.info('Task Controller: deleteTask');
                        taskId = req.params.taskId;
                        userId = req.user.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, validator.validateDeleteTask(userId, Number(taskId))];
                    case 2:
                        validatorResult = _a.sent();
                        if (!validatorResult.isValid) {
                            res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_10 = _a.sent();
                        errorHandler.serverError(res, err_10);
                        return [3 /*break*/, 4];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, dbClient.deleteTask(Number(taskId))];
                    case 5:
                        _a.sent();
                        res.status(200).send();
                        return [3 /*break*/, 7];
                    case 6:
                        err_11 = _a.sent();
                        errorHandler.serverError(res, err_11);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); },
    };
});
