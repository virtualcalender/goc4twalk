const playerName = localStorage.getItem("currentPlayerName");
const playerID = localStorage.getItem("currentPlayerID");
const isHost = localStorage.getItem("isHost") === "true";

const playerAvatar = document.getElementById("playerAvatar");
const playerNameTag = document.getElementById("playerName");

const hostBtn = document.getElementById("hostBtn");
const joinBtn = document.getElementById("joinBtn");
const hostMenu = document.getElementById("hostMenu");
const joinMenu = document.getElementById("joinMenu");

if (playerName && playerID) {
  playerNameTag.textContent = playerName;
  playerAvatar.src = `https://gosupermodel.com/dollservlet.png?model=${playerID}&large=1#filter`;
}

// Show host/join menus
hostBtn.addEventListener("click", () => {
  hostMenu.classList.remove("hidden");
  joinMenu.classList.add("hidden");
});

joinBtn.addEventListener("click", () => {
  joinMenu.classList.remove("hidden");
  hostMenu.classList.add("hidden");
});
