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
exports.default = (function (logger, dbClient) {
    var checkStatusInput = function (status) {
        // Check to see if status value is in list of acceptable values
        logger.info("Validating status input: " + status);
        if (!v1Statuses.includes(status)) {
            var msg = 'Status may only be \'New\' or \'Completed\'';
            logger.info("Validation failed: " + msg);
            return {
                isValid: false,
                responseCode: 400,
                msg: msg,
            };
        }
        return {
            isValid: true,
            responseCode: -1,
            msg: '',
        };
    };
    var checkIfTaskExistsAndBelongsToUser = function (userId, taskId) { return __awaiter(void 0, void 0, void 0, function () {
        var result, msg, task, taskOwnerId, msg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Check if task exists
                    logger.info("Verifying that taskId-" + taskId + " exists");
                    return [4 /*yield*/, dbClient.getTask(Number(taskId))];
                case 1:
                    result = _a.sent();
                    if (result.rowCount < 1) {
                        msg = 'Task not found';
                        logger.info("Validation failed: " + msg);
                        return [2 /*return*/, {
                                isValid: false,
                                responseCode: 404,
                                msg: msg,
                            }];
                    }
                    // Check ownership
                    logger.info("Verifying that taskId-" + taskId + " is owned by userId-" + userId);
                    task = result.rows[0];
                    taskOwnerId = task.owner_id;
                    if (taskOwnerId !== userId) {
                        msg = 'Differing task owner';
                        logger.info("Validation failed: " + msg);
                        return [2 /*return*/, {
                                isValid: false,
                                responseCode: 403,
                                msg: msg,
                            }];
                    }
                    return [2 /*return*/, {
                            isValid: true,
                            responseCode: -1,
                            msg: '',
                        }];
            }
        });
    }); };
    return {
        validateCreateTask: function (status) { return checkStatusInput(status); },
        validateGetTask: function (userId, taskId) { return checkIfTaskExistsAndBelongsToUser(userId, taskId); },
        validateUpdateTask: function (userId, taskId, status) { return __awaiter(void 0, void 0, void 0, function () {
            var statusResult;
            return __generator(this, function (_a) {
                statusResult = checkStatusInput(status);
                if (!statusResult.isValid) {
                    return [2 /*return*/, statusResult];
                }
                return [2 /*return*/, checkIfTaskExistsAndBelongsToUser(userId, taskId)];
            });
        }); },
        validateDeleteTask: function (userId, taskId) { return checkIfTaskExistsAndBelongsToUser(userId, taskId); },
    };
});