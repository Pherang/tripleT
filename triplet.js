/* 
* Computer should check to see if the user has selected two numbers in any of the valid wins for the X they just marked.
* If the user has then the computer selects the third number that the user needs to win.
* If the user hasn't selected any two in a row then the computer checks to see if it has any two in a row.
* If it does then it tries to select the third number to win.
* If the computer doesn't have two in a row then it selects a number to build toward three in a row.
* 
*/

/*
  User picks a spot with label five.
  We need to find find five in the grid.
  But if five is already taken then we can't find it.

  If we can find it because the computer hasn't picked it yet then we can choose it.
  After we choose it the computer needs to check what we picked and counter it.
  How will the computer know what we picked in the grid?

  We can tell it explicitly by sending players pick to the function below.
  this function will then run some predefined checks for that position.
  there are nine positions to check.
  27 checks to do. 

  It seems like we need to define a few checks only and run those when needed.
  E.g. a row check for the spot the player picked, a column check, and where applicable a diagonal.
  There's no need to each row, column, and diagonal check.
  We can define a function that checks the row that the player picked whatever the player picked.
  There are five positions that needs a diagonal check. 0,0 1,1, 2,2, 0,2, 2,0
  The rest of the positions only need a row column check.

  The problem with the current program is that I have to define nine positions to check
  AND all the row, column, diagonals to check. It seems unelegant.

  The computer then only needs to know the indexes of what the player picked and not the spot to be translated.
  The first step then is to figure out where in the array the player marked.
  It sounds like I might need to send the grid coordinates to the computer instead of a string.
  I might then need to store these coordinates first before calling computerTurn.

  The looping algorithm to check a spot would be:

  Freeze the X and check all the Ys.
  Freeze the Y and check all the Xs

  [0,1]

  We would check column [0][0-3]
  We would check row    [0-3][1]
*/

function checkRowOne () {
  if (gameGrid[0][0] === playerMark) {}
}
// finds the position that the player picked.
function findGridPos (spot) {
  for (x=0; x < 3; x++){
    var y = gameGrid[x].indexOf(spot);
    console.log("index is " + x + " and " + y);
    if (y !== -1) break; 
  }
  return [x,y];
}

function computerTurn (playerspick) {
  var twoFound = false; // two player marks found in any row, column or diagonal
  console.log("Player picked " + playerspick);
  var x = 0; // grid position
  var y = 0; // grid position
  var pos = playerspick; // pos is an array that contains the indexes of the player's mark. [1,1] is 5 on the visual grid.
  var playerMarkCount = 0;
  
  // Check row
  console.log("Row check")
  for (i = 0; i < 3; i++) {
    if (gameGrid[i][pos[1]] === playerMark) {
      playerMarkCount++;
      console.log("found an x at " + i + ", " + pos[1]);
    }
  }
  console.log('Found Xes: ' + playerMarkCount);
  if (playerMarkCount === 2) {
    twoFound = true;
    markCount = 0;
    for (i = 0; i < 3; i++) {
      if (gameGrid[i][pos[1]] !== playerMark && gameGrid[i][pos[1]] !== computerMark) {
        console.log("Empty spot in row is " + gameGrid[i][pos[1]]);
        var gridSpot = document.getElementById(gameGrid[i][pos[1]]);
        markGrid(computerMark, gridSpot.id);
        markSpot(computerMark, gridSpot);
        break;
    // detectWin(gameGrid);
    gridMap.remap();
      } 
    }

  }
  
  // Check column
  if (!twoFound) {
    playerMarkCount = 0;
    console.log("Column check");
    for (i = 0; i < 3; i++) {
      if (gameGrid[pos[0]][i] === playerMark) {
        playerMarkCount++;
        console.log("found an x at " + pos[0] + ", " + i);
      }
    }
    if (playerMarkCount === 2) {
      twoFound = true;
      playerMarkCount = 0;
      for (i = 0; i < 3; i++) {
        if (gameGrid[pos[0]][i] !== playerMark && gameGrid[pos[0]][i] !== computerMark) {
          console.log("Empty spot in row is " + gameGrid[pos[0]][i]);
          var gridSpot = document.getElementById(gameGrid[pos[0]][i]);
          markGrid(computerMark, gridSpot.id);
          markSpot(computerMark, gridSpot);
          break;
        } 
      }
  
    }
  }
  // Specific cases check diagonal 0,0 0,2 2,0 2,2 1,1
  if (!twoFound && (pos == '0,0' || pos == '1,1' || pos == '2,2')) {
    playerMarkCount = 0;
    
    console.log("Diagonal Check");
    for (i = 0; i < 3; i++) {
      if (gameGrid[i][i] === playerMark) {
        playerMarkCount++;
        console.log("found an x at " + i + ", " + i);
      }
    }
    if (playerMarkCount === 2) {
      twoFound = true;
      playerMarkCount = 0;
      for (i = 0; i < 3; i++) {
        if (gameGrid[i][i] !== playerMark && gameGrid[i][i] !== computerMark) {
          console.log("Empty spot in row is " + gameGrid[i][i]);
          var gridSpot = document.getElementById(gameGrid[i][i]);
          markGrid(computerMark, gridSpot.id);
          markSpot(computerMark, gridSpot);
          break;
        } 
      }
  
    }
  }
  // Check second diagonal
  if (!twoFound && (pos == '0,2' || pos == '1,1' || pos == '2,0')) {
    playerMarkCount = 0;
    
    console.log("Diagonal Check");
    for (i = 0; i < 3; i++) {
      if (gameGrid[0+i][2-i] === playerMark) {
        playerMarkCount++;
        console.log("found an x at " + i + ", " + i);
      }
    }
    if (playerMarkCount === 2) {
      twoFound = true;
      playerMarkCount = 0;
      for (i = 0; i < 3; i++) {
        if (gameGrid[0+i][2-i] !== playerMark && gameGrid[0+i][2-i] !== computerMark) {
          console.log("Empty spot in row is " + gameGrid[0+i][2-i]);
          var gridSpot = document.getElementById(gameGrid[0+i][2-i]);
          markGrid(computerMark, gridSpot.id);
          markSpot(computerMark, gridSpot);
          break;
        }
      }
  
    }
  }

  /* If there are no two in a rows after checking row column and diagonal then the computer 
     tries to get the middle. Otherwise it could go in a clockwise pattern finding a valid and empty spot. */
  if (!twoFound) {
    var t = 1;
    x = pos[0];
    y = pos[1];
    
    if (gameGrid[1][1] !== playerMark && gameGrid[1][1] !== computerMark) {
      var gridSpot = document.getElementById(gameGrid[1][1]);
      markGrid(computerMark, gridSpot.id);
      markSpot(computerMark, gridSpot);
    } else if (gameGrid[x][y-t] !== undefined && gameGrid[x][y-t] !== playerMark && gameGrid[x][y-t] !== computerMark) {
      var gridSpot = document.getElementById(gameGrid[x][y-t]);
      markGrid(computerMark, gridSpot.id);
      markSpot(computerMark, gridSpot);
    } else if (gameGrid[(x+t)][y] !== undefined && gameGrid[(x+t)][y] !== playerMark && gameGrid[(x+t)][y] !== computerMark) {
      var gridSpot = document.getElementById(gameGrid[(x+t)][y]);
      markGrid(computerMark, gridSpot.id);
      markSpot(computerMark, gridSpot);
    } else if (gameGrid[x][(y+t)] !== undefined && gameGrid[x][(y+t)] !== playerMark && gameGrid[x][(y+t)] !== computerMark) {
      var gridSpot = document.getElementById(gameGrid[x][(y+t)]);
      markGrid(computerMark, gridSpot.id);
      markSpot(computerMark, gridSpot);
    } else if (gameGrid[x-t][y] !== undefined && gameGrid[x-t][y] !== playerMark && gameGrid[x-t][y] !== computerMark) {
      var gridSpot = document.getElementById(gameGrid[x-t][y]);
      
      markGrid(computerMark, gridSpot.id);
      markSpot(computerMark, gridSpot);
    }
  }
  gridMap.remap();

} // end computerTurn

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
* Function takes an Element ID as it's spot.
*/
function markGrid (XorO,spot) {
  
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
      if (gridMap[spot] !== computerMark &&  gridMap[spot] !== playerMark) {
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
// gridSpot is the HTML element ID of the spot on the grid clicked.
function playerTurn (playersMark, gridSpot) {
  
  if (checkGrid(gridSpot.id)) {
    console.log(gridSpot.id + " is good");
    var playerSpot = findGridPos(gridSpot.id);
    markGrid(playersMark, gridSpot.id)
    markSpot(playersMark, gridSpot);
    
    // detectWin(gameGrid);
    gridMap.remap();
    console.log(gameGrid);
    console.log(gridMap);
    // Computer needs to know where player marked.
    computerTurn(playerSpot);
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