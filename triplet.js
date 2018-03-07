/* 
* Computer should check to see if the user has selected two numbers in any of the valid wins for the X they just marked.
* If the user has then the computer selects the third number that the user needs to win.
* If the user hasn't selected any two in a row then the computer checks to see if it has any two in a row.
* If it does then it tries to select the third number to win.
* If the computer doesn't have two in a row then it selects a number to build toward three in a row.
* 
*/

function checkRowOne () {
  
  if (gameGrid[0][0] === playerMark) {}
  
}
// Computer needs to check where the player marked and then see if there is another mark
// in the same row, column, or diagonal. 
function computerTurn (playerspick) {
  console.log("Player picked " + playerspick);
  
  console.log(gameGrid);
  switch (playerspick) {

    case 'one':
      // If player picked one we need to check the row, column and diagonal along one.
      // Check the first row.
      var markCount = 0;
      console.log("made it here");
      console.log(gameGrid);
      for (i = 0; i < 3; i++) {
        if (gameGrid[i][0] === playerMark) {
          console.log("X's found at " + i + "[0]");
          markCount++;
        }
      }
      
      if (markCount === 2) {
        
        for (i = 0; i < 3; i++) {
          if (gameGrid[i][0] !== computerMark) {
            var newspot = gameGrid[i][0];
            newspot.textContent = computerMark;
            gameGrid[i][0] = computerMark;
            
          }
        }
      }

      break;
    case 'two':
   
      break;
      case 'three':
   
      break;
  }

}

/* 
* Need some way of translating or tracking the positions 
*
* [0][0] [1][0] [2][0]   one two three
* [0][1] [1][1] [2][1] = four five six 
* [0][2] [1][2] [2][2]   seven eight nine
* 
* An array might not be the best for this actually.
* It might be better as an object..
* Looks like I need both for different reasons.
*
* What if it was eight arrays?
* [one,two,three]
* [four,five,six]
* [seven,eight,nine]
*
* [one,four,seven]
* [two,five,eight]
* [three,six,nine]
*
* [one,five,nine]
* [three,five,six]
*
*
*/
var gameGrid = [['one','four','seven'],['two','five','eight'],['three','six','nine']];

// grid positions are used in many functions so its useful to have it defined in one place.
var gridMap = {
  one : gameGrid[0][0],
  two : gameGrid[1][0],
  three : gameGrid[2][0],
  four : gameGrid[0][1],
  five : gameGrid[1][1],
  six : gameGrid[2][1],
  seven : gameGrid[0][2],
  eight : gameGrid[1][2],
  nine : gameGrid[2][2],
  remap : function () { // Need to get new values after grid gets updated by player or computer
    this.one = gameGrid[0][0],
    this.two = gameGrid[1][0],
    this.three = gameGrid[2][0],
    this.four = gameGrid[0][1],
    this.five = gameGrid[1][1],
    this.six = gameGrid[2][1],
    this.seven = gameGrid[0][2],
    this.eight = gameGrid[1][2],
    this.nine = gameGrid[2][2]
  }
}

/*
* Need to allow user to pick X or O. If user picks one the computer is the other.
*/

/*
* Need a way to detect board is full
*/

/*
* Need a way to detect a win
* Valid wins: 123 ,456, 789, 147, 258, 369, 159, 357, 
*/
function detectWin(boardObject){

  if ( boardObject['one'] !== '' && boardObject['one'] === boardObject['two'] && boardObject['two'] === boardObject['three'] ) {
    alert(boardObject);
    alert('Winner');
  }

}
/*
* Need function to translate visual grid spots to locations in array gameGrid
*/

function markGrid (XorO,spot) {
  console.log("The spot is " + XorO);
  
  switch (spot) {
    case 'one':
      gameGrid[0][0] = XorO;
      break;
      case 'two':
      gameGrid[1][0] = XorO;
      break;
      case 'three':
      gameGrid[2][0] = XorO;
      break;
      case 'four':
      gameGrid[0][1] = XorO;
      break;
      case 'five':
      gameGrid[1][1] = XorO;
      break;
      case 'six':
      gameGrid[2][1] = XorO;
      break;
      case 'seven':
      gameGrid[0][2] = XorO;
      break;
      case 'eight':
      gameGrid[1][2] = XorO;
      break;
      case 'nine':
      gameGrid[2][2] = XorO;
      break;
      
  }

}

function checkGrid (spot) {
      if (gridMap.spot !== computerMark &&  gridMap.spot !== playerMark) {
        console.log(spot + " is empty");
        return true;
      }
}

/*
* Need a  way to mark the board.
*/
playerMark = 'X';
computerMark = 'O';

function markSpot (XorO, gridSpot) {
  gridSpot.textContent = XorO;
}

// function marks the visual grid and calls a function to mark the logical grid that is tracking the game.
function playerTurn (playersMark, gridSpot) {
  // Need to check if that spot was already marked. 
  console.log(checkGrid(gridSpot.id));
  if (checkGrid(gridSpot.id)) {
    console.log(gridSpot.id + " is good");
    markGrid(playersMark, gridSpot.id)
    markSpot(playersMark, gridSpot);
    // detectWin(gameGrid);
    gridMap.remap();
    console.log(gridMap);
    // Computer needs to know where player marked.
    //computerTurn(gridSpot.id);
  }

}

// All nine squares need to be clickable.
var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var four = document.getElementById('four');
var five = document.getElementById('five');
var six = document.getElementById('six');
var seven = document.getElementById('seven');
var eight = document.getElementById('eight');
var nine = document.getElementById('nine');

// Passes 'this' so that the markSpot and markGrid functions knows which grid location to update.
one.addEventListener('click', function () { playerTurn(playerMark,this); }, false );
two.addEventListener('click', function () { playerTurn(playerMark,this); }, false );
three.addEventListener('click', function () { playerTurn(playerMark,this); }, false );
four.addEventListener('click', function () { playerTurn(playerMark,this); }, false );
five.addEventListener('click', function () { playerTurn(playerMark,this); }, false );
six.addEventListener('click', function () { playerTurn(playerMark,this); }, false );
seven.addEventListener('click', function () { playerTurn(playerMark,this); }, false );
eight.addEventListener('click', function () { playerTurn(playerMark,this); }, false );
nine.addEventListener('click', function () { playerTurn(playerMark,this); }, false );

/* Just in case I need this
function computerTurn (playerspick) {
  console.log('wheeee');
  console.log('Player marked ' + playerspick);
  console.log(gameGrid);
  switch (playerspick) {

    case 'one':
      console.log('case detected');
      if (gameGrid['two'] === '') {
        
        gameGrid['two'] = computerMark;
        console.log('Grid is ' + gameGrid['two']);
        setTimeout( markSpot(computerMark,two), 5000);
      } else if (gameGrid['five'] === '') {
        gameGrid['five'] = computerMark;
        setTimeout( markSpot(computerMark,five), 5000);
      } else if (gameGrid['four'] === '') {
        gameGrid['four'] = computerMark;
        setTimeout( markSpot(computerMark,four), 5000);
      }
      break;
    case 'two':
      console.log('case detected');
      if (gameGrid['one'] === '') {
        gameGrid['one'] = computerMark;
        setTimeout( markSpot(computerMark,two), 5000);
      } else if (gameGrid['three'] === '') {
        gameGrid['three'] = computerMark;
        setTimeout( markSpot(computerMark,five), 5000);
      } else if (gameGrid['six'] === '') {
        gameGrid['six'] = computerMark;
        setTimeout( markSpot(computerMark,four), 5000);
      }
      break;
      case 'three':
      console.log('check whole row');
      if (gameGrid['six'] === '') {
        gameGrid['six'] = computerMark;
        setTimeout( markSpot(computerMark,six), 5000);
      } else if (gameGrid['nine'] === '') {
        gameGrid['nine'] = computerMark;
        setTimeout( markSpot(computerMark,nine), 5000);
      } else if (gameGrid['two'] === '') {
        gameGrid['two'] = computerMark;
        setTimeout( markSpot(computerMark,two), 5000);
      }
      break;
  }
}*/