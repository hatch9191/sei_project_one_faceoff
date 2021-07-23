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
const playerDeadClass = 'player-dead'
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
const castorHurtSoundOne = './sounds/castor_hurt1.wav'
const castorHurtSoundTwo = './sounds/castor_hurt2.wav'
const castorDead = './sounds/final_death_explicit.wav'
const fightMusic = './sounds/face_off_fight_track.wav'
const startMusic = './sounds/face_off_menu_track.wav'
const winnerMusic = './sounds/win_music.wav'
const loserMusic = './sounds/loser_music.wav'
const audioButton = document.querySelector('.audio-on')
const audioOnOff = document.querySelector('.audio-on span')
const gunOne = document.getElementById('gun-one')
const gunTwo = document.getElementById('gun-two')
const gunThree = document.getElementById('gun-three')
const startGameButton = document.querySelector('.start-game')
const tryAgainButton1 = document.querySelector('.try-again1')
const tryAgainButton2 = document.querySelector('.try-again2')
const startMenu = document.querySelector('.start-menu')
const gameOverMenu = document.querySelector('.game-over')
const youWinMenu = document.querySelector('.winner')
const finalScore1 = document.querySelector('.final-score1')
const finalScore2 = document.querySelector('.final-score2')

// VARIABLES
let playerPosition = 174
// let archerPosition = 7
let enemyArray = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30,	31,	32,	33,	34,	35,	36,	37,	38,	39, 44, 45,	46,	47,	48,	49,	50,	51,	52,	53]
let score = 0
let lives = 3
let musicToggle = 0
let gameOver = false
let moveTiming = 600

// FUNCTIONS

function startGame() {
  
  gameOver = false
  score = 0
  lives = 3

  if (lives === 3) {
    gunOne.style.display = 'initial'
    gunTwo.style.display = 'initial'
  }

  createGrid()
  removeEnemy()
  removePlayer()

  enemyArray = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30,	31,	32,	33,	34,	35,	36,	37,	38,	39, 44, 45,	46,	47,	48,	49,	50,	51,	52,	53]
  
  addEnemy()
  addCrate()

  startMenu.style.display = 'none'
  gameOverMenu.style.display = 'none'
  youWinMenu.style.display = 'none'

  playFightMusic(backingAudio, fightMusic)

  setTimeout(() => {
    playerPosition = 174
    addPlayer()
    moveEnemy()
    addRandomEnemyShot()
  }, 1000)
  
}

function gameOverScreen() {
  playLoserMusic()
  gameOverMenu.style.display = 'flex'
  finalScore1.innerHTML = score
}

function youWinScreen() {
  playWinnerMusic()
  youWinMenu.style.display = 'flex'
  finalScore2.innerHTML = score
}

setInterval(() => {

  if (gameOver !== false) {
    return
  } else if (enemyArray.length === 0) {
    gameOver = true
    youWinScreen()
  } 
}, 500)

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
backingAudio.volume = 0.7

function playFxAudio(audio, clip) {
  audio.src = clip
  audio.play()
}

function playStartMusic() {
  backingAudio.src = startMusic
  musicToggle += 1
  if (musicToggle % 2 === 0) {
    audioOnOff.innerHTML = 'Off'
    backingAudio.pause()
  } else {
    audioOnOff.innerHTML = 'On'
    backingAudio.play()
  }
}

function playFightMusic() {
  backingAudio.src = fightMusic
  backingAudio.play()
}

function playWinnerMusic() {
  backingAudio.src = winnerMusic
  backingAudio.play()
}

function playLoserMusic() {
  backingAudio.src = loserMusic
  backingAudio.play()
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

  setTimeout(() => {

    if (gameOver !== false) {
      return
    }

    removeEnemy()
    getNewEnemy()
    console.log(enemyArray[enemyArray.length - 1])

    if (enemyArray[enemyArray.length - 1] === playerPosition || enemyArray[enemyArray.length - 1] === 195) {
      gameOver = true
      playFxAudio(playerAudio, castorDead)
      setTimeout(() => {
        gameOverScreen()
      }, 4500)
    } else if (enemyArray[enemyArray.length - 1] === 69 || enemyArray[enemyArray.length - 1] === 111) {
      moveTiming -= 120
    }
    addEnemy()
    moveEnemy()
  }, moveTiming)
}

// SHOOTING

function addRandomEnemyShot() {
  
  const shotGenerateInterval = setInterval(() => {

    if (gameOver !== false) {
      clearInterval(shotGenerateInterval)
    }

    let newShot = enemyArray[Math.floor(Math.random() * (enemyArray.length - 1))] + width
    cells[newShot].classList.add(enemyShotClass)
    playFxAudio(enemyAudio, enemyShootingSound)

    const shotMoveInterval = setInterval(() => {

      cells[newShot].classList.remove(enemyShotClass)
      newShot = newShot + width
      cells[newShot].classList.add(enemyShotClass)

      if (newShot > 182) {
        clearInterval(shotMoveInterval)
        setTimeout(() => {
          cells[newShot].classList.remove(enemyShotClass)
        }, 1001)
        

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

        score -= 150
        scoreTicker.innerHTML = score
        lives -= 1

        if (lives === 2) {
          gunOne.style.display = 'none'
          playFxAudio(playerAudio, castorHurtSoundOne)
          cells[newShot].classList.add(playerDeadClass)
          setTimeout(() => {
            cells[newShot].classList.remove(playerDeadClass)
          }, 500)
        } else if (lives === 1) {
          gunTwo.style.display = 'none'
          playFxAudio(playerAudio, castorHurtSoundTwo)
          cells[newShot].classList.add(playerDeadClass)
          setTimeout(() => {
            cells[newShot].classList.remove(playerDeadClass)
          }, 500)
        } else if ((lives === 0)) {
          gunThree.style.display = 'none'
          playFxAudio(playerAudio, castorDead)
          cells[newShot].classList.remove(enemyShotClass)
          cells[newShot].classList.remove(playerClass)
          cells[newShot].classList.add(playerDeadClass)
          clearInterval(shotGenerateInterval)
          clearInterval(shotMoveInterval) 
          setTimeout(() => {
            cells[newShot].classList.remove(playerDeadClass)
            gameOverScreen()
          }, 4000)
        }

      }
    }, 140)

  }, 3800)
}

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
  console.log(enemyArray)
  
  const shotMoveInterval = setInterval(() => {
    
    cells[newShot].classList.remove(playerShotClass)
    newShot = newShot - width
    cells[newShot].classList.add(playerShotClass)
    
    if (newShot < 14) {
      clearInterval(shotMoveInterval)
      setTimeout(() => {
        cells[newShot].classList.remove(playerShotClass)
      }, 1001)
      
    
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
      }, 250)
      clearInterval(shotMoveInterval)   
    }

  }, 100)
}

// EVENT LISTENERS

window.addEventListener('keydown', playerControls)

audioButton.addEventListener('click', playStartMusic)

startGameButton.addEventListener('click', startGame)

tryAgainButton1.addEventListener('click', startGame)

tryAgainButton2.addEventListener('click', startGame)