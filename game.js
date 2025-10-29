// Retrieve current player info
const playerName = localStorage.getItem("currentPlayerName");
const playerID = localStorage.getItem("currentPlayerID");
const isHost = localStorage.getItem("isHost") === "true";

const playerAvatar = document.getElementById("playerAvatar");
const playerNameTag = document.getElementById("playerName");
const runway = document.getElementById("runway");
const hostMenu = document.getElementById("hostRoundMenu");
const roundTitle = document.getElementById("roundTitle");
const nextRoundBtn = document.getElementById("nextRoundBtn");

// Set initial round number
let currentRound = 1;

if (playerName && playerID) {
  playerNameTag.textContent = playerName;
  playerAvatar.src = `https://gosupermodel.com/dollservlet.png?model=${playerID}&large=1#filter`;
}

// Show host menu if current player is host
if (isHost) hostMenu.classList.remove("hidden");

// Host controls
const startRoundBtn = document.getElementById("startRoundBtn");
const kickBtn = document.getElementById("kickBtn");

kickBtn.addEventListener("click", () => {
  alert("Inactive players kicked!");
});

startRoundBtn.addEventListener("click", () => {
  const elimination = parseInt(document.getElementById("eliminationInput").value);
  const theme = document.getElementById("themeInput").value.trim();
  const runwayURL = document.getElementById("runwayInput").value.trim();

  if (!theme) return alert("Please enter a theme!");

  // Update UI for the round
  roundTitle.textContent = `Round ${currentRound}: ${theme}`;
  if (runwayURL) runway.style.backgroundImage = `url(${runwayURL})`;

  alert(`Round started! Eliminate ${elimination} players.`);

  // Hide host menu and show next round button
  hostMenu.classList.add("hidden");
  nextRoundBtn.classList.remove("hidden");
});

// Next round logic
nextRoundBtn.addEventListener("click", () => {
  currentRound++;
  roundTitle.textContent = `Round ${currentRound}`;
  
  // Reset host menu inputs
  document.getElementById("themeInput").value = "";
  document.getElementById("eliminationInput").value = 1;
  document.getElementById("runwayInput").value = "";
  
  // Show host menu, hide next round button
  hostMenu.classList.remove("hidden");
  nextRoundBtn.classList.add("hidden");
  
  // Clear runway background
  runway.style.backgroundImage = "";
});
