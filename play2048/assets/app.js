window.addEventListener("load", generateBoard);
window.addEventListener("keyup", moveBlocks);
document.getElementById("new").addEventListener("click", newGame);
window.addEventListener("keydown", function(e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
function newGame() {
    document.getElementById("game").innerHTML = "";
    generateBoard();
    window.addEventListener("keyup", moveBlocks);
    document.getElementById("currentScore").value = 0;
    document.getElementById("displayCurrentScore").innerText = 0;
}
function generateBoard() {
    let board = [];
    for(let i = 0; i < 4; i++) {
        board[i] = new Array(4);
        for(let j = 0; j < 4; j++) {
            generateBlock();
        }
    }
    generateNumbers();
    generateNumbers();
    makeBlocksVisibleOrNot();
}    
function generateBlock() {
    let block = document.createElement("div");
    block.style.position = "relative";
    block.style.backgroundColor = "#CDC1B4";
    block.style.width = 100 + "px";
    block.style.height = 100 + "px";
    block.style.borderRadius = 5 + "px";
    block.classList.add("block");
    block.innerHTML = 0;
    block.classList.add("invisible");
    let game = document.getElementById("game");
    game.appendChild(block);
}
// function checkColors() {
    
//     let blocks = getBlocks();
//     for(let i = 0; i < 16; i++) {

//         if(blocks[i].innerHTML == 2 || blocks[i].innerHTML == 4) {
//             blocks[i].style.backgroundColor = "#EDE0C8";
//             blocks[i].style.color = "#776E65";
//         }
//         else if (blocks[i].innerHTML == 8) {
//             blocks[i].style.backgroundColor = "#F2B179";
//             blocks[i].style.color = "#FFF";
//         }
//         else if(blocks[i].innerHTML == 16) {
//             blocks[i].style.backgroundColor = "#F59563";
//             blocks[i].style.color = "#FFF";
//         }
//         else if(blocks[i].innerHTML == 32) {
//             blocks[i].style.backgroundColor = "#F67C5F";
//             blocks[i].style.color = "#FFF";
//         }
//         else if(blocks[i].innerHTML == 64) {
//             blocks[i].style.backgroundColor = "#F65E3B";
//             blocks[i].style.color = "#FFF";
//         } 
//     }
// } unfinished for now
function generateNumbers(event) {
    let blocks = getBlocks();
    let emptyBlocks = [];
    for(let i = 0; i < blocks.length; i++) {
        if(blocks[i].innerHTML == 0) {
            emptyBlocks.push(blocks[i]);
        }
    }
    if(emptyBlocks.length === 0) {
        return;
    }
    let block = emptyBlocks[Math.floor(Math.random()*emptyBlocks.length)];
    let possibleNewNumbers = [2,4,2];
    block.innerText = possibleNewNumbers[Math.floor(Math.random()*3)]; 
}
function makeBlocksVisibleOrNot() {
    let blocks = getBlocks();
    for(let i = 0; i < 16; i++) {
        if(blocks[i].innerText == 0) {
            blocks[i].classList.add("invisible")
        }
        if(blocks[i].innerText != 0) {
            blocks[i].classList.remove("invisible")
        }
    }
}
function moveBlocks(e){
    let previousBoard = copyCurrentBoard();
    switch(e.keyCode) {
        case 37: 
                moveLeft(); 
                sumBlocksInARowLeft(); 
                moveLeft(); 
            break;
        case 39: 
                moveRight(); 
                sumBlocksInARowRight(); 
                moveRight();
            break;
        case 38: 
                moveUp();
                sumBlocksInAColUp(); 
                moveUp()
            break;
        case 40: 
                moveDown(); 
                sumBlocksInAColDown(); 
                moveDown();
            break;    
    }
    
    checkWin();
        let currentBoard = getBlocks();
        let hasChanged = checkIfChanged(previousBoard, currentBoard);
        if(hasChanged) {
            generateNumbers();
            checkLose();
        }
    makeBlocksVisibleOrNot()
    
}
function moveRight() {
    let blocks = getBlocks();
    for(let i = 0; i < 16; i++) {   
        if(i % 4 === 0) {
            let firstRow = blocks[i].innerHTML;
            let secondRow = blocks[i+1].innerHTML;
            let thirdRow = blocks[i+2].innerHTML;
            let fourthRow = blocks[i+3].innerHTML;

            let matrix = [firstRow, secondRow, thirdRow, fourthRow];
            matrix = matrix.map(e => parseInt(e));
           
            let rowsWithData = matrix.filter(e => e > 0);
           
            let fillers = 4 - rowsWithData.length;
            let zeros = new Array(fillers).fill(0)
           
            let newRow = zeros.concat(rowsWithData)
           
            blocks[i].innerHTML = newRow[0];
            blocks[i+1].innerHTML = newRow[1];
            blocks[i+2].innerHTML = newRow[2];
            blocks[i+3].innerHTML = newRow[3];
        }
    }
}   
function moveLeft() {
    let blocks = getBlocks();
    for(let i = 0; i < 16; i++) {   
        if(i % 4 === 0) {
            let firstRow = blocks[i].innerHTML;
            let secondRow = blocks[i+1].innerHTML;
            let thirdRow = blocks[i+2].innerHTML;
            let fourthRow = blocks[i+3].innerHTML;

            let matrix = [firstRow, secondRow, thirdRow, fourthRow];
            matrix = matrix.map(e => parseInt(e));
           
            let rowsWithData = matrix.filter(e => e > 0);
           
            let fillers = 4 - rowsWithData.length;
            let zeros = Array(fillers).fill(0)
           
            let newRow = rowsWithData.concat(zeros)
           
            blocks[i].innerHTML = newRow[0];
            blocks[i+1].innerHTML = newRow[1];
            blocks[i+2].innerHTML = newRow[2];
            blocks[i+3].innerHTML = newRow[3];
        }
    }
} 
function moveDown() {
    let blocks = getBlocks();
    for(let i = 0; i < 4; i++) {
        let firstCol = blocks[i].innerHTML;
        let secondCol = blocks[i+4].innerHTML;
        let thirdCol = blocks[i+4*2].innerHTML;
        let fourthCol = blocks[i+4*3].innerHTML;

        let matrix = [firstCol, secondCol, thirdCol, fourthCol];
        matrix = matrix.map(e => parseInt(e));

        let colsWithData = matrix.filter(e => e > 0);
        let fillers = 4 - colsWithData.length;
        let zeros = Array(fillers).fill(0);
        let newCol = zeros.concat(colsWithData);
        
        blocks[i].innerHTML = newCol[0];
        blocks[i+4].innerHTML = newCol[1];
        blocks[i+4*2].innerHTML = newCol[2];
        blocks[i+4*3].innerHTML = newCol[3];
    }
}
function moveUp() {
    let blocks = getBlocks();
    for(let i = 0; i < 4; i++) {
        let firstCol = blocks[i].innerHTML;
        let secondCol = blocks[i+4].innerHTML;
        let thirdCol = blocks[i+4*2].innerHTML;
        let fourthCol = blocks[i+4*3].innerHTML;

        let matrix = [firstCol, secondCol, thirdCol, fourthCol];
        matrix = matrix.map(e => parseInt(e));

        let colsWithData = matrix.filter(e => e > 0);
        let fillers = 4 - colsWithData.length;
        let zeros = Array(fillers).fill(0);
        let newCol = colsWithData.concat(zeros);
        
        blocks[i].innerHTML = newCol[0];
        blocks[i+4].innerHTML = newCol[1];
        blocks[i+4*2].innerHTML = newCol[2];
        blocks[i+4*3].innerHTML = newCol[3];
    }
}
function copyCurrentBoard() {
    let blocks = getBlocks();
    let board = [];
    let count = 0;
    for(let i = 0; i < 4; i++) {
        board[i] = new Array();
        for(let j = 0; j < 4; j++) {
            board[i][j] = blocks[count].innerHTML;
            count++;
        }
    }
    return board;
}
function checkIfChanged(previous, current) {
    previous = Array.from(previous[0].concat(previous[1], previous[2], previous[3]));
    for(let i = 0; i < 16; i++) {
        if(previous[i] != current[i].innerText) {
            return true;
        } 
    }
    return false;
} 
function gotPotentialMovesCols(){
    let blocks = getBlocks();
    let gotMovesCol = false;
    for(let i = 11; i >= 0; i--) {
        if(blocks[i].innerHTML == blocks[i+4].innerHTML) {
            gotMovesCol = true;
        }
    }
    return gotMovesCol;
}
function gotPotentialMovesRows() {
    let blocks = getBlocks();
    let gotMovesRow = false;
    for(let i = 15; i >= 0; i--) {
        if((i % 4 !== 3) && blocks[i].innerHTML == blocks[i+1].innerHTML) {
            gotMovesRow = true;
        }
    }
    return gotMovesRow;
}
function outputScores() {
    let currentScore = document.getElementById("currentScore").value;
    let bestScore = document.getElementById("bestScore").value;

    if(!currentScore) currentScore = 0;
    if(!bestScore) bestScore = 0;

    if(parseInt(bestScore) < parseInt(currentScore)) {
        bestScore = currentScore;
        document.getElementById("bestScore").value = bestScore;
    }
    document.getElementById("displayCurrentScore").innerHTML = currentScore;
    document.getElementById("displayBestScore").innerHTML = bestScore;
}
function sumBlocksInARowRight() {
    let blocks = getBlocks();
    for(let i = 15; i >= 0; i--) {
        if((i % 4 !== 0) && blocks[i].innerHTML == blocks[i-1].innerHTML) {
            blocks[i].innerHTML = parseInt(blocks[i].innerHTML) + parseInt(blocks[i-1].innerHTML);
            let score = document.getElementById("currentScore").value;
            if(!score) score = 0
            document.getElementById("currentScore").value = parseInt(blocks[i].innerHTML) + parseInt(score);
            outputScores();
            blocks[i-1].innerHTML = 0;
        }
    }
}
function sumBlocksInARowLeft() {
    let blocks = getBlocks();
    for(let i = 0; i < 16; i++) {
        if((i % 4 !== 3) && blocks[i].innerHTML == blocks[i+1].innerHTML) {
            blocks[i].innerHTML = parseInt(blocks[i].innerHTML) + parseInt(blocks[i+1].innerHTML);
            let score = document.getElementById("currentScore").value;
            if(!score) score = 0
            document.getElementById("currentScore").value = parseInt(blocks[i].innerHTML) + parseInt(score);
            outputScores();
            blocks[i+1].innerHTML = 0;
        }
    }
}
function sumBlocksInAColUp(){
    let blocks = getBlocks();
    for(let i = 0; i < 12; i++) {
        if(blocks[i].innerHTML === blocks[i+4].innerHTML) {
            blocks[i].innerHTML = parseInt(blocks[i].innerHTML) + parseInt(blocks[i+4].innerHTML);
            let score = document.getElementById("currentScore").value;
            if(!score) score = 0
            document.getElementById("currentScore").value = parseInt(blocks[i].innerHTML) + parseInt(score);
            outputScores();
            blocks[i+4].innerHTML = 0;
        }
    }
}
function sumBlocksInAColDown(){
    let blocks = getBlocks();
    for(let i = 15; i >= 4; i--) {
        if(blocks[i].innerHTML === blocks[i-4].innerHTML) {
            blocks[i].innerHTML = parseInt(blocks[i].innerHTML) + parseInt(blocks[i-4].innerHTML);
            let score = document.getElementById("currentScore").value;
            if(!score) score = 0
            document.getElementById("currentScore").value = parseInt(blocks[i].innerHTML) + parseInt(score);
            outputScores();
            blocks[i-4].innerHTML = 0;
        }
    }
}
function checkWin(){
    let blocks = getBlocks();
    for(let i = 0; i < 16; i++) {
        if(blocks[i].innerHTML == 2048) {
            window.removeEventListener("keyup", moveBlocks);
            let congrats = document.createElement("div");
            congrats.style.width = "500px";
            congrats.style.height = "500px";
            congrats.style.backgroundColor = "rgba(34,139,34,0.7)";
            congrats.innerText = "CONGRATULATIONS,\n YOU HAVE WON!";
            congrats.style.lineHeight = "250px";
            congrats.style.textAlign = "center";
            congrats.style.fontSize = "30px";
            congrats.style.color = "white";
            congrats.style.position = "absolute";
            congrats.style.whiteSpace = "normal";
            document.getElementById("game").appendChild(congrats);
        }
    }
}
function areThereEmptyBlocksLeft(){
    let blocks = getBlocks();
    let emptyBlocks = false;
    for(let i = 0; i < 16; i++) {
        if(blocks[i].innerHTML == 0) {
           return true;
        }
    }
    if(!emptyBlocks) {
      return false;
    }
}
function checkLose() {
    let colMoves = gotPotentialMovesCols();
    let rowMoves = gotPotentialMovesRows();
    let emptyBlocks = areThereEmptyBlocksLeft();

    if(emptyBlocks || rowMoves || colMoves) {
        return false;
    }
    else gameOver();
}
function gameOver(){
    window.removeEventListener("keyup", moveBlocks);
    let loser = document.createElement("div");
    loser.style.width = "500px";
    loser.style.height = "500px";
    loser.style.backgroundColor = "rgba(178,97,97,0.7)";
    loser.innerText = "OH NO,\n Anyways...";
    loser.style.lineHeight = "250px";
    loser.style.textAlign = "center";
    loser.style.fontSize = "30px";
    loser.style.color = "white";
    loser.style.position = "absolute";
    loser.style.whiteSpace = "normal";
    document.getElementById("game").appendChild(loser)
}
function getBlocks() {
   return document.getElementsByClassName("block");
}
