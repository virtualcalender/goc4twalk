// --- DOM Elements ---
const hostBtn = document.getElementById("hostBtn");
const joinBtn = document.getElementById("joinBtn");
const hostRoom = document.getElementById("hostRoom");
const joinMenu = document.getElementById("joinMenu");
const editRoundBtn = document.getElementById("editRoundBtn");
const roundSettings = document.getElementById("roundSettings");
const startRoundBtn = document.getElementById("startRoundBtn");
const playerListHost = document.getElementById("playerListHost");
const availableRooms = document.getElementById("availableRooms");
const playerAvatar = document.getElementById("playerAvatar");
const playerName = document.getElementById("playerName");

// --- Player Info ---
let currentPlayer = JSON.parse(localStorage.getItem("currentPlayer") || "{}");
playerName.textContent = currentPlayer.name || "Player";
playerAvatar.src = currentPlayer.avatar || "default-avatar.png";

// --- Room Data ---
let allRooms = JSON.parse(localStorage.getItem("allRooms") || "[]");
let currentRoom = null;

// --- HOST GAME ---
hostBtn.addEventListener("click", () => {
  console.log("Host button clicked!"); // Debug line

  // Create a new room
  const room = {
    id: Date.now(),
    name: `${currentPlayer.name}'s Room`,
    host: currentPlayer,
    players: [currentPlayer],
    started: false,
    theme: "",
    background: "",
    duration: 10
  };

  // Save to localStorage
  allRooms.push(room);
  localStorage.setItem("allRooms", JSON.stringify(allRooms));
  localStorage.setItem("currentRoom", JSON.stringify(room));
  currentRoom = room;

  // Display host view
  hostRoom.classList.remove("hidden");
  joinMenu.classList.add("hidden");
  roundSettings.classList.add("hidden");
  updatePlayerList();
});

// --- JOIN GAME ---
joinBtn.addEventListener("click", () => {
  joinMenu.classList.remove("hidden");
  hostRoom.classList.add("hidden");
  roundSettings.classList.add("hidden");
  updateAvailableRooms();
});

// --- Edit Round Settings ---
editRoundBtn.addEventListener("click", () => {
  roundSettings.classList.remove("hidden");
});

// --- Start Round ---
startRoundBtn.addEventListener("click", () => {
  const theme = document.getElementById("theme").value.trim();
  const background = document.getElementById("backgroundUrl").value.trim();
  const duration = parseInt(document.getElementById("timer").value);

  if (!theme) return alert("Please enter a theme first!");

  currentRoom.theme = theme;
  currentRoom.background = background;
  currentRoom.duration = duration;
  currentRoom.started = true;

  // Save back
  allRooms = allRooms.map(r => (r.id === currentRoom.id ? currentRoom : r));
  localStorage.setItem("allRooms", JSON.stringify(allRooms));

  if (background) {
    document.body.style.backgroundImage = `url(${background})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  }

  alert(`Round started!\nTheme: ${theme}\nDuration: ${duration} min`);
});

// --- Show available rooms ---
function updateAvailableRooms() {
  availableRooms.innerHTML = "";
  const rooms = JSON.parse(localStorage.getItem("allRooms") || "[]");
  if (rooms.length === 0) {
    availableRooms.innerHTML = "<li>No active rooms found.</li>";
    return;
  }

  rooms.forEach(room => {
    if (!room.started) {
      const li = document.createElement("li");
      li.textContent = room.name;
      li.classList.add("room-item");
      li.addEventListener("click", () => joinRoom(room.id));
      availableRooms.appendChild(li);
    }
  });
}

// --- Join a room ---
function joinRoom(roomId) {
  const rooms = JSON.parse(localStorage.getItem("allRooms") || "[]");
  const room = rooms.find(r => r.id === roomId);
  if (!room) return alert("Room not found!");

  const alreadyJoined = room.players.some(p => p.name === currentPlayer.name);
  if (!alreadyJoined) room.players.push(currentPlayer);

  const updatedRooms = rooms.map(r => (r.id === roomId ? room : r));
  localStorage.setItem("allRooms", JSON.stringify(updatedRooms));
  localStorage.setItem("currentRoom", JSON.stringify(room));

  alert(`Joined ${room.name}`);
}

// --- Update Host Player List ---
function updatePlayerList() {
  playerListHost.innerHTML = "";
  if (!currentRoom) return;

  currentRoom.players.forEach((p, i) => {
    const div = document.createElement("div");
    div.classList.add("player-bubble");
    div.innerHTML = `
      <img src="${p.avatar || 'default-avatar.png'}" alt="${p.name}">
      <p>${p.name}</p>
      ${p.name !== currentRoom.host.name ? `<button class="kickBtn" data-index="${i}">Kick</button>` : ""}
    `;
    playerListHost.appendChild(div);
  });

  // Kick buttons
  document.querySelectorAll(".kickBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = btn.getAttribute("data-index");
      currentRoom.players.splice(idx, 1);
      allRooms = allRooms.map(r => (r.id === currentRoom.id ? currentRoom : r));
      localStorage.setItem("allRooms", JSON.stringify(allRooms));
      updatePlayerList();
    });
  });
}
