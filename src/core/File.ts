import fs from 'fs'
import path from 'path'
import { ConfigOptions } from '../typings/config'
import { Logger, LoggerCode } from './Logger'
import { promisify } from 'util'

export class File {
    static access = promisify(fs.access)
    static writeFile = promisify(fs.writeFile)

    static ALLOW_CONFIG_EXT = ['.js', '.json']
    /**
     * 检测指定文件是否可读
     * @param filePath string
     */
    static async toAccess(filePath: string): Promise<boolean> {
        let result: boolean = false
        try {
            await File.access(filePath)
            result = true
        } catch (err) {
            Logger.info(`${filePath} 访问失败: ${err}`)
        }
        return result
    }
    /**
     * 检测是否位于项目根目录, 即检测当前目录下是否存在 `package.json` 文件
     */
    static async hasPackageJSON(): Promise<boolean> {
        return await File.toAccess(path.join(process.cwd(), 'package.json'))
    }
    /**
     * 读取指定的配置文件
     * @param filePath string
     */
    static async getConfig(filePath: string): Promise<ConfigOptions> {
        if (!filePath) Logger.error('must set a config file', LoggerCode.PARAMS_ERROR)
        const extName = path.extname(filePath)
        if (!File.ALLOW_CONFIG_EXT.includes(extName)) Logger.error('config file must be ' + File.ALLOW_CONFIG_EXT.map(ext => '*' + ext).join(', '), LoggerCode.PARAMS_ERROR)
        try {
            const customConfig = await import(filePath)
            if (!customConfig) Logger.error('config file is empty', LoggerCode.PARAMS_ERROR)
            const options = {
                site: customConfig.site,
                docPath: customConfig.docPath,
                path: customConfig.path,
                modelDir: customConfig.modelDir
            }
            return new ConfigOptions(options)
        } catch (err) {
            Logger.error(`read config file(${filePath}) failed! message: ${err.message}`, LoggerCode.HANDLE_FILE_FAILED)
            throw new Error()
        }
    }
    static async saveToLocal(raw: string, savePath: string): Promise<void> {
        try {
            await File.writeFile(savePath, raw)
        } catch(err) {
            Logger.error('write swagger.dos.json failed, message: ' + err.message, LoggerCode.HANDLE_FILE_FAILED)
        }
    }
}