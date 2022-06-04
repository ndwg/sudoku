var puzzle = [];
var currentTile;
var checker = false;

document.addEventListener("keydown", changeValue);

window.onload = function(){
    setPuzzle();
}

function setPuzzle(){
    for(let r = 0; r < 9; r++){
        let row = [];
        for(let c = 0; c < 9; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            document.getElementById("puzzle").append(tile);
            tile.addEventListener("click",clickTile);
            row.push(tile);
        }
        puzzle.push(row);
    }
}

function chooseNumbers(){}

function clickTile(){
    if(checker){
        currentTile.style.backgroundColor = "";
    }
    currentTile = this;
    currentTile.style.backgroundColor = "yellow";

    checker = true;
}

function changeValue(input){
    if(input.key == 1 || input.key == 2 || input.key == 3 || input.key == 4 ||input.key == 5 ||input.key == 6 ||input.key == 7 ||input.key == 8 ||input.key == 9){
        currentTile.innerText = input.key;
    }
}