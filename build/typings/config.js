"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = require("../core/Logger");
var ConfigOptions = /** @class */ (function () {
    function ConfigOptions(options) {
        /**
         * API 文档保存路径
         */
        this.docJSONPath = ConfigOptions.defaultDocJSONPath;
        /**
         * API 站点地址文档路径
         */
        this.docPath = ConfigOptions.defaultDocPath;
        /**
         * API dos.json 路径
         */
        this.path = ConfigOptions.defaultPath;
        /**
         * 本地项目中的 model 类存放目录
         */
        this.modelDir = ConfigOptions.defaultModelDir;
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
        enumerable: true,
        configurable: true
    });
    /**
     * 脚本日志前缀
     */
    ConfigOptions.lOGGER_PREFIX = '[swagger-toolkit]';
    /**
     * API 站点 site 示例
     */
    ConfigOptions.siteExample = 'https://petstore.swagger.io';
    /**
     * API 站点 site 示例
     */
    ConfigOptions.pathExample = '/v2/swagger.json';
    /**
     * 默认的配置文件路径
     */
    ConfigOptions.defaultConfigPath = './swagger.conf.js';
    /**
     * 默认的 API 文档保存路径
     */
    ConfigOptions.defaultDocJSONPath = './swagger.doc.json';
    /**
     * 默认的 API 文档文件路径
     */
    ConfigOptions.defaultDocPath = '/docs/index.html';
    /**
     * 默认的 API dos.json 路径
     */
    ConfigOptions.defaultPath = '/docs/doc.json';
    /**
     * 默认的 model 类存放目录
     */
    ConfigOptions.defaultModelDir = 'src/models';
    return ConfigOptions;
}());
exports.ConfigOptions = ConfigOptions;
//# sourceMappingURL=config.js.map