// Retrieve player info from localStorage
const playerName = localStorage.getItem("playerName") || "Guest";
const playerModelID = localStorage.getItem("playerModelID") || "0";

document.getElementById("playerName").textContent = playerName;
document.getElementById("playerAvatar").src = `https://gosupermodel.com/dollservlet.png?model=${playerModelID}&large=1#filter`;

// Menu buttons
const hostBtn = document.getElementById("hostBtn");
const joinBtn = document.getElementById("joinBtn");
const hostMenu = document.getElementById("hostMenu");
const joinMenu = document.getElementById("joinMenu");

// Example list of games (would normally come from server)
let games = [
  { id: 1, host: "Alice" },
  { id: 2, host: "Bob" }
];

// Player bubbles
let players = [
  { name: playerName, modelID: playerModelID }
];

// Show/hide menus
hostBtn.addEventListener("click", () => {
  hostMenu.classList.toggle("hidden");
  joinMenu.classList.add("hidden");
});

joinBtn.addEventListener("click", () => {
  joinMenu.classList.toggle("hidden");
  hostMenu.classList.add("hidden");
  renderGameList();
});

// Render game list for joining
function renderGameList() {
  const gameList = document.getElementById("gameList");
  gameList.innerHTML = "";
  games.forEach(game => {
    const li = document.createElement("li");
    li.textContent = `Game #${game.id} hosted by ${game.host}`;
    gameList.appendChild(li);
  });
}

// Render player bubbles
function renderPlayerBubbles() {
  const container = document.getElementById("playerBubbles");
  container.innerHTML = "";
  players.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("player-bubble");
    const img = document.createElement("img");
    img.src = `https://gosupermodel.com/dollservlet.png?model=${p.modelID}&large=1#filter`;
    div.appendChild(img);
    container.appendChild(div);
  });
}

renderPlayerBubbles();
