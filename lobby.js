// Elements
const hostGameBtn = document.getElementById("hostGameBtn");
const joinGameBtn = document.getElementById("joinGameBtn");
const hostMenu = document.getElementById("hostMenu");
const joinMenu = document.getElementById("joinMenu");
const mainMenu = document.getElementById("mainMenu");
const startGameBtn = document.getElementById("startGameBtn");
const playerListHost = document.getElementById("playerListHost");
const roomList = document.getElementById("roomList");
const roundScreen = document.getElementById("roundScreen");
const roundBackground = document.getElementById("roundBackground");
const roundTheme = document.getElementById("roundTheme");
const countdownEl = document.getElementById("countdown");
const playersDuringRound = document.getElementById("playersDuringRound");

// Mock localStorage for rooms
let rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
let players = JSON.parse(localStorage.getItem("players") || "[]");
let currentRoom = null;

// Show host menu
hostGameBtn.addEventListener("click", () => {
  mainMenu.classList.add("hidden");
  hostMenu.classList.remove("hidden");
  joinMenu.classList.add("hidden");
  renderPlayers();
});

// Show join menu
joinGameBtn.addEventListener("click", () => {
  mainMenu.classList.add("hidden");
  hostMenu.classList.add("hidden");
  joinMenu.classList.remove("hidden");
  renderRooms();
});

// Render players in host room
function renderPlayers() {
  playerListHost.innerHTML = "";
  players.forEach(player => {
    const div = document.createElement("div");
    div.classList.add("player-item");
    div.innerHTML = `
      <img src="https://gosupermodel.com/dollservlet.png?model=${player.id}&large=1" alt="avatar">
      <span>${player.name}</span>
    `;
    playerListHost.appendChild(div);
  });
}

// Render available rooms
function renderRooms() {
  roomList.innerHTML = "";
  rooms.forEach((room, idx) => {
    const div = document.createElement("div");
    div.classList.add("player-item");
    div.innerHTML = `
      <strong>${room.name}</strong>
      <button onclick="joinRoom(${idx})">Join</button>
    `;
    roomList.appendChild(div);
  });
}

// Start round
startGameBtn.addEventListener("click", () => {
  hostMenu.classList.add("hidden");
  roundScreen.classList.remove("hidden");

  const theme = document.getElementById("theme").value;
  const bgUrl = document.getElementById("backgroundUrl").value;
  const timerMinutes = parseInt(document.getElementById("timer").value);

  roundTheme.textContent = theme;
  if(bgUrl) roundBackground.style.backgroundImage = `url(${bgUrl})`;

  let timeLeft = timerMinutes * 60;
  countdownEl.textContent = formatTime(timeLeft);

  const countdownInterval = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = formatTime(timeLeft);
    if(timeLeft <= 0) {
      clearInterval(countdownInterval);
      // After countdown, show players next to each other
      playersDuringRound.innerHTML = "";
      players.forEach(player => {
        const div = document.createElement("div");
        div.classList.add("player-item");
        div.innerHTML = `
          <img src="https://gosupermodel.com/dollservlet.png?model=${player.id}&large=1" alt="avatar">
          <span>${player.name}</span>
        `;
        playersDuringRound.appendChild(div);
      });
    }
  }, 1000);
});

// Helpers
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

// Join room placeholder
function joinRoom(idx) {
  alert(`Joining room: ${rooms[idx].name}`);
}
