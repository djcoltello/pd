let playerScore = 0;
let computerScore = 0;
let playerMoves = [];
let computerMoves = [];
let roundNumber = 1;
const totalRounds = 20;

function titForTat(opponentMoves) {
    if (opponentMoves.length === 0) {
        return "Cooperate";
    } else {
        return opponentMoves[opponentMoves.length - 1];
    }
}

function aiAssistant(playerMoves, computerMoves) {
    if (computerMoves.length === 0) {
        return "Cooperate";
    } else {
        const lastComputerMove = computerMoves[computerMoves.length - 1];
        const lastPlayerMove = playerMoves[playerMoves.length - 1];

        if (lastComputerMove === "Defect" && lastPlayerMove === "Cooperate") {
            return "Defect";  // Retaliate if the computer defected last time and the player cooperated
        } else if (lastComputerMove === "Cooperate" && lastPlayerMove === "Defect") {
            return "Cooperate";  // Try to rebuild cooperation if the computer cooperated last time and the player defected
        } else {
            return lastPlayerMove;  // Otherwise, repeat the last move
        }
    }
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice === "Cooperate" && computerChoice === "Cooperate") {
        return [3, 3];
    } else if (playerChoice === "Cooperate" && computerChoice === "Defect") {
        return [0, 5];
    } else if (playerChoice === "Defect" && computerChoice === "Cooperate") {
        return [5, 0];
    } else {
        return [1, 1];
    }
}

function updateScores(playerPoints, computerPoints) {
    playerScore += playerPoints;
    computerScore += computerPoints;
    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("computer-score").textContent = computerScore;
}

function makeChoice(playerChoice) {
    const computerChoice = titForTat(playerMoves);
    playerMoves.push(playerChoice);
    computerMoves.push(computerChoice);

    const [playerPoints, computerPoints] = playRound(playerChoice, computerChoice);

    document.getElementById("round-info").textContent = `Round ${roundNumber}`;
    document.getElementById("result").textContent = `You chose: ${playerChoice}, Computer chose: ${computerChoice}. You earned ${playerPoints} points, Computer earned ${computerPoints} points.`;

    updateScores(playerPoints, computerPoints);

    roundNumber++;
    if (roundNumber > totalRounds) {
        document.getElementById("result").textContent += " Game over!";
        document.querySelector(".choices").style.display = "none";
    } else {
        // Get AI Assistant suggestion for the next round
        const aiSuggestion = aiAssistant(playerMoves, computerMoves);
        document.getElementById("ai-suggestion").textContent = aiSuggestion;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Initial AI Assistant suggestion
    document.getElementById("ai-suggestion").textContent = aiAssistant([], []);
});
