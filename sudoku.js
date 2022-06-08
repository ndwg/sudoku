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

/*function configureComplexGrid(lr,ur,lc,uc){
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
}*/

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

    var mode = [];

    for(let j = 1; j < 10; j++){
        mode[j] = 0;
    }

    for(let j = 0; j < 9; j++){
        if(potentials[j].has(1)) mode[1]++;
        if(potentials[j].has(2)) mode[2]++;
        if(potentials[j].has(3)) mode[3]++;
        if(potentials[j].has(4)) mode[4]++;
        if(potentials[j].has(5)) mode[5]++;
        if(potentials[j].has(6)) mode[6]++;
        if(potentials[j].has(7)) mode[7]++;
        if(potentials[j].has(8)) mode[8]++;
        if(potentials[j].has(9)) mode[9]++;
    }

    console.log(mode);

    for(let i = 0; i < 9; i++){
        var smallestMode = 10;
        var number = 0;
        var index = 0;
        
        for(let j = 1; j < 10; j++){
            if(mode[j] < smallestMode){
                smallestMode = mode[j];
                number = j;
            }
            else if(mode[j] == smallestMode){
                if(Math.random() > 0.75){
                    smallestMode = mode[j];
                    number = j;
                }
            }
        }

        var check = true;
        var k = 0;

        while(check && k < 9){
            if(potentials[k].has(number)){
                index = k;
                check = false;
            }
            k++
        }

        puzzle[lr + (Math.floor(index/3))][lc + (index%3)] = number;


        for(let j = 0; j < 9; j++){
            potentials[j].delete(number);
        }

        for(let j = 1; j < 10; j++){
            if(potentials[index].has(j)){
                potentials[index].delete(j);
                mode[j]--;
            }
        }

        mode[number] = 11;
    }

    //check if all tiles are filled, if not get missing number
    var missingNumbers = [];
    var emptyTiles = [];
    var emptyTilesIndex = 0;

    for(let j = 1; j < 10; j++){
        missingNumbers[j] = 0;
    }

    for(let r = lr; r < ur; r++){
        for(let c = lc; c < uc; c++){
            if(puzzle[r][c] == 1 ||puzzle[r][c] == 2||puzzle[r][c] == 3||puzzle[r][c] == 4||puzzle[r][c] == 5||puzzle[r][c] == 6||puzzle[r][c] == 7||puzzle[r][c] == 8||puzzle[r][c] == 9) missingNumbers[puzzle[r][c]] = 1;
            else{
                emptyTiles[emptyTilesIndex] = puzzle[r][c].id;
                emptyTilesIndex++;
            }
        }
    }
    
    if(Array.isArray(emptyTiles) && emptyTiles.length > 0){
        console.log(emptyTiles);

        for(let j = 0; j < emptyTiles.length; j++){
            var coord = emptyTiles[j].split("-");
            var row = coord[0];
            var column = coord[1];

            //check empty tiles for potential candidates
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
                tilePotentials.delete(puzzle[row][i]);
                tilePotentials.delete(puzzle[i][column]);
            }        
            
            //check which candidates can swap with missing number
            for(let r = lr; r < ur; r++){
                for(let c = lc; c < uc; c++){
                    var otherPotentials = new Set;

                    otherPotentials.add(1);
                    otherPotentials.add(2);
                    otherPotentials.add(3);
                    otherPotentials.add(4);
                    otherPotentials.add(5);
                    otherPotentials.add(6);
                    otherPotentials.add(7);
                    otherPotentials.add(8);
                    otherPotentials.add(9);

                    for(let i = 0; i < 9; i++){
                        otherPotentials.delete(puzzle[r][i]);
                        otherPotentials.delete(puzzle[i][c]);
                    }

                    //swap them
                    for(let i = 1; i < 10; i++){
                        if(missingNumbers[i] == 0 && tilePotentials.has(puzzle[r][c]) && otherPotentials.has(i)){
                            puzzle[row][column] = puzzle[r][c];
                            puzzle[r][c] = i;
                            missingNumbers[i] == 1;
                            r = 10;
                            c = 10;
                            i = 11;
                        }
                    }
                }
            }
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

