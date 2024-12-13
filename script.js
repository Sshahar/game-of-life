'use strict;'
// Exercise 60 - Game of Life
// The Game of Life is a simulation of how a population of creatures evolves from one generation to the next, based on a set of simple rules. This colony is described by a matrix of a user determined size, where each cell is either populated by a creature (marked by an asterisk LIVING_CELL), or vacant. As with any matrix, each cell can have 8 neighboring cells at the most.

var DEAD_CELL = ' '
var LIVING_CELL = '*'
var ROWS = 25
var COLS = 80
var gTurn = 0
var gBoard
var gMainInterval

function onInit() {
    // scale down for mobile 
    if (!(window.screen.width > 980 && window.screen.height > 680 )) {
        ROWS = 20
        COLS = 20
        document.body.classList.add('mobile')
        document.querySelector('table').classList.add('mobile')
    }


    runGame()
}

function runGame() {
    gBoard = createBoard()

    // var n = 15
    // while (n--) {
    //     play()
    // }

    gMainInterval = setInterval(play, 200)

    document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            onToggleGame()
        }
    })
}

function onToggleGame() {
    var elBtn = document.getElementById('toggle-btn')
    elBtn.classList.toggle('new-born')
    elBtn.classList.toggle('dead-cell')
    if (!gMainInterval) {
        elBtn.innerHTML = 'Stop'
        gMainInterval = setInterval(play, 200)
        return
    }
    elBtn.innerHTML = 'Start'
    clearInterval(gMainInterval)
    gMainInterval = null
    // gTurn = 0
    // gBoard = createBoard()
}

function createBoard() {
    var mat = []

    for (var i = 0; i < ROWS; i++) {
        mat[i] = []
        for (var j = 0; j < COLS; j++) {
            var val = DEAD_CELL
            if (Math.random() < 0.3) val = LIVING_CELL
            mat[i][j] = { val, age: 0 }
        }
    }
    return mat
}

function play() {
    console.log('hi')

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
    var elBoard = document.getElementById('game-board')
    elBoard.innerHTML = boardTxt
}

function getGlow(cell) {
    if (gTurn === 1) return
    if (cell.val === LIVING_CELL && cell.age === 1) {
        return 'class="new-born"'
    } else if (cell.val === DEAD_CELL && cell.age === 1) {
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
            if (cellVal === LIVING_CELL) count++
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
            var neighborCount = countNeighbors(i, j)
            var val = LIVING_CELL
            if (lastVal === DEAD_CELL && neighborCount === 3) {
                val = LIVING_CELL
            } else if (neighborCount > 3 || neighborCount < 2) {
                val = DEAD_CELL
            } else if (neighborCount == 2 || neighborCount == 4) {
                val = gBoard[i][j].val
            }
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

function getChars(length, char = LIVING_CELL) {
    var res = ''
    for (var i = 0; i < length; i++) {
        res += char
    }
    return res
}
