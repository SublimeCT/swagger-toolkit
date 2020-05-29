import { File } from './core/File'
import { ConfigOptions } from './typings/config'
import { Logger, LoggerCode } from './core/Logger'
export { ConfigOptions } from './typings/config'

export class SwaggerTool {
    readonly config: ConfigOptions

    constructor(configPath: string, readonly module?: string, readonly entity?: string, config?: ConfigOptions) {
        // 检查是否位于项目根目录
        const isInRoot = File.hasPackageJSON()
        if (!isInRoot) Logger.error('must in root directory', LoggerCode.EXEC_PATH_WRONG)
        // 从传入的参数或配置文件载入自定义配置
        this.config = config || File.getConfig(configPath)
    }

    download() {
        
    }
}
