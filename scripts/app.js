// MOBILE VERSION
// const pageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
// if (pageWidth < 700) {
//   width = 10
// }

// ELEMENTS
const grid = document.querySelector('.grid')


// CONSTANTS
const cells = []
const width = 10
const cellCount = width * width
const playerClass = 'player'
const enemyClass = 'enemy'
const crateArray = [81, 84, 85, 88]
const crateClass = 'crate'
const playerShotClass = 'player-shot'
const enemyShotClass = 'enemy-shot'

// VARIABLES
let playerPosition = 93
let enemyArray = [2, 4, 5, 7, 11, 13, 16, 18, 21, 22, 24, 25, 27, 28]
let playerShotArray = [83]
let enemyShotArray = [37]

// FUNCTIONS
function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.textContent = i
    grid.appendChild(cell)
    cells.push(cell)
  }
}

function addEnemies() {
  enemyArray.map(enemy => {
    cells[enemy].classList.add(enemyClass)
  })
}

function addCrate() {
  crateArray.map(crate => {
    cells[crate].classList.add(crateClass)
  })
}

function addPlayer() {
  cells[playerPosition].classList.add(playerClass)
}

function removePlayer() {
  cells[playerPosition].classList.remove(playerClass)
}

function playerShoots() {
  playerShotArray.map(shot => {
    cells[shot].classList.add(playerShotClass)
  })
}

function enemyShoots() {

}


function enemyMoves() {

}

function playerMoves(event) {
  const x = playerPosition % width

  removePlayer()

  switch (event.keyCode) {
    case 39:
      if (x < width - 1) {
        playerPosition ++
      }
      break
    case 37:
      if (x > 0) {
        playerPosition --
      }
      break
    default:
      console.log('Invalid movement')
  }
  console.log(playerPosition)
  addPlayer()
}


createGrid()

addEnemies()

addCrate()

addPlayer()

playerShoots()

// EVENT LISTENERS

window.addEventListener('keydown', playerMoves)