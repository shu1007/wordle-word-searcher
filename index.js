const fs = require('fs')
const { exit } = require('process')

const data = fs.readFileSync('ejdict-hand-utf8-only-word.txt', 'utf-8')

const searchWord = (regexp) =>
    data.match(regexp)?.map((w) => w.substring(1, w.length - 1))

const readlineSync = require('readline-sync')
const chars = { greens: '', yellows: '', blacks: '' }

while (true) {
    chars.greens = readlineSync.question(
        `Enter the green letters(${
            chars.greens != '' ? `previous: ${chars.greens}` : 'e.g. w....'
        })> `
    )
    if (chars.greens && !/^[a-z\.]{5}$/.test(chars.greens)) {
        console.error('Invalid string.')
        exit(1)
    }

    chars.yellows = readlineSync.question(
        `Enter the yellow letters(${
            chars.yellows != '' ? `previous: ${chars.yellows}` : 'e.g. abc'
        })> `
    )
    if (chars.yellows && !/^[a-z]{1,5}$/.test(chars.yellows)) {
        console.error('Invalid string.')
        exit(1)
    }
    chars.blacks = readlineSync.question(
        `Enter the black letters(${
            chars.blacks != '' ? `previous: ${chars.blacks}` : 'e.g. abc'
        })> `
    )
    if (chars.blacks && !/^[a-z]+$/.test(chars.blacks)) {
        console.error('Invalid string.')
        exit(1)
    }

    const greenPattern =
        !chars.greens || chars.greens == '.....' ? '' : `(?=${chars.greens})`
    const yellowPatterns = chars.yellows.split('').map((w) => `(?=.*${w})`)
    const blackPatterns = chars.blacks.split('').map((w) => `(?!.*${w})`)
    const pattern = new RegExp(
        `\\n${greenPattern}${yellowPatterns.join('')}${blackPatterns.join(
            ''
        )}.....\\n`,
        'g'
    )
    console.log()
    const result = searchWord(pattern)

    result ? result.forEach((w) => console.log(w)) : console.log('No result.')
}
