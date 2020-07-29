const { readRecords, sortGroupAndDedupe } = require('./lib/reader')
const { writeFiles } = require('./lib/writer')
const _ = require('lodash')

if(process.argv.length < 4){
    console.error(`Missing arguments, require both an input file path and output directory.`)
    process.exit(1)
}

const inputFile = process.argv[2]
const outputDir = process.argv[3]

/**
 *
 * @param records
 * @returns {Promise<void>}
 *
 */
async function processInput(records){
    const recordsByInsurance = _.chain(records)
                                .groupBy('insurance')
                                .map(sortGroupAndDedupe)
                                .value();

    const fileData = Object.assign({}, ...recordsByInsurance)
    await writeFiles(fileData, outputDir)
}

readRecords(inputFile)
    .then(processInput)
    .catch(err => console.error(err))


