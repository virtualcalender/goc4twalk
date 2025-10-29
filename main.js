const showBtn = document.getElementById("showBtn");
const confirmBox = document.getElementById("confirmBox");
const previewImg = document.getElementById("previewImg");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const usernameInput = document.getElementById("username");
const modelIDInput = document.getElementById("modelID");

// Show model preview
showBtn.addEventListener("click", () => {
  const modelID = modelIDInput.value.trim();
  const username = usernameInput.value.trim();
  if (!modelID || !username) {
    alert("Enter both your name and GoSuperModel ID!");
    return;
  }
  confirmBox.classList.remove("hidden");
  previewImg.classList.remove("hidden");
  previewImg.src = `https://gosupermodel.com/dollservlet.png?model=${modelID}&large=1#filter`;
});

// Yes button: save player and go to lobby
yesBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const modelID = modelIDInput.value.trim();
  if (!username || !modelID) return;

  // Generate avatar URL
  const avatarURL = `https://gosupermodel.com/dollservlet.png?model=${modelID}&large=1#filter`;

  const currentPlayer = { name: username, avatar: avatarURL };
  localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));

  // Save to players array
  let players = JSON.parse(localStorage.getItem("players") || "[]");
  players.push(currentPlayer);
  localStorage.setItem("players", JSON.stringify(players));

  // Redirect to lobby
  window.location.href = "lobby.html";
});

// No button: reset inputs
noBtn.addEventListener("click", () => {
  confirmBox.classList.add("hidden");
  previewImg.classList.add("hidden");
  modelIDInput.value = "";
});
const backgroundSelector = document.getElementById("backgroundSelector");
const backgroundOptions = document.getElementById("backgroundOptions");
const avatarPreview = document.getElementById("avatarPreview");
const avatarImg = document.getElementById("avatarImg");
const bgImage = document.getElementById("bgImage");

const backgrounds = [
  "https://gosupermodel.com/files/catwalk%20by%20falco%20avatar%20bg",
  "https://gosupermodel.com/files/lny_avatar_bg",
  "https://gosupermodel.com/files/stage%20by%20falco%20avatar%20bg",
  "https://gosupermodel.com/files/spt%20avatar%20bg_dark",
  "https://gosupermodel.com/files/dark%20cats%20by%20chizumi%20avatar%20bg",
  "https://gosupermodel.com/files/flowers%20by%20chizumi%20avatar%20bg",
  "https://gosupermodel.com/files/darkmode%20by%20chizumi",
  "https://gosupermodel.com/files/bg%20avatar%20spt%201",
  "https://gosupermodel.com/files/avatar_bg_bts24",
  "https://gosupermodel.com/files/gochella%20by%20falco%20avatar%20bg"
];

// After "Yes" is confirmed (user verified)
yesBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const modelID = modelIDInput.value.trim();

  if (!username || !modelID) return;

  localStorage.setItem("currentUser", JSON.stringify({ name: username, id: modelID }));

  // Show background selector
  confirmBox.classList.add("hidden");
  backgroundSelector.classList.remove("hidden");
  avatarPreview.classList.remove("hidden");

  // Display avatar
  avatarImg.src = `https://gosupermodel.com/dollservlet.png?model=${modelID}&large=1#filter`;

  // Populate backgrounds
  backgroundOptions.innerHTML = "";
  backgrounds.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    img.addEventListener("click", () => selectBackground(url, img));
    backgroundOptions.appendChild(img);
  });
});

function selectBackground(url, imgEl) {
  // Deselect others
  document.querySelectorAll(".background-options img").forEach(img => img.classList.remove("selected"));
  imgEl.classList.add("selected");

  // Update background display
  bgImage.src = url;

  // Save selection
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  currentUser.background = url;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}


