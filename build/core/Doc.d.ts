/// <reference types="node" />
import { SwaggerDoc } from '../typings/SwaggerDoc';
import http from 'http';
import https from 'https';
/**
 * API 文档操作类
 */
export declare class Doc {
    /**
     * 原始 API doc.json 数据
     */
    readonly data: SwaggerDoc;
    readonly raw: string;
    constructor(
    /**
     * 原始 API doc.json 数据
     */
    data: SwaggerDoc, raw: string);
    static fromJSON(raw: string): Doc;
    /**
     * 下载 doc.json
     * @param url string
     */
    static download(url: string): Promise<string>;
    static getRequester(url: string): typeof https | typeof http;
}
//# sourceMappingURL=Doc.d.ts.map