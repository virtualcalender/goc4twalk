// Draggable floating background picker widget
const picker = document.getElementById("backgroundPicker");

if (picker) {
  // Make draggable
  let offsetX = 0, offsetY = 0, isDragging = false;

  picker.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - picker.offsetLeft;
    offsetY = e.clientY - picker.offsetTop;
    picker.style.transition = "none";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    picker.style.left = `${e.clientX - offsetX}px`;
    picker.style.top = `${e.clientY - offsetY}px`;
  });

  // Handle background selection
  document.querySelectorAll("#backgroundOptions img").forEach((img) => {
    img.addEventListener("click", () => {
      localStorage.setItem("chosenBackground", img.src);
      document.querySelectorAll("#backgroundOptions img").forEach(i => i.style.boxShadow = "");
      img.style.boxShadow = "0 0 10px #ff4fae";
    });
  });
}
