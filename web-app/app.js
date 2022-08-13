// Creates a pop-up where player 1 to enter their name
while (!player1){
    var player1 = prompt('Red Player Enter Your Name:');
};
var player1Color = 'red';
// Create pop-up for player 2 to their name
while (!player2){
    var player2 = prompt('Yellow Player Enter Your Name');
};
var player2Color = 'yellow';

// Selectors

// Selects each individual row
var tableRow = document.getElementsByTagName('tr');
// Selects each individual slot
var tableData = document.getElementsByTagName('td');
// Defines the players turn
var playerTurn = document.querySelector('.player-turn');
const slots = document.querySelectorAll('.slot');
// Resets the board
const resetBtn = document.querySelector('.reset');

// Sets current player to 1
var currentPlayer = 1;
let winner;
// Displays the players turn
playerTurn.textContent = `${player1}'s turn!`

// Logs the cell coordinates when clicked

for (i = 0; i < tableData.length; i ++){
    tableData[i].addEventListener('click', (e) =>{
        console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`)
    });
};


// Funtions

function changeColor(e){
    // Get clicked column index
    let column = e.target.cellIndex;
    let row = [];

    for (i = 5; i > -1; i--){
        // drops the coin to the bottom of the column and stacks if there is a coin already there
        if (tableRow[i].children[column].style.backgroundColor == 'white'){
            row.push(tableRow[i].children[column]);
            if (currentPlayer === 1){
                row[0].style.backgroundColor = 'red';
                // Checks horizontal, verticle and diaganally for a win state
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${player1} WINS!!`;
                    playerTurn.style.color = player1Color;
                    return alert(`${player1} WINS!!`);
                    // Creates a draw state if neither player wins
                }else if (drawCheck()){
                    playerTurn.textContent = 'DRAW!';
                    return alert('DRAW!');
                    // Changes players turn if neither win, or draw
                }else{
                    playerTurn.textContent = `${player2}'s turn`
                    return currentPlayer = 2;
                }
            }else{
                row[0].style.backgroundColor = 'yellow';
                // Checks horizontal, verticle and diaganally for a win state
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${player2} WINS!!`;
                    playerTurn.style.color = player2Color;
                    return alert(`${player2} WINS!!`);
                    // Creates a draw state if neither player wins
                }else if (drawCheck()){
                    playerTurn.textContent = 'DRAW!';
                    return alert('DRAW!');
                    // Changes players turn if neither win, or draw
                }else{
                    playerTurn.textContent = `${player1}'s turn`;
                    return currentPlayer = 1;
                }
                
            }
        }
    }
   
}

Array.prototype.forEach.call(tableData, (cell) => {
    // Listens for user click and then changes the colour
    cell.addEventListener('click', changeColor);
    // Set all slots to white for new game.
    cell.style.backgroundColor = 'white';
});

// Fucntion to check if 4 colours match
function colorMatchCheck(one, two, three, four){
    return (one === two && one === three && one === four && one !== 'white' && one !== undefined);
}
// Function to check horizontal  win state
function horizontalCheck(){
    for (let row = 0; row < tableRow.length; row++){
        for (let col =0; col < 4; col++){
           if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor,tableRow[row].children[col+1].style.backgroundColor, 
                                tableRow[row].children[col+2].style.backgroundColor, tableRow[row].children[col+3].style.backgroundColor)){
               return true;
           }
        }
    }
}
// Function to check verticle  win state
function verticalCheck(){
    for (let col = 0; col < 7; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col].style.backgroundColor,
                                tableRow[row+2].children[col].style.backgroundColor,tableRow[row+3].children[col].style.backgroundColor)){
                return true;
            };
        }   
    }
}
// Function to check diagonal  win state
function diagonalCheck(){
    for(let col = 0; col < 4; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col+1].style.backgroundColor,
                tableRow[row+2].children[col+2].style.backgroundColor,tableRow[row+3].children[col+3].style.backgroundColor)){
                    return true;
                }
            }
        }

}
// Function to check diagonal 2  win state
function diagonalCheck2(){
    for(let col = 0; col < 4; col++){
        for (let row = 5; row > 2; row--){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row-1].children[col+1].style.backgroundColor,
                tableRow[row-2].children[col+2].style.backgroundColor,tableRow[row-3].children[col+3].style.backgroundColor)){
                    return true;
            }
        }
    }
}
// Checks to see if all the cells are filled
function drawCheck(){
    let fullSlot = []
    for (i=0; i < tableData.length; i++){
        if (tableData[i].style.backgroundColor !== 'white'){
            fullSlot.push(tableData[i]);
        }
    }
    if (fullSlot.length === tableData.length){
        return true;
    }
}
// Resets the the connect 4 board
resetBtn.addEventListener('click', () => {
    slots.forEach(slot => {
        slot.style.backgroundColor = 'white';
    });
    //displays the current players turn
    playerTurn.style.color = 'black';
    return (currentPlayer === 1 ? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn`);
});