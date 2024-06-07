// Catch Selector
let p = document.querySelector(".para");
let spanLevel = document.querySelector(".para .level");
let spanTimeLevel = document.querySelector(".para .time-level");
let word = document.querySelector(".rand-word");
let start = document.querySelector(".start-play");
let input = document.querySelector(".input");
let selectLevel = document.querySelector(".type-level");
let optionLevel = document.querySelectorAll(".type-level option");
let containerWords = document.querySelector(".upconming-word");
let timer = document.querySelector(".time");
let progress = document.querySelector(".pro");
let numOfWord = document.querySelector(".all-word");
let background = document.querySelector(".back-ground");
let instruction = document.querySelector(".instruction");
let insSpnLevel = document.querySelector(".spn-level");
let insSpnNumsWords = document.querySelector(".spn-nums-words");
let insSpnTimeLevel = document.querySelector(".spn-time-level");
let words = document.querySelector(".words");


// Fetch Data
async function getData() {
    let data = await fetch("word.json");
    let objData = await data.json();
    chooseLevel(objData);
}
getData();

// Select Level
function chooseLevel(objData) {
    let level = selectLevel.value;
    let arrwords = objData[level].words;
    let allWord = arrwords.length;
    let timeLevel = objData[level].time;
    selectLevel.onchange = function() {
        level = selectLevel.value;
        arrwords = objData[level].words;
        allWord = arrwords.length;
        timeLevel = objData[level].time;
        addIns(arrwords,timeLevel);
        startPlaying(arrwords,timeLevel,allWord);
    }
    addIns(arrwords,timeLevel);
    startPlaying(arrwords,timeLevel,allWord);
}

// Start Playing
function startPlaying(arrwords,timeLevel,allWord) {
    start.onclick = function() {
        input.focus();
        start.remove();
        selectLevel.remove();
        instruction.remove();
        genWord(arrwords);
        score(allWord);
        time(arrwords,timeLevel,allWord);
    }
}

// Generate Words
function genWord(arrwords) {
    let randWord = arrwords[Math.floor(Math.random() * arrwords.length)];
    let indexOfWrod = arrwords.indexOf(randWord);
    arrwords.splice(indexOfWrod,1);
    word.textContent = randWord;
    containerWords.innerHTML = "";
    for(let i = 0; i < arrwords.length; i++) {
        let spanWord = document.createElement("span");
        spanWord.appendChild(document.createTextNode(arrwords[i]));
        containerWords.appendChild(spanWord);
    }
}

// Score
function score(allWord) {
    progress.textContent = 0;
    numOfWord.innerHTML = allWord;
}

// Make Timer Deponed The Level
function time(arrwords,timeLevel,allWord) {
    timer.innerHTML = parseInt(timeLevel);
    let count = setInterval(() => {
        timer.innerHTML--;
        if (timer.innerHTML === "0") {
            clearInterval(count);
            if(input.value.toLowerCase() == word.textContent.toLowerCase()) {
                word.innerHTML = "";
                input.value = "";
                progress.innerHTML++;
                if(arrwords.length > 0 ) {
                    time(arrwords,timeLevel,allWord);
                    genWord(arrwords);
                } else {
                    background.classList.add("active");
                    let divPopGood = document.createElement("div");
                    divPopGood.className = "good";
                    let h2 = document.createElement("h2");
                    h2.appendChild(document.createTextNode("Congratz"));
                    divPopGood.appendChild(h2);
                    let yourScore = document.createElement("div");
                    yourScore.className = "your-score";
                    yourScore.appendChild(document.createTextNode(`Your Score Is: ${progress.innerHTML} From ${allWord}`));
                    divPopGood.appendChild(yourScore);
                    let btn = document.createElement("button");
                    btn.className = "btn";
                    btn.appendChild(document.createTextNode("Play Again"));
                    divPopGood.appendChild(btn);
                    document.body.appendChild(divPopGood);
                    btn.onclick = function() {
                        window.location.reload();
                    }
                    addForLocalStorage();
                }
            } else {
                background.classList.add("active");
                let divPopBad = document.createElement("div");
                divPopBad.className = "bad";
                let h2 = document.createElement("h2");
                h2.appendChild(document.createTextNode("Game Over"));
                divPopBad.appendChild(h2);
                let yourScore = document.createElement("div");
                yourScore.className = "your-score";
                yourScore.appendChild(document.createTextNode(`Your Score Is: ${progress.innerHTML} From ${numOfWord.innerHTML}`));
                divPopBad.appendChild(yourScore);
                let btn = document.createElement("button");
                btn.className = "btn";
                btn.appendChild(document.createTextNode("Play Again"));
                divPopBad.appendChild(btn);
                document.body.appendChild(divPopBad);
                btn.onclick = function() {
                    window.location.reload();
                }
                addForLocalStorage();
            }
        }
    },1000)
}
// Add Score For Local Storage And Date
function addForLocalStorage() {
    // information For You
    const inf = {
        id: Date.now(),
        score: `${progress.innerHTML} From ${numOfWord.innerHTML}`,
        level: selectLevel.value
    }
    window.localStorage.setItem("score",JSON.stringify(inf));
}
// Add Instruction In Page 
function addIns(arrwords,timeLevel) {
    insSpnLevel.innerHTML = `${selectLevel.value}`;
    insSpnNumsWords.innerHTML = `${arrwords.length}`;
    insSpnTimeLevel.innerHTML = `${timeLevel}`;
    for(let i = 0; i < arrwords.length; i++) {
        let spanWord = document.createElement("span");
        spanWord.appendChild(document.createTextNode(arrwords[i]));
        words.appendChild(spanWord);
    }
}