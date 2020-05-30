const expect = require('chai').expect
const fs = require('fs')
const util = require('util')
const path = require('path')
const { SwaggerTool, ConfigOptions } = require('../../build/main.js')
const {
    removePackageJSON,
    createPackageJSON,
    removeConfigFile,
    createConfigFile,
    createDocJson,
    removeDocJson,
    isThrow,
    isCustomErr,
} = require('../utils.js')

// 测试套件 test suite, 表示一组相关的测试
describe('1. 输入参数检测', function() {
    describe('1-1. 当前执行环境不是项目根目录', function() {
        // 先删除本地的 package.json
        before(removePackageJSON)
        // 测试用例 test case, 表示一个单独的测试, 是测试的最小单位
        it('应该抛出自定义异常', async function() {
            const tool = new SwaggerTool('', null, null)
            try {
                await tool.run()
            } catch(err) {
                isThrow()
                isCustomErr(err)
            }
        })
        after(createPackageJSON)
    })
    describe('1-2. 未指定配置文件目录和自定义配置', function () {
        // 先删除本地的 package.json
        before(removeConfigFile)
        it('应该抛出自定义异常', async function () {
            const tool = new SwaggerTool('', null, null)
            try {
                await tool.run()
            } catch (err) {
                isThrow()
                isCustomErr(err)
            }
        })
        after(createConfigFile)
    })
    describe('1-3. 指定的配置文件格式错误', function () {
        // 先删除本地的 package.json
        it('应该抛出自定义异常', async function () {
            const tool = new SwaggerTool('./aaaaa.jsc', null, null)
            try {
                await tool.run()
            } catch (err) {
                isThrow()
                isCustomErr(err)
            }
        })
    })
    describe('1-4. 指定的配置文件不存在', function () {
        // 先删除本地的 package.json
        it('应该抛出自定义异常', async function () {
            const tool = new SwaggerTool('./aaaaa.js', null, null)
            try {
                await tool.run()
            } catch (err) {
                isThrow()
                isCustomErr(err)
            }
        })
    })
    describe('1-5. 将 doc.json 下载到本地指定文件中', function () {
        const docJSONPath = path.resolve(process.cwd(), './swagger.doc.test.json')
        before(async() => {
            await removeDocJson(docJSONPath)
        })
        // 先删除本地的 package.json
        it('应该将 doc.json 下载到本地', async function () {
            const config = new ConfigOptions({
                site: 'https://petstore.swagger.io/',
                path: 'v2/swagger.json',
                docJSONPath,
            })
            const tool = new SwaggerTool('', null, null, config)
            await tool.run()
            const access = util.promisify(fs.access)
            // 必须返回 Promise, 直接 await 不会执行到
            return access(docJSONPath).then(res => {
                expect(res).to.be.undefined
                return res
            })
        })
    })
})
