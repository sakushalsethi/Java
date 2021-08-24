// Challenge 1

function ageInDays() {
    let birthYear = prompt('What year you were born in..... My Friend?');
    let ageInDayss = (2021 - birthYear) * 365;
    let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode('You are ' + ageInDayss + ' days old.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}


// Challenge 2

function generateCat() {
    let image = document.createElement('img');
    let div = document.getElementById('flex-cat-gen');
    image.src = "https://api.thecatapi.com/api/images/get?format=src&type=gif&size=small";
    image.setAttribute('id', 'catImage');
    div.appendChild(image);
}

function restart() {
    document.getElementById('catImage').remove();

   // for (i=0; i<catImages.length; i++) {
     //   catImages[i].remove();
//}
}

// Challenge 3

function rpsGame(yourChoice) {
 console.log(yourChoice);
let humanChoice, botChoice;
humanChoice = yourChoice.id;

botChoice = numberToChoice(randToRpsInt());
console.log('Computer choice', botChoice);

results = decideWinner(humanChoice, botChoice); 
console.log(results);

message = finalMessage(results); 
console.log(message);

rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissor'][number];

}

function decideWinner(yourChoice, computerChoice) {
    let rpsDatabase = {
        'rock': {'scissor': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissor': 0},
        'scissor': {'paper': 1, 'scissor': 0.5, 'rock': 0}
}


let yourScore = rpsDatabase[yourChoice] [computerChoice];
let computerScore = rpsDatabase[computerChoice] [yourChoice];

return[yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {'message': 'You lost!', 'color': 'red'};
    } else if (yourScore === 0.5) {
        return {'message': 'You Tied!', 'color': 'yellow'};
    } else {
            return {'message': 'You Won!', 'color': 'green'};

        }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
let imageDatabase = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissor': document.getElementById('scissor').src
}



document.getElementById('rock').remove();
document.getElementById('paper').remove();
document.getElementById('scissor').remove();

let humanDiv = document.createElement('div');
let botDiv = document.createElement('div');
let messageDiv = document.createElement('div');

humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding:30px; '>" + finalMessage['message'] + "</h1>"
botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"


document.getElementById('flex-box-rps-div').appendChild(humanDiv);
document.getElementById('flex-box-rps-div').appendChild(messageDiv);
document.getElementById('flex-box-rps-div').appendChild(botDiv);

}



// Challenge 4

let allButtons = document.getElementsByTagName('button');
console.log(allButtons);

let copyAllButtons = [];
for (let i=0; i < allButtons.length; i++) {
    copyAllButtons.push(allButtons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red')  {
        buttonRed();
    } else if (buttonThingy.value === 'green')  {
        buttonGreen();
    } else if (buttonThingy.value === 'reset')  {
        buttonReset();
    } else if (buttonThingy.value === 'random')  {
        buttonRandom();
    }
}

function buttonRed() {
    for (let i=0; i<allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function buttonGreen() {
    for (let i=0; i<allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

function buttonReset() {
    for (let i=0; i<allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonRandom() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

    for (let i=0; i < allButtons.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[randomNumber]);
    }
}


// Challenge 5
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 1},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

let YOU = blackjackGame['you']
let DEALER = blackjackGame['dealer']

let hitSound = new Audio('static/sound/swish.m4a');
let winSound = new Audio('static/sound/cash.mp3');
let lossSound = new Audio('static/sound/aww.mp3');


document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit)
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic)
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal)

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    console.log(YOU['score']);
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}
}

function blackjackDeal() {
   
if (blackjackGame['turnsOver'] === true)  {

    blackjackGame['isStand'] = false;

    const yourImages = document.querySelector('#your-box').querySelectorAll('img');
    const dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

for (i=0; i<yourImages.length; i++) {
    yourImages[i].remove();
}
for (i=0; i<dealerImages.length; i++) {
    dealerImages[i].remove();
    
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

    document.querySelector('#blackjack-Result').textContent = "Let's Play!";
    document.querySelector('#blackjack-Result').style.color = "black";

    blackjackGame['turnsOver'] = true;
}
}

function updateScore(card, activePlayer) {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
     document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);

    
    }
    


// computer winner and return who just won
//Update the wins, draws, losses
 function computeWinner(){
    let winner;

    if (YOU['score'] <= 21) {
      // condition: higher score than dealer or when dealer busts but you're
      if (YOU['score'] > DEALER['score']  || (DEALER['score'] > 21)) {
        blackjackGame['wins']++;
        winner = YOU;

      } else if (YOU['score'] < DEALER['score']) {
        blackjackGame['losses']++;        
        winner = DEALER;

      } else if (YOU['score'] === DEALER['score']) {
        blackjackGame['draws']++;
      }

      //condition: when user busts but dealer doesn't
  
    } else if (YOU['score'] > 21 && DEALER['score'] <=21) {
        blackjackGame['losses']++;      
        winner = DEALER;

      // when you and the dealer busts

    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;      
    }
    console.log(blackjackGame);
return winner; 
}

function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {

    if (winner === YOU) {
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message = 'You Won!';
        messageColor = 'green';
        winSound.play();

    } else if (winner === DEALER) {
        document.querySelector('#losses').textContent = blackjackGame['losses'];

        message = 'You Lost!';
        messageColor = 'red';
        lossSound.play();

    } else  {
        document.querySelector('#draws').textContent = blackjackGame['draws'];

        message = 'You Drew!';
        messageColor = 'yellow';
}

document.querySelector('#blackjack-result').textContent = message;
document.querySelector('#blackjack-result').style.color = messageColor;

}
}