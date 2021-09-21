//// GAME LOGIC.    
let playerWinsCount = 0;
let computerWinsCount = 0;

// A function that generates the computer's choice.
function computerPlay() {
    let gameSelection = ['Rock', 'Paper', 'Scissors'];
    let random = Math.floor(Math.random() * 3);
    return gameSelection[random];
};
// A function that returns the user's choice
function playerPlay() {
    let selection = prompt('Select either Rock, Paper or Scissors.');
    while(selection.toUpperCase() !== 'ROCK' && selection.toUpperCase() !== 'SCISSORS' && selection.toUpperCase() !== 'PAPER') {
        selection = prompt('You have entered an invalid choice, please try again.')
    }
    return selection;
};
// A function that plays one single round and keeps count of the winner of each round.
function playRound(playerSelection, computerSelection) {
    let upperCasePlayerSelection = playerSelection.toUpperCase();
    let upperCaseComputerSelection = computerSelection.toUpperCase();
    if(upperCaseComputerSelection === 'ROCK') {
        switch(upperCasePlayerSelection) {
            case 'ROCK': 
            return 'Draw for this round! Both players chose Rock.';
            case 'PAPER':
            playerWinsCount++; 
            return 'You won this round! Paper beats Rock.';
            case 'SCISSORS': 
            computerWinsCount++;
            return 'You lost this round! Scissors loses against Rock.' 
        }
    }
    else if(upperCaseComputerSelection === 'PAPER') {
        switch(upperCasePlayerSelection) {
            case 'ROCK': 
            computerWinsCount++;
            return 'You lost this round! Rock loses against Paper.';
            case 'PAPER': 
            return 'Draw draw for this round! Both players chose Paper.';
            case 'SCISSORS':
            playerWinsCount++; 
            return 'You won this round! Scissors beats Paper.' 
        }
    }

    else {
        switch(upperCasePlayerSelection) {
            case 'ROCK':
            playerWinsCount++; 
            return 'You won this round! Rock beats Scissors.';
            case 'PAPER': 
            computerWinsCount++;
            return 'You lost this round! Paper loses against Scissors.';
            case 'SCISSORS': 
            return 'Draw for this round! Both players chose Paper.' 
        }
    }
};
// A function that plays 5 rounds and returns the winner and zeros the wins counts;
function game() {
    for(let i = 0; i < 5; i++) {
        playRound(playerPlay(), computerPlay());
    }
    if(playerWinsCount > computerWinsCount) {
        playerWinsCount = computerWinsCount = 0;
        return 'You won the game, Congratulations!';
    }
    else if(playerWinsCount < computerWinsCount) {
        playerWinsCount = computerWinsCount = 0;
        return 'You lost the game, better luck next time :(';
    }
    else {
        playerWinsCount = computerWinsCount = 0;
        return 'It\'s a draw for the whole game.'
    }
}

//// DOM MANIPULATION.   

let startButtons = document.querySelectorAll('.startButtons');
startButtons.forEach(button => {
    button.addEventListener('click', startGame)
})

function startGame() {
    let popUpStart = document.getElementById('popUpStart');
    popUpStart.remove();
    playMusic();
    
}

function playMusic() {
    const backgroundBeat = document.getElementById('backgroundBeat');
    backgroundBeat.play();
}