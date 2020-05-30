/// <reference types="node" />
import fs from 'fs';
import { ConfigOptions } from '../typings/config';
export declare class File {
    static access: typeof fs.access.__promisify__;
    static writeFile: typeof fs.writeFile.__promisify__;
    static ALLOW_CONFIG_EXT: string[];
    /**
     * 检测指定文件是否可读
     * @param filePath string
     */
    static toAccess(filePath: string): Promise<boolean>;
    /**
     * 检测是否位于项目根目录, 即检测当前目录下是否存在 `package.json` 文件
     */
    static hasPackageJSON(): Promise<boolean>;
    /**
     * 读取指定的配置文件
     * @param filePath string
     */
    static getConfig(filePath: string): Promise<ConfigOptions>;
    static saveToLocal(raw: string, savePath: string): Promise<void>;
}
//# sourceMappingURL=File.d.ts.map