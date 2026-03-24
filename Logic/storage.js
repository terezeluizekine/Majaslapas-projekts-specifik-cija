(function attachStorageService(globalScope) {
  const STORAGE_KEYS = {
    tasks: 'studyPlanner.tasks',
    habits: 'studyPlanner.habits',
    timerSettings: 'studyPlanner.timerSettings',
  };

  function loadItems(key) {
    const raw = globalScope.localStorage.getItem(key);
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveItems(key, items) {
    globalScope.localStorage.setItem(key, JSON.stringify(items));
  }

  function loadObject(key, fallback = {}) {
    const raw = globalScope.localStorage.getItem(key);
    if (!raw) return fallback;

    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : fallback;
    } catch {
      return fallback;
    }
  }

  function saveObject(key, value) {
    globalScope.localStorage.setItem(key, JSON.stringify(value));
  }

  function clearAllPlannerData() {
    Object.values(STORAGE_KEYS).forEach((key) => {
      globalScope.localStorage.removeItem(key);
    });
  }

  function createId() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  globalScope.StorageService = {
    STORAGE_KEYS,
    loadItems,
    saveItems,
    loadObject,
    saveObject,
    clearAllPlannerData,
    createId,
  };
})(window);