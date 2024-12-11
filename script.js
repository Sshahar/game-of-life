'use strict;'
// Exercise 60 - Game of Life
// The Game of Life is a simulation of how a population of creatures evolves from one generation to the next, based on a set of simple rules. This colony is described by a matrix of a user determined size, where each cell is either populated by a creature (marked by an asterisk '*'), or vacant. As with any matrix, each cell can have 8 neighboring cells at the most.

var ROWS = 10
var COLS = 8
var gTurn = 1
var gBoard
var gMainInterval

main()


function main() {
    gBoard = createBoard()
    play()

    // var n = 15
    // while (n--) {
    //     play()
    // }

    gMainInterval = setInterval(play, 3000)

    document.addEventListener('keypress', function (e) {
        if (e.key == 'Enter') {
            clearInterval(gMainInterval)
        }
    })
}

function createBoard() {
    var mat = []

    for (var i = 0; i < ROWS; i++) {
        mat[i] = []
        for (var j = 0; j < COLS; j++) {
            mat[i][j] = ['*', ' '][getRandomInt(0, 2)]
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
            boardTxt += `<td>${gBoard[i][j]}</td>`
        }
        boardTxt += '</tr>'
    }
    var boardEl = document.getElementById('game-board')
    boardEl.innerHTML = boardTxt
}

function countNeighbors(row, col) {
    var count = 0
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= ROWS) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j >= ROWS) continue
            if (i == row && j == col) continue // Exclude center
            if (gBoard[i][j] === '*') count++
        }
    }
    return count
}

function runGeneration() {
    var mat = []

    for (var i = 0; i < ROWS; i++) {
        mat[i] = []
        for (var j = 0; j < COLS; j++) {
            mat[i][j] = inRange(countNeighbors(i, j), 2, 5) ? '*' : ' '
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
