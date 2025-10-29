// DOM elements
const hostBtn = document.getElementById("hostBtn");
const joinBtn = document.getElementById("joinBtn");
const hostMenu = document.getElementById("hostMenu");
const joinMenu = document.getElementById("joinMenu");

const playerAvatar = document.getElementById("playerAvatar");
const playerName = document.getElementById("playerName");

// Host inputs
const roomNameInput = document.getElementById("roomName");
const backgroundUrlInput = document.getElementById("backgroundUrl");
const themeInput = document.getElementById("theme");
const timerInput = document.getElementById("timer");
const startRoundBtn = document.getElementById("startRoundBtn");

let currentPlayer = JSON.parse(localStorage.getItem("currentPlayer") || "{}");
playerName.textContent = currentPlayer.name || "Player";
playerAvatar.src = currentPlayer.avatar || "default-avatar.png"; // fallback image

// Show host/join menus
hostBtn.addEventListener("click", () => {
  hostMenu.classList.remove("hidden");
  joinMenu.classList.add("hidden");
});

joinBtn.addEventListener("click", () => {
  joinMenu.classList.remove("hidden");
  hostMenu.classList.add("hidden");
});

// Start Round
startRoundBtn.addEventListener("click", () => {
  const roomName = roomNameInput.value.trim();
  const bgUrl = backgroundUrlInput.value.trim();
  const theme = themeInput.value.trim();
  const timer = parseInt(timerInput.value);

  if (!roomName || !bgUrl || !theme || !timer) {
    alert("Please fill all fields correctly.");
    return;
  }

  // Save room info (could use Firebase later)
  const room = {
    name: roomName,
    background: bgUrl,
    theme: theme,
    timer: timer,
    host: currentPlayer.name,
    players: [currentPlayer]
  };
  localStorage.setItem("currentRoom", JSON.stringify(room));

  // Show the background during wait time
  document.body.style.backgroundImage = `url(${bgUrl})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";

  alert(`Room "${roomName}" created! Round will start for ${timer} minutes.`);

  // Optionally redirect to round page or continue countdown
});
