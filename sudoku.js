var puzzle = [];
var potentials = [];
var solution = [];

document.addEventListener("keydown", changeValue);

window.onload = function(){
    setPuzzle();
}

function setPuzzle(){
    for(let r = 0; r < 9; r++){
        let row = [];
        let solutionRow = [];
        for(let c = 0; c < 9; c++){
            let tile = document.createElement("tile");
            let solutionTile = document.createElement("title");
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
            solutionTile.id = r.toString() + c.toString();
            document.getElementById("puzzle").append(tile);
            tile.addEventListener("click",clickTile);
            row.push(tile);
            solutionRow.push(solutionTile);
        }
        puzzle.push(row);
        solution.push(solutionRow);
    }

    chooseNumbers();

    for(let r = 0; r < puzzle.length; r++){
        for(let c = 0; c < puzzle.length; c++){
            if(Math.random() > .65){
                //puzzle[r][c] = solution[r][c];
                puzzle[r][c].textContent = solution[r][c];
                puzzle[r][c].removeEventListener("click",clickTile);
                
            }
        }
    }
}

function chooseNumbers(){
    let establishedTiles = new Set();

    for(let r = 0; r < solution.length; r++){
        var row = []

        for(let c = 0; c < solution[0].length; c++){
            row.push(setPotentials());
        }
        potentials.push(row);
    }

    for(let a = 0; a < 81; a++){
        var smallest = 10, smallestRow, smallestColumn;

        for(let r = 0; r < potentials.length; r++){
            for(let c = 0; c < potentials[0].length; c++){
                if(!establishedTiles.has(solution[r][c].id) && (potentials[r][c].size < smallest || (potentials[r][c].size == smallest && Math.random() > .95))){
                    smallest = potentials[r][c].size;
                    smallestRow = r;
                    smallestColumn = c;
                }
            }
        }

        
        const values = Array.from(potentials[smallestRow][smallestColumn]);
        let val = values[Math.floor(Math.random()*values.length)];
        if(val != undefined){
            solution[smallestRow][smallestColumn] = val;
            updatePotentials(smallestRow,smallestColumn);
            establishedTiles.add(solution[smallestRow][smallestColumn].id);
        }
    }

    for(let r = 0; r < potentials.length; r++){
        for(let c = 0; c < potentials[0].length; c++){
            if(potentials[r][c].size != 0){
                location.reload();
            }
        }
    }

    console.log(puzzle);
    console.log(solution);
    console.log(potentials);
}

function setPotentials(){
    var potentialsList = new Set();

    for(let v = 1; v < 10; v++){
        potentialsList.add(v);
    }
    return potentialsList;
}

function updatePotentials(row, column){
    for(let s = row - (row % 3); s < 3 + row - (row % 3); s++){
        for(let t = column - (column % 3); t < 3 + column - (column % 3); t++){
            potentials[s][t].delete(solution[row][column]);
        }
    }

    for(let s = 0; s < 9; s++){
        potentials[row][s].delete(solution[row][column]);
        potentials[s][column].delete(solution[row][column]);
    }
}

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

