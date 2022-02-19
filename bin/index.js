#!/usr/bin/env node
'use strict'

const fs = require('fs')

const data = fs.readFileSync(
    `${__dirname}/../ejdict-hand-utf8-only-word.txt`,
    'utf-8'
)

const searchWord = (regexp) =>
    data.match(regexp)?.map((w) => w.substring(1, w.length - 1))

const readlineSync = require('readline-sync')
const chars = { greens: '', yellows: '', blacks: '' }

const question = (message, prop, regexp) => {
    while (true) {
        const input = readlineSync.question(message)
        if (input && !regexp.test(input)) {
            console.error('Invalid string.')
            continue
        }

        if (input) chars[prop] = input
        break
    }
}

while (true) {
    question(
        `Enter the green letters(${
            chars.greens != '' ? `previous: ${chars.greens}` : 'e.g. w....'
        })> `,
        'greens',
        /^[a-z\.]{5}$/
    )

    question(
        `Enter the yellow letters(${
            chars.yellows != ''
                ? `previous: ${chars.yellows}`
                : 'e.g. a..../.b.c.'
        })> `,
        'yellows',
        /^[a-z\.]{5}(\/[a-z\.]{5})*$/
    )

    question(
        `Enter the black letters(${
            chars.blacks != '' ? `previous: ${chars.blacks}` : 'e.g. abc'
        })> `,
        'blacks',
        /^[a-z]+$/
    )

    const greenPattern =
        !chars.greens || chars.greens == '.....' ? '' : `(?=${chars.greens})`
    const yellowPatternSet = new Set(
        chars.yellows.split('/').flatMap((w) => {
            return w.split('').flatMap((c, i) => {
                if (c != '.') {
                    const base = '.....'.split('')
                    base[i] = c
                    return [`(?=.*${c})`, `(?!${base.join('')})`]
                }
            })
        })
    )
    const blackPattern = `(?=[^${chars.blacks
        .split('')
        .map((w) => {
            let exists = false
            const pos = []
            for (let i = 0; i < 5; i++) {
                if (chars.greens.charAt(i) != w) {
                    pos.push(i)
                } else {
                    exists = true
                }
            }
            if (exists) {
                pos.forEach((p) => {
                    const base = '.....'.split('')
                    base[p] = w
                    yellowPatternSet.add(`(?!${base.join('')})`)
                })
                return null
            }
            return w
        })
        .join('')}]{5})`

    const pattern = new RegExp(
        `\\n${greenPattern}${[...yellowPatternSet].join(
            ''
        )}${blackPattern}[a-z]{5}\\n`,
        'g'
    )
    console.log()
    const result = searchWord(pattern)
    if (result) {
        console.log(`result count: ${result.length}`)
        result.slice(0, 100).forEach((w, i) => console.log(`${i + 1}. ${w}`))
        if (result.length > 100) console.log('...')
    } else {
        console.log('No result.')
    }
    console.log()
}
