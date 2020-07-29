const csv = require('csv-parser')
const fs = require('fs')
const _ = require('lodash')

/**
 *
 * @param file
 * @returns {Promise<unknown>}
 */
const readRecords = async (file) => {
    let results = []
    return new Promise((resolve, reject) => {
        fs.createReadStream(file)
            .pipe(csv({ headers: false }))
            .on('data', (data) => {
                const record = {
                    userId: data[0],
                    name: data[1],
                    version: data[2],
                    insurance: data[3]
                }
                results.push(record)
            })
            .on('end', () => {
                console.log(results)
                resolve(results)
            })
    });
}

/**
 *
 * @param x
 * @returns {*}
 */
const sortAndDedupe = (x) => {
    let out = _.chain(x)
        .groupBy('userId')
        .map(x => _.maxBy(x, 'version'))
        .sortBy('name')
        .groupBy('insurance')
        .value()

    return out;
}

/**
 *
 * @param records
 * @returns {*}
 * Helper method to group data by insurance company
 */
const organizeData = (records) => {
    const recordsByInsurance = _.groupBy(records, 'insurance')
    const fileData = _.chain(recordsByInsurance)
        .map(x => sortAndDedupe(x))
        .value()

    return Object.assign({}, ...fileData)
}

module.exports = {
    readRecords,
    organizeData
}