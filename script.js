const ROWS=7;
const COLS=4;
const alphabetGrid=[];

// Show game after instructions
function showGame(){
    document.getElementById("instructions").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    createGrid();
}

// Create 2D alphabet grid and build table
function createGrid(){
    let letterCode='a'.charCodeAt(0);

    for(let i=0;i<ROWS;i++){
        alphabetGrid[i]=[];
        for(let j=0;j<COLS;j++){
            if(letterCode<='z'.charCodeAt(0)){
                alphabetGrid[i][j]=String.fromCharCode(letterCode++);
            }else{
                alphabetGrid[i][j]=' ';
            }
        }
    }

    const gridTable=document.getElementById("gridTable");

    // Table header
    const headerRow=document.createElement("tr");
    headerRow.appendChild(document.createElement("th"));

    for(let j=0;j<COLS;j++){
        const th=document.createElement("th");
        th.innerText="C"+(j+1);
        headerRow.appendChild(th);
    }
    gridTable.appendChild(headerRow);

    // Table body
    for(let i=0;i<ROWS;i++){
        const row=document.createElement("tr");

        const rowLabel=document.createElement("th");
        rowLabel.innerText="Row "+(i+1);
        row.appendChild(rowLabel);

        for(let j=0;j<COLS;j++){
            const td=document.createElement("td");
            td.innerText=alphabetGrid[i][j];
            row.appendChild(td);
        }
        gridTable.appendChild(row);
    }
}

// Generate input fields based on word length
function generateInputs(){
    const len=parseInt(document.getElementById("wordLength").value);
    const inputsDiv=document.getElementById("inputsSection");
    inputsDiv.innerHTML="";

    for(let i=0;i<len;i++){
        inputsDiv.innerHTML+=
            "<div>"+
            "Letter "+(i+1)+": "+
            "Row (1-7): <input type='number' min='1' max='7' id='row"+i+"' required> "+
            "Column (1-4): <input type='number' min='1' max='4' id='col"+i+"' required>"+
            "</div>";
    }
}

// Reconstruct the word from the grid
function reconstructWord(){
    const len=parseInt(document.getElementById("wordLength").value);
    let word="";

    for(let i=0;i<len;i++){
        const row=parseInt(document.getElementById("row"+i).value)-1;
        const col=parseInt(document.getElementById("col"+i).value)-1;

        if(row>=0&&row<ROWS&&col>=0&&col<COLS){
            word+=alphabetGrid[row][col];
        }else{
            word+="?";
        }
    }
    document.getElementById("result").innerText=word;
}