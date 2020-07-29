const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const _ = require('lodash')

/**
 *
 * @param content
 * @param path
 * @returns {Promise<void>}
 */
const writeCsv = (content, path) => {
    const csvWriter = createCsvWriter({
        path: path,
        header: ['userId', 'name']
    });

    return csvWriter.writeRecords(content)
}

/**
 *
 * @param data
 * @returns {Promise<unknown[]>}
 */
const writeFiles = async (data, outputDir) => {
    let promises = []

    _.keys(data).forEach(key => {
        promises.push(writeCsv(data[key], `${outputDir}/${key}.csv`))
    })

    return Promise.all(promises)
}

module.exports = {
    writeFiles
}