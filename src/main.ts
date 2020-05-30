import { File } from './core/File'
import { ConfigOptions } from './typings/config'
import { Logger, LoggerCode } from './core/Logger'
import { Doc } from './core/Doc'
export { ConfigOptions, Options } from './typings/config'

export class SwaggerTool {
    doc: Doc | null = null

    constructor(
        /**
         * 配置文件(绝对)路径
         */
        readonly configPath: string,
        /**
         * 模块名称
         */
        readonly module?: string,
        /**
         * 实体名称
         */
        readonly entity?: string,
        /**
         * 自定义配置项, 若指定 config 则不会读取 configPath 配置文件
         */
        public config?: ConfigOptions
    ) {}

    async run() {
        Logger.info('1. 检查是否位于项目根目录(检测当前执行目录下是否存在 `package.json`)')
        const isInRoot = await File.hasPackageJSON()
        if (!isInRoot) Logger.error('must in root directory', LoggerCode.EXEC_PATH_WRONG)
        Logger.info('2. 从传入的参数或配置文件载入自定义配置')
        if (!this.config) this.config = await File.getConfig(this.configPath)
        Logger.info('3. 验证自定义配置' + JSON.stringify(this.config))
        if (!this.config || !(this.config instanceof ConfigOptions)) Logger.error('config must instance of ConfigOptions', LoggerCode.PARAMS_ERROR)
        Logger.info('4. 下载 doc.json 到本地并生成结构化 Doc 实例')
        await this.downloadDocJSON()
        console.log(this.config, this.doc ? 'doc' : 'no doc')
    }

    async downloadDocJSON() {
        if (!this.config) {
            Logger.error('missing config', LoggerCode.INTERNAL_ERROR)
            return
        }
        const contents = await Doc.download(this.config.docJSONURL)
        this.doc = Doc.fromJSON(contents)
        Logger.info(`\tdoc.json save path: ${this.config.docJSONPath}`)
        await File.saveToLocal(contents, this.config.docJSONPath)
    }
}
