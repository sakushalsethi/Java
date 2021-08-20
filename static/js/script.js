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
    div.appendChild(image);

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
