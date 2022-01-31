const fs = require('fs')
const { exit } = require('process')

const data = fs.readFileSync('ejdict-hand-utf8-only-word.txt', 'utf-8')

const searchWord = (regexp) =>
    data.match(regexp)?.map((w) => w.substring(1, w.length - 1))

const readlineSync = require('readline-sync')
const greens = readlineSync.question('Enter the green letters(e.g. w....)> ')
if (greens && !/^[a-z\.]{5}$/.test(greens)) {
    console.error('Invalid string.')
    exit(1)
}

const yellows = readlineSync.question('Enter the yellow letters(e.g. abc)> ')
if (yellows && !/^[a-z]{1,5}$/.test(yellows)) {
    console.error('Invalid string.')
    exit(1)
}
const blacks = readlineSync.question('Enter the black letters(e.g. abc)> ')
if (blacks && !/^[a-z]+$/.test(blacks)) {
    console.error('Invalid string.')
    exit(1)
}

const greenPattern = !greens || greens == '.....' ? '' : `(?=${greens})`
const yellowPatterns = yellows.split('').map((w) => `(?=.*${w})`)
const blackPatterns = blacks.split('').map((w) => `(?!.*${w})`)
const pattern = new RegExp(
    `\\n${greenPattern}${yellowPatterns.join('')}${blackPatterns.join(
        ''
    )}.....\\n`,
    'g'
)
console.log()
const result = searchWord(pattern)

result ? result.forEach((w) => console.log(w)) : console.log('No result.')
