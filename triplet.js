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

function scanWin() {
  ("Running scan win")
  marks = 0;
  var computerWins = false;
  
  // scan rows for double computerMarks
  for (y = 0; y < 3; y++) {
    for (x = 0; x < 3; x++) {
      if (gameGrid[x][y] === computerMark) {
        ("Row scan X is " + x + " Y is " + y + " GRID is " + gameGrid[x][y]);
        marks++;
      }
    }
    (marks)
    if (marks === 1) marks = 0;
    // if a potential win is detected go back in to mark the empty spot.
    if (marks === 2) {
      marks = 0;
      for (x = 0; x < 3; x++) {
        if (gameGrid[x][y] !== computerMark && gameGrid[x][y] !== playerMark) {
          computerWins = true;
          var gridSpot = document.getElementById(gameGrid[x][y]);
          markGrid(computerMark, gridSpot.id);
          markSpot(computerMark, gridSpot);
        }
      }
    }
    if (computerWins) return computerWins;
  }

  //scans columns for potential wins
  for (x = 0; x < 3; x++) {
    for (y = 0; y < 3; y++) {
      if (gameGrid[x][y]  === computerMark) {
        marks++;
      } 
    }
    if (marks === 1 ) marks = 0;
    // if a potential win is detected go back in to mark the empty spot.
    if (marks === 2) {
      marks = 0
      for (y = 0; y < 3; y++) {
        if (gameGrid[x][y] !== computerMark && gameGrid[x][y] !== playerMark) {
          computerWins = true;
          var gridSpot = document.getElementById(gameGrid[x][y]);
          markGrid(computerMark, gridSpot.id);
          markSpot(computerMark, gridSpot);
        }
      }
    }
    if (computerWins) return computerWins;
  }

  //scans backslash diagonal for potential wins
  if (marks === 1) marks = 0;
    for (x = 0; x < 3; x++) {
      if (gameGrid[(0+x)][(0+x)]  === computerMark) {
        marks++;
      } 
    }
    if (marks === 1 ) marks = 0;
    // if a potential win is detected go back in to mark the empty spot.
    if (marks === 2) {
      marks = 0
      for (x = 0; x < 3; x++) {
        if (gameGrid[(0+x)][(0+x)] !== computerMark && gameGrid[(0+x)][(0+x)] !== playerMark) {
          computerWins = true;
          var gridSpot = document.getElementById(gameGrid[(0+x)][(0+x)]);
          markGrid(computerMark, gridSpot.id);
          markSpot(computerMark, gridSpot);
        }
      }
      if (computerWins) return computerWins;
    }

  //scans Forward diagonal for potential wins
  if (marks === 1) marks = 0;
    for (x = 0; x < 3; x++) {
      if (gameGrid[(0+x)][(2-x)]  === computerMark) {
        marks++;
      } 
    }
    if (marks === 1 ) marks = 0;
    // if a potential win is detected go back in to mark the empty spot.
    if (marks === 2) {
      marks = 0
      for (x = 0; x < 3; x++) {
        if (gameGrid[(0+x)][(2-x)] !== computerMark && gameGrid[(0+x)][(2-x)] !== playerMark) {
          computerWins = true;
          var gridSpot = document.getElementById(gameGrid[(0+x)][(2-x)]);
          markGrid(computerMark, gridSpot.id);
          markSpot(computerMark, gridSpot);
        }
      }
      if (computerWins) return computerWins;
    }
    
}

function scanForDraw() {
  var marks = 0;
  for (x = 0; x < 3; x++) {
    for (y = 0; y < 3; y++) {
      if (gameGrid[x][y] === computerMark || gameGrid[x][y] === playerMark) {
        marks++;
      }
    }
  }
  console.log(marks);
  if ( marks === 9) {
    return true;
  }
  return false;
}

// finds the position that the player picked.
function findGridPos (spot) {
  for (x=0; x < 3; x++){
    var y = gameGrid[x].indexOf(spot);
    if (y !== -1) break; 
  }
  return [x,y];
}

function computerTurn (playerspick) {
  var twoFound = false; // two player marks found in any row, column or diagonal
  var x = 0; // grid position
  var y = 0; // grid position
  var pos = playerspick; // pos is an array that contains the indexes of the player's mark. [1,1] is 5 on the visual grid.
  var playerMarkCount = 0;
  
  if (scanWin()) { 
    scoreBoard.textContent = "Sark Wins!"
    freezeBoard();
    setTimeout(initGame, 3000);
    return true;
  }
  if (scanForDraw()) {
    scoreBoard.textContent = "Draw! Impressive User.."
    freezeBoard();
    setTimeout(initGame, 3000);
    return true;
  } 
  // Check row
  for (i = 0; i < 3; i++) {
    if (gameGrid[i][pos[1]] === playerMark) {
      playerMarkCount++;
    }
  }
  if (playerMarkCount === 2) {
    
    markCount = 0;
    for (i = 0; i < 3; i++) {
      if (gameGrid[i][pos[1]] !== playerMark && gameGrid[i][pos[1]] !== computerMark) {
        twoFound = true;
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
    for (i = 0; i < 3; i++) {
      if (gameGrid[pos[0]][i] === playerMark) {
        playerMarkCount++;
      }
    }
    if (playerMarkCount === 2) {
      
      playerMarkCount = 0;
      for (i = 0; i < 3; i++) {
        if (gameGrid[pos[0]][i] !== playerMark && gameGrid[pos[0]][i] !== computerMark) {
          twoFound = true;
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
    
    for (i = 0; i < 3; i++) {
      if (gameGrid[i][i] === playerMark) {
        playerMarkCount++;
      }
    }
    if (playerMarkCount === 2) {
      
      playerMarkCount = 0;
      for (i = 0; i < 3; i++) {
        if (gameGrid[i][i] !== playerMark && gameGrid[i][i] !== computerMark) {
          twoFound = true;
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
    for (i = 0; i < 3; i++) {
      if (gameGrid[(0+i)][(2-i)] === playerMark) {
        playerMarkCount++;
      }
    }
    if (playerMarkCount === 2) {
      playerMarkCount = 0;
      for (i = 0; i < 3; i++) {
        if (gameGrid[(0+i)][(2-i)] !== playerMark && gameGrid[(0+i)][(2-i)] !== computerMark) {
          twoFound = true;
          var gridSpot = document.getElementById(gameGrid[(0+i)][(2-i)]);
          markGrid(computerMark, gridSpot.id);
          markSpot(computerMark, gridSpot);
          break;
        }
      }
  
    }
  }

  /* If there are no two in a rows after checking row column and diagonal then the computer 
     tries to get the middle. Otherwise it could go in a clockwise pattern finding a valid and empty spot.
     
     */
  if (!twoFound) {
    var t = 1;
    x = pos[0];
    y = pos[1];
    if (gameGrid[1][1] !== playerMark && gameGrid[1][1] !== computerMark) {
      var gridSpot = document.getElementById(gameGrid[1][1]);
      markGrid(computerMark, gridSpot.id);
      markSpot(computerMark, gridSpot);
      // Check if the corners are free
    } else if ( (( x - t > -1 && y - t > -1) ? gameGrid[x-t][y-t] : false) && gameGrid[x-t][y-t] !== playerMark && gameGrid[x-t][y-t] !== computerMark) {
      var gridSpot = document.getElementById(gameGrid[x-t][y-t]);
      markGrid(computerMark, gridSpot.id);
      markSpot(computerMark, gridSpot);
    } else if ( (( (x + t) < 3 && (y - t) < 3) ? gameGrid[(x+t)][(y-t)] : false) && gameGrid[(x+t)][y-t] !== playerMark && gameGrid[(x+t)][y-t] !== computerMark) {
      var gridSpot = document.getElementById(gameGrid[(x+t)][y-t]);
      markGrid(computerMark, gridSpot.id);
      markSpot(computerMark, gridSpot);
    } else if ( (( (x - t) > -1 && (y + t) < 3) ? gameGrid[(x-t)][(y+t)] : false) && gameGrid[(x-t)][(y+t)] !== playerMark && gameGrid[(x-t)][(y+t)] !== computerMark) {
      var gridSpot = document.getElementById(gameGrid[(x-t)][(y+t)]);
      markGrid(computerMark, gridSpot.id);
      markSpot(computerMark, gridSpot);
    } else if ( (( (x + t) < 3 && (y + t) < 3) ? gameGrid[(x+t)][(y+t)] : false) && gameGrid[(x+t)][(y+t)] !== playerMark && gameGrid[(x+t)][(y+t)] !== computerMark) {
      var gridSpot = document.getElementById(gameGrid[(x+t)][(y+t)]);
      markGrid(computerMark, gridSpot.id);
      markSpot(computerMark, gridSpot);
    } 
    // If the corners aren't taken try the regular spots.
     else if (( y - t > -1 ? gameGrid[x][y-t] : false) && gameGrid[x][y-t] !== playerMark && gameGrid[x][y-t] !== computerMark) {
      var gridSpot = document.getElementById(gameGrid[x][y-t]);
      markGrid(computerMark, gridSpot.id);
      markSpot(computerMark, gridSpot);
    } else if ((x + t < 3 ? gameGrid[(x+t)][y] : false) && gameGrid[(x+t)][y] !== playerMark && gameGrid[(x+t)][y] !== computerMark) {
      var gridSpot = document.getElementById(gameGrid[(x+t)][y]);
      markGrid(computerMark, gridSpot.id);
      markSpot(computerMark, gridSpot);
    } else if (( y + t < 3 ? gameGrid[x][(y+t)] : false) && gameGrid[x][(y+t)] !== playerMark && gameGrid[x][(y+t)] !== computerMark) {
      var gridSpot = document.getElementById(gameGrid[x][(y+t)]);
      markGrid(computerMark, gridSpot.id);
      markSpot(computerMark, gridSpot);
    } else if (( x - t > -1 ? gameGrid[x-t][y] : false) && gameGrid[x-t][y] !== playerMark && gameGrid[x-t][y] !== computerMark) {
      var gridSpot = document.getElementById(gameGrid[x-t][y]);
      markGrid(computerMark, gridSpot.id);
      markSpot(computerMark, gridSpot);
    }
  
}
  gridMap.remap();

} // end computerTurn


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

/* Player chooses X or O */
var playerMark;
var computerMark;

function chooseWeapon () {
  if (this.id === 'xTab') {
    playerMark = 'X'; 
    computerMark = 'O';
  }
  if (this.id === 'oTab') {
    playerMark = 'O'; 
    computerMark = 'X';
  }
  console.log('Player has chosen ' + playerMark);
  console.log('Computer has chosen ' + computerMark);
  setupBoard();
}

/*
* Need a  way to mark the board.
*/

function markSpot (XorO, gridSpot) {
  gridSpot.textContent = XorO;
}

// function marks the visual grid and calls a function to mark the logical grid that is tracking the game.
// gridSpot is the HTML element ID of the spot on the grid clicked.
function playerTurn (playersMark, gridSpot) {
  
  if (checkGrid(gridSpot.id)) {
    var playerSpot = findGridPos(gridSpot.id);
    markGrid(playersMark, gridSpot.id)
    markSpot(playersMark, gridSpot);
    
    // detectWin(gameGrid);
    gridMap.remap();
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

function gridClicked () {
  playerTurn(playerMark,this);
}

function setupBoard () {
  // Passes 'this' so that the markSpot and markGrid functions knows which grid location to update.
  scoreBoard.textContent = 'Can You Win User?'
  one.addEventListener('click', gridClicked, false );
  two.addEventListener('click', gridClicked, false );
  three.addEventListener('click', gridClicked, false );
  four.addEventListener('click', gridClicked, false );
  five.addEventListener('click', gridClicked, false );
  six.addEventListener('click', gridClicked, false );
  seven.addEventListener('click', gridClicked, false );
  eight.addEventListener('click', gridClicked, false );
  nine.addEventListener('click', gridClicked, false );

  // Freeze the weapon buttons
  leftTab.removeEventListener('click',  chooseWeapon, false );
  rightTab.removeEventListener('click', chooseWeapon, false );
}

function freezeBoard () {
  // Passes 'this' so that the markSpot and markGrid functions knows which grid location to update.
  console.log('Shutting board down');
  one.removeEventListener('click', gridClicked, false );
  two.removeEventListener('click', gridClicked, false );
  three.removeEventListener('click', gridClicked, false );
  four.removeEventListener('click', gridClicked, false );
  five.removeEventListener('click', gridClicked, false );
  six.removeEventListener('click', gridClicked, false );
  seven.removeEventListener('click', gridClicked, false );
  eight.removeEventListener('click', gridClicked, false );
  nine.removeEventListener('click', gridClicked, false );
}

// User needs to be able to choose X or O 
var leftTab = document.getElementById('xTab');
var rightTab = document.getElementById('oTab');

var scoreBoard = document.getElementById('scoreBoard');

function initGame () {
  scoreBoard.textContent = "Choose your weapon User"
  leftTab.addEventListener('click',  chooseWeapon, false );
  rightTab.addEventListener('click', chooseWeapon, false );  
  gameGrid = [['one','four','seven'],['two','five','eight'],['three','six','nine']];
  [one,two,three,four,five,six,seven,eight,nine].forEach( function (id) { id.textContent = ''; } );
  gridMap.remap();
}

window.onload = initGame;