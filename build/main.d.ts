import { ConfigOptions } from './typings/config';
import { Doc } from './core/Doc';
export { ConfigOptions, Options } from './typings/config';
export declare class SwaggerTool {
    /**
     * 配置文件(绝对)路径
     */
    readonly configPath: string;
    /**
     * 模块名称
     */
    readonly module?: string | undefined;
    /**
     * 实体名称
     */
    readonly entity?: string | undefined;
    /**
     * 自定义配置项, 若指定 config 则不会读取 configPath 配置文件
     */
    config?: ConfigOptions | undefined;
    doc: Doc | null;
    constructor(
    /**
     * 配置文件(绝对)路径
     */
    configPath: string, 
    /**
     * 模块名称
     */
    module?: string | undefined, 
    /**
     * 实体名称
     */
    entity?: string | undefined, 
    /**
     * 自定义配置项, 若指定 config 则不会读取 configPath 配置文件
     */
    config?: ConfigOptions | undefined);
    run(): Promise<void>;
    downloadDocJSON(): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map