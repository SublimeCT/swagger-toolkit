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
     * 默认的配置文件路径
     */
    static readonly defaultConfigPath: string = './swagger.conf.js'
    /**
     * API 站点地址 host 部分
     * @example http://api.lynee.cn
     */
    readonly site: string
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

    constructor(options: Options) {
        this.site = options.site
        Logger.debug('config: \n' + JSON.stringify(options, null, 4), 'config')
        if (options.docPath) this.docPath = options.docPath
        if (options.path) this.path = options.path
        if (options.modelDir) this.modelDir = options.modelDir
        if (options.docJSONPath) this.docJSONPath = options.docJSONPath
    }
}
