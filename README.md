# GA (SEI) Project One - Face/Off (Space Invaders Game)
---
## Table of Contents
- Project Overview
- The Brief
- Technologies Used
- Code Installation
- Project Timeline
- Challenges
- Bugs
- Wins
- Future Improvements
- Key Learnings

## Project Overview

  This was my first project on the General Assembly Software Engineering Immersive course. It was done as a solo-effort over the course of 8 days and was my first chance at both building a game using JavaScript and at creating a project from scratch.

  The game is based around the logic from the arcade classic, Space Invaders, where a swarm of aliens move down the grid row by row. The player is tasked with destroying as many of the aliens as possible before they reach the bottom of the grid, whilst also avoiding their bombs.

  Being a huge fan of the ridiculous action-epic Face/Off, featuring Nick Cage and John Travolta, I smelt a perfect opportunity for a mash-up theme, this time with evil Castor Troy defending the airport hangar from the waves of cops swarming around him. 

  You can view the finished game here: [hatch9191.github.io/sei_project_one_faceoff/](hatch9191.github.io/sei_project_one_faceoff/)

![Game Image](https://res.cloudinary.com/dn11uqgux/image/upload/v1632834614/project-setup-test/face-off_ubivvw.png)

## The Brief

- Render a grid-based game in the browser.
- Create a one-player game against the computer.
- The player should be able to clear at least one wave of aliens.
- The player's score should be displayed at the end of the game.
- Include separate HTML, CSS and JavaScript files.
- Deploy the game online.

## Technologies Used

- HTML5 and HTML5 audio
- CSS3
- JavaScript (ES6)
- Git
- GitHub

## Code Installation

  To run this project locally no installation is required apart from downloading the codebase onto your local machine. The game can then be rendered in any browser by copying the local path of the index.html file into the URL bar.

## Project Timeline

### Day 1 - Planning

  The first day was dedicated to planning and code exploration as well as some basic styling options for the theme. Being my first time taking on a project from scratch, I found it helpful to draw up a wireframe, in this instance by hand. I also put together a list of goals split into 3 categories; Core, Nice To Have, and Stretch.

  Finding visual aids helpful, I decided to build the basic structure from my wireframe for the game page in HTML and added a couple of my initial styling concepts in CSS. By the end of the day I had these built and had written the code to generate the 10x10 grid on which the game would be played.

### Day 2-3 - Sprite Movement

  The initial steps on my Core goals lists were to create movement for the player and for the enemy sprites. I knew the key concepts behind moving the sprites from one grid-box to the next were the same, but I wasn’t quite sure yet on how I would attain the enemy waves moving across and down as in the original Space Invaders. 

  I decided to get the player movement in place first. Using the grid numbers it was very easy to attain movement laterally between boxes. As a player presses the assigned movement key, the player location is updated +/-1 from its current location. In the same function classes can be removed and then added to show the player’s location using a sprite image. 
    
  For the enemy movement I decided to up the functionality in stages. Having created an array of enemies, I initially copied the basic +1 grid movement from the player movement. When trying to get the enemies to move down and reverse direction I came across an anticipated issue. I tried two methods, one where I split the enemy array into three rows and set the highest enemy from each row as the reference point, and then one where the highest placed enemy from the full enemy array acted as the reference point. The problem would be when removing these reference point enemies from the arrays as this would result in disjointed movement. Trial and test of these methods took considerable time to come up with only to get poor results, therefore I rolled back to the basic movement and decided to continue on with other functionality. 

### Day 4-5 - Shooting and Game Audio

  Following a disappointing previous day I was looking to make better progress with the shooting functionality, however this proved to also be a bigger challenge than expected. The movement of the shots up and down the grid was as simple as adding a shot +/- 10 in front of the enemy or player and then launching them on a setInterval. The problem occurred when the shots reached the end of the grid and were supposed to be removed from the game. There is more on this issue in the Challenges section. This really was a headache but a positive spin-off was that my remedy of increasing the size of the grid to 14x14 added a lot to the aesthetic of the game. 

  A nice win in this period was adding in audio features for the gameplay and music. I used 4 audio elements which would be triggered by starting the game and various actions like shooting or the player/enemies/objects getting hit by the shots. I did a lot of trawling through free audio libraries and cutting audio clips to fit the feel of the game. It was very satisfying adding these in as suddenly the game came alive.
  
### Day 6-7 - Scoring, Lives & Revisiting Enemy Movement

  By this point I was roughly a day behind where I was planning to be due to some of the challenges I had experienced. The final pieces of the Core goals list was Scoring and Lives. The Scoring was an easy line to add in to my shooting functions and then represent this in the Infobar at the top of the grid and on the Game Over page.

  Adding the Lives went hand-in-hand with setting the Game Over parameters. This was really a satisfying task as it caused me to go over many of the game functions to add ‘if’ statements that would define whether the game was still able to continue or not (see one code snippet below). The lives could then also be represented in the Infobar. Initially the lives were represented with a number but this proved a perfect opportunity to add in another reference from the film, Castor Troy’s iconic gold guns.

```javascript
  function moveEnemy() {
 setTimeout(() => {
 
   if (gameOver !== false) {
     return
   }
   removeEnemy()
   getNewEnemy()
 
   if (enemyArray[enemyArray.length - 1] === playerPosition ||
   enemyArray[enemyArray.length - 1] === 195) {
     gameOver = true
     playFxAudio(playerAudio, castorDead)
     setTimeout(() => {
       gameOverScreen()
     }, 4500)
   } else if (enemyArray[enemyArray.length - 1] === 69 ||
   enemyArray[enemyArray.length - 1] === 111) {
     moveTiming -= 120
   }
   addEnemy()
   moveEnemy()
 }, moveTiming)
}
```
