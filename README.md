# GA Project One - Face/Off (Space Invaders Game)
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

<!-- ![Game Image](https://res.cloudinary.com/dn11uqgux/image/upload/v1632834614/project-setup-test/face-off_ubivvw.png) -->

<p align="center">
  <img src="https://res.cloudinary.com/dn11uqgux/image/upload/v1632834614/project-setup-test/face-off_ubivvw.png" />
</p>


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

  Having completed most of my MVPs and Nice-To-Haves, I revisited the enemy movement which had troubled me earlier in the project. I tried tweaking a few things again but did not have any inspiration so instead looked to increase the difficulty of the game. Adding in a moveTiming variable instructs the approaching enemies to increase their speed as they close down the grid (see code snippet above). This was really fun to add in and made the game a lot more challenging and exciting to play.
  
### Day 8 - Tidying Up Styling

  As I was happy with the functionality I had achieved by this point, the final day was an opportunity to fine tune some of my styling. As I was working without any CSS frameworks on this, it was both a blessing and a curse. The game ended up looking very unique but was very fiddly to deal with.
  
  I also did plenty of testing and realised I had not created a ‘Try Again’ option at the Game Over menu. I needed to take account for resetting the enemy array, score and lives as well as updating the styles to hide the menus. This was a simple but quite a major functionality addition at such a late stage. I’m glad I was able to put this in as I think it adds a lot to the feel of the completeness of the game. 

## Challenges

- When either the enemy and player shots moved off the board I would get an “Uncaught TypeError”. This was down to the Shot class being applied to non-existent cells. To try to prohibit this class being added to cells “off the grid” I set parameters on the shot movement functions so they would not be applied if the current cell was greater or smaller than the final row. Unfortunately this wasn’t successful in stopping this error so I decided to increase the size of the grid to 14x14 and set the parameters for clearing the setInterval to 2 rows from the ends of the grid and put a setTimeout on removing the Shot class which did fix the issue, if slightly unelegantly.
```javascript
 if (newShot > 182) {
       clearInterval(shotMoveInterval)
       setTimeout(() => {
         cells[newShot].classList.remove(enemyShotClass)
       }, 1001)
```
- The classic Space-Invaders enemy movement down the screen was one of my Nice-To-Have goals. I realised that this wasn’t going to be simple early on so chose to work on other elements that I felt would give more of an impact. In the end I wasn’t able to implement a working version of this in the game but on reflection I believe I could have achieved this with a separate set of virtual reference points for the enemy array which would lend the actual enemy array its predictable movement.

## Bugs

- Sometimes enemies will be hit by a player’s shot but they will not be removed from the enemy array.
- Change the ‘shoot’ button on the keyboard to another key, currently having this on the shift key means Windows OS users will get sticky keys from repeated presses.

## Wins 

- I was really happy with the clarity of the JavaScript I wrote, I feel it is easy to follow as variables and functions signpost well their intent.
- The aesthetic was almost exactly what I had imagined when I came up with the Face/Off concept. It was tricky to find some of the assets I used as they came from many sources and required some image and sound editing to make fit the theme.

## Future Improvements

- Improved enemy movement, move to the right then down one row then change direction.
- Introduce a maximum fire-rate for the player.
- Create multiple levels with rising difficulty.
- Add a ‘big-boss’ who moves at a different speed from the main enemies.

## Key Learnings 

  This project was particularly helpful in reinforcing many of the basic concepts of programming with JavaScript. In particular, I became particularly comfortable with DOM manipulation and creating variables and functions which I could write once and use many times throughout the codebase, greatly reducing the number of lines and complication of the code. 
  Being my first project after learning the basics of HTML, CSS and JS, this was a pretty daunting task to take on. Thankfully, it didn’t take long to get into the flow of problem solving and in the end I was happy with my final version.
