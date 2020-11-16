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
/* eslint-disable max-len */
var pg_1 = require("pg");
exports.default = (function (logger) { return __awaiter(void 0, void 0, void 0, function () {
    var pool, client, err_1, dbQuery;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pool = new pg_1.Pool({
                    host: process.env.PGHOST,
                    port: Number(process.env.PGPORT),
                    database: process.env.PGDATABASE,
                    user: process.env.PGUSER,
                    password: process.env.PGPASSWORD,
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.connect()];
            case 2:
                client = _a.sent();
                logger.info('DB Connected');
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                logger.error("DB connection error: " + err_1.stack);
                return [3 /*break*/, 4];
            case 4:
                dbQuery = function (queryString) { return __awaiter(void 0, void 0, void 0, function () {
                    var err_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                logger.debug("Query: " + queryString);
                                return [4 /*yield*/, new Promise(function (resolve, reject) {
                                        client.query(queryString, function (err, res) {
                                            if (err) {
                                                reject(err.stack);
                                            }
                                            resolve(res);
                                        });
                                    })];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2:
                                err_2 = _a.sent();
                                return [2 /*return*/, null];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                return [2 /*return*/, {
                        createUser: function (username, passwordHash, salt) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, dbQuery("\n    INSERT INTO app_user(username, password_hash, salt)\n    VALUES ('" + username + "', '" + passwordHash + "', '" + salt + "')\n    RETURNING id;\n    ")];
                            });
                        }); },
                        getUserByName: function (username) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, dbQuery("\n    SELECT * FROM app_user\n    WHERE username = '" + username + "';\n    ")];
                            });
                        }); },
                        createTask: function (ownerId, status, name, description) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, dbQuery("\n    INSERT INTO task(owner_id, status, name, description)\n    VALUES (" + ownerId + ", '" + status + "', '" + name + "', '" + description + "')\n    RETURNING id;\n    ")];
                            });
                        }); },
                        getAllTasksFromUser: function (ownerId) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, dbQuery("\n    SELECT * FROM task\n    WHERE owner_id = " + ownerId + ";\n    ")];
                            });
                        }); },
                        getTask: function (taskId) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, dbQuery("\n    SELECT * FROM task\n    WHERE id = " + taskId + ";\n    ")];
                            });
                        }); },
                        updateTask: function (taskId, status, name, description) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, dbQuery("\n    UPDATE task\n    SET   status = '" + status + "',\n          name = '" + name + "',\n          description = '" + description + "'\n    WHERE id = " + taskId + ";\n    ")];
                            });
                        }); },
                        deleteTask: function (taskId) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, dbQuery("\n    DELETE FROM task\n    WHERE id = " + taskId + ";\n    ")];
                            });
                        }); },
                    }];
        }
    });
}); });
