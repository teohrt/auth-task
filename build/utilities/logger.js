"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var myformat = winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp(), winston_1.default.format.align(), winston_1.default.format.printf(function (info) { return info.timestamp + " " + info.level + ": " + info.message; }));
exports.default = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.Console({
            format: myformat,
            level: 'debug',
            handleExceptions: true,
        }),
    ],
    exitOnError: false,
});
