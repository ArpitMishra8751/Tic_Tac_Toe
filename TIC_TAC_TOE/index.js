let gameInfo = document.querySelector(".gameInfo");
let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector(".btn");

let currentPlayer ;
let gameGrid ;
initGame();

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })    
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

boxes.forEach((box,index) => {
    box.addEventListener('click',()=>{
        handleClick(index);
    }) 
})

function handleClick(index){
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer; 
    boxes[index].style.pointerEvents = "none";
    swapTurn();    
    checkGameOver();
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

newGameBtn.addEventListener('click',initGame);

function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!=="" && gameGrid[position[1]]!=="" && gameGrid[position[2]]!=="")&&((gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])))
        {
            answer = gameGrid[position[0]];
            gameInfo.innerText = `Winner Player - ${answer}`;
            newGameBtn.classList.add("active");
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })

    if(answer === ""){
        let gridCnt = 0;
        boxes.forEach((box,index)=>{
            if(box.innerText!==""){
                gridCnt++;
            }
        })
        if(gridCnt===9){
            gameInfo.innerText = `Game Tied`;
            newGameBtn.classList.add("active");
        }
    }
}