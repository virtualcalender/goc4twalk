const hostGameBtn = document.getElementById("hostGameBtn");
const joinGameBtn = document.getElementById("joinGameBtn");
const hostMenu = document.getElementById("hostMenu");
const joinMenu = document.getElementById("joinMenu");
const playerListHost = document.getElementById("playerListHost");
const startGameBtn = document.getElementById("startGameBtn");
const themeInput = document.getElementById("theme");
const backgroundUrlInput = document.getElementById("backgroundUrl");
const timerInput = document.getElementById("timer");
const roundScreen = document.getElementById("roundScreen");
const roundTheme = roundScreen.querySelector(".theme");
const roundTimer = roundScreen.querySelector(".timer");

let currentPlayer = JSON.parse(localStorage.getItem("currentPlayer"));
let players = JSON.parse(localStorage.getItem("players") || "[]");

// Show current player
function showPlayers() {
  playerListHost.innerHTML = "";
  players.forEach(p => {
    const div = document.createElement("div");
    div.className = "player-bubble";
    div.innerHTML = `<img src="${p.avatar}" alt="${p.name}"><p>${p.name}</p>`;
    playerListHost.appendChild(div);
  });
}

// HOST GAME
hostGameBtn.addEventListener("click", () => {
  hostMenu.classList.remove("hidden");
  joinMenu.classList.add("hidden");
  showPlayers();
});

// JOIN GAME
joinGameBtn.addEventListener("click", () => {
  joinMenu.classList.remove("hidden");
  hostMenu.classList.add("hidden");
  // Placeholder rooms for now
  document.getElementById("availableRooms").innerHTML = "<p>No active rooms yet.</p>";
});

// START ROUND
startGameBtn.addEventListener("click", () => {
  const theme = themeInput.value || "No Theme";
  const bgUrl = backgroundUrlInput.value || "";
  const duration = parseInt(timerInput.value) || 10;

  roundScreen.style.display = "flex";
  roundTheme.textContent = theme;
  roundTimer.textContent = `${duration}:00`;

  if(bgUrl) roundScreen.style.backgroundImage = `url(${bgUrl})`;

  hostMenu.style.display = "none";

  // Countdown
  let timeLeft = duration * 60; // in seconds
  const countdown = setInterval(() => {
    let minutes = Math.floor(timeLeft/60);
    let seconds = timeLeft % 60;
    roundTimer.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    timeLeft--;
    if(timeLeft < 0){
      clearInterval(countdown);
      roundScreen.style.backgroundImage = "";
      roundScreen.style.backgroundColor = "black";
      roundTimer.textContent = "";
      roundTheme.textContent = "";

      // After 30 seconds, show all avatars
      setTimeout(() => {
        roundScreen.innerHTML = "";
        players.forEach(p => {
          const div = document.createElement("div");
          div.className = "player-bubble";
          div.innerHTML = `<img src="${p.avatar}" alt="${p.name}"><p>${p.name}</p>`;
          roundScreen.appendChild(div);
        });
      }, 30000);
    }
  }, 1000);
});
