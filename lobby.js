// DOM elements
const hostMenu = document.getElementById("hostMenu");
const joinMenu = document.getElementById("joinMenu");
const hostBtn = document.getElementById("hostBtn");
const joinBtn = document.getElementById("joinBtn");
const startRoundBtn = document.getElementById("startRoundBtn");
const kickBtn = document.getElementById("kickBtn");
const roomNameInput = document.getElementById("roomNameInput");
const themeInput = document.getElementById("themeInput");
const backgroundInput = document.getElementById("backgroundInput");
const playerAvatar = document.getElementById("playerAvatar");
const playerName = document.getElementById("playerName");

// Show host or join menu
hostBtn.addEventListener("click", () => {
  hostMenu.classList.remove("hidden");
  joinMenu.classList.add("hidden");
});

joinBtn.addEventListener("click", () => {
  joinMenu.classList.remove("hidden");
  hostMenu.classList.add("hidden");
});

// Load player info
const savedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
if (savedPlayers.length > 0) {
  playerName.textContent = savedPlayers[savedPlayers.length - 1];
  const modelID = localStorage.getItem("lastModelID");
  if (modelID) {
    playerAvatar.src = `https://gosupermodel.com/dollservlet.png?model=${modelID}&large=1#filter`;
  }
}

// Start round
startRoundBtn.addEventListener("click", () => {
  const roomName = roomNameInput.value.trim();
  const theme = themeInput.value.trim();
  const backgroundURL = backgroundInput.value.trim();

  if (!roomName || !theme) {
    alert("Room name and theme are required!");
    return;
  }

  const roomData = { roomName, theme, backgroundURL };
  localStorage.setItem("currentRoom", JSON.stringify(roomData));
  alert(`Round started with theme: ${theme}`);
});

// Kick inactive players
kickBtn.addEventListener("click", () => {
  let players = JSON.parse(localStorage.getItem("players") || "[]");
  if (players.length > 0) {
    const removedPlayer = players.pop();
    localStorage.setItem("players", JSON.stringify(players));
    alert(`${removedPlayer} was kicked from the room.`);
  } else {
    alert("No players to kick!");
  }
});
