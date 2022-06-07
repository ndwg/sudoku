var puzzle = [];

document.addEventListener("keydown", changeValue);

window.onload = function(){
    setPuzzle();
}

function setPuzzle(){
    for(let r = 0; r < 9; r++){
        let row = [];
        for(let c = 0; c < 9; c++){
            let tile = document.createElement("tile");
            if(r < 3){
                if(c > 2 && c < 6) tile.classList.toggle("alternate-color");
                else tile.classList.toggle("primary-color");
            }
            else if(r < 6){
                if(c > 2 && c < 6) tile.classList.toggle("primary-color");
                else tile.classList.toggle("alternate-color");
            }
            else{
                if(c > 2 && c < 6) tile.classList.toggle("alternate-color");
                else tile.classList.toggle("primary-color");
            }
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
    let newTile = this;
    let oldTile = document.getElementsByClassName("highlighted");
    if(Array.isArray(oldTile) || oldTile.length) oldTile[0].classList.toggle("highlighted");
    //newTile.append(document.createElement("alert"));
    newTile.classList.toggle("highlighted");
}

function changeValue(input){
    let tileSelected = document.getElementsByClassName("highlighted");

    if(input.key == 1 || input.key == 2 || input.key == 3 || input.key == 4 ||input.key == 5 ||input.key == 6 ||input.key == 7 ||input.key == 8 ||input.key == 9){
        if(Array.isArray(tileSelected) || tileSelected.length) tileSelected[0].innerText = input.key;
    }

    /*look at comment in clicktile function to create alert 
    let coords = tileSelected.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    
    if(r < 3){
        if(c < 3){
        }
        else if(c < 6){}
        else{}
    }
    else if(r < 6){
        if(c < 3){}
        else if(c < 6){}
        else{}
    }
    else{
        if(c < 3){}
        else if(c < 6){}
        else{}
    }*/
}

