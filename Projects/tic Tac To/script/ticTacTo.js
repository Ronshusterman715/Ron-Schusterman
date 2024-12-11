let cells = document.querySelectorAll(".cell");
let playerX = "x";
let playerO = "o";
let currentPlayer = playerX;
let cellId = 1;
let isWin = false;
let isDraw = false;
let alertDiv = document.getElementById("winOrDraw");
let isComputerThinking = false;

//cell creation
for (let cell of cells) {
    cell.id = cellId
    cellId++
    cell.addEventListener('click', playerTurn);
}

function playerTurn() {
    //when player click add X or O and change player
    if (isComputerThinking == true || isWin == true || isDraw == true || this.innerText != "") return;
    if (currentPlayer == playerX) {
        this.innerText = "X"
        currentPlayer = playerO
        //computer turn
        alertDiv.innerText = "Computer turn"
        alertDiv.style.color = "red"
        checkWin();
        setTimeout(() => {
            isComputerThinking = true;
            computerTurn();
        }, 1000);
    }
}


//computer logic
function computerTurn() {
    if (isWin == true || isDraw == true) return
    if (currentPlayer == playerO) {
        //find empty cells
        let emptyCells = [...cells].filter(cell => cell.innerText == "");
        if (emptyCells.length > 0) {
            //random cell only times of empty cells
            let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            randomCell.innerText = "O"
        }
        //player turn
        isComputerThinking = false;
        currentPlayer = playerX
        alertDiv.innerText = "Your turn"
        alertDiv.style.color = "green"
        checkWin();
    }
}



function checkWin() {
    setTimeout(() => {
        const winPatterns = [
            //rows
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            //columns
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            //diagonal
            [1, 5, 9],
            [3, 5, 7]]

        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            //check win
            if (document.getElementById(a).innerText != "" && document.getElementById(a).innerText == document.getElementById(b).innerText && document.getElementById(a).innerText == document.getElementById(c).innerText) {
                isWin = true
                const winner = document.getElementById(a).innerText;
                if (winner == "X") {
                    alertDiv.innerText = "You Win"
                    alertDiv.style.color = "green"

                    //highlight winner
                    document.getElementById(a).style.backgroundColor = "green"
                    document.getElementById(b).style.backgroundColor = "green"
                    document.getElementById(c).style.backgroundColor = "green"
                } else {
                    alertDiv.innerText = "You Lose"
                    alertDiv.style.color = "red"

                    //highlight winner
                    document.getElementById(a).style.backgroundColor = "red"
                    document.getElementById(b).style.backgroundColor = "red"
                    document.getElementById(c).style.backgroundColor = "red"
                }
                return
            }
        }

        //check draw
        isDraw = true;
        for (let cell of cells) {
            if (cell.innerText == "") {
                isDraw = false;
                break;
            }
        }
        if (isDraw) {
            alertDiv.innerText = "Draw"
            alertDiv.style.color = "grey"
        }
        return
    }, 100)
}

//reset game
function reset() {
    location.reload();
}

