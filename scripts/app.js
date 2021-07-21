// MOBILE VERSION
// const pageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
// if (pageWidth < 700) {
//   width = 10
// }

// ELEMENTS
const grid = document.querySelector('.grid')

// CONSTANTS
const cells = []
const width = 14
const cellCount = width * width
const playerClass = 'player'
const enemyClass = 'enemy'
const deadEnemyClass = 'dead-enemy'
const crateArray = [128, 129, 132, 133, 136, 137, 142, 143, 146, 147, 150, 151]
const crateClass = 'crate'
const brokenCrateClass = 'crate-broken'
const playerShotClass = 'player-shot'
const enemyShotClass = 'enemy-shot'
const scoreTicker = document.getElementById('score-ticker')
const playerAudio = document.getElementById('player-audio')
const enemyAudio = document.getElementById('enemy-audio')
const objectAudio = document.getElementById('object-audio')
const backingAudio = document.getElementById('soundtrack')
const playerShootingSound = './sounds/player_shot_fired.wav'
const enemyShootingSound = './sounds/enemy_shot_fired.wav'
const crateBreakingSound = './sounds/box_smash_short.wav'
const enemyHurtSound = './sounds/enemy_hurt.wav'
const castorHurtSound = './sounds/castor_hit.wav'
const fightMusic = './sounds/face_off_fight_track.wav'
const menuMusic = './'
const fxAudio = document.querySelectorAll('.fx')
const gunOne = document.getElementById('gun-one')
const gunTwo = document.getElementById('gun-two')
const gunThree = document.getElementById('gun-three')

// VARIABLES
let playerPosition = 174
let enemyArray = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30,	31,	32,	33,	34,	35,	36,	37,	38,	39, 44, 45,	46,	47,	48,	49,	50,	51,	52,	53]
let score = 0
let lives = 3

// FUNCTIONS

//GRID AND OBJECTS
function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    // cell.textContent = i
    grid.appendChild(cell)
    cells.push(cell)
  }
}

function addCrate() {
  crateArray.map(crate => {
    cells[crate].classList.add(crateClass)
  })
}

// AUDIO

playerAudio.volume = 0.6
enemyAudio.volume = 0.6
objectAudio.volume = 0.6

function playFxAudio(audio, clip) {
  audio.src = clip
  audio.play()
}

function playMusic(audio, clip) {
  audio.src = clip
  audio.play()
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
    if (enemyArray[enemyArray.length - 1] === playerPosition || enemyArray[enemyArray.length - 1] === 195) {
      clearInterval(intervalId)
    } 
    addEnemy()
  }, 800)
}

// SHOOTING

function addRandomEnemyShot() {
  
  const shotGenerateInterval = setInterval(() => {

    let newShot = enemyArray[Math.floor(Math.random() * (enemyArray.length - 1))] + width
    cells[newShot].classList.add(enemyShotClass)
    playFxAudio(enemyAudio, enemyShootingSound)

    const shotMoveInterval = setInterval(() => {

      cells[newShot].classList.remove(enemyShotClass)
      newShot = newShot + width
      cells[newShot].classList.add(enemyShotClass)

      if (newShot > 182) {

        setTimeout(() => {
          cells[newShot].classList.remove(enemyShotClass)
        }, 1000)
        clearInterval(shotMoveInterval)

      } else if (cells[newShot].classList.contains(crateClass)) {

        playFxAudio(objectAudio, crateBreakingSound)
        cells[newShot].classList.remove(enemyShotClass)
        cells[newShot].classList.remove(crateClass)
        cells[newShot].classList.add(brokenCrateClass)
        setTimeout(() => {
          cells[newShot].classList.remove(brokenCrateClass)
        }, 400)
        clearInterval(shotMoveInterval)

      } else if (cells[newShot].classList.contains(playerClass)) {

        playFxAudio(playerAudio, castorHurtSound)
        score -= 150
        scoreTicker.innerHTML = score
        lives -= 1
        if (lives === 2) {
          gunOne.style.display = 'none'
        } else if (lives === 1) {
          gunTwo.style.display = 'none'
        } else if ((lives === 0)) {
          gunThree.style.display = 'none'
        }
        cells[newShot].classList.remove(enemyShotClass)
        // clearInterval(shotGenerateInterval)
        clearInterval(shotMoveInterval)  
      }
    }, 120)

  }, 4500)
}

// addRandomEnemyShot()

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
    case 16:
      playerShotMoves()
      break
    default:
      console.log('Invalid key')
  }
  
  addPlayer()
}

// SHOOTING

function playerShotMoves() { 
  
  let newShot = playerPosition - width
  cells[newShot].classList.add(playerShotClass)
  playFxAudio(playerAudio, playerShootingSound)
  
  const shotMoveInterval = setInterval(() => {
    
    cells[newShot].classList.remove(playerShotClass)
    newShot = newShot - width
    cells[newShot].classList.add(playerShotClass)
    
    if (newShot < 13) {
      
      setTimeout(() => {
        cells[newShot].classList.remove(playerShotClass)
      }, 1000)
      clearInterval(shotMoveInterval)
    
    } else if (cells[newShot].classList.contains(crateClass)) {
      
      playFxAudio(objectAudio, crateBreakingSound)
      cells[newShot].classList.remove(playerShotClass)
      cells[newShot].classList.remove(crateClass)
      cells[newShot].classList.add(brokenCrateClass)
      setTimeout(() => {
        cells[newShot].classList.remove(brokenCrateClass)
      }, 400)
      clearInterval(shotMoveInterval)
    
    } else if (cells[newShot].classList.contains(enemyClass)) {
      
      playFxAudio(enemyAudio, enemyHurtSound)
      score += 100
      scoreTicker.innerHTML = score
      cells[newShot].classList.remove(playerShotClass)
      cells[newShot].classList.remove(enemyClass)
      cells[newShot].classList.add(deadEnemyClass)
      setTimeout(() => {
        cells[newShot].classList.remove(deadEnemyClass)
        enemyArray = enemyArray.filter(enemy => {
          return enemy !== newShot
        })
      }, 400)
      clearInterval(shotMoveInterval)   
    }

  }, 100)
}

createGrid()

addEnemy()

// moveEnemy()

addCrate()

addPlayer()

// playMusic(backingAudio, fightMusic)

// EVENT LISTENERS

window.addEventListener('keydown', playerControls)

// if enemyArray.length < 1 player wins
