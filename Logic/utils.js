(function attachTestEnvironment(globalScope) {
  const {
    STORAGE_KEYS,
    saveItems,
    clearAllPlannerData,
    createId,
  } = globalScope.StorageService;

  function getDemoTasks() {
    return [
      {
        id: createId(),
        text: 'Izpildīt matemātikas mājasdarbu',
        priority: 'Augsta',
        deadline: '2026-03-25',
      },
      {
        id: createId(),
        text: 'Sagatavoties programmēšanas ieskaitei',
        priority: 'Vidēja',
        deadline: '2026-03-27',
      },
      {
        id: createId(),
        text: 'Izlasīt 20 lpp. no grāmatas',
        priority: 'Zema',
        deadline: '',
      },
    ];
  }

  function getDemoHabits() {
    return [
      {
        id: createId(),
        text: '30 min mācības',
        done: false,
      },
      {
        id: createId(),
        text: 'Atkārtot lekciju pierakstus',
        done: true,
      },
      {
        id: createId(),
        text: 'Izpildīt vienu programmēšanas uzdevumu',
        done: false,
      },
    ];
  }

  function insertDemoData() {
    saveItems(STORAGE_KEYS.tasks, getDemoTasks());
    saveItems(STORAGE_KEYS.habits, getDemoHabits());
    globalScope.location.reload();
  }

  function clearAllData() {
    clearAllPlannerData();
    globalScope.location.reload();
  }

  function initializeTestEnvironment() {
    const fillButton = document.querySelector('#fill-demo-data');
    const clearButton = document.querySelector('#clear-all-data');

    if (fillButton) {
      fillButton.addEventListener('click', insertDemoData);
    }

    if (clearButton) {
      clearButton.addEventListener('click', clearAllData);
    }
  }

  globalScope.TestEnvironment = {
    initializeTestEnvironment,
    insertDemoData,
    clearAllData,
  };
})(window);