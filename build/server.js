"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv = __importStar(require("dotenv"));
var index_1 = __importDefault(require("./routes/index"));
var logger_1 = __importDefault(require("./utilities/logger"));
var dbClient_1 = __importDefault(require("./db/dbClient"));
dotenv.config({ path: __dirname + "/../.env" });
var PORT = 8080 || process.env.PORT;
var dbClient = dbClient_1.default(logger_1.default);
var routes = index_1.default(logger_1.default, dbClient);
var app = express_1.default();
app.use(routes);
app.listen(PORT, function () {
    logger_1.default.info("\uD83D\uDE80 Server ready at http://localhost:" + PORT);
});
