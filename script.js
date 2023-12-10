let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX , playerO
let count = 0; //To Track Draw



const winPatterns = [    //ye 2D array hai
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    count = 0;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {   //this means tuenO === true, agar hamre player O ki turn hai to ham x ko print kar denge aur fir palyerX ki turn aajayegi isliye tuenO= false kar denge
            box.innerHTML = "O";
            box.style.color = 'green'
            turnO = false;
        } else {   //playerX
            box.innerHTML = "X"
            box.style.color = 'red'
            turnO = true;
        }

        box.disabled = true;
        count++;
        
        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
  };

const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}


const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerHTML = `Congatulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {  //sare pattern check kar raha hai
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }

        }
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerHTML, boxes[pattern[1]].innerHTML, boxes[pattern[2]].innerHTML);
    }
};


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);