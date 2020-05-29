import { File } from './core/File'
import { ConfigOptions } from './typings/config'
import { Logger, LoggerCode } from './core/Logger'
import { Doc } from './core/Doc'
export { ConfigOptions } from './typings/config'

export class SwaggerTool {
    readonly config: ConfigOptions
    doc: Doc | null = null

    constructor(configPath: string, readonly module?: string, readonly entity?: string, config?: ConfigOptions) {
        // 1. 检查是否位于项目根目录
        const isInRoot = File.hasPackageJSON()
        if (!isInRoot) Logger.error('must in root directory', LoggerCode.EXEC_PATH_WRONG)
        // 2. 从传入的参数或配置文件载入自定义配置
        this.config = config || File.getConfig(configPath)
        // 3. 下载 doc.json 到本地并生成结构化 Doc 实例
        this.downloadDocJSON()
            .then(() => {
                console.log(this.config, this.doc?.data)
            })
    }

    async downloadDocJSON() {
        const contents = await Doc.download(this.config.docJSONURL)
        this.doc = Doc.fromJSON(contents)
        Logger.info(`doc.json save path: ${this.config.docJSONPath}`)
        File.saveToLocal(contents, this.config.docJSONPath)
    }
}
