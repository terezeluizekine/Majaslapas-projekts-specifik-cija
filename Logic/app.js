(function initializePlanner(globalScope) {
  const { initializeTasksModule } = globalScope.TasksModule;
  const { initializeHabitsModule } = globalScope.HabitsModule;
  const { initializeTimerModule } = globalScope.TimerModule;
  const { initializeTestEnvironment } = globalScope.TestEnvironment;

  initializeTasksModule();
  initializeHabitsModule();
  initializeTimerModule();
  initializeTestEnvironment();
})(window);