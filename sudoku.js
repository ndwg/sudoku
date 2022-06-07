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

    chooseNumbers();
}

function chooseNumbers(){
    configureGrid(0,3,0,3);
    configureGrid(3,6,3,6);
    configureGrid(6,9,6,9);
    configureComplexGrid(0,3,6,9);
    configureComplexGrid(6,9,0,3);
    configureComplexGrid(0,3,3,6);
    configureComplexGrid(3,6,0,3);
    configureComplexGrid(3,6,6,9);
    configureComplexGrid(6,9,3,6);
    console.log(puzzle);
}

function configureGrid(lr,ur,lc,uc){
    var usedNums = [];

    for(let r = lr; r < ur; r++){
        for(let c = lc; c < uc; c++){
            let randomNum = Math.floor(Math.random()*9) + 1;
            //puzzle[r][c].innerText = randomNum;
            puzzle[r][c] = randomNum;
            if(usedNums[randomNum] == 1) c--;
            usedNums[randomNum] = 1;
        }
    }
}

function configureComplexGrid(lr,ur,lc,uc){
    var potentials = [];

    for(let r = lr; r < ur; r++){
        for(let c = lc; c < uc; c++){
            var tilePotentials = new Set;

            tilePotentials.add(1);
            tilePotentials.add(2);
            tilePotentials.add(3);
            tilePotentials.add(4);
            tilePotentials.add(5);
            tilePotentials.add(6);
            tilePotentials.add(7);
            tilePotentials.add(8);
            tilePotentials.add(9);

            for(let i = 0; i < 9; i++){
                tilePotentials.delete(puzzle[r][i]);
                tilePotentials.delete(puzzle[i][c]);
            }

            potentials.push(tilePotentials);
        }
    }

    console.log(potentials);

    for(let i = 0; i < 9; i++){
        var smallest = potentials[0];
        var smallestIndex = 0;
        var number = 0;

        for(let j = 1; j < 9; j++){
            if(potentials[j].size < smallest.size){
                smallest = potentials[j];
                smallestIndex = j;
            }
        }
        
        var check = true;
        var k = 1;

        while(check && k < 10){
            if(smallest.has(k)){
                number = k;
                check = false;
            }
            k++
        }

        puzzle[lr + (Math.floor(smallestIndex/3))][lc + (smallestIndex%3)] = number;

        smallest.add(10);
        smallest.add(11);
        smallest.add(12);
        smallest.add(13);
        smallest.add(14);
        smallest.add(15);
        smallest.add(16);

        for(let j = 0; j < 9; j++){
            potentials[j].delete(number);
        }       
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

