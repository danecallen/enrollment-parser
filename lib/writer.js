const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const _ = require('lodash')

const writeCsv = (content, path) => {
    const csvWriter = createCsvWriter({
        path: path,
        header: ['userId', 'name']
    });

    return csvWriter.writeRecords(content)
}

const writeFiles = async (data) => {
    let promises = []

    _.keys(data).forEach(key => {
        promises.push(writeCsv(data[key], `./data/out/${key}.csv`))
    })

    return Promise.all(promises)
}

module.exports = {
    writeFiles
}