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

  const members = document.querySelectorAll(".member");
  if (members.length === 0) {
    alert("Сначала добавьте участника!");
    return;
  }

  let assignedTo = prompt("Кому назначить задачу? Введите имя участника:");

  const nameExists = Array.from(members).some(m => m.textContent === assignedTo);
  if (!nameExists) {
    alert("Такой участник не найден.");
    return;
  }

  const task = document.createElement("div");
  task.className = "task";
  task.setAttribute("draggable", "true");

  const label = document.createElement("div");
  label.innerHTML = `<strong>${taskText}</strong><br><small>${assignedTo}</small>`;
  task.appendChild(label);

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
  const allTasks = document.querySelectorAll(".task");
  const doneTasks = document.querySelectorAll("#done .task");
  const percent = allTasks.length === 0 ? 0 : Math.round((doneTasks.length / allTasks.length) * 100);
  document.getElementById("progressValue").textContent = `${percent}%`;

  // Индивидуальный прогресс
  const members = document.querySelectorAll(".member");
  members.forEach(member => {
    const name = member.textContent;
    const tasksForUser = Array.from(allTasks).filter(task =>
      task.textContent.includes(name)
    );
    const doneForUser = Array.from(doneTasks).filter(task =>
      task.textContent.includes(name)
    );

    const personalProgress = tasksForUser.length === 0
      ? "—"
      : `${Math.round((doneForUser.length / tasksForUser.length) * 100)}%`;

    member.setAttribute("title", `Прогресс: ${personalProgress}`);
  });
}


function addMember() {
  const nameInput = document.getElementById("memberName");
  const name = nameInput.value.trim();
  if (!name) return;

  const member = document.createElement("div");
  member.className = "member";
  member.textContent = name;

  document.getElementById("members").appendChild(member);
  nameInput.value = "";
}

