// DOM elements
const loginForm = document.getElementById("loginForm");
const preview = document.getElementById("preview");
const previewImg = document.getElementById("previewImg");
const previewName = document.getElementById("previewName");
const statusText = document.getElementById("loginStatus");

const confirmModal = document.getElementById("confirmModal");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");

// Show model preview and modal on form submit
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const modelId = document.getElementById("modelId").value.trim();

  if (!username || !modelId) {
    statusText.textContent = "Please fill out both fields.";
    return;
  }

  preview.classList.add("hidden");
  statusText.textContent = "Loading your model... 💅";

  const url = `https://gosupermodel.com/dollservlet.png?model=${modelId}&large=1`;

  const img = new Image();
  img.src = url;
  img.onload = () => {
    previewImg.src = url;
    previewName.textContent = username;
    preview.classList.remove("hidden");
    statusText.textContent = "";

    // Show the modal confirmation
    confirmModal.classList.add("show");
  };

  img.onerror = () => {
    statusText.textContent = "Could not find that GoSupermodel ID.";
  };
});

// ✅ Yes button
confirmYes.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const modelId = document.getElementById("modelId").value.trim();

  localStorage.setItem("username", username);
  localStorage.setItem("modelId", modelId);

  alert(`Welcome, ${username}! 💖`);
  confirmModal.classList.remove("show");

  // Redirect to next step later
  // window.location.href = "game.html";
});

// ❌ No button
confirmNo.addEventListener("click", () => {
  confirmModal.classList.remove("show");
  statusText.textContent = "Try entering your ID again!";
});
