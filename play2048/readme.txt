-->   How to play: Use your arrow keys to move the tiles. Tiles with the same number merge into one when they touch. Add them up to reach 2048!<--

--> generate board with tiles(blocks) 4x4 each has a value of 0, in order to be able to sum them later 
--> if value is 0 - value should not be visible
--> generate a separate block for each part of the board, initial value of 0
--> have a new game button, that deletes the old stuff and generates a brand new board
--> everytime a board is generated the board gets 2 blocks with random value of 2 or 4
--> each time the tiles are actually moved - the board is changed - we get another block with value of 2 or 4 on a random spot
--> everything moves simultaneosly eihter left, right, up or down according to which arrow key was pressed
--> if there are no "0" blocks between other blocks with value > 0, they go next to each other, but if they are equal - they collide
--> if two tiles collide we get 1 tile with their sum
--> every two blocks that have no other blocks with values between them collide according to the swipe direction
--> we should check for win or lose after every move was made
--> if win - > arrows should work no more, board is partially hidden by a info window covering the board
--> same for lose -> game over window has a try again button!
--> we work with two-dimensional array - a matrix, thus --> for loops to be needed
--> 2 scoreboards --> one with current and one with best score (saved within a current session normally)
--> scoreboard gets points from every sum that happens on the game
--> they could be hidden inputs 
--> how to play anchor tag with the rules from above
--> some css playaround aaaaaaaaaaand that should be about it! :)

//(so far all bugs I found I've fixed)  BUGS discovered:

FIXED!! -- BEST score field stays at 8 and doesn't move, but on refresh it has the proper actual points... 
FIXED --BEST keeps refreshing itself to 0
FIXED --Current shows NaN

FIXED!!!! -- sometimes when the rows or cols are summed, they are all summed simultaneosly
-- for example - if we sum 2 + 2, get 4 and we already have a 4 and an 8 - we get a 16 directly
-- doesnt always occur

-- can occur both in rows and cols -- > down and right

FIXED!!  -- надолу бъгва 
-- наляво не 
FIXED!! -- надясно да
-- нагоре не

FIXED!! ----------------------> after a few moves the tiles stop moving -> I get an error that the indecies are undefined 

FIXED!!! --------------------> Huge bug -->
-- when the board doesn't change at all it still prints out new blocks with 2 or 4
// first attempt to fix -> assets/lol.js for the laughs (although it worked partially)

FIXED! -------------------> zeros appear from outta nowhere changing from a number to a zero, which shouldnt even be visible

FIXED! ---------------------> //  generates a new block with 2 with every keydown, regardless if it was a legal move or not, or even 

FIXED! ------------------------------> // sums first found instead of last
-- not always does it sum the most outer pair of blocks which it should
-- if they are not at the end of the matrix it sums the first pair found
-- up and left


