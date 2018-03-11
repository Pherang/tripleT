// Scan to see if computer has won.
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
    setTimeout(initGame, 2500, 'reset');
    return true;
  }
  if (scanForDraw()) {
    scoreBoard.textContent = "Draw! Impressive User.."
    freezeBoard();
    setTimeout(initGame, 2500, 'reset');
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
        ('computerColour');
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
    var postest = pos.toString();
    console.log(postest + ' is here');
    if (gameGrid[0][0] !== playerMark && gameGrid[0][0] !== computerMark) {
        var gridSpot = document.getElementById(gameGrid[0][0]);
        markGrid(computerMark, gridSpot.id);
        markSpot(computerMark, gridSpot);
      } else if (gameGrid[2][0] !== playerMark && gameGrid[2][0] !== computerMark) {
        var gridSpot = document.getElementById(gameGrid[2][0]);
        markGrid(computerMark, gridSpot.id);
        markSpot(computerMark, gridSpot);
        console.log('Tried top right');
      } else if (gameGrid[2][2] !== playerMark && gameGrid[2][2] !== computerMark) {
        
        var gridSpot = document.getElementById(gameGrid[2][2]);
        markGrid(computerMark, gridSpot.id);
        markSpot(computerMark, gridSpot);
        console.log('tried ' + gridSpot.id);
      } else if (gameGrid[0][2] !== playerMark && gameGrid[0][2] !== computerMark) {
        var gridSpot = document.getElementById(gameGrid[0][2]);
        markGrid(computerMark, gridSpot.id);
        markSpot(computerMark, gridSpot);
      } else if (gameGrid[1][1] !== playerMark && gameGrid[1][1] !== computerMark) {
        var gridSpot = document.getElementById(gameGrid[1][1]);
        markGrid(computerMark, gridSpot.id);
        markSpot(computerMark, gridSpot);
      // Check if the corners are free
      }   // If the corners aren't taken try the regular spots.
       else if (gameGrid[1][0] !== playerMark && gameGrid[1][0] !== computerMark) {
        var gridSpot = document.getElementById(gameGrid[1][0]);
        markGrid(computerMark, gridSpot.id);
        markSpot(computerMark, gridSpot);
      } else if (gameGrid[2][1] !== playerMark && gameGrid[2][1] !== computerMark) {
        var gridSpot = document.getElementById(gameGrid[2][1]);
        markGrid(computerMark, gridSpot.id);
        markSpot(computerMark, gridSpot);
      } else if (gameGrid[1][2] !== playerMark && gameGrid[1][2] !== computerMark) {
        var gridSpot = document.getElementById(gameGrid[1][2]);
        markGrid(computerMark, gridSpot.id);
        markSpot(computerMark, gridSpot);
      } else if (gameGrid[0][1] !== playerMark && gameGrid[0][1] !== computerMark) {
        var gridSpot = document.getElementById(gameGrid[0][1]);
        markGrid(computerMark, gridSpot.id);
        markSpot(computerMark, gridSpot);
      }
  
    console.log('Computer chose ' + gridSpot.id) ;
    }


  gridMap.remap();
  if (scanForDraw()) {
    setTimeout(function () {scoreBoard.textContent = "Draw! Impressive User..";},1000);
    freezeBoard();
    setTimeout(initGame, 2500, 'reset');
    return true;
  }    
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
    leftTab.classList.add('userColour');
    rightTab.classList.add('computerColour');
    playerMark = 'X'; 
    computerMark = 'O';
  }
  if (this.id === 'oTab') {
    rightTab.classList.add('userColour');
    leftTab.classList.add('computerColour');
    playerMark = 'O'; 
    computerMark = 'X';
    setTimeout(computerTurn, 400, [0,0]);
  }
  console.log('Player has chosen ' + playerMark);
  console.log('Computer has chosen ' + computerMark);

  setupBoard();
}

/*
* Need a  way to mark the board.
*/

function markSpot (XorO, gridSpot) {
  
  console.log(XorO + ' is the mark');
    console.log(gridSpot.id + ' is the spot');
  if (XorO === computerMark) {
    console.log('Computer\'s turn')
    gridSpot.classList.remove('userColour')
    gridSpot.classList.add('computerColour');
    
  }
  if (XorO === playerMark) {
    console.log('User\'s turn')
    gridSpot.classList.add('userColour')
    gridSpot.classList.remove('computerColour');
  }

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
    setTimeout(computerTurn, 400, playerSpot);
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

function initGame (reset) {

  scoreBoard.textContent = 'Can you win User?'
  gameGrid = [['one','four','seven'],['two','five','eight'],['three','six','nine']];
  [one,two,three,four,five,six,seven,eight,nine].forEach( function (id) { 
    id.textContent = ''; 
    id.classList.remove('userColour');
    id.classList.remove('computerColour'); 
  });
  gridMap.remap();
  
  //if (reset !== 'reset') { // not a reset then do this. not a reset would be the first time only.
   scoreBoard.textContent = "Choose your weapon User"
    leftTab.classList.remove('userColour');
    leftTab.classList.remove('computerColour');
    leftTab.classList.add('neutralColour');
    leftTab.textContent = 'X';
    rightTab.classList.remove('userColour');
    rightTab.classList.remove('computerColour');
    rightTab.classList.add('neutralColour');
    rightTab.textContent = 'O';
    leftTab.addEventListener('click',  chooseWeapon, false );
    rightTab.addEventListener('click', chooseWeapon, false );  

    console.log(rightTab.classList);
    console.log(leftTab.classList);
  //}
  
}

window.onload = initGame;