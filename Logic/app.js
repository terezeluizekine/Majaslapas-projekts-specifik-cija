(function initializePlanner(globalScope) {
  const { STORAGE_KEYS, loadItems, saveItems, createId } = globalScope.StorageService;

  const taskForm = document.querySelector('#task-form');
  const taskInput = document.querySelector('#task-input');
  const taskPriority = document.querySelector('#task-priority');
  const taskList = document.querySelector('#task-list');
  const taskCount = document.querySelector('#task-count');

  const habitForm = document.querySelector('#habit-form');
  const habitInput = document.querySelector('#habit-input');
  const habitList = document.querySelector('#habit-list');
  const habitCount = document.querySelector('#habit-count');

  let tasks = loadItems(STORAGE_KEYS.tasks);
  let habits = loadItems(STORAGE_KEYS.habits);

  function updateCounter(listElement, counterElement) {
    counterElement.textContent = listElement.children.length;
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
      li.innerHTML = `<span>${task.text}</span><small>${task.priority}</small>`;

      li.appendChild(createRemoveButton(() => {
        tasks = tasks.filter((item) => item.id !== task.id);
        saveItems(STORAGE_KEYS.tasks, tasks);
        renderTasks();
      }));

      taskList.appendChild(li);
    });

    updateCounter(taskList, taskCount);
  }

  function renderHabits() {
    habitList.innerHTML = '';

    habits.forEach((habit) => {
      const li = document.createElement('li');
      li.className = `item ${habit.done ? 'done' : ''}`.trim();

      const left = document.createElement('div');
      left.className = 'habit-left';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.title = 'Atzīmēt kā izpildītu šodien';
      checkbox.checked = Boolean(habit.done);

      const label = document.createElement('span');
      label.textContent = habit.text;

      checkbox.addEventListener('change', () => {
        habits = habits.map((item) => (
          item.id === habit.id ? { ...item, done: checkbox.checked } : item
        ));
        saveItems(STORAGE_KEYS.habits, habits);
        li.classList.toggle('done', checkbox.checked);
      });

      left.append(checkbox, label);
      li.appendChild(left);

      li.appendChild(createRemoveButton(() => {
        habits = habits.filter((item) => item.id !== habit.id);
        saveItems(STORAGE_KEYS.habits, habits);
        renderHabits();
      }));

      habitList.appendChild(li);
    });

    updateCounter(habitList, habitCount);
  }

  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({
      id: createId(),
      text,
      priority: taskPriority.value,
    });

    saveItems(STORAGE_KEYS.tasks, tasks);
    renderTasks();
    taskForm.reset();
    taskPriority.value = 'Vidēja';
  });

  habitForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = habitInput.value.trim();
    if (!text) return;

    habits.push({
      id: createId(),
      text,
      done: false,
    });

    saveItems(STORAGE_KEYS.habits, habits);
    renderHabits();
    habitForm.reset();
  });

  renderTasks();
  renderHabits();
})(window);