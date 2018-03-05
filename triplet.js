/*
* Need to figure out how to track tac tic toe 
* It is a 3x3 grid.
* Computer should block two X's in a row.
* Computer should try to get its own three in a row of course.
* 
*/


/*
* Valid wins
* 123
* 456
* 789
* 147
* 258
* 369
* 159
* 356
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
* Computer should check to see if the user has selected two numbers in any of the valid wins.
* If the user has then the computer selects the third number that the user needs to win.
* If the user hasn't selected any two in a row then the computer checks to see if it has any two in a row.
* If it does then it tries to select the third number to win.
* If the computer doesn't have two in a row then it selects a number to build toward three in a row.
* 
*/

function computerTurn () {

}
/* 
* Need some way of translating or tracking the positions 
* [0][0] [1][0] [2][0]
* [0][1] [1][1] [2][1]
* [0][2] [1][2] [2][2]
*/
var gameGrid = [[1,4,7],[2,5,8],[3,6,9]];




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
*/

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

one.addEventListener('click', console.log("dogshit"));