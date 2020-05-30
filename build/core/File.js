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
exports.File = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var config_1 = require("../typings/config");
var Logger_1 = require("./Logger");
var util_1 = require("util");
var File = /** @class */ (function () {
    function File() {
    }
    /**
     * 检测指定文件是否可读
     * @param filePath string
     */
    File.toAccess = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, File.access(filePath)];
                    case 2:
                        _a.sent();
                        result = true;
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        Logger_1.Logger.info(filePath + " \u8BBF\u95EE\u5931\u8D25: " + err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 检测是否位于项目根目录, 即检测当前目录下是否存在 `package.json` 文件
     */
    File.hasPackageJSON = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, File.toAccess(path_1.default.join(process.cwd(), 'package.json'))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 读取指定的配置文件
     * @param filePath string
     */
    File.getConfig = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var extName, customConfig, options, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!filePath)
                            Logger_1.Logger.error('must set a config file', Logger_1.LoggerCode.PARAMS_ERROR);
                        extName = path_1.default.extname(filePath);
                        if (!File.ALLOW_CONFIG_EXT.includes(extName))
                            Logger_1.Logger.error('config file must be ' + File.ALLOW_CONFIG_EXT.map(function (ext) { return '*' + ext; }).join(', '), Logger_1.LoggerCode.PARAMS_ERROR);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(filePath)); })];
                    case 2:
                        customConfig = _a.sent();
                        if (!customConfig)
                            Logger_1.Logger.error('config file is empty', Logger_1.LoggerCode.PARAMS_ERROR);
                        options = {
                            site: customConfig.site,
                            docPath: customConfig.docPath,
                            path: customConfig.path,
                            modelDir: customConfig.modelDir
                        };
                        return [2 /*return*/, new config_1.ConfigOptions(options)];
                    case 3:
                        err_2 = _a.sent();
                        Logger_1.Logger.error("read config file(" + filePath + ") failed! message: " + err_2.message, Logger_1.LoggerCode.HANDLE_FILE_FAILED);
                        throw new Error();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    File.saveToLocal = function (raw, savePath) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, File.writeFile(savePath, raw)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        Logger_1.Logger.error('write swagger.dos.json failed, message: ' + err_3.message, Logger_1.LoggerCode.HANDLE_FILE_FAILED);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    File.access = util_1.promisify(fs_1.default.access);
    File.writeFile = util_1.promisify(fs_1.default.writeFile);
    File.ALLOW_CONFIG_EXT = ['.js', '.json'];
    return File;
}());
exports.File = File;
//# sourceMappingURL=File.js.map