(function initializePlanner(globalScope) {
  const { STORAGE_KEYS, loadItems, saveItems, createId } = globalScope.StorageService;
  const { initializeTasksModule } = globalScope.TasksModule;
  const { initializeHabitsModule } = globalScope.HabitsModule;
  initializeTasksModule();
  initializeHabitsModule();
})(window);