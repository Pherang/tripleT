# Tic Tac Toe Tron  
A Tic Tac Toe game with a Tron theme.

Game will allow player to choose between X and O.
Game should not let player win. Player can get a draw at best. Have play tested with people and the ai seems unbeatable. Let me know if it is though and I'll try rewriting it.
Game restarts as soon as current game is completed.


Live version hosted at *https://codepen.io/Pherang/full/WzbNyr?editors=0100*

Learned more about Flexbox, Grid, CSS transitions, and quite a bit of Javascript thanks to this project.
Layout is also responsive and changes on mobile.

The challenge with this project was figuring out how to get the game to work in sequence and to control the flow of the game properly. A few things learned included removing the event handlers for game grid once the computer was taking it's turn and then adding them again so the player could play. 

Every interaction had to be handled properly including getting the player to choose between X or O and then allowing the board to work. The players choice of X or O would determine if the computer or player went first so that had to be handled.
There was quite a bit of these to deal with so thinking about them took some.

The major challenge was the computer's logic or *AI*. The spots it chooses are in an order that maximizes its chances of picking the right spots but the AI isn't unbeatable at this point.. still working on that. I like to think it's kind of tough to beat though. I tried many versions of the computer's logic but friends have been able to play and beat it. *Testing is important*

I haven't given up or copied an actual algorithm at this point. I'm still reading about real life tic-tac-toe strategies to try to translate them into code. In a professional setting the right thing to do after a certain point would be to get a solution rather than try to reinvent the wheel.
