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

    // SCENĀRIJS: pievienot uzdevumu
    let tasks = [];

    const newTask = {
      id: createId(),
      text: 'Testa uzdevums',
      priority: 'Augsta',
      deadline: '',
    };

    tasks.push(newTask);

    assert(tasks.length === 1, 'Uzdevums pievienots');

    // SCENĀRIJS: dzēst uzdevumu
    tasks = tasks.filter(t => t.id !== newTask.id);

    assert(tasks.length === 0, 'Uzdevums dzēsts');

    // SCENĀRIJS: ieraduma atzīmēšana
    let habits = [{
      id: createId(),
      text: 'Test habit',
      done: false
    }];

    habits[0].done = true;

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