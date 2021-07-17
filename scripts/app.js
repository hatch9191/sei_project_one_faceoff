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
let enemyArray = [0, 2, 4, 6, 8, 11, 13, 15, 17, 19, 20, 22, 24, 26, 28]
let playerShotArray = [83]
let enemyShotArray = [36]

// FUNCTIONS
function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.textContent = i
    grid.appendChild(cell)
    cells.push(cell)
  }
}

function addEnemy() {
  enemyArray.map(enemy => {
    cells[enemy].classList.add(enemyClass)
  })
}

function removeEnemy() {
  enemyArray.map(enemy => {
    cells[enemy].classList.remove(enemyClass)
  })
}

function getNewEnemy() {
  enemyArray = enemyArray.map(enemy => {
    return enemy + 1
  })
}

function moveEnemy() {
  const intervalId = setInterval(() => {
    removeEnemy()
    getNewEnemy()
    if (enemyArray[enemyArray.length - 1] === 89) {
      clearInterval(intervalId)
    } 
    addEnemy()
  }, 800)
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
  enemyShotArray.map(shot => {
    cells[shot].classList.add(enemyShotClass)
  })
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

// if enemyArray.length > 1 player wins

createGrid()

addEnemy()

// moveEnemy()

addCrate()

addPlayer()

playerShoots()
enemyShoots() 

// EVENT LISTENERS

window.addEventListener('keydown', playerMoves)