"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (logger) { return ({
    serverError: function (res, err) {
        var errMsg = 'Server error';
        logger.error(errMsg);
        res.status(500).send({ errMsg: errMsg });
    },
}); });
