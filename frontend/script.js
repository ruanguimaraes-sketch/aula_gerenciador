const apiUrl = 'http://localhost:3000/tasks';

const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    if (!res.ok) throw new Error('Erro ao adicionar tarefa');

    const task = await res.json();
    form.reset();
    addTaskToUl(task);
  } catch (error) {
    alert('Erro ao salvar tarefa: ' + error.message);
  }
});

function addTaskToUl(task) {
  const li = document.createElement('li');
  li.className = task.completed ? 'completed' : '';
  li.innerHTML = `
  <span>${task.title} - ${task.description}</span>
  <div>
    <button class="li-button" onClick="toggleCompleted(${task.id}, ${task.completed})">
    ☑️
    </button>
    <button class="li-button" onClick="deleteTask(${task.id})">🗑️</button>
  </div>
  `;
  taskList.appendChild(li);
}

async function loadTasks() {
  try {
    const res = await fetch(apiUrl);
    if(!res.ok) throw new Error("Erro ao carregar tarefas");

    const tasks = await res.json();
    taskList.innerHTML = "";
    tasks.forEach(addTaskToUl);

  } catch (error) {
    alert("Erro ao carregar tarefas: " + error.message);
  }
}

async function toggleCompleted(id, completed){
  try {
    const res = await fetch(`${apiUrl}/${id}`);
    const task = await res.json();
    console.log(`Toggling task${id} to ${!completed}`);
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        completed: !completed,
      }),
    });
    loadTasks();
  } catch (error) {
    alert("Erro ao atualizar tarefa: " + error.message);
  }
}

async function deleteTask(id) {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });
    loadTasks();
  } catch (error) {
    alert("Erro ao excluir tarefa: " + error.message);
  }
}

loadTasks();