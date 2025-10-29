// Get elements
const usernameDisplay = document.getElementById("usernameDisplay");
const userAvatar = document.getElementById("userAvatar");
const hostBtn = document.getElementById("hostBtn");
const joinBtn = document.getElementById("joinBtn");

// Load user info from localStorage
const players = JSON.parse(localStorage.getItem("players") || "[]");
const lastPlayer = players[players.length - 1] || "Guest";

// Display username
usernameDisplay.textContent = lastPlayer;

// Display avatar
const modelID = localStorage.getItem("lastModelID") || 0;
userAvatar.src = `https://gosupermodel.com/dollservlet.png?model=${modelID}&large=1#filter`;

// Host button click
hostBtn.addEventListener("click", () => {
  alert("Hosting a game... (placeholder functionality)");
});

// Join button click
joinBtn.addEventListener("click", () => {
  alert("Joining a game... (placeholder functionality)");
});
