const addPlayerBtn = document.getElementById("addPlayerBtn");
const newPlayerInput = document.getElementById("newPlayer");
const playerList = document.getElementById("playerList");
const startGameBtn = document.getElementById("startGameBtn");

// Store players in an array
let players = [];

// Add player function
addPlayerBtn.addEventListener("click", () => {
  const name = newPlayerInput.value.trim();
  if (!name) return alert("Enter a player name!");
  players.push(name);
  updatePlayerList();
  newPlayerInput.value = "";
});

// Update the list in the HTML
function updatePlayerList() {
  playerList.innerHTML = "";
  players.forEach((player, index) => {
    const li = document.createElement("li");
    li.textContent = player;
    playerList.appendChild(li);
  });
}

// Start game button
startGameBtn.addEventListener("click", () => {
  if (players.length < 2) return alert("Need at least 2 players to start!");
  alert(`Starting the game with ${players.length} players!`);
  // TODO: Redirect to next game page or start the round
});
