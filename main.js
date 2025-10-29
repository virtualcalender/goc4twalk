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

  // Save last model ID for lobby
  localStorage.setItem("lastModelID", modelID);
});

// Yes button: save player and go to lobby
yesBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const modelID = modelIDInput.value.trim();
  if (!username || !modelID) return;

  // Generate avatar URL
  const avatarURL = `https://gosupermodel.com/dollservlet.png?model=${modelID}&large=1#filter`;

  // Save player info in localStorage
  const currentPlayer = { name: username, avatar: avatarURL };
  localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));

  // Save player in global players list (optional)
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

