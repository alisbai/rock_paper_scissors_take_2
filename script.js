let paraPlayerWins = document.querySelector('#playersScoreWrapper p')
let paraComputerWins = document.querySelector('#opponentsScoreWrapper p')
//// GAME LOGIC.  
const characters = ['ALI', 'OUMAYMA']; 
let playerCharacter = '';
let opponentCharacter = '';
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
    console.log(selection);
    while(selection.toUpperCase() !== 'ROCK' && selection.toUpperCase() !== 'SCISSORS' && selection.toUpperCase() !== 'PAPER') {
        selection = prompt('You have entered an invalid choice, please try again.')
    }
    return selection;
};

// A function that plays one single round and keeps count of the winner of each round.
function playRound(playerSelection) {
    let info = document.getElementById('info');
    info.textContent = '';
    let computerSelection = computerPlay();
    let upperCasePlayerSelection = playerSelection.toUpperCase();
    let upperCaseComputerSelection = computerSelection.toUpperCase();
    if(upperCaseComputerSelection === 'ROCK') {
        switch(upperCasePlayerSelection) {
            case 'ROCK': 
            console.log('draw');
            info.textContent = 'It\'s at tie!!'
            return 'Draw for this round! Both players chose Rock.';
            case 'PAPER':
                playerWinsCount++; 
                paraPlayerWins.textContent = 'Your score: ' + playerWinsCount;
            console.log('you won')
            return 'You won this round! Paper beats Rock.';
            case 'SCISSORS': 
            console.log('you lost')
            computerWinsCount++;
            paraComputerWins.textContent = 'Opponent\'s score: ' + computerWinsCount;
            
            return 'You lost this round! Scissors loses against Rock.' 
        }
    }
    else if(upperCaseComputerSelection === 'PAPER') {
        switch(upperCasePlayerSelection) {
            case 'ROCK': 
            computerWinsCount++;
            paraComputerWins.textContent = 'Opponent\'s score: ' + computerWinsCount;
            return 'You lost this round! Rock loses against Paper.';
            case 'PAPER': 
            info.textContent = 'It\'s at tie!!'
            return 'Draw draw for this round! Both players chose Paper.';
            case 'SCISSORS':
                playerWinsCount++;
            paraPlayerWins.textContent = 'Your score: ' + playerWinsCount; 
            return 'You won this round! Scissors beats Paper.' 
        }
    }

    else {
        switch(upperCasePlayerSelection) {
            case 'ROCK':
            playerWinsCount++;
            paraPlayerWins.textContent = 'Your score: ' + playerWinsCount; 
            return 'You won this round! Rock beats Scissors.';
            case 'PAPER': 
            computerWinsCount++;
            paraComputerWins.textContent = 'Opponent\'s score: ' + computerWinsCount;
            return 'You lost this round! Paper loses against Scissors.';
            case 'SCISSORS': 
            info.textContent = 'It\'s at tie!!'
            return 'Draw for this round! Both players chose Paper.' 
        }
    }
};
// A function that plays 5 rounds and returns the winner and zeros the wins counts;
function game(id) {
    if(playerWinsCount + computerWinsCount > 5){
        return
    }
    else {
        playRound(id)
        if(playerWinsCount + computerWinsCount < 5) {
            return
        }
        else {
            setTimeout(() => {
                if(playerWinsCount > computerWinsCount) {
                    playerWinsCount = computerWinsCount = 0;
                    paraPlayerWins.textContent = 'Your score: ' + playerWinsCount; 
                    paraComputerWins.textContent = 'Opponent\'s score: ' + computerWinsCount;
                    return 'You won the game, Congratulations!';
                }
                else if(playerWinsCount < computerWinsCount) {
                    playerWinsCount = computerWinsCount = 0;
                    paraPlayerWins.textContent = 'Your score: ' + playerWinsCount; 
                    paraComputerWins.textContent = 'Opponent\'s score: ' + computerWinsCount;
                    return 'You lost the game, better luck next time :(';
                }
                else {
                    playerWinsCount = computerWinsCount = 0;
                    paraPlayerWins.textContent = 'Your score: ' + playerWinsCount; 
                    paraComputerWins.textContent = 'Opponent\'s score: ' + computerWinsCount;
                    return 'It\'s a draw for the whole game.'
                }
            }, 1000)
        }
    }
    // for(let i = 0; i < 5; i++) {
        //     playRound(playerPlay());
    // }
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
    const backgroundBeat = document.getElementById('backgroundBeat');
    backgroundBeat.play();
    choosePlayers()
}

function choosePlayers() {
    let characters = document.querySelectorAll('.players img');
    characters.forEach(character => 
        character.addEventListener('click', registerCharacters))
    }

    function registerCharacters(e) {
        if(!playerCharacter) {
            playerCharacter = e.target.getAttribute('data-name');
            e.target.removeEventListener('click', registerCharacters);
            e.target.setAttribute('class', 'selectedCharacter');
            let chooseHeader = document.querySelector('#popUpChoose h1');
            chooseHeader.textContent = 'Choose your opponent\'s character';
        }
        else {
            opponentCharacter = e.target.getAttribute('data-name');
            e.target.removeEventListener('click', registerCharacters);
            e.target.setAttribute('class', 'selectedCharacter');
            removePopUpChoose();
            tester();
        }
    }
    
    // this function removes the popUpChoose div to reveal the duel.

    function removePopUpChoose() {
        let popUpChoose = document.getElementById('popUpChoose');
        popUpChoose.remove();
    }
    
function tester() {
    let s = document.querySelectorAll('.symbols');
    s.forEach(s => s.addEventListener('click', e => game(e.target.id)))
}