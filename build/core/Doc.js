"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SwaggerDoc_1 = require("../typings/SwaggerDoc");
var class_transformer_1 = require("class-transformer");
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var Logger_1 = require("./Logger");
/**
 * API 文档操作类
 */
var Doc = /** @class */ (function () {
    function Doc(
    /**
     * 原始 API doc.json 数据
     */
    data, raw) {
        this.data = data;
        this.raw = raw;
    }
    Doc.fromJSON = function (raw) {
        return new Doc(class_transformer_1.plainToClass(SwaggerDoc_1.SwaggerDoc, raw), raw);
    };
    /**
     * 下载 doc.json
     * @param url string
     */
    Doc.download = function (url) {
        var requester = Doc.getRequester(url);
        Logger_1.Logger.info("download from " + url + " ...", 'download');
        return new Promise(function (resolve) {
            requester
                .get(url, { timeout: 7000 }, function (res) {
                if (res.statusCode !== 200) {
                    Logger_1.Logger.error("doc.json download failed -2, status code: " + res.statusCode, Logger_1.LoggerCode.DOWNLOAD_FAILED);
                    res.resume();
                }
                res.setEncoding('utf8');
                var rawData = '';
                res.on('data', function (chunk) { rawData += chunk; });
                res.on('end', function () {
                    try {
                        if (!rawData)
                            Logger_1.Logger.error('doc.json download failed -4', Logger_1.LoggerCode.DOWNLOAD_FAILED);
                        Logger_1.Logger.debug("download finished! \t contents: (" + rawData.substr(0, 30) + " ...)", 'download');
                        var jsonData = JSON.parse(rawData);
                        resolve(JSON.stringify(jsonData, null, 4));
                    }
                    catch (e) {
                        Logger_1.Logger.error('doc.json download failed -3', Logger_1.LoggerCode.DOWNLOAD_FAILED);
                    }
                });
            })
                .on('error', function (err) { return Logger_1.Logger.error('doc.json download failed -1 message: ' + err.message, Logger_1.LoggerCode.DOWNLOAD_FAILED); })
                .on('timeout', function () { return Logger_1.Logger.error('doc.json download failed -1 reasons: timeout', Logger_1.LoggerCode.DOWNLOAD_FAILED); });
        });
    };
    Doc.getRequester = function (url) {
        return url.indexOf('https') === 0 ? https_1.default : http_1.default;
    };
    return Doc;
}());
exports.Doc = Doc;
//# sourceMappingURL=Doc.js.map