const hostBtn = document.getElementById("hostBtn");
const joinBtn = document.getElementById("joinBtn");
const hostMenu = document.getElementById("hostMenu");
const joinMenu = document.getElementById("joinMenu");
const playerAvatar = document.getElementById("playerAvatar");
const playerNameP = document.getElementById("playerName");

const startGameBtn = document.getElementById("startGameBtn");
const gameList = document.getElementById("gameList");

// Load current player info
const playerName = localStorage.getItem("playerName");
const playerModelID = localStorage.getItem("playerModelID");

if (playerName && playerModelID) {
  playerNameP.textContent = playerName;
  playerAvatar.style.backgroundImage = `url(https://gosupermodel.com/dollservlet.png?model=${playerModelID}&large=1#filter)`;
}

// Toggle menus
hostBtn.addEventListener("click", () => {
  hostMenu.classList.toggle("hidden");
  joinMenu.classList.add("hidden");
});

joinBtn.addEventListener("click", () => {
  joinMenu.classList.toggle("hidden");
  hostMenu.classList.add("hidden");
  renderGameList();
});

// Start Game button
startGameBtn.addEventListener("click", () => {
  const roomName = document.getElementById("roomNameInput").value.trim();
  const rounds = parseInt(document.getElementById("roundsInput").value);
  const elimination = parseInt(document.getElementById("eliminationInput").value);
  const themes = document.getElementById("themeInput").value.split(",").map(t => t.trim());
  const kickTime = parseInt(document.getElementById("kickInput").value);

  if (!roomName) {
    alert("Please enter a room name.");
    return;
  }

  let games = JSON.parse(localStorage.getItem("games") || "[]");
  const newGame = {
    id: games.length + 1,
    host: playerName,
    roomName,
    rounds,
    elimination,
    themes,
    kickTime,
    players: [{ name: playerName, modelID: playerModelID }]
  };

  games.push(newGame);
  localStorage.setItem("games", JSON.stringify(games));
  alert(`Game "${roomName}" created! Players can now join.`);
});

// Render joinable games
function renderGameList() {
  const games = JSON.parse(localStorage.getItem("games") || "[]");
  gameList.innerHTML = "";

  games.forEach(game => {
    const li = document.createElement("li");
    li.textContent = `${game.roomName} hosted by ${game.host} (${game.players.length} players)`;
    li.addEventListener("click", () => joinGame(game.id));
    gameList.appendChild(li);
  });
}

// Join a game
function joinGame(gameId) {
  const games = JSON.parse(localStorage.getItem("games") || "[]");
  const game = games.find(g => g.id === gameId);
  if (!game) return;

  game.players.push({ name: playerName, modelID: playerModelID });
  localStorage.setItem("games", JSON.stringify(games));

  alert(`Joined room "${game.roomName}"!`);
}
const kickBtn = document.getElementById("kickBtn");

// Kick inactive players
kickBtn.addEventListener("click", () => {
  let games = JSON.parse(localStorage.getItem("games") || "[]");
  const currentGame = games.find(g => g.host === playerName); // find the hosted game

  if (!currentGame) {
    alert("You have not hosted a game yet.");
    return;
  }

  const kickTime = parseInt(document.getElementById("kickInput").value);
  const now = Date.now();

  // Remove inactive players (not counting eliminations)
  currentGame.players = currentGame.players.filter(p => {
    if (!p.lastActive) return true; // if no timestamp, keep
    return now - p.lastActive <= kickTime * 1000;
  });

  localStorage.setItem("games", JSON.stringify(games));
  alert("Inactive players kicked!");
});

// Update player activity on page load
setInterval(() => {
  let games = JSON.parse(localStorage.getItem("games") || "[]");
  games.forEach(game => {
    game.players.forEach(p => {
      if (p.name === playerName) {
        p.lastActive = Date.now();
      }
    });
  });
  localStorage.setItem("games", JSON.stringify(games));
}, 5000);

// Save other host options on Start Game
startGameBtn.addEventListener("click", () => {
  const roomName = document.getElementById("roomNameInput").value.trim();
  const rounds = parseInt(document.getElementById("roundsInput").value);
  const elimination = parseInt(document.getElementById("eliminationInput").value); // can be 0
  const themes = document.getElementById("themeInput").value.split(",").map(t => t.trim());
  const runway = document.getElementById("runwayInput").value.trim();
  const kickTime = parseInt(document.getElementById("kickInput").value);

  if (!roomName) {
    alert("Please enter a room name.");
    return;
  }

  let games = JSON.parse(localStorage.getItem("games") || "[]");
  const newGame = {
    id: games.length + 1,
    host: playerName,
    roomName,
    rounds,
    elimination,
    themes,
    runway,
    kickTime,
    players: [{ name: playerName, modelID: playerModelID, lastActive: Date.now() }]
  };

  games.push(newGame);
  localStorage.setItem("games", JSON.stringify(games));
  alert(`Game "${roomName}" created! Players can now join.`);
});
