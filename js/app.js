// Array that holds all cards (using Font Awesome icons, fontawesome.io)
let cardList = [
  'fa fa-car',
  'fa fa-car',
  'fa fa-bicycle',
  'fa fa-bicycle',
  'fa fa-ship',
  'fa fa-ship',
  'fa fa-subway',
  'fa fa-subway',
  'fa fa-truck',
  'fa fa-truck',
  'fa fa-rocket',
  'fa fa-rocket',
  'fa fa-ambulance',
  'fa fa-ambulance',
  'fa fa-motorcycle',
  'fa fa-motorcycle'
];


let openCards = []; // Array that holds all open cards
let moveCounter; // Will be assigned to DOM element "moves"
let moves = 0; // Variable counting moves that have been taken
let starDom; // Will be assinged to DOM elements with class names "fa fa-star"
let stars = 3; // Variable counting stars left
let startTime; // Timer variable


// Only executed at pageload of index.html
function initGame() {

  // Get moves DOM and set moves to 0
  moveCounter = document.getElementById('moves');
  moveCounter.innerHTML = moves;

  // Get stars DOM
  starDom = document.getElementsByClassName('fa fa-star');

  // Start timer
  startTime = new Date().getTime();
  startTimer();

  // Initial shuffle of cardList and creation of deck
  cardList = shuffle(cardList);
  createDeck(cardList);

  localStorage.clear();


  // Game restart (new deck, timer/star reset, counter restart)
  document.getElementById('restart').addEventListener('click', function(){
    cardList = shuffle(cardList);
    createDeck(cardList);
    openCards = [];
    moveCounter.innerHTML = 0;
    stars = 3;
    moves = 0;

    var emptyStars = document.getElementsByClassName('fa fa-star-o');

    for (var i = 0; i < emptyStars.length; i++) {
      emptyStars[i].setAttribute("class","fa fa-star");
    }

    startTime = new Date().getTime();
    startTimer();
    }
  );
}


// Only executed on pageload of Sucess Screen
// Reading and displaying results from localStorage
function showResults() {
  document.getElementById('performance').innerHTML = "With " + localStorage['moves'] +
  " moves and " + localStorage['stars'] + " stars. Time: " + localStorage['time'];
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Function to create deck with 16 cards incl. click-event listeners
function createDeck(array) {
  let deck = document.getElementById('deck');
  deck.innerHTML = '';
  let tempElement;

  array.forEach(function(element){
    tempElement = deck.appendChild(document.createElement("li"));
    tempElement.setAttribute("class","card");

    // Event listener
    tempElement.addEventListener('click', function(event){
      moveCounter.innerHTML = ++moves;
      // change number of stars after certain amount of moves
      if (moves === 30){
        starDom[2].setAttribute("class","fa fa-star-o");
        stars--;
      } else if (moves === 40) {
        starDom[1].setAttribute("class","fa fa-star-o");
        stars--;
      }
      displaySymbol(this);
    });

    tempElement = tempElement.appendChild(document.createElement("i"));
    tempElement.setAttribute("class",element);
  });
}


// Function to display cards
function displaySymbol(card){
  card.className = "card open show";
  card.style.pointerEvents = "none"; // make it non-clickable
  matchOrNoMatch(card);
}


// Function covering the core game logic, i.e. checks if the card just open results in a match or not
function matchOrNoMatch(card){
  let cardClassName = card.firstElementChild.className;
  if (openCards.length === 0) { // first card
    addToOpenCards(cardClassName);
    } else {
    if (openCards.indexOf(cardClassName) === -1) { // Not a match (either because just 1 card open or really no match)
      if (openCards.length % 2 !== 0) { // really not a   match
        window.setTimeout(changeClass,3000,cardClassName,"card"); // Hide current card
        window.setTimeout(changeClass,3000,openCards.pop(),"card"); // Remove previous card from openCards, and hide it

        // disables all mouse events (to ensure no additional card can be picked while 2 are open)
        var allCards = document.getElementsByClassName("card");
        for (var i = 0; i < allCards.length; i++) {
          allCards[i].style.pointerEvents = "none";
        }

      } else {
        addToOpenCards(cardClassName); // Add card always if opening the first of a pair of cards
      }
    } else { // yay, it's a match !!!
      addToOpenCards(cardClassName);
      changeClass(cardClassName,"card match");
    }
  }
}


// Function to add cards to array of open cards and check whether game is completed
function addToOpenCards(cardClassName){
  openCards.push(cardClassName);
  if (openCards.length === 16) {
    localStorage['moves'] = moves;
    localStorage['stars'] = stars;
    localStorage['time'] = document.getElementById('timer').innerHTML;
    window.setTimeout(function(){window.location.href = "./html/congrats.html";},3000);
  }
}


// Function to change class of a pair of cards
function changeClass(currentClassName, newClassName){
  let cardsToChange = document.getElementsByClassName(currentClassName);
  cardsToChange[0].parentElement.className = newClassName;
  cardsToChange[1].parentElement.className = newClassName;

  if (newClassName === "card") {
    //enable mouse events again
    var allCards = document.getElementsByClassName("card");
    for (var i = 0; i < allCards.length; i++) {
      allCards[i].style.pointerEvents = "auto";
    }
  }
}


// Timer - based on:
// https://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
// https://www.w3schools.com/howto/howto_js_countdown.asp
function startTimer() {
    var now = new Date().getTime();
    var diff = now - startTime;

    var s = Math.floor((diff % (1000 * 60)) / 1000);
    var m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    s = checkTime(s);
    m = checkTime(m);

    document.getElementById('timer').innerHTML = m + ":" + s;
    if (openCards.length < 16) { // timer continues until all cards are open
      setTimeout(startTimer, 500);
    }
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
