const choices = ['rock', 'paper', 'scissor'];
let userScore = 0;
let compScore = 0;
let roundCount = 0;
const WINNING_SCORE = 5;

const userScoreEl = document.getElementById('user-score');
const compScoreEl = document.getElementById('comp-score');
const msgEl = document.getElementById('msg');

function computerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(userChoice) {
    const compChoice = computerChoice();
    roundCount++;
    
    const result = getResult(userChoice, compChoice);
    updateScores(result);
    animateChoices(userChoice, compChoice, result);
    checkGameEnd();
}

function getResult(user, comp) {
    if (user === comp) return 'draw';
    if (
        (user === 'rock' && comp === 'scissor') ||
        (user === 'paper' && comp === 'rock') ||
        (user === 'scissor' && comp === 'paper')
    ) return 'win';
    return 'lose';
}

function updateScores(result) {
    if (result === 'win') {
        userScore++;
        userScoreEl.textContent = userScore;
    } else if (result === 'lose') {
        compScore++;
        compScoreEl.textContent = compScore;
    }
}

function animateChoices(userChoice, compChoice, result) {
    const userBtn = document.getElementById(userChoice);
    const compBtn = document.getElementById(compChoice);
    
    // Reset previous classes
    document.querySelectorAll('.choice').forEach(btn => {
        btn.classList.remove('winner', 'loser');
    });

    if (result === 'win') {
        userBtn.classList.add('winner');
        compBtn.classList.add('loser');
        msgEl.textContent = `You win! ${userChoice} beats ${compChoice}`;
    } else if (result === 'lose') {
        compBtn.classList.add('winner');
        userBtn.classList.add('loser');
        msgEl.textContent = `You lose! ${compChoice} beats ${userChoice}`;
    } else {
        msgEl.textContent = "It's a draw!";
    }

    // Update round count
    document.querySelector('.rounds').textContent = `Round: ${roundCount}`;
}

function checkGameEnd() {
    if (userScore === WINNING_SCORE || compScore === WINNING_SCORE) {
        const winner = userScore === WINNING_SCORE ? 'You' : 'Computer';
        msgEl.textContent = `Game Over! ${winner} won!`;
        
        // Disable buttons
        document.querySelectorAll('.choice').forEach(btn => {
            btn.disabled = true;
        });

        // Add reset button
        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Play Again';
        resetBtn.className = 'reset-btn';
        resetBtn.onclick = resetGame;
        document.querySelector('.msg-container').appendChild(resetBtn);
    }
}

function resetGame() {
    userScore = 0;
    compScore = 0;
    roundCount = 0;
    userScoreEl.textContent = '0';
    compScoreEl.textContent = '0';
    msgEl.textContent = 'Choose your move!';
    document.querySelector('.rounds').textContent = 'Round: 0';
    
    // Re-enable buttons
    document.querySelectorAll('.choice').forEach(btn => {
        btn.disabled = false;
    });
    
    // Remove reset button
    const resetBtn = document.querySelector('.reset-btn');
    if (resetBtn) resetBtn.remove();
}

// Add event listeners
document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', () => playRound(button.id));
});

// Add round counter to HTML
const roundsDiv = document.createElement('div');
roundsDiv.className = 'rounds';
roundsDiv.textContent = 'Round: 0';
document.querySelector('.score-board').after(roundsDiv);