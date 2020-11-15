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
var crypto_1 = __importDefault(require("crypto"));
// Hashes the password with the salt and returns the pair
var hashPassword = function (password, saltValue) {
    var hash = crypto_1.default.createHmac('sha512', saltValue);
    hash.update(password);
    var hashValue = hash.digest('hex');
    return {
        salt: saltValue,
        hash: hashValue,
    };
};
// Generates and returns a random salt value of a particular length
var generateSalt = function (length) { return crypto_1.default.randomBytes(length).toString('hex').slice(0, length); };
// Generates a random salt, hashes the input password with it, and returns the pair
var saltHashPassword = function (password) {
    var saltValue = generateSalt(16);
    return hashPassword(password, saltValue);
};
exports.default = (function (logger, dbClient) { return ({
    register: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, userResponse, msg, _b, salt, hash;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    logger.info('AuthController: Attempting registration');
                    _a = req.body, username = _a.username, password = _a.password;
                    return [4 /*yield*/, dbClient.getUserByName(username)];
                case 1:
                    userResponse = _c.sent();
                    if (userResponse.rowCount < 1) {
                        logger.info("Username '" + username + "' is available");
                    }
                    else {
                        msg = "Username '" + username + "' is not available";
                        logger.info(msg);
                        res.send(msg);
                        return [2 /*return*/];
                    }
                    _b = saltHashPassword(password), salt = _b.salt, hash = _b.hash;
                    return [4 /*yield*/, dbClient.createUser(username, hash, salt)];
                case 2:
                    _c.sent();
                    res.send('User Registered!');
                    return [2 /*return*/];
            }
        });
    }); },
    login: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, userResponse, msg, user, storedHash, storedSalt, hash, loginSuccessful, msg, msg;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logger.info('AuthController: Attempting login');
                    _a = req.body, username = _a.username, password = _a.password;
                    return [4 /*yield*/, dbClient.getUserByName(username)];
                case 1:
                    userResponse = _b.sent();
                    if (userResponse.rowCount < 1) {
                        msg = 'Incorrect username or password';
                        logger.info(msg);
                        res.send(msg);
                    }
                    else {
                        user = userResponse.rows[0];
                        storedHash = user.password_hash;
                        storedSalt = user.salt;
                        hash = hashPassword(password, storedSalt).hash;
                        loginSuccessful = hash === storedHash;
                        if (loginSuccessful) {
                            msg = 'Login successful';
                            logger.info(msg);
                            res.send(msg);
                        }
                        else {
                            msg = 'Incorrect username or password';
                            logger.info(msg);
                            res.send(msg);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); },
}); });