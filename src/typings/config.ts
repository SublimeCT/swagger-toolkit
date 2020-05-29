export class ConfigOptions {
    /**
     * 脚本日志前缀
     */
    static readonly lOGGER_PREFIX = '[swagger-toolkit]'
    /**
     * 默认的配置文件路径
     */
    static readonly defaultConfigPath: string = './swagger.conf.js'
    /**
     * API doc.json path
     */
    readonly docJSONPath: string = './swagger.doc.json'
    /**
     * API 站点地址文档路径
     */
    readonly docPath: string = '/docs/index.html'
    /**
     * API 站点地址文档路径
     */
    readonly path: string = '/docs/doc.json'
    /**
     * 本地项目中的 model 类存放目录
     */
    readonly modelDir: string = 'src/models'

    get docJSONURL(): string {
        return this.site + this.path
    }

    constructor(
        /**
         * API 站点地址 host 部分
         * @example http://api.lynee.cn
         */
        readonly site: string,
        docPath?: string,
        path?: string,
        modelDir?: string,
        docJSONPath?: string,
    ) {
        if (docPath) this.docPath = docPath
        if (path) this.path = path
        if (modelDir) this.modelDir = modelDir
        if (docJSONPath) this.docJSONPath = docJSONPath
    }
}
