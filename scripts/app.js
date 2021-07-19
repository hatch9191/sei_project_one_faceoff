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
const playerRow = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99]

console.log(playerRow)

// VARIABLES
let playerPosition = 93
let enemyArray = [0, 2, 4, 6, 8, 11, 13, 15, 17, 19, 20, 22, 24, 26, 28]
let enemyShotArray = []
let playerShotArray = []

// FUNCTIONS

//GRID AND OBJECTS
function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.textContent = i
    grid.appendChild(cell)
    cells.push(cell)
  }
}

function addCrate() {
  crateArray.map(crate => {
    cells[crate].classList.add(crateClass)
  })
}

// ENEMY FUNCTIONS
// MOVEMENT

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
    if (enemyArray[enemyArray.length - 1] === playerPosition || enemyArray[enemyArray.length - 1] === 99) {
      clearInterval(intervalId)
    } 
    addEnemy()
  }, 800)
}

// SHOOTING
// const newShot = enemyArray[Math.floor(Math.random() * (enemyArray.length - 1))] + 10

function addRandomEnemyShot() {
  // enemyShotArray.push(enemyArray[Math.floor(Math.random() * (enemyArray.length - 1))] + 10)
  // addEnemyShot() 
  // enemyShotMoves()

  
  setInterval(() => {
    let newShot = enemyArray[Math.floor(Math.random() * (enemyArray.length - 1))] + 10
    const newInternval = setInterval(() => {
      cells[newShot].classList.remove(enemyShotClass)
      newShot = newShot + 10
      cells[newShot].classList.add(enemyShotClass)
      console.log(newShot)
      if (cells[newShot] > 90) {
        console.log(newShot)
        newShot = null
        // cells[newShot].classList.remove(enemyShotClass)
        
        clearInterval(newInternval)
      } 
    }, 1000)
  }, 5000)
}

addRandomEnemyShot()
// function addEnemyShot() {
//   cells[newShot].classList.add(enemyShotClass)
// }

// function removeEnemyShot() {
//   // enemyShotArray.map(shot => {
//   cells[newShot].classList.remove(enemyShotClass)
//   // })
// }

// function enemyShotMoves() { 
  
//   const shotMoveInterval = setInterval(() => {
//     removeEnemyShot()
//     enemyShotArray = enemyShotArray.map(shot => {
//       console.log(shot)
//       if (shot === playerPosition) {
//         clearInterval(shotMoveInterval)
//       } else if (shot > 90) {
//         console.log('I am here')
//         removeEnemyShot()
//         // enemyShotArray.shift()
//         // console.log(enemyShotArray)
//         // clearInterval(shotMoveInterval)
//       } else {
//         // console.log('Hello World')
//         return shot + 10
//       }
//     })
    
   
//     addEnemyShot()
//   }, 1000)
// }

// function enemyShoots() {
//   const intervalId = setInterval(() => {
//     removeEnemyShot()
//     addRandomEnemyShot()
//     // enemyShotMoves()
//     // if (enemyShotArray[enemyShotArray.length - 1] === playerPosition || enemyShotArray[enemyArray.length - 1] > 99) {
//     //   clearInterval(intervalId)
//     // } 
//   }, 2000)


// PLAYER FUNCTIONS
// MOVEMENT

function addPlayer() {
  cells[playerPosition].classList.add(playerClass)
}

function removePlayer() {
  cells[playerPosition].classList.remove(playerClass)
}

function playerControls(event) {
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
    case 32:
      playerShoots()
      break
    default:
      console.log('Invalid movement')
  }
  console.log(playerPosition)
  addPlayer()
}

// SHOOTING

function addPlayerShot() {
  playerShotArray.map(shot => {
    cells[shot].classList.add(playerShotClass)
  })
}

function removePlayerShot() {
  playerShotArray.map(shot => {
    cells[shot].classList.remove(playerShotClass)
  })
}

function playerShoots() {
  playerShotArray.push(playerPosition - 10)
  playerShotArray.map(shot => {
    cells[shot].classList.add(playerShotClass)
  })
  playerShotMoves()
}

function playerShotMoves() { 
  const intervalId = setInterval(() => {
    removePlayerShot()
    playerShotArray = playerShotArray.map(shot => {
      // if (shot === playerPosition) {
      //   clearInterval(intervalId)
      // } else if (shot > 99) {
      //   enemyShotArray.pop(enemyShotArray[enemyShotArray.length - (enemyShotArray.length - 1)])
      // } else
        return shot - 10
    })
    // })
    // if (enemyShotArray[enemyShotArray.length - 1] === playerPosition) {
    //   clearInterval(intervalId)
    // } else if (enemyShotArray[enemyArray.length - 1] > 99) {
    //   enemyShotArray.pop(enemyShotArray[enemyShotArray.length - (enemyShotArray.length - 1)])
    // }  
    addPlayerShot()
  }, 1000)
}

// function handlePlayerTrigger(event) {
//   switch (event.keyCode) {
//     case 49:
//       playerShoots
//       break
//     default:
//       console.log('Invalid movement')
//   }
//   console.log(playerPosition)
//   addPlayer()
// }

// if enemyArray.length < 1 player wins

createGrid()

addEnemy()

// moveEnemy()

addCrate()

addPlayer()

enemyShoots()

// EVENT LISTENERS

window.addEventListener('keydown', playerControls)
