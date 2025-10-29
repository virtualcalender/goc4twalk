// Elements
const hostGameBtn = document.getElementById("hostGameBtn");
const joinGameBtn = document.getElementById("joinGameBtn");
const hostMenu = document.getElementById("hostMenu");
const joinMenu = document.getElementById("joinMenu");
const mainMenu = document.getElementById("mainMenu");
const playerListHost = document.getElementById("playerListHost");
const startGameBtn = document.getElementById("startGameBtn");
const themeInput = document.getElementById("theme");
const backgroundUrlInput = document.getElementById("backgroundUrl");
const timerInput = document.getElementById("timer");

const roundScreen = document.getElementById("roundScreen");
const roundTheme = document.getElementById("roundTheme");
const countdownEl = document.getElementById("countdown");
const roundBackground = document.getElementById("roundBackground");

// Dummy players array (from main.js/localStorage)
let players = JSON.parse(localStorage.getItem("players") || "[]");

// Show Host Menu
hostGameBtn.addEventListener("click", () => {
  hostMenu.classList.remove("hidden");
  joinMenu.classList.add("hidden");
  mainMenu.style.display = "none";
  renderPlayers();
});

// Show Join Menu
joinGameBtn.addEventListener("click", () => {
  joinMenu.classList.remove("hidden");
  hostMenu.classList.add("hidden");
  mainMenu.style.display = "none";
  renderRooms();
});

// Render players for host
function renderPlayers() {
  playerListHost.innerHTML = "";
  players.forEach(p => {
    const div = document.createElement("div");
    div.className = "player-bubble";
    div.innerHTML = `<img src="${p.avatar}" alt="${p.name}"><p>${p.name}</p>`;
    playerListHost.appendChild(div);
  });
}

// Dummy function for join rooms
function renderRooms() {
  const roomList = document.getElementById("roomList");
  roomList.innerHTML = "<p>No rooms available yet.</p>";
}

// Start Round
startGameBtn.addEventListener("click", () => {
  // Hide lobby
  document.getElementById("lobbyContainer").classList.add("hidden");

  // Show round screen
  roundScreen.classList.remove("hidden");

  // Show theme and background
  const theme = themeInput.value || "No Theme";
  const bgUrl = backgroundUrlInput.value || "";

  roundTheme.textContent = theme;
  if (bgUrl) {
    roundBackground.style.backgroundImage = `url('${bgUrl}')`;
  } else {
    roundBackground.style.backgroundImage = "none";
  }

  // Countdown timer in minutes
  let timeLeft = parseInt(timerInput.value || 10) * 60;
  countdownEl.textContent = formatTime(timeLeft);

  const timerInterval = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // Blackout
      roundBackground.style.backgroundImage = "none";
      roundScreen.style.backgroundColor = "black";

      setTimeout(() => {
        showAllAvatars();
      }, 30000);
    }
  }, 1000);
});

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
}

// Show all avatars after round
function showAllAvatars() {
  roundScreen.innerHTML = "";
  const avatarContainer = document.createElement("div");
  avatarContainer.style.display = "flex";
  avatarContainer.style.justifyContent = "center";
  avatarContainer.style.flexWrap = "wrap";
  avatarContainer.style.height = "100vh";
  avatarContainer.style.alignItems = "center";
  avatarContainer.style.backgroundColor = "black";

  players.forEach(p => {
    const div = document.createElement("div");
    div.style.margin = "10px";
    div.innerHTML = `<img src="${p.avatar}" style="width:100px; height:100px; object-fit:cover; border-radius:50%;"><p style="color:white; text-align:center;">${p.name}</p>`;
    avatarContainer.appendChild(div);
  });

  roundScreen.appendChild(avatarContainer);
}
