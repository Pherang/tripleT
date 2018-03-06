/*
* Need to figure out how to track tac tic toe 
* It is a 3x3 grid.
* Computer should block two X's in a row.
* Computer should try to get its own three in a row of course.
* 
*/

/* 
* Computer's logic to win:
* 123
* 456
* 789
* First turn
* user picks 5, computer picks 2,4,6,8.
* user picks anything else, computer picks 5.
*
* 123
* OX6
* 789
*
* User picks another spot on the grid.
* Computer checks to see if that spot leads to a win.
* 
* 1X3
* OX6
* 789
*
* Computer should check to see if the user has selected two numbers in any of the valid wins for the X they just marked.
* If the user has then the computer selects the third number that the user needs to win.
* If the user hasn't selected any two in a row then the computer checks to see if it has any two in a row.
* If it does then it tries to select the third number to win.
* If the computer doesn't have two in a row then it selects a number to build toward three in a row.
* 
*/
function checkRowOne () {
  
  if (gameGrid[0][0] == playerMark) {}
  
}
function computerTurn (playerspick) {
  console.log('wheeee');
  console.log('Player marked ' + playerspick);
  console.log(gameGrid);
  switch (playerspick) {

    case 'one':
    
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
* No, an array is better
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
var gameGrid = [[1,4,7],[2,5,8],[3,6,9]];
console.log('Grid at 0 0 is ' + gameGrid[0][0]);

/*var gameGrid = {

  one : '',
  two : '',
  three : '',
  four : '',
  five : '',
  six : '',
  seven : '',
  eight : '',
  nine : '',
  
}*/

/*
* Need to allow user to pick X or O. If user picks one the computer is the other.
*/

/*
* Need a way to switch and detect turns
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

function translateGrid (spot) {
  console.log("Called me");
  console.log('Spot is ' + spot);
  switch (spot) {
    case one:
      console.log(spot);
      return gameGrid[0][0];
      break;
    case two:
      return gameGrid[0][1];
      break;
    case three:
      return gameGrid[0][2];
      break;  
    case 'four':
      console.log('four be returned');
      console.log(gameGrid[0][1]);
      return gameGrid[0][1];
      break;
          
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

function playerTurn (playersMark, gridSpot) {
  var gameSpot = translateGrid(gridSpot.id);
  console.log(gameSpot);
  if (gameSpot === '') {
    gameSpot = playersMark;
    markSpot(playersMark, gridSpot);
    detectWin(gameGrid);
    computerTurn(gridSpot.id);
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

// Passes 'this' so that the markSpot function knows which grid location to update.
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