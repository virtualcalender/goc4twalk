// DOM elements
const hostBtn = document.getElementById("hostBtn");
const joinBtn = document.getElementById("joinBtn");
const hostMenu = document.getElementById("hostMenu");
const joinMenu = document.getElementById("joinMenu");

const playerAvatar = document.getElementById("playerAvatar");
const playerName = document.getElementById("playerName");

// Host inputs
const playerListHost = document.getElementById("playerListHost");
const themeInput = document.getElementById("theme");
const backgroundUrlInput = document.getElementById("backgroundUrl");
const timerInput = document.getElementById("timer");
const startGameBtn = document.getElementById("startGameBtn");

let currentPlayer = JSON.parse(localStorage.getItem("currentPlayer") || "{}");
playerName.textContent = currentPlayer.name || "Player";
playerAvatar.src = currentPlayer.avatar || "default-avatar.png";

// Room data
let currentRoom = null;

// Show host/join menus
hostBtn.addEventListener("click", () => {
  hostMenu.classList.remove("hidden");
  joinMenu.classList.add("hidden");

  // Create a new room
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
  updateHostPlayerList();
});

joinBtn.addEventListener("click", () => {
  joinMenu.classList.remove("hidden");
  hostMenu.classList.add("hidden");

  // Load available rooms (for now just from localStorage)
  const room = JSON.parse(localStorage.getItem("currentRoom"));
  const availableRooms = document.getElementById("availableRooms");
  availableRooms.innerHTML = "";
  if (room && !room.started) {
    const li = document.createElement("li");
    li.textContent = room.name;
    li.addEventListener("click", () => joinRoom(room));
    availableRooms.appendChild(li);
  }
});

// Update host player list
function updateHostPlayerList() {
  playerListHost.innerHTML = "";
  currentRoom.players.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("player-bubble");
    div.innerHTML = `<img src="${p.avatar || 'default-avatar.png'}" alt="${p.name}"><p>${p.name}</p>`;
    playerListHost.appendChild(div);
  });
}

// Join room
function joinRoom(room) {
  room.players.push(currentPlayer);
  currentRoom = room;
  localStorage.setItem("currentRoom", JSON.stringify(room));
  alert(`Joined room: ${room.name}`);
  updateHostPlayerList();
  hostMenu.classList.add("hidden");
}

// Start game
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
  // TODO: Redirect to round/game page
});
