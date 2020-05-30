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
exports.SwaggerTool = void 0;
var File_1 = require("./core/File");
var config_1 = require("./typings/config");
var Logger_1 = require("./core/Logger");
var Doc_1 = require("./core/Doc");
var config_2 = require("./typings/config");
Object.defineProperty(exports, "ConfigOptions", { enumerable: true, get: function () { return config_2.ConfigOptions; } });
var SwaggerTool = /** @class */ (function () {
    function SwaggerTool(
    /**
     * 配置文件(绝对)路径
     */
    configPath, 
    /**
     * 模块名称
     */
    module, 
    /**
     * 实体名称
     */
    entity, 
    /**
     * 自定义配置项, 若指定 config 则不会读取 configPath 配置文件
     */
    config) {
        this.configPath = configPath;
        this.module = module;
        this.entity = entity;
        this.config = config;
        this.doc = null;
    }
    SwaggerTool.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isInRoot, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Logger_1.Logger.info('1. 检查是否位于项目根目录');
                        return [4 /*yield*/, File_1.File.hasPackageJSON()];
                    case 1:
                        isInRoot = _b.sent();
                        if (!isInRoot)
                            Logger_1.Logger.error('must in root directory', Logger_1.LoggerCode.EXEC_PATH_WRONG);
                        Logger_1.Logger.info('2. 从传入的参数或配置文件载入自定义配置');
                        if (!!this.config) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, File_1.File.getConfig(this.configPath)];
                    case 2:
                        _a.config = _b.sent();
                        _b.label = 3;
                    case 3:
                        Logger_1.Logger.info('3. 验证自定义配置' + JSON.stringify(this.config));
                        if (!this.config || !(this.config instanceof config_1.ConfigOptions))
                            Logger_1.Logger.error('config must instance of ConfigOptions', Logger_1.LoggerCode.PARAMS_ERROR);
                        Logger_1.Logger.info('4. 下载 doc.json 到本地并生成结构化 Doc 实例');
                        return [4 /*yield*/, this.downloadDocJSON()];
                    case 4:
                        _b.sent();
                        console.log(this.config, this.doc ? 'doc' : 'no doc');
                        return [2 /*return*/];
                }
            });
        });
    };
    SwaggerTool.prototype.downloadDocJSON = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.config) {
                            Logger_1.Logger.error('missing config', Logger_1.LoggerCode.INTERNAL_ERROR);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Doc_1.Doc.download(this.config.docJSONURL)];
                    case 1:
                        contents = _a.sent();
                        this.doc = Doc_1.Doc.fromJSON(contents);
                        Logger_1.Logger.info("doc.json save path: " + this.config.docJSONPath);
                        File_1.File.saveToLocal(contents, this.config.docJSONPath);
                        return [2 /*return*/];
                }
            });
        });
    };
    return SwaggerTool;
}());
exports.SwaggerTool = SwaggerTool;
//# sourceMappingURL=main.js.map