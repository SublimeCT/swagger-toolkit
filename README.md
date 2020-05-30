# swagger-toolkit

分析 `swagger` 的 `api.json` 并在本地生成或更新 `definitions` 对应的 `Model class`

## Install

In your project, package.json
```json
{
    "dependencies": {
        "swagger-toolkit": "git+ssh://git@github.com:SublimeCT/swagger-toolkit.git",
    }
}
```
To install
```bash
yarn
```

## Usage
⚠️ Only the download function is currently completed

In command line
```bash
./node_modules/.bin/swagger-toolkit --help
```

In javascript / typescript file
```javascript
import { ConfigOptions, SwaggerTool } from 'swagger-toolkit'
const config = new ConfigOptions({
    site: 'http://api.lynee.cn',
    docJSONPath,
})
const tool = new SwaggerTool('', null, null, config)
await tool.run()
```

## Test
In this project
```bash
yarn test # use mocha
yarn test-command # just use command
```
