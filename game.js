// Example: retrieving player info from localStorage
const playerName = localStorage.getItem("currentPlayerName");
const playerID = localStorage.getItem("currentPlayerID");
const isHost = localStorage.getItem("isHost") === "true";

const playerAvatar = document.getElementById("playerAvatar");
const playerNameTag = document.getElementById("playerName");
const runway = document.getElementById("runway");
const hostMenu = document.getElementById("hostRoundMenu");

if (playerName && playerID) {
  playerNameTag.textContent = playerName;
  playerAvatar.src = `https://gosupermodel.com/dollservlet.png?model=${playerID}&large=1#filter`;
}

// Show host menu if current player is host
if (isHost) {
  hostMenu.classList.remove("hidden");
}

// Host controls (similar as before)
const startRoundBtn = document.getElementById("startRoundBtn");
const kickBtn = document.getElementById("kickBtn");

kickBtn.addEventListener("click", () => {
  // Example: kick inactive players logic
  alert("Inactive players kicked!");
});

startRoundBtn.addEventListener("click", () => {
  const elimination = parseInt(document.getElementById("eliminationInput").value);
  const theme = document.getElementById("themeInput").value.trim();
  const runwayURL = document.getElementById("runwayInput").value.trim();

  if (!theme) return alert("Please enter a theme!");

  document.getElementById("roundTitle").textContent = `Round 1: ${theme}`;
  if (runwayURL) runway.style.backgroundImage = `url(${runwayURL})`;
  alert(`Round started! Eliminate ${elimination} players.`);
});
