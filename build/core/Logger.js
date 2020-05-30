"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../typings/config");
var LoggerTag;
(function (LoggerTag) {
    LoggerTag["INFO"] = "\uD83D\uDCAC";
    LoggerTag["DEBUG"] = "\uD83C\uDFAC";
    LoggerTag["WARNING"] = "\u26A0\uFE0F";
    LoggerTag["ERROR"] = "\u274C";
})(LoggerTag = exports.LoggerTag || (exports.LoggerTag = {}));
var LoggerCode;
(function (LoggerCode) {
    LoggerCode["PARAMS_ERROR"] = "PARAMS_ERROR";
    LoggerCode["PARAMS_MISSING"] = "PARAMS_MISSING";
    LoggerCode["INTERNAL_ERROR"] = "INTERNAL_ERROR";
    LoggerCode["EXEC_PATH_WRONG"] = "EXEC_PATH_WRONG";
    LoggerCode["HANDLE_FILE_FAILED"] = "HANDLE_FILE_FAILED";
    LoggerCode["DOWNLOAD_FAILED"] = "DOWNLOAD_FAILED";
})(LoggerCode = exports.LoggerCode || (exports.LoggerCode = {}));
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.log = function (options) {
        var msg = config_1.ConfigOptions.lOGGER_PREFIX + " " + options.tag + " " + (options.category ? "[" + options.category + "]" : '') + " " + (options.code ? "<Code: " + options.code + ">" : '') + " " + options.message;
        console.log(msg);
        // 当处于测试环境时, process.exit() 会导致线程终止, 无法执行后续的断言, 所以改为抛出异常
        // if (options.exit) process.exit()
        if (options.exit)
            throw new Error(config_1.ConfigOptions.lOGGER_PREFIX + " \u26D4\uFE0F");
    };
    Logger.error = function (message, code, exit) {
        if (exit === void 0) { exit = true; }
        var options = {
            tag: LoggerTag.ERROR,
            message: message,
            exit: exit,
            code: code
        };
        Logger.log(options);
    };
    Logger.info = function (message, category) {
        var options = {
            tag: LoggerTag.INFO,
            message: message,
        };
        Logger.log(options);
    };
    Logger.debug = function (message, category) {
        var options = {
            tag: LoggerTag.DEBUG,
            message: message,
        };
        Logger.log(options);
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map