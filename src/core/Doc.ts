import { SwaggerDoc } from '../typings/SwaggerDoc'
import { plainToClass } from 'class-transformer'
import http from 'http'
import https from 'https'
import { Logger, LoggerCode } from './Logger'

/**
 * API 文档操作类
 */
export class Doc {
    constructor(
        /**
         * 原始 API doc.json 数据
         */
        readonly data: SwaggerDoc,
        readonly raw: string
    ) {}
    static fromJSON(raw: string) {
        return new Doc(plainToClass(SwaggerDoc, raw), raw)
    }
    /**
     * 下载 doc.json
     * @param url string
     */
    static download(url: string): Promise<string> {
        const requester = Doc.getRequester(url)
        Logger.info(`download from ${url} ...`, 'download')
        return new Promise((resolve) => {
            requester
                .get(url, { timeout: 7000 }, res => {
                    if (res.statusCode !== 200) {
                        Logger.error(`doc.json download failed -2, status code: ${res.statusCode}`, LoggerCode.DOWNLOAD_FAILED)
                        res.resume()
                    }
                    res.setEncoding('utf8')
                    let rawData = ''
                    res.on('data', (chunk) => { rawData += chunk; })
                    res.on('end', () => {
                        try {
                            if (!rawData) Logger.error('doc.json download failed -4', LoggerCode.DOWNLOAD_FAILED)
                            Logger.debug(`download finished! \t contents: (${rawData.substr(0, 30)} ...)`, 'download')
                            const jsonData = JSON.parse(rawData)
                            resolve(JSON.stringify(jsonData, null, 4))
                        } catch (e) {
                            Logger.error('doc.json download failed -3', LoggerCode.DOWNLOAD_FAILED)
                        }
                    });
                })
                .on('error', err => Logger.error('doc.json download failed -1 message: ' + err.message, LoggerCode.DOWNLOAD_FAILED))
                .on('timeout', () => Logger.error('doc.json download failed -1 reasons: timeout', LoggerCode.DOWNLOAD_FAILED))
        })
    }
    static getRequester(url: string) {
        return url.indexOf('https') === 0 ? https : http
    }
}
