(function attachStorageService(globalScope) {
  const STORAGE_KEYS = {
    tasks: 'studyPlanner.tasks',
    habits: 'studyPlanner.habits',
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

  function createId() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  globalScope.StorageService = {
    STORAGE_KEYS,
    loadItems,
    saveItems,
    createId,
  };
})(window);