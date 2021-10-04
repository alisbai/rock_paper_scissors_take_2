let paraPlayerWins = document.querySelector('#playersScoreWrapper p')
let paraComputerWins = document.querySelector('#opponentsScoreWrapper p')
let mainCharacterDuel = document.getElementById('mainCharacterDuel');
let opponentCharacterDuel = document.getElementById('opponentCharacterDuel');
let info = document.getElementById('info');
const backgroundBeat = document.getElementById('backgroundBeat');
const losingAudio = document.getElementById('losingAudio');
const winningAudio = document.getElementById('winningAudio');
let symbols = document.querySelectorAll('.symbols');
//// GAME LOGIC.  
let playerCharacter = '';
let opponentCharacter = '';
let playerWinsCount = 0;
let computerWinsCount = 0;

// A function that generates the computer's choice.
function computerPlay() {
    let gameSelection = ['rock', 'paper', 'scissors'];
    let random = Math.floor(Math.random() * 3);
    return gameSelection[random];
};


// A function that plays one single round and keeps count of the winner of each round.
function playRound(playerSelection) {
    let computerSelection = computerPlay();
    mainCharacterDuel.setAttribute('src', `images/${playerCharacter}_${playerSelection}.png`);
    opponentCharacterDuel.setAttribute('src', `images/${opponentCharacter}_${computerSelection}.png`);
    let upperCasePlayerSelection = playerSelection.toUpperCase();
    let upperCaseComputerSelection = computerSelection.toUpperCase();
    info.textContent = '';
    let swoosh = document.getElementById('swoosh');
    swoosh.load();
    swoosh.play();
    if(upperCaseComputerSelection === 'ROCK') {
        switch(upperCasePlayerSelection) {
            case 'ROCK': 
            info.textContent = 'It\'s at tie!!'
            return 'Draw for this round! Both players chose Rock.';
            case 'PAPER':
            playerWinsCount++; 
            paraPlayerWins.textContent = 'Your score: ' + playerWinsCount;
            info.textContent = 'You won this round! Paper beats Rock.'
            return 'You won this round! Paper beats Rock.';
            case 'SCISSORS': 
            computerWinsCount++;
            paraComputerWins.textContent = 'Opponent\'s score: ' + computerWinsCount;
            info.textContent = 'You lost this round! Scissors loses against Rock.'
            return 'You lost this round! Scissors loses against Rock.' 
        }
    }
    else if(upperCaseComputerSelection === 'PAPER') {
        switch(upperCasePlayerSelection) {
            case 'ROCK': 
            computerWinsCount++;
            paraComputerWins.textContent = 'Opponent\'s score: ' + computerWinsCount;
            info.textContent = 'You lost this round! Rock loses against Paper.'
            return 'You lost this round! Rock loses against Paper.';
            case 'PAPER': 
            info.textContent = 'It\'s at tie!!'
            return 'Draw draw for this round! Both players chose Paper.';
            case 'SCISSORS':
            playerWinsCount++;
            paraPlayerWins.textContent = 'Your score: ' + playerWinsCount; 
            info.textContent = 'You won this round! Scissors beats Paper.'
            return 'You won this round! Scissors beats Paper.' 
        }
    }

    else {
        switch(upperCasePlayerSelection) {
            case 'ROCK':
            playerWinsCount++;
            paraPlayerWins.textContent = 'Your score: ' + playerWinsCount; 
            info.textContent = 'You won this round! Rock beats Scissors.'
            return 'You won this round! Rock beats Scissors.';
            case 'PAPER': 
            computerWinsCount++;
            paraComputerWins.textContent = 'Opponent\'s score: ' + computerWinsCount;
            info.textContent = 'You lost this round! Paper loses against Scissors.'
            return 'You lost this round! Paper loses against Scissors.';
            case 'SCISSORS': 
            info.textContent = 'It\'s at tie!!'
            return 'Draw for this round! Both players chose Paper.' 
        }
    }
};
// A function that plays 5 rounds and returns the winner and zeros the wins counts;
function game(playerSelection) {
    if(playerWinsCount + computerWinsCount >= 5){
        return
    }
    else {
        playRound(playerSelection)
        if(playerWinsCount + computerWinsCount < 5) {
            return
        }
        else {
            if(playerWinsCount > computerWinsCount) {
                // playerWinsCount = computerWinsCount = 0;
                paraPlayerWins.textContent = 'Your score: ' + playerWinsCount; 
                paraComputerWins.textContent = 'Opponent\'s score: ' + computerWinsCount;
                info.textContent = 'You won the game, Congratulations! Please refresh the page to play again.';
                backgroundBeat.load();
                winningAudio.play();
                }
            else if(playerWinsCount < computerWinsCount) {
                // playerWinsCount = computerWinsCount = 0;
                paraPlayerWins.textContent = 'Your score: ' + playerWinsCount; 
                paraComputerWins.textContent = 'Opponent\'s score: ' + computerWinsCount;
                info.textContent = 'You lost the game, better luck next time :( Please refresh the page to play again.';
                backgroundBeat.load();
                losingAudio.play();
            }
            else {
                // playerWinsCount = computerWinsCount = 0;
                paraPlayerWins.textContent = 'Your score: ' + playerWinsCount; 
                paraComputerWins.textContent = 'Opponent\'s score: ' + computerWinsCount;
                info.textContent = 'It\'s a draw for the whole game. Please refresh the page to paly again.'
            }
        }
    }
    
}    

//// DOM MANIPULATION.   

let startButtons = document.querySelectorAll('.startButtons');
    startButtons.forEach(button => {
    button.addEventListener('click', removePopUpStart)
})

function removePopUpStart() {
    let popUpStart = document.getElementById('popUpStart');
    popUpStart.remove();
    playMusic();
    
}

function playMusic() {
    backgroundBeat.volume = 0.3;
    backgroundBeat.play();
    chooseCharacter()
}

function chooseCharacter() {
    let characters = document.querySelectorAll('.players img');
    characters.forEach(character => 
        character.addEventListener('click', registerCharacters))
    }

    function registerCharacters(e) {
        if(!playerCharacter) {
            playerCharacter = e.target.getAttribute('data-name');
            mainCharacterDuel.setAttribute('src', `images/${playerCharacter}_pose.png`)
            e.target.removeEventListener('click', registerCharacters);
            e.target.setAttribute('class', 'selectedCharacter');
            let chooseHeader = document.querySelector('#popUpChoose h1');
            chooseHeader.textContent = 'Choose your opponent\'s character';
        }
        else {
            opponentCharacter = e.target.getAttribute('data-name');
            opponentCharacterDuel.setAttribute('src', `images/${opponentCharacter}_pose.png`);
            let reverserWrapper = document.getElementById('reverserWrapper');
            reverserWrapper.classList.add('horizontalFlip')
            e.target.removeEventListener('click', registerCharacters);
            e.target.setAttribute('class', 'selectedCharacter');
            removePopUpChoose();
            initGame();
        }
    }
// this function removes the popUpChoose div to reveal the duel stage.

function removePopUpChoose() {
    let popUpChoose = document.getElementById('popUpChoose');
    popUpChoose.remove();
}
// this function initiates the game by enabling the click event on the rock, paper, and scissors symbols.
function initGame() {
    symbols.forEach(s => s.addEventListener('click', e => game(e.target.id)))
}