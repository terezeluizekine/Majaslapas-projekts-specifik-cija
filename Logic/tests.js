(function attachTests(globalScope) {
  const { STORAGE_KEYS, loadItems, saveItems, createId } = globalScope.StorageService;

  function assert(condition, message) {
    if (!condition) {
      console.error('❌ TEST FAILED:', message);
    } else {
      console.log('✅', message);
    }
  }

  function runAcceptanceTest() {
    console.group('AKCEPT TESTI');

    const hugeHabits = [];
    for (let i = 0; i < 5000; i++) {
      hugeHabits.push({
        id: createId(),
        text: 'Ieradums ' + i,
        done: false
      });
    }

    // ✔️ Saglabājam localStorage
    StorageService.saveItems(StorageService.STORAGE_KEYS.habits, hugeHabits);

    // ✔️ Notīram UI
    const habitList = document.querySelector('#habit-list');
    if (habitList) habitList.innerHTML = '';

    // ✔️ Renderējam
    const startTime = performance.now();
    HabitsModule.initializeHabitsModule();
    const endTime = performance.now();

    console.log(`Renderēti ${hugeHabits.length} ieradumi.`);
    console.log(`Renderēšanas laiks: ${(endTime - startTime).toFixed(2)} ms`);

    // ✔️ Pārbaude
    const listLength = habitList.children.length;
    console.assert(listLength === hugeHabits.length,
        `DOM satur ${listLength} ieradumus (paredzēti ${hugeHabits.length})`
    );

    console.groupEnd();
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


    function runIntegrationTests() {
      console.group('INTEGRĀCIJU TESTI');

      // SCENĀRIJS: pievienot uzdevumu
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

    // JAUNS SCENĀRIJS: pievienot ieradumu
    let habitsList = StorageService.loadItems(StorageService.STORAGE_KEYS.habits);
    const newHabitText = 'Jauns ieradums';

    const newHabit = {
      id: createId(),
      text: newHabitText,
      done: false
    };

    let habitsLength = habitsList.length;

    habitsList.push(newHabit);
    StorageService.saveItems(StorageService.STORAGE_KEYS.habits, habitsList);

    habitsList = StorageService.loadItems(StorageService.STORAGE_KEYS.habits);

    assert(habitsList.length === habitsLength + 1, 'Ieradums pievienots');
    assert(habitsList[habitsLength].text === newHabitText, 'Ieraduma teksts saglabāts');
    assert(habitsList[habitsLength].done === false, 'Ieraduma izpildes stāvoklis saglabāts');

    console.groupEnd();

    window.HabitsModule.initializeHabitsModule();
  }

  function runSecurityTest() {
    console.group('DROŠĪBAS TESTS: XSS aizsardzība');

    const maliciousInput = '<script>alert("HACK")</script>';

    const habits = [{
      id: createId(),
      text: maliciousInput,
      done: false
    }];

    StorageService.saveItems(StorageService.STORAGE_KEYS.habits, habits);
    HabitsModule.initializeHabitsModule();

    const label = document.querySelector('#habit-list span');

    assert(label.textContent === maliciousInput, 'Teksts saglabāts kā plain text (nav izpildīts kā kods)');
    assert(!label.innerHTML.includes('<script>'), 'Script tags netiek interpretēts HTML');

    console.groupEnd();
  }

  function runReliabilityTest() {
    console.group('UZTICAMĪBAS TESTS: bojāti dati');

    // Nepareizu datu (bojātu) ievade vienā masīvā
    localStorage.setItem(StorageService.STORAGE_KEYS.habits, 'INVALID JSON');

    try {
      HabitsModule.initializeHabitsModule();

      const habitList = document.querySelector('#habit-list');

      assert(habitList.children.length === 0, 'Bojāti dati neizraisa crash un tiek ignorēti');

    } catch (error) {
      console.error('❌ Aplikācija uzkārās ar bojātiem datiem', error);
    }

    console.groupEnd();
  }

  function runAllTests() {
    console.clear();
    console.log('--- TESTĒŠANA ---');
    runUnitTests();
    runIntegrationTests();
    runAcceptanceTest();
    runSecurityTest();
    runReliabilityTest();
  }

  globalScope.Tests = {
    runAllTests,
  };
})(window);
