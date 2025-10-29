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
const roomView = document.getElementById("roomView");
const joinedRoomName = document.getElementById("joinedRoomName");
const joinedPlayerList = document.getElementById("joinedPlayerList");
const roomNameDisplay = document.getElementById("roomNameDisplay");

// --- Player Info ---
let currentPlayer = JSON.parse(localStorage.getItem("currentPlayer") || "{}");
playerName.textContent = currentPlayer.name || "Player";
playerAvatar.src = currentPlayer.avatar || "default-avatar.png";

// --- Room Data ---
let allRooms = JSON.parse(localStorage.getItem("allRooms") || "[]");
let currentRoom = null;

// --- HOST GAME ---
hostBtn.addEventListener("click", () => {
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

  allRooms.push(room);
  localStorage.setItem("allRooms", JSON.stringify(allRooms));
  localStorage.setItem("currentRoom", JSON.stringify(room));
  currentRoom = room;

  showHostRoom();
});

// --- JOIN GAME ---
joinBtn.addEventListener("click", () => {
  joinMenu.classList.remove("hidden");
  hos
