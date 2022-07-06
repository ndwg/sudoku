var puzzle = [];
var potentials = [];
var solution = [];
var answer = [...Array(9)].map(e => Array(9));
var mode = false;
var selectedRow;
var selectedColumn;
var gameStatus = true;

document.addEventListener("keydown", changeValue);

window.onload = function(){
    document.getElementById("timer").textContent = "00:00:00";

    setPuzzle();

    document.getElementById("btn1").addEventListener("click", changeMode);
    document.getElementById("btn2").addEventListener("click", changeMode);

    document.getElementById("btn1").classList.toggle("selected-button");
    document.getElementById("btn2").classList.toggle("unselected-button");
}

var time = setInterval(countTimer, 1000);
var totalSeconds = 0;
var h, m, s;

window.onclick = function(event){
    if(event.target == document.getElementById("mo")) document.getElementById("mo").style.display = "none";
}

function countTimer(){
    if(document.hidden) return;
    if(!gameStatus) return;

    totalSeconds++;
    h = Math.floor(totalSeconds/3600);
    m = Math.floor((totalSeconds - h*3600)/60);
    s = totalSeconds - (h*3600 + m*60);
    if(h < 10) h = "0" + h;
    if(m < 10) m = "0" + m;
    if(s < 10) s = "0" + s;
    document.getElementById("timer").textContent = h + ":" + m + ":" + s;
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
            if(Math.random() > .20){
                puzzle[r][c].textContent = solution[r][c];
                puzzle[r][c].removeEventListener("click",clickTile);
                answer[r][c] = solution[r][c];
                
            }
        }
    }

    getGivens();
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
            updatePotentials(potentials,smallestRow,smallestColumn);
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
    console.log(answer);
    console.log(potentials);
}

function setPotentials(){
    var potentialsList = new Set();

    for(let v = 1; v < 10; v++){
        potentialsList.add(v);
    }
    return potentialsList;
}

function updatePotentials(array, row, column){
    for(let s = row - (row % 3); s < 3 + row - (row % 3); s++){
        for(let t = column - (column % 3); t < 3 + column - (column % 3); t++){
            array[s][t].delete(solution[row][column]);
        }
    }

    for(let s = 0; s < 9; s++){
        array[row][s].delete(solution[row][column]);
        array[s][column].delete(solution[row][column]);
    }
}

function getGivens(){
    //let clear = true;
    let givens = [...Array(9)].map(e => Array(9));
    let givenSet = new Set();

    for(let r = 0; r < solution.length; r++){
        for(let c = 0; c < solution[0].length; c++){
            potentials[r][c] = setPotentials();
        }
    }

    for(let i = 0; i < 17; i++){
        let randomRow = Math.floor(Math.random()*9);
        let randomColumn = Math.floor(Math.random()*9);

        if(givenSet.has(randomRow + "-" + randomColumn)){
            i--;
            continue;
        }
        else givenSet.add(randomRow + "-" + randomColumn);

        givens[randomRow][randomColumn] = solution[randomRow][randomColumn];
        updatePotentials(potentials, randomRow, randomColumn);
    }



    /*for(let r = 0; r < 9; r++){
        for(let c = 0; c < 9; c++){
            givens[r][c] = solution[r][c];
        }
    }

    while(clear){
        let randomRow = Math.floor(Math.random()*9);
        let randomColumn = Math.floor(Math.random()*9);
        let removedValue = solution[randomRow][randomColumn];
        givens[randomRow][randomColumn] = 0;
    
        for(let s = randomRow - (randomRow % 3); s < 3 + randomRow - (randomRow % 3); s++){
            for(let t = randomColumn - (randomColumn % 3); t < 3 + randomColumn - (randomColumn % 3); t++){
                potentials[s][t].add(removedValue);
            }
        }
    
        for(let s = 0; s < 9; s++){
            potentials[randomRow][s].add(removedValue);
            potentials[s][randomColumn].add(removedValue);
        }
        clear = false;
    }*/

    console.log(givens);
}

function changeMode(){
    let butt = this;

    if(butt.classList.contains("unselected-button")){
        mode = !mode;
        let butt2 = document.getElementsByClassName("selected-button")[0];
        butt2.classList.toggle("selected-button");
        butt2.classList.toggle("unselected-button");
        butt.classList.toggle("unselected-button");
        butt.classList.toggle("selected-button");
    }
}

function clickTile(){
    if(!gameStatus) return;

    let newTile = this;
    let oldTile = document.getElementsByClassName("highlighted");
    if(Array.isArray(oldTile) || oldTile.length) oldTile[0].classList.toggle("highlighted");
    //newTile.append(document.createElement("alert"));
    newTile.classList.toggle("highlighted");
    let coords = newTile.id.split("-");
    selectedRow = parseInt(coords[0]);
    selectedColumn = parseInt(coords[1]);
}

function changeValue(input){
    if(!gameStatus) return;

    let tileSelected = document.getElementsByClassName("highlighted");

    if(mode){
        if(input.key == 1 || input.key == 2 || input.key == 3 || input.key == 4 ||input.key == 5 ||input.key == 6 ||input.key == 7 ||input.key == 8 ||input.key == 9){
            if(Array.isArray(tileSelected) || tileSelected.length){
                let candidateOld = document.getElementById(selectedRow.toString() + selectedColumn.toString() + "-" + input.key.toString());
                if(candidateOld != null) puzzle[selectedRow][selectedColumn].removeChild(candidateOld);
                else{
                    let candi = document.createElement("candidate" + input.key.toString());
                    candi.textContent = input.key.toString();
                    candi.id = selectedRow.toString() + selectedColumn.toString() + "-" + input.key.toString();
                    puzzle[selectedRow][selectedColumn].append(candi);
                }
            }
        }
    }
    else{
        if(input.key == 1 || input.key == 2 || input.key == 3 || input.key == 4 ||input.key == 5 ||input.key == 6 ||input.key == 7 ||input.key == 8 ||input.key == 9){
            if(Array.isArray(tileSelected) || tileSelected.length) tileSelected[0].innerText = input.key;
            answer[selectedRow][selectedColumn] = parseInt(input.key);
            checkWinner();
            //console.log(answer);
        }
        
    }

    if(input.keyCode == 46){
        if(Array.isArray(tileSelected) || tileSelected.length) tileSelected[0].innerText = "";
        answer[selectedRow][selectedColumn] = "";
    }

    if(input.keyCode == 32){
        if(mode){
            mode = false;
            document.getElementById("btn1").classList.toggle("unselected-button");
            document.getElementById("btn1").classList.toggle("selected-button");
            document.getElementById("btn2").classList.toggle("selected-button");
            document.getElementById("btn2").classList.toggle("unselected-button");
        }
        else{
            mode = true;
            document.getElementById("btn1").classList.toggle("selected-button");
            document.getElementById("btn1").classList.toggle("unselected-button");
            document.getElementById("btn2").classList.toggle("unselected-button");    
            document.getElementById("btn2").classList.toggle("selected-button");      
        }
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

function checkWinner() {
    var winner = true;

    for(let r = 0; r < 9; r++){
        for(let c = 0; c < 9; c++){
            if(solution[r][c] != answer[r][c]){
                winner = false;
                break;
            }
        }
        if(!winner) break;
    }

    if(winner){
        console.log("winner");
        document.getElementById("mo").style.display = "block";
        document.getElementById("moco").appendChild(document.createTextNode(h + ":" + m + ":" + s));

        let oldTile = document.getElementsByClassName("highlighted");
        if(Array.isArray(oldTile) || oldTile.length) oldTile[0].classList.toggle("highlighted");

        gameStatus = false;
    }
}