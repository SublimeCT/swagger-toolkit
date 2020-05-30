"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigOptions = void 0;
var Logger_1 = require("../core/Logger");
var ConfigOptions = /** @class */ (function () {
    function ConfigOptions(options) {
        /**
         * API doc.json path
         */
        this.docJSONPath = './swagger.doc.json';
        /**
         * API 站点地址文档路径
         */
        this.docPath = '/docs/index.html';
        /**
         * API 站点地址文档路径
         */
        this.path = '/docs/doc.json';
        /**
         * 本地项目中的 model 类存放目录
         */
        this.modelDir = 'src/models';
        this.site = options.site;
        Logger_1.Logger.debug('config: \n' + JSON.stringify(options, null, 4), 'config');
        if (options.docPath)
            this.docPath = options.docPath;
        if (options.path)
            this.path = options.path;
        if (options.modelDir)
            this.modelDir = options.modelDir;
        if (options.docJSONPath)
            this.docJSONPath = options.docJSONPath;
    }
    Object.defineProperty(ConfigOptions.prototype, "docJSONURL", {
        get: function () {
            return this.site + this.path;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 脚本日志前缀
     */
    ConfigOptions.lOGGER_PREFIX = '[swagger-toolkit]';
    /**
     * 默认的配置文件路径
     */
    ConfigOptions.defaultConfigPath = './swagger.conf.js';
    return ConfigOptions;
}());
exports.ConfigOptions = ConfigOptions;
//# sourceMappingURL=config.js.map