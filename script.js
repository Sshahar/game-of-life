'use strict;'
// Exercise 60 - Game of Life
// The Game of Life is a simulation of how a population of creatures evolves from one generation to the next, based on a set of simple rules. This colony is described by a matrix of a user determined size, where each cell is either populated by a creature (marked by an asterisk '*'), or vacant. As with any matrix, each cell can have 8 neighboring cells at the most.

var ROWS = 10
var COLS = 8
var gTurn = 0
var gBoard
var gMainInterval

main()


function main() {
    gBoard = createBoard()
    
    // var n = 15
    // while (n--) {
    //     play()
    // }

    gMainInterval = setInterval(play, 3000)

    document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            gTurn = 0
            gBoard = createBoard()
            // clearInterval(gMainInterval)
        }
    })
}

function createBoard() {
    var mat = []

    for (var i = 0; i < ROWS; i++) {
        mat[i] = []
        for (var j = 0; j < COLS; j++) {
            var val = ['*', ' ', ' ', ' '][getRandomInt(0, 4)]
            mat[i][j] = { val, age: 0 }
        }
    }
    return mat
}

function play() {
    gBoard = runGeneration(gBoard)
    renderBoard(gBoard)
}

function renderBoard() {
    console.log(`Generation ${gTurn++}`)
    console.table(gBoard)
    var boardTxt = ''

    for (var i = 0; i < ROWS; i++) {
        boardTxt += '<tr>'
        for (var j = 0; j < COLS; j++) {
            var cellVal = gBoard[i][j].val
            var glow = getGlow(gBoard[i][j])
            boardTxt += `<td ${glow}>${cellVal}</td>`
        }
        boardTxt += '</tr>'
    }
    var boardEl = document.getElementById('game-board')
    boardEl.innerHTML = boardTxt
}

function getGlow(cell) {
    if (gTurn === 1) return
    if (cell.val === '*' && cell.age === 1) {
        return 'class="new-born"'
    } else if (cell.val === ' ' && cell.age === 1) {
        return 'class="dead-cell"'
    }
    return ''
}

function countNeighbors(row, col) {
    var count = 0
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= ROWS) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j >= COLS) continue
            if (i === row && j === col) continue // Exclude center
            var cellVal = gBoard[i][j].val
            if (cellVal === '*') count++
        }
    }
    return count
}

function runGeneration() {
    var mat = []

    for (var i = 0; i < ROWS; i++) {
        mat[i] = []
        for (var j = 0; j < COLS; j++) {
            var lastVal = gBoard[i][j].val
            var val = inRange(countNeighbors(i, j), 2, 5) ? '*' : ' '
            mat[i][j] = gBoard[i][j]
            mat[i][j].val = val
            if (lastVal !== val) mat[i][j].age = 1
            else mat[i][j].age++
        }
    }
    return mat
}

function inRange(num, low, high) {
    return num >= low && num < high
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min))
}

function getChars(length, char = '*') {
    var res = ''
    for (var i = 0; i < length; i++) {
        res += char
    }
    return res
}
