(function attachTimerModule(globalScope) {
  const {
    STORAGE_KEYS,
    loadObject,
    saveObject,
  } = globalScope.StorageService;

  function initializeTimerModule() {
    const modeSelect = document.querySelector('#timer-mode');
    const minutesInput = document.querySelector('#timer-minutes');
    const secondsInput = document.querySelector('#timer-seconds');
    const display = document.querySelector('#timer-display');
    const status = document.querySelector('#timer-status');
    const sessionCount = document.querySelector('#pomodoro-session-count');
    const startButton = document.querySelector('#timer-start');
    const pauseButton = document.querySelector('#timer-pause');
    const resetButton = document.querySelector('#timer-reset');
    const skipButton = document.querySelector('#timer-skip');

    if (
      !modeSelect ||
      !minutesInput ||
      !secondsInput ||
      !display ||
      !status ||
      !sessionCount ||
      !startButton ||
      !pauseButton ||
      !resetButton ||
      !skipButton
    ) {
      return;
    }

    const savedSettings = loadObject(STORAGE_KEYS.timerSettings, {
      mode: 'timer',
      minutes: 25,
      seconds: 0,
      completedPomodoros: 0,
    });

    let timerId = null;
    let remainingSeconds = (savedSettings.minutes * 60) + savedSettings.seconds;
    let isRunning = false;
    let pomodoroPhase = 'focus';
    let completedPomodoros = savedSettings.completedPomodoros || 0;

    modeSelect.value = savedSettings.mode || 'timer';
    minutesInput.value = savedSettings.minutes ?? 25;
    secondsInput.value = savedSettings.seconds ?? 0;

    function formatTime(totalSeconds) {
      const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
      const secs = (totalSeconds % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`;
    }

    function saveTimerState() {
      saveObject(STORAGE_KEYS.timerSettings, {
        mode: modeSelect.value,
        minutes: Number(minutesInput.value) || 0,
        seconds: Number(secondsInput.value) || 0,
        completedPomodoros,
      });
    }

    function updateDisplay() {
      display.textContent = formatTime(remainingSeconds);
      sessionCount.textContent = completedPomodoros;
    }

    function setStatusText(text) {
      status.textContent = text;
    }

    function getManualDuration() {
      const minutes = Math.max(0, Number(minutesInput.value) || 0);
      const seconds = Math.max(0, Number(secondsInput.value) || 0);
      return (minutes * 60) + seconds;
    }

    function getPomodoroDuration() {
      if (pomodoroPhase === 'focus') return 25 * 60;
      if ((completedPomodoros + 1) % 4 === 0) return 15 * 60;
      return 5 * 60;
    }

    function applyModeDefaults() {
      if (modeSelect.value === 'pomodoro') {
        remainingSeconds = getPomodoroDuration();
        minutesInput.value = Math.floor(remainingSeconds / 60);
        secondsInput.value = remainingSeconds % 60;
        setStatusText(
          pomodoroPhase === 'focus'
            ? 'Pomodoro: fokusa sesija'
            : ((completedPomodoros + 1) % 4 === 0
              ? 'Pomodoro: garā pauze'
              : 'Pomodoro: īsā pauze')
        );
      } else {
        remainingSeconds = getManualDuration();
        setStatusText('Parastais taimeris');
      }

      updateDisplay();
      saveTimerState();
    }

    function stopInterval() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
      isRunning = false;
    }

    function handleTimerFinish() {
      if (modeSelect.value === 'pomodoro') {
        if (pomodoroPhase === 'focus') {
          completedPomodoros += 1;
          pomodoroPhase = 'break';
        } else {
          pomodoroPhase = 'focus';
        }

        applyModeDefaults();
        startTimer();
      } else {
        stopInterval();
        setStatusText('Laiks beidzies');
      }
    }

    function tick() {
      if (remainingSeconds > 0) {
        remainingSeconds -= 1;
        updateDisplay();
        return;
      }

      handleTimerFinish();
    }

    function startTimer() {
      if (isRunning) return;

      if (remainingSeconds <= 0) {
        remainingSeconds = modeSelect.value === 'pomodoro'
          ? getPomodoroDuration()
          : getManualDuration();
      }

      isRunning = true;
      timerId = globalScope.setInterval(tick, 1000);
      setStatusText(
        modeSelect.value === 'pomodoro'
          ? `Pomodoro darbojas (${pomodoroPhase === 'focus' ? 'fokuss' : 'pauze'})`
          : 'Taimeris darbojas'
      );
    }

    function pauseTimer() {
      stopInterval();
      setStatusText('Pauzēts');
    }

    function resetTimer() {
      stopInterval();
      if (modeSelect.value === 'pomodoro') {
        pomodoroPhase = 'focus';
      }
      applyModeDefaults();
      setStatusText(modeSelect.value === 'pomodoro' ? 'Pomodoro atiestatīts' : 'Taimeris atiestatīts');
    }

    function skipPhase() {
      if (modeSelect.value !== 'pomodoro') return;

      stopInterval();

      if (pomodoroPhase === 'focus') {
        completedPomodoros += 1;
        pomodoroPhase = 'break';
      } else {
        pomodoroPhase = 'focus';
      }

      applyModeDefaults();
      setStatusText('Pomodoro fāze pārslēgta');
    }

    modeSelect.addEventListener('change', () => {
      stopInterval();
      pomodoroPhase = 'focus';
      applyModeDefaults();
    });

    minutesInput.addEventListener('input', () => {
      if (modeSelect.value === 'timer') {
        remainingSeconds = getManualDuration();
        updateDisplay();
        saveTimerState();
      }
    });

    secondsInput.addEventListener('input', () => {
      if (modeSelect.value === 'timer') {
        remainingSeconds = getManualDuration();
        updateDisplay();
        saveTimerState();
      }
    });

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    skipButton.addEventListener('click', skipPhase);

    applyModeDefaults();
  }

  globalScope.TimerModule = {
    initializeTimerModule,
  };
})(window);