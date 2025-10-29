const playerList = document.getElementById("playerList");
const startGameBtn = document.getElementById("startGameBtn");

// Load players from localStorage
let players = JSON.parse(localStorage.getItem("players") || "[]");
updatePlayerList();

// Update the player list UI
function updatePlayerList() {
  playerList.innerHTML = "";
  players.forEach(player => {
    const li = document.createElement("li");
    li.textContent = player;
    playerList.appendChild(li);
  });
}

// Start game button
startGameBtn.addEventListener("click", () => {
  if (players.length < 2) {
    alert("Need at least 2 players to start!");
    return;
  }
  alert(`Starting the game with ${players.length} players!`);
  // TODO: redirect to the first round page
});
