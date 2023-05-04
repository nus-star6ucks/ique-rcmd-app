const fs = require('fs')

export function readConfigFile (fileName) {
    const data = fs.readFileSync(fileName, 'utf8').toString().split("\n")
    return data.reduce((config, line) => {
        const [key, value] = line.split("=")
        if (key && value) {
            config[key] = value
        }
        return config
    }, {})
}