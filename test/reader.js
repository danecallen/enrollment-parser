const { expect } = require('chai')
const sinon = require('sinon')
const { sortGroupAndDedupe } = require('../lib/reader')
const fs = require('fs')
const _ = require('lodash')

describe('reader', () => {
    describe('sortGroupAndDedupe', () => {

        it('dedupes the userId within insurance to the max version of that user', () => {
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
                {
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
                    ]
                },
                {
                    "BCBS GA": [
                        {
                            "userId": "122",
                            "name": "Some Body",
                            "version": "12",
                            "insurance": "BCBS GA"
                        }
                    ]
                },
                {
                    "HUMANA": [
                        {
                            "userId": "121",
                            "name": "Dane Allen",
                            "version": "14",
                            "insurance": "HUMANA"
                        }
                    ]
                },
                {
                    "KAISER": [
                        {
                            "userId": "111",
                            "name": "Dane Allen",
                            "version": "10",
                            "insurance": "KAISER"
                        }
                    ]
                }
            ]

            const output = _.map(input, sortGroupAndDedupe)

            expect(output).to.eql(expected)
        })

    })
})