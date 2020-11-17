"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (logger) { return ({
    serverError: function (res, err) {
        var message = 'Server error';
        logger.error(message);
        res.status(500).send({ message: message });
    },
}); });
