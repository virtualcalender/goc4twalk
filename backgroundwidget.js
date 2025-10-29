// backgroundWidget.js

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

function createBackgroundWidget() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  const widget = document.createElement("div");
  widget.classList.add("draggable-panel");
  widget.innerHTML = `
    <button class="minimize-btn" id="minimizeBtn">−</button>
    <h3>✨ Choose Background</h3>
    <div class="background-options" id="bgThumbs"></div>
    <div class="avatar-preview">
      <div class="avatar-container">
        <img id="bgLayer" class="bg-layer" src="${user.background || backgrounds[0]}">
        <img id="avatarLayer" class="avatar-layer" src="https://gosupermodel.com/dollservlet.png?model=${user.id}&large=1#filter">
      </div>
    </div>
  `;

  document.body.appendChild(widget);

  // Generate thumbnails
  const bgThumbs = widget.querySelector("#bgThumbs");
  backgrounds.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    if (url === user.background) img.classList.add("selected");
    img.addEventListener("click", () => {
      bgThumbs.querySelectorAll("img").forEach(i => i.classList.remove("selected"));
      img.classList.add("selected");
      widget.querySelector("#bgLayer").src = url;
      user.background = url;
      localStorage.setItem("currentUser", JSON.stringify(user));
    });
    bgThumbs.appendChild(img);
  });

  // Minimize / restore
  const minimizeBtn = widget.querySelector("#minimizeBtn");
  let minimized = false;
  minimizeBtn.addEventListener("click", () => {
    minimized = !minimized;
    widget.querySelector("#bgThumbs").style.display = minimized ? "none" : "flex";
    widget.querySelector(".avatar-preview").style.display = minimized ? "none" : "block";
    minimizeBtn.textContent = minimized ? "+" : "−";
  });

  // Dragging logic
  let isDragging = false, startX, startY, startLeft, startTop;

  widget.addEventListener("mousedown", (e) => {
    if (e.target.tagName === "IMG" || e.target.tagName === "BUTTON") return;
    isDragging = true;
    widget.classList.add("dragging");
    startX = e.clientX;
    startY = e.clientY;
    const rect = widget.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    widget.style.left = startLeft + dx + "px";
    widget.style.top = startTop + dy + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    widget.classList.remove("dragging");
  });
}

// Only run once page is ready
document.addEventListener("DOMContentLoaded", createBackgroundWidget);
