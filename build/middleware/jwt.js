"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_jwt_1 = __importDefault(require("express-jwt"));
exports.default = (function (logger) { return ({
    jwtValidation: express_jwt_1.default({
        secret: String(process.env.ACCESS_TOKEN_SECRET),
        algorithms: ['HS256'],
    }),
    unauthorizedErrorHandling: function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(err.status).send({ message: err.message });
            logger.error(err);
            return;
        }
        next();
    },
}); });
