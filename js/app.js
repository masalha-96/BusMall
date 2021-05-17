'use strict';

// global array to contain my all objects
let myImages = [];
// global array to contain my objects  names, views, votes
let myImagesNames = [];
let myImagesViews = [];
let myImagesVotes = [];
let displayedImages = [];

// global vars
let leftImageIndex;
let centerImageIndex;
let rightImageIndex;

// global counters
let maxAttempts = 25;
let userAttemptsCounter = 0;

/* ============================================================================================================================================================ */

// DOM - Get Elements ( Div[3images] )
let leftImageElement = document.getElementById('leftImage');
let centerImageElement = document.getElementById('centerImage');
let rightImageElement = document.getElementById('rightImage');


/* =====userInput (how many the user want to vote)=============================================================================================================== */
// 1. get elements from html file
let inputForm = document.getElementById('inputForm');
let userInput = document.getElementById('number');

// 2. add event
inputForm.addEventListener("submit", submitter);


// 3. event function 
function submitter(event) {
    event.preventDefault();
    maxAttempts = userInput.value;
    //console.log('maxAttempts = ' + maxAttempts);
}


/* ====== Constructor ======================================================================================================================================== */

// constuctor
function Image(name, soucre) {
    this.name = name;
    this.soucre = soucre;
    this.votes = 0;
    this.seen = 0;
    myImages.push(this);
    myImagesNames.push(this.name);
}

/* ====== RandomIndex Function ================================================================================================================================ */

// random fun --- > to generate random index between 0 <-> lengthofarray
function generateRandomIndex() {
    return Math.floor(Math.random() * myImages.length);
}



/* ====== renderThreeImages Function =========================================================================================================================== */

function renderThreeImages() {

    leftImageIndex = generateRandomIndex();
    centerImageIndex = generateRandomIndex();
    rightImageIndex = generateRandomIndex();

    // dont display same images in the next round 
    displayedImages = []; // reset my global array
    displayedImages = [leftImageIndex, centerImageIndex, rightImageIndex]; // update the values again
    console.log(displayedImages);


    while
        (
        leftImageIndex === centerImageIndex
        || leftImageIndex === rightImageIndex
        || centerImageIndex === rightImageIndex
        // dont display twice in-series checker
        || displayedImages.includes(leftImageIndex)
        || displayedImages.includes(centerImageIndex)
        || displayedImages.includes(rightImageIndex)

    ) {
        leftImageIndex = generateRandomIndex();
        centerImageIndex = generateRandomIndex();
        rightImageIndex = generateRandomIndex();
    }



    //seen++
    myImages[leftImageIndex].seen++;
    myImages[centerImageIndex].seen++;
    myImages[rightImageIndex].seen++;

    // console.log('===2222');
    // console.log(myImages);

    // give it src attribute
    leftImage.src = myImages[leftImageIndex].soucre;
    centerImage.src = myImages[centerImageIndex].soucre;
    rightImage.src = myImages[rightImageIndex].soucre;

    // console.log('inside the fun - to check ');
    // console.log(leftImage.src);
    // console.log(centerImage.src);
    // console.log(rightImage.src);

}


/* ====== Add EventListeners =================================================================================================================================== */
leftImageElement.addEventListener('click', userClick);
centerImageElement.addEventListener('click', userClick);
rightImageElement.addEventListener('click', userClick);

/* ====== Add EventListeners Function ========================================================================================================================== */

function userClick(event) {

    userAttemptsCounter++;

    if (userAttemptsCounter <= maxAttempts) {


        if (event.target.id === 'leftImage') {
            myImages[leftImageIndex].votes++;

        }
        else if (event.target.id === 'rightImage') {
            myImages[rightImageIndex].votes++;
        }
        else {
            myImages[centerImageIndex].votes++;
        }


        renderThreeImages();
    }

    else {

        leftImageElement.removeEventListener('click', userClick);
        centerImageElement.removeEventListener('click', userClick);
        rightImageElement.removeEventListener('click', userClick);

        for (let i = 0; i < myImages.length; i++) {
            myImagesVotes.push(myImages[i].votes);
            myImagesViews.push(myImages[i].seen);
        }

    }



}


/* ====== Add EventListeners =================================================================================================================================== */
let resultBtn = document.getElementById('resultBtn');
resultBtn.addEventListener('click',/*showResult*/ chartResult);

/* ====== Result Function ==================================================================================================================================== */
// Show Result as a List
function showResult() {
    let result = document.getElementById('result');
    let ul = document.createElement("ul");
    result.appendChild(ul);


    for (let i = 0; i < myImages.length; i++) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${myImages[i].name} had ${myImages[i].votes} votes, and was seen ${myImages[i].seen} times.`
    }
}



/* ====== ChartResult Function ================================================================================================================================ */
// Show Result as a Chart
function chartResult() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: myImagesNames,
            datasets: [{
                label: '# of Votes',
                data: myImagesVotes,
                backgroundColor: [
                    'red'
                ],
                borderColor: [
                    'black'
                ],
                borderWidth: 1
            }, {
                label: '# of Views',
                backgroundColor: 'blue',
                borderColor: 'black',
                data: myImagesViews
            }]
        },

        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}



/* ==== MAIN ================================================================================================================================================== */

new Image('bag', 'images/bag.jpg');
new Image('banana', 'images/banana.jpg');
new Image('bathroom', 'images/bathroom.jpg');
new Image('boots', 'images/boots.jpg');
new Image('breakfast', 'images/breakfast.jpg');
new Image('bubblegum', 'images/bubblegum.jpg');
new Image('chair', 'images/chair.jpg');
new Image('cthulhu', 'images/cthulhu.jpg');
new Image('dog-duck', 'images/dog-duck.jpg');
new Image('dragon', 'images/dragon.jpg');
new Image('pen', 'images/pen.jpg');
new Image('pet-sweep', 'images/pet-sweep.jpg');
new Image('scissors', 'images/scissors.jpg');
new Image('shark', 'images/shark.jpg');
new Image('sweep', 'images/sweep.png');
new Image('tauntaun', 'images/tauntaun.jpg');
new Image('unicorn', 'images/unicorn.jpg');
new Image('water-can', 'images/water-can.jpg');
new Image('wine-glass', 'images/wine-glass.jpg');




//to check my randomIndex fun
//console.log(generateRandomIndex());


renderThreeImages();

console.log('names', myImagesNames);
console.log('votes', myImagesVotes);
console.log('views', myImagesViews);

// console.log('========');
// console.log(myImages);
