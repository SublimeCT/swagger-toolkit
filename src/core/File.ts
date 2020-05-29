import fs from 'fs'
import path from 'path'
import { ConfigOptions } from '../typings/config'
import { Logger, LoggerCode } from './Logger'

export class File {
    static ALLOW_CONFIG_EXT = ['.js', '.json']
    static access(filePath: string): boolean {
        let result: boolean = false
        try {
            fs.accessSync(filePath)
            result = true
        } catch (err) {
            Logger.info(`${filePath} 访问失败: ${err}`)
        }
        return result
    }
    static hasPackageJSON() {
        return File.access(path.join(process.cwd(), 'package.json'))
    }
    static getConfig(filePath: string): ConfigOptions {
        const extName = path.extname(filePath)
        if (!File.ALLOW_CONFIG_EXT.includes(extName)) Logger.error('config file must be' + File.ALLOW_CONFIG_EXT.map(ext => '*' + ext).join(', '), LoggerCode.PARAMS_ERROR)
        try {
            const customConfig = require(filePath)
            if (!customConfig) Logger.error('config file is empty', LoggerCode.PARAMS_ERROR)
            const { site, docPath, path: _path, modelDir } = customConfig
            return new ConfigOptions(site, docPath, _path, modelDir)
        } catch (err) {
            Logger.error(`read config file(${filePath}) failed! message: ${err.message}`, LoggerCode.HANDLE_FILE_FAILED)
            throw new Error()
        }
    }
}