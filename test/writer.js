const { expect } = require('chai')
const { writeFiles } = require('../lib/writer')
const _ = require('lodash')
const sinon = require('sinon')
const csv = require('csv-writer')

describe('writer', () => {
    describe('writeFiles', () => {

        const writeSpy = sinon.spy()

        beforeEach(() => {
            sinon.stub(csv, 'createObjectCsvWriter').returns({
                writeRecords: writeSpy
            });
        })

        it('writes a file for each insurance company', () => {
            const input = {
                "BCBS DE": [
                    {
                        "userId": "123",
                        "name": "Dane R Allen",
                        "version": "14",
                        "insurance": "BCBS DE"
                    },
                    {
                        "userId": "124",
                        "name": "Ray Allen",
                        "version": "11",
                        "insurance": "BCBS DE"
                    }
                ],
                "BCBS GA": [
                    {
                        "userId": "122",
                        "name": "Some Body",
                        "version": "12",
                        "insurance": "BCBS GA"
                    }
                ],
                "HUMANA": [
                    {
                        "userId": "121",
                        "name": "Dane Allen",
                        "version": "14",
                        "insurance": "HUMANA"
                    }
                ],
                "KAISER": [
                    {
                        "userId": "111",
                        "name": "Dane Allen",
                        "version": "10",
                        "insurance": "KAISER"
                    }
                ]
            }

            const expected = [
                [
                    [
                        {
                            "userId": "123",
                            "name": "Dane R Allen",
                            "version": "14",
                            "insurance": "BCBS DE"
                        },
                        {
                            "userId": "124",
                            "name": "Ray Allen",
                            "version": "11",
                            "insurance": "BCBS DE"
                        }
                    ]
                ],
                [
                    [
                        {
                            "userId": "122",
                            "name": "Some Body",
                            "version": "12",
                            "insurance": "BCBS GA"
                        }
                    ]
                ],
                [
                    [
                        {
                            "userId": "121",
                            "name": "Dane Allen",
                            "version": "14",
                            "insurance": "HUMANA"
                        }
                    ]
                ],
                [
                    [
                        {
                            "userId": "111",
                            "name": "Dane Allen",
                            "version": "10",
                            "insurance": "KAISER"
                        }
                    ]
                ]
            ]

            writeFiles(input)

            expect(writeSpy.called).to.equal(true)
            expect(writeSpy.args).to.eql(expected)
        })
    })
})