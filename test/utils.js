const fs = require('fs')
const path = require('path')
const expect = require('chai').expect

module.exports.removeConfigFile = async (configFilePath = './swagger.config.js') => {
    await fs.unlink(path.resolve(process.cwd(), configFilePath), err => {})
}

module.exports.createConfigFile = async (configFilePath = './swagger.config.js') => {
    await fs.writeFile(path.resolve(process.cwd(), configFilePath), '', err => {})
}

module.exports.removePackageJSON = async () => {
    await fs.unlink(path.resolve(process.cwd(), './package.json'), err => {})
}

module.exports.createPackageJSON = async () => {
    await fs.writeFile(path.resolve(process.cwd(), './package.json'), '', err => {})
}

module.exports.removeDocJson = async (docJSONPath = './swagger.doc.js') => {
    await fs.unlink(path.resolve(process.cwd(), docJSONPath), err => {})
}

module.exports.createDocJson = async (docJSONPath = './swagger.doc.js') => {
    await fs.writeFile(path.resolve(process.cwd(), docJSONPath), '', err => {})
}

/**
 * 是否是包含自定义的错误提示的异常
 */
module.exports.isCustomErr = err => expect(err.message).to.equal('[swagger-toolkit] ⛔️', '代码报错导致的异常 ?')

/**
 * 直接执行抛出异常断言
 * @description 必须抛出异常
 * @example
 * ```javascript
 * try {
 *     // ...
 * } catch(err) {
 *     isThrow() // 若抛出异常则视为验证通过
 * }
 * ```
 */
module.exports.isThrow = fn => expect(fn || (() => { throw new Error() })).to.throw()
