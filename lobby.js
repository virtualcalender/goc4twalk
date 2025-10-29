// Grab elements
const usernameDisplay = document.getElementById("usernameDisplay");
const userAvatar = document.getElementById("userAvatar");
const hostBtn = document.getElementById("hostBtn");
const joinBtn = document.getElementById("joinBtn");

// Get last logged-in player info from localStorage
let players = JSON.parse(localStorage.getItem("players") || "[]");
let lastPlayer = players[players.length - 1] || "Guest";
usernameDisplay.textContent = lastPlayer;

// For avatar, we can try to store the modelID too
let lastModelID = localStorage.getItem("lastModelID");
if (lastModelID) {
  userAvatar.src = `https://gosupermodel.com/dollservlet.png?model=${lastModelID}&large=1#filter`;
} else {
  userAvatar.src = "https://via.placeholder.com/60?text=?"; // fallback
}

// Buttons
hostBtn.addEventListener("click", () => {
  alert("Hosting a game... (next step: Firebase or your multiplayer logic)");
});

joinBtn.addEventListener("click", () => {
  alert("Joining a game... (next step: Firebase or multiplayer logic)");
});
