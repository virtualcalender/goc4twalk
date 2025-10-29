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
  
  // Set image source
  previewImg.src = `https://gosupermodel.com/dollservlet.png?model=${modelID}&large=1#filter`;

  // Show confirmation box
  confirmBox.classList.remove("hidden");
});

yesBtn.addEventListener("click", () => {
  alert(`Welcome, ${usernameInput.value}!`);
  confirmBox.classList.add("hidden");
});

noBtn.addEventListener("click", () => {
  confirmBox.classList.add("hidden");
  modelIDInput.value = "";
});
