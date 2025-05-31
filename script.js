document.addEventListener("DOMContentLoaded", () => {
  const columns = document.querySelectorAll(".task-column");
  const progressValue = document.getElementById("progressValue");

  columns.forEach(column => {
    column.addEventListener("dragover", (e) => {
      e.preventDefault();
      const dragging = document.querySelector(".dragging");
      column.appendChild(dragging);
      updateProgress();
    });
  });

  updateProgress(); // инициализация
});

function addTask(columnId = "todo") {
  const taskText = prompt("Введите текст задачи:");
  if (!taskText) return;

  const task = document.createElement("div");
  task.className = "task";
  task.textContent = taskText;
  task.setAttribute("draggable", "true");

  task.addEventListener("dragstart", () => {
    task.classList.add("dragging");
  });

  task.addEventListener("dragend", () => {
    task.classList.remove("dragging");
  });

  document.querySelector(`#${columnId} .task-column`).appendChild(task);
  updateProgress();
}

function updateProgress() {
  const total = document.querySelectorAll(".task").length;
  const done = document.querySelectorAll("#done .task").length;

  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  document.getElementById("progressValue").textContent = `${percent}%`;
}

