// === GoCatwalk Login & Background Selector ===

// Elements
const showBtn = document.getElementById("showBtn");
const confirmBox = document.getElementById("confirmBox");
const previewImg = document.getElementById("previewImg");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const usernameInput = document.getElementById("username");
const modelIDInput = document.getElementById("modelID");
const backgroundPicker = document.getElementById("backgroundPicker");
const backgroundOptions = document.getElementById("backgroundOptions");
const avatarImg = document.getElementById("avatarImg");
const bgImage = document.getElementById("bgImage");
const continueBtn = document.getElementById("continueBtn");

// Background choices
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

// === STEP 1: Show model preview ===
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

// === STEP 2: Confirm model identity ===
yesBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const modelID = modelIDInput.value.trim();
  if (!username || !modelID) return;

  // Save user data
  localStorage.setItem("currentUser", JSON.stringify({ name: username, id: modelID }));

  // Hide confirmation and show floating picker
  confirmBox.classList.add("hidden");
  backgroundPicker.classList.remove("hidden");

  // Show avatar in picker
  avatarImg.src = `https://gosupermodel.com/dollservlet.png?model=${modelID}&large=1#filter`;

  // Load background choices
  backgroundOptions.innerHTML = "";
  backgrounds.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    img.addEventListener("click", () => selectBackground(url, img));
    backgroundOptions.appendChild(img);
  });
});

// === STEP 3: “No” button resets ===
noBtn.addEventListener("click", () => {
  confirmBox.classList.add("hidden");
  previewImg.classList.add("hidden");
  modelIDInput.value = "";
});

// === STEP 4: Select a background ===
function selectBackground(url, imgEl) {
  document.querySelectorAll("#backgroundOptions img").forEach(img => img.classList.remove("selected"));
  imgEl.classList.add("selected");

  bgImage.src = url;

  // Save to localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  currentUser.background = url;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

// === STEP 5: Continue to lobby ===
continueBtn.addEventListener("click", () => {
  window.location.href = "lobby.html";
});
