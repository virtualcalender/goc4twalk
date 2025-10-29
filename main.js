const showBtn = document.getElementById("showBtn");
const confirmBox = document.getElementById("confirmBox");
const previewImg = document.getElementById("previewImg");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const usernameInput = document.getElementById("username");
const modelIDInput = document.getElementById("modelID");

showBtn.addEventListener("click", () => {
  const modelID = modelIDInput.value.trim();
  if (!modelID) {
    alert("Please enter your GoSuperModel ID!");
    return;
  }

  // Show the confirmation box first
  confirmBox.classList.remove("hidden");

  // Ensure the image is visible
  previewImg.classList.remove("hidden");

  // Then set the src so it loads properly
  previewImg.src = `https://gosupermodel.com/dollservlet.png?model=${modelID}&large=1#filter`;
});

yesBtn.addEventListener("click", () => {
  alert(`Welcome, ${usernameInput.value}!`);
  confirmBox.classList.add("hidden");
  previewImg.classList.add("hidden"); // hide image again
});

noBtn.addEventListener("click", () => {
  confirmBox.classList.add("hidden");
  previewImg.classList.add("hidden"); // hide image again
  modelIDInput.value = "";
});
