const showBtn = document.getElementById("showBtn");
const confirmBox = document.getElementById("confirmBox");
const previewImg = document.getElementById("previewImg");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const usernameInput = document.getElementById("username");
const modelIDInput = document.getElementById("modelID");
const sidePanel = document.getElementById("sidePanel");
const backgroundOptions = document.getElementById("backgroundOptions");
const avatarPreview = document.getElementById("avatarPreview");
const avatarImg = document.getElementById("avatarImg");
const bgImage = document.getElementById("bgImage");
const continueBtn = document.getElementById("continueBtn");

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

// Step 1: Preview model
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

// Step 2: Confirm identity
yesBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const modelID = modelIDInput.value.trim();
  if (!username || !modelID) return;

  localStorage.setItem("currentUser", JSON.stringify({ name: username, id: modelID }));

  confirmBox.classList.add("hidden");
  sidePanel.classList.remove("hidden");
  avatarPreview.classList.remove("hidden");

  avatarImg.src = `https://gosupermodel.com/dollservlet.png?model=${modelID}&large=1#filter`;

  backgroundOptions.innerHTML = "";
  backgrounds.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    img.addEventListener("click", () => selectBackground(url, img));
    backgroundOptions.appendChild(img);
  });
});

// Step 3: Reset
noBtn.addEventListener("click", () => {
  confirmBox.classList.add("hidden");
  previewImg.classList.add("hidden");
  modelIDInput.value = "";
});

// Step 4: Choose background
function selectBackground(url, imgEl) {
  document.querySelectorAll(".background-options img").forEach(img => img.classList.remove("selected"));
  imgEl.classList.add("selected");
  bgImage.src = url;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  currentUser.background = url;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

// Step 5: Continue to lobby
continueBtn.addEventListener("click", () => {
  window.location.href = "lobby.html";
});
