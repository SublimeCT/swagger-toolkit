import { ConfigOptions } from '../typings/config'

export enum LoggerTag {
    INFO = '💬',
    WARNING = '⚠️',
    ERROR = '❌',
}

export enum LoggerCode {
    PARAMS_ERROR = 'PARAMS_ERROR',
    PARAMS_MISSING = 'PARAMS_MISSING',
    INTERNAL_ERROR = 'INTERNAL_ERROR',
    EXEC_PATH_WRONG = 'EXEC_PATH_WRONG',
    HANDLE_FILE_FAILED = 'HANDLE_FILE_FAILED',
}

export interface LoggerOptions {
    tag: LoggerTag
    category?: string
    message: string
    exit?: boolean
    code?: LoggerCode
}

export class Logger {
    static log(options: LoggerOptions) {
        const msg = `${ConfigOptions.lOGGER_PREFIX} ${options.tag} ${options.category ? `[${options.category}]` : ''} ${options.code ? `<Code: ${options.code}>` : ''} ${options.message}`
        console.log(msg)
        if (options.exit) process.exit()
    }
    static error(message: string, code: LoggerCode, exit: boolean = true) {
        const options: LoggerOptions = {
            tag: LoggerTag.ERROR,
            message,
            exit,
            code
        }
        Logger.log(options)
    }
    static info(message: string, code?: LoggerCode) {
        const options: LoggerOptions = {
            tag: LoggerTag.INFO,
            message,
            code
        }
        Logger.log(options)
    }
}