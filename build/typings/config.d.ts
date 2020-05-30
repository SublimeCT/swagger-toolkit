export interface Options {
    /**
     * API 站点地址 host 部分
     * @example http://api.lynee.cn
     */
    readonly site: string;
    /**
     * API doc.json path
     */
    readonly docJSONPath?: string;
    /**
     * API 站点地址文档路径
     */
    readonly docPath?: string;
    /**
     * API 站点地址文档路径
     */
    readonly path?: string;
    /**
     * 本地项目中的 model 类存放目录
     */
    readonly modelDir?: string;
}
export declare class ConfigOptions implements Options {
    /**
     * 脚本日志前缀
     */
    static readonly lOGGER_PREFIX = "[swagger-toolkit]";
    /**
     * 默认的配置文件路径
     */
    static readonly defaultConfigPath: string;
    /**
     * API 站点地址 host 部分
     * @example http://api.lynee.cn
     */
    readonly site: string;
    /**
     * API doc.json path
     */
    readonly docJSONPath: string;
    /**
     * API 站点地址文档路径
     */
    readonly docPath: string;
    /**
     * API 站点地址文档路径
     */
    readonly path: string;
    /**
     * 本地项目中的 model 类存放目录
     */
    readonly modelDir: string;
    get docJSONURL(): string;
    constructor(options: Options);
}
//# sourceMappingURL=config.d.ts.map