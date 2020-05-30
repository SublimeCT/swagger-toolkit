import { Logger } from "../core/Logger"

export interface Options {
    /**
     * API 站点地址 host 部分
     * @example http://api.lynee.cn
     */
    readonly site: string,
    /**
     * API doc.json path
     */
    readonly docJSONPath?: string
    /**
     * API 站点地址文档路径
     */
    readonly docPath?: string
    /**
     * API 站点地址文档路径
     */
    readonly path?: string
    /**
     * 本地项目中的 model 类存放目录
     */
    readonly modelDir?: string
}

export class ConfigOptions implements Options {
    /**
     * 脚本日志前缀
     */
    static readonly lOGGER_PREFIX = '[swagger-toolkit]'
    /**
     * API 站点 site 示例
     */
    static readonly siteExample = 'https://petstore.swagger.io'
    /**
     * API 站点 site 示例
     */
    static readonly pathExample = '/v2/swagger.json'
    /**
     * 默认的配置文件路径
     */
    static readonly defaultConfigPath: string = './swagger.conf.js'
    /**
     * 默认的 API 文档保存路径
     */
    static readonly defaultDocJSONPath: string = './swagger.doc.json'
    /**
     * 默认的 API 文档文件路径
     */
    static readonly defaultDocPath: string = '/docs/index.html'
    /**
     * 默认的 API dos.json 路径
     */
    static readonly defaultPath: string = '/docs/doc.json'
    /**
     * 默认的 model 类存放目录
     */
    static readonly defaultModelDir: string = 'src/models'

    /**
     * API 站点地址 host 部分
     * @example http://api.lynee.cn
     */
    readonly site: string
    /**
     * API 文档保存路径
     */
    readonly docJSONPath: string = ConfigOptions.defaultDocJSONPath
    /**
     * API 站点地址文档路径
     */
    readonly docPath: string = ConfigOptions.defaultDocPath
    /**
     * API dos.json 路径
     */
    readonly path: string = ConfigOptions.defaultPath
    /**
     * 本地项目中的 model 类存放目录
     */
    readonly modelDir: string = ConfigOptions.defaultModelDir

    get docJSONURL(): string {
        return this.site + this.path
    }

    constructor(options: Options) {
        this.site = options.site
        Logger.debug('config: \n' + JSON.stringify(options, null, 4), 'config')
        if (options.docPath) this.docPath = options.docPath
        if (options.path) this.path = options.path
        if (options.modelDir) this.modelDir = options.modelDir
        if (options.docJSONPath) this.docJSONPath = options.docJSONPath
    }
}
