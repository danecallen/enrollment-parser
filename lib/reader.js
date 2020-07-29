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
            .on('error', (err) => {
                console.error(err)
                reject(err)
            })
    });
}

/**
 *
 * @param x
 * @returns {*}
 */
const sortGroupAndDedupe = (records) => {
    let out = _.chain(records)
        .groupBy('userId')
        .map(x => _.maxBy(x, 'version'))
        .orderBy('name')
        .groupBy('insurance')
        .value()

    return out;
}

module.exports = {
    readRecords,
    sortGroupAndDedupe
}