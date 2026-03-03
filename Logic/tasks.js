(function attachTasksModule(globalScope) {
  const { STORAGE_KEYS, loadItems, saveItems, createId } = globalScope.StorageService;

  function initializeTasksModule() {
    const taskForm = document.querySelector('#task-form');
    const taskInput = document.querySelector('#task-input');
    const taskPriority = document.querySelector('#task-priority');
    const taskDeadline = document.querySelector('#task-deadline');
    const taskList = document.querySelector('#task-list');
    const taskCount = document.querySelector('#task-count');

    if (!taskForm || !taskInput || !taskPriority || !taskDeadline || !taskList || !taskCount) return;

    let tasks = loadItems(STORAGE_KEYS.tasks);

    function formatDate(value) {
      if (!value) return 'Bez termiņa';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return 'Bez termiņa';
      return date.toLocaleDateString('lv-LV');
    }

    function updateCounter() {
      taskCount.textContent = taskList.children.length;
    }

    function createRemoveButton(onClick) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ghost';
      button.textContent = 'Dzēst';
      button.addEventListener('click', onClick);
      return button;
    }

    function renderTasks() {
      taskList.innerHTML = '';

      tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = 'item';

        const content = document.createElement('div');
        content.className = 'task-content';

        const name = document.createElement('span');
        name.textContent = task.text;

        const meta = document.createElement('small');
        meta.textContent = `Prioritāte: ${task.priority} • Termiņš: ${formatDate(task.deadline)}`;

        content.append(name, meta);
        li.appendChild(content);

        li.appendChild(createRemoveButton(() => {
          tasks = tasks.filter((item) => item.id !== task.id);
          saveItems(STORAGE_KEYS.tasks, tasks);
          renderTasks();
        }));

        taskList.appendChild(li);
      });

      updateCounter();
    }

    taskForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const text = taskInput.value.trim();
      if (!text) return;

      tasks.push({
        id: createId(),
        text,
        priority: taskPriority.value,
        deadline: taskDeadline.value,
      });

      saveItems(STORAGE_KEYS.tasks, tasks);
      renderTasks();
      taskForm.reset();
      taskPriority.value = 'Vidēja';
    });

    renderTasks();
  }

  globalScope.TasksModule = {
    initializeTasksModule,
  };
})(window);