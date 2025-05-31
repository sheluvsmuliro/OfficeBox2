const taskInput = document.getElementById('taskText');
const taskList = document.getElementById('taskList');

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.textContent = text;
  li.onclick = () => {
    li.classList.toggle('completed');
  };

  const delBtn = document.createElement('button');
  delBtn.textContent = '✖';
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);
  taskInput.value = '';
}

function clearTasks() {
  taskList.innerHTML = '';
}
