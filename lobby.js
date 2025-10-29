// Grab elements
const usernameDisplay = document.getElementById("usernameDisplay");
const userAvatar = document.getElementById("userAvatar");
const hostBtn = document.getElementById("hostBtn");
const joinBtn = document.getElementById("joinBtn");
const playerListEl = document.getElementById("playerList");

// Get last logged-in player info from localStorage
let players = JSON.parse(localStorage.getItem("players") || "[]");
let lastPlayer = players[players.length - 1] || "Guest";
usernameDisplay.textContent = lastPlayer;

// Avatar
let lastModelID = localStorage.getItem("lastModelID");
if (lastModelID) {
  userAvatar.src = `https://gosupermodel.com/dollservlet.png?model=${lastModelID}&large=1#filter`;
} else {
  userAvatar.src = "https://via.placeholder.com/60?text=?"; // fallback
}

// Show players in lobby
if (players.length > 0) {
  players.forEach(player => {
    const li = document.createElement("li");
    li.textContent = player;
    playerListEl.appendChild(li);
  });
}

// Buttons
hostBtn.addEventListener("click", () => {
  alert("Hosting a game... (next step: Firebase or your multiplayer logic)");
});

joinBtn.addEventListener("click", () => {
  alert("Joining a game... (next step: Firebase or multiplayer logic)");
});
