(function attachTests(globalScope) {
  const { STORAGE_KEYS, loadItems, saveItems, createId } = globalScope.StorageService;

  function assert(condition, message) {
    if (!condition) {
      console.error('❌ TEST FAILED:', message);
    } else {
      console.log('✅', message);
    }
  }

  function runUnitTests() {
    console.group('UNIT TESTI');

    // TEST: createId
    const id1 = createId();
    const id2 = createId();

    assert(typeof id1 === 'string', 'ID ir string');
    assert(id1 !== id2, 'ID ir unikāli');

    // TEST: save/load
    const testData = [{ id: 1, text: 'test' }];
    saveItems('test.key', testData);

    const loaded = loadItems('test.key');
    assert(Array.isArray(loaded), 'loadItems atgriež masīvu');
    assert(loaded.length === 1, 'Saglabātais elements eksistē');

    console.groupEnd();
  }


    function runAcceptanceTests() {
      console.group('AKCEPTTESTI');

      const newTask = {
        id: createId(),
        text: 'Testa uzdevums',
        priority: 'Augsta',
        deadline: '',
      };

      let tasks = StorageService.loadItems(StorageService.STORAGE_KEYS.tasks);
      let taskLength = tasks.length;

      tasks.push(newTask);
      StorageService.saveItems(StorageService.STORAGE_KEYS.tasks, tasks);

      tasks = StorageService.loadItems(StorageService.STORAGE_KEYS.tasks);

      assert(tasks.length === taskLength + 1, 'Uzdevums pievienots');
      assert(tasks[taskLength].text === 'Testa uzdevums', 'Uzdevuma teksts saglabāts');
      assert(tasks[taskLength].priority === 'Augsta', 'Uzdevuma prioritāte saglabāta');

      window.TasksModule.initializeTasksModule();

      // SCENĀRIJS: dzēst uzdevumu
      tasks = tasks.filter(t => t.id !== newTask.id);
      StorageService.saveItems(StorageService.STORAGE_KEYS.tasks, tasks);

      tasks = StorageService.loadItems(StorageService.STORAGE_KEYS.tasks);

      assert(tasks.length === taskLength, 'Uzdevums dzēsts');

      //window.TasksModule.initializeTasksModule();

    // SCENĀRIJS: ieraduma atzīmēšana
    let habits = [{
      id: createId(),
      text: 'Test habit',
      done: false
    }];

    StorageService.saveItems(StorageService.STORAGE_KEYS.habits, habits);
    window.HabitsModule.initializeHabitsModule();

    const checkbox = document.querySelector('#habit-list input[type="checkbox"]');

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));

    habits = StorageService.loadItems(StorageService.STORAGE_KEYS.habits);
    assert(habits[0].done === true, 'Ieradums atzīmēts kā izpildīts');

    console.groupEnd();
  }

  function runAllTests() {
    console.clear();
    console.log('--- TESTĒŠANA ---');
    runUnitTests();
    runAcceptanceTests();
  }

  globalScope.Tests = {
    runAllTests,
  };
})(window);