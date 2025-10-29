// DOM elements
const hostBtn = document.getElementById("hostBtn");
const joinBtn = document.getElementById("joinBtn");
const hostMenu = document.getElementById("hostMenu");
const joinMenu = document.getElementById("joinMenu");

const playerAvatar = document.getElementById("playerAvatar");
const playerName = document.getElementById("playerName");

const playerListHost = document.getElementById("playerListHost");
const themeInput = document.getElementById("theme");
const backgroundUrlInput = document.getElementById("backgroundUrl");
const timerInput = document.getElementById("timer");
const startGameBtn = document.getElementById("startGameBtn");
const availableRooms = document.getElementById("availableRooms");

let currentPlayer = JSON.parse(localStorage.getItem("currentPlayer") || "{}");
playerName.textContent = currentPlayer.name || "Player";
playerAvatar.src = currentPlayer.avatar || "default-avatar.png";

// Room data
let currentRoom = JSON.parse(localStorage.getItem("currentRoom") || null);

// --- Helper to render players for host ---
function updateHostPlayerList() {
  if (!currentRoom) return;
  playerListHost.innerHTML = "";
  currentRoom.players.forEach((p, index) => {
    const div = document.createElement("div");
    div.classList.add("player-bubble");
    div.innerHTML = `
      <img src="${p.avatar || 'default-avatar.png'}" alt="${p.name}">
      <p>${p.name}</p>
      ${p.name !== currentRoom.host.name ? `<button class="kickBtn" data-index="${index}">Kick</button>` : ""}
    `;
    playerListHost.appendChild(div);
  });

  // Add kick event listeners
  const kickButtons = document.querySelectorAll(".kickBtn");
  kickButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = btn.getAttribute("data-index");
      currentRoom.players.splice(idx, 1);
      localStorage.setItem("currentRoom", JSON.stringify(currentRoom));
      updateHostPlayerList();
    });
  });
}

// --- Host game ---
hostBtn.addEventListener("click", () => {
  hostMenu.classList.remove("hidden");
  joinMenu.classList.add("hidden");

  if (!currentRoom) {
    currentRoom = {
      name: `${currentPlayer.name}'s Room`,
      host: currentPlayer,
      players: [currentPlayer],
      theme: "",
      background: "",
      duration: 10,
      started: false
    };
    localStorage.setItem("currentRoom", JSON.stringify(currentRoom));
  }

  updateHostPlayerList();
});

// --- Join game ---
joinBtn.addEventListener("click", () => {
  joinMenu.classList.remove("hidden");
  hostMenu.classList.add("hidden");

  // Render available rooms
  availableRooms.innerHTML = "";
  const room = JSON.parse(localStorage.getItem("currentRoom"));
  if (room && !room.started) {
    const li = document.createElement("li");
    li.textContent = room.name;
    li.addEventListener("click", () => joinRoom(room));
    availableRooms.appendChild(li);
  }
});

// --- Join room ---
function joinRoom(room) {
  room.players.push(currentPlayer);
  currentRoom = room;
  localStorage.setItem("currentRoom", JSON.stringify(currentRoom));
  alert(`Joined room: ${room.name}`);
}

// --- Start game ---
startGameBtn.addEventListener("click", () => {
  const theme = themeInput.value.trim();
  const background = backgroundUrlInput.value.trim();
  const duration = parseInt(timerInput.value);

  if (!theme || !duration) {
    alert("Please set a theme and round duration!");
    return;
  }

  currentRoom.theme = theme;
  currentRoom.background = background;
  currentRoom.duration = duration;
  currentRoom.started = true;

  localStorage.setItem("currentRoom", JSON.stringify(currentRoom));

  // Apply background if provided
  if (background) {
    document.body.style.backgroundImage = `url(${background})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  }

  alert(`Game started! Round duration: ${duration} minutes`);
  // TODO: Redirect to game page
});
