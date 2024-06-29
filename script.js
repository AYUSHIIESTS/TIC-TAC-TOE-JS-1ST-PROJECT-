let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#mssg");
let turn0 = true;
let count = 0;
const winPatterns = [
    [0,1,2], 
    [0,3,6],
    [0,4,8], 
    [1,4,7],
    [2,5,8], 
    [2,4,6],
    [3,4,5], 
    [6,7,8]
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach( (box) => {
    box.addEventListener("click", () => {
        if(turn0){
            box.innerText = "O";
            turn0 = false;
        }else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
    });
});



const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const gameDraw = () => {
    msg.innerText = `GAME RESULTED IN A DRAW`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };
  

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `CONGRATULATIONS , WINNER IS ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let postVal1 = boxes[pattern[0]].innerText;
        let postVal2 = boxes[pattern[1]].innerText;
        let postVal3 = boxes[pattern[2]].innerText;

        if(postVal1 != "" && postVal2 != "" && postVal3 != ""){
                if(postVal1 == postVal2 && postVal2== postVal3){
                        showWinner(postVal1);
                        return true;
                    }
            }
    }
};

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);

