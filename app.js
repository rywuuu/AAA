const STORAGE_KEY = "ai-journal-v1";

const DEFAULT_POOLS = {
  daily: [
    "列舉今天吃了的五種蔬菜。",
    "今天看了什麼節目？留下最想記住的一幕。",
    "說說最近擁抱的那個人，當下的感受是什麼？",
    "今天哪個時刻讓你最安定？",
    "今天你最感謝自己做的一件小事是什麼？",
    "今天用三個詞形容你的心情。",
    "今天你最想再次體驗的片段是什麼？",
    "今天你對誰產生了新的理解？",
    "今天讓你微笑的一句話是什麼？",
    "今天你為自己做的一件溫柔的事是什麼？"
  ],
  weekly: [
    "過去一週最感動的時刻是什麼？",
    "過去一週你最投入的事情是什麼？",
    "過去一週你給自己的鼓勵是什麼？",
    "這一週你最想保留的習慣是什麼？",
    "這一週你最想改善的生活節奏是什麼？"
  ],
  monthly: [
    "過去一月完成度最高的專案是什麼？",
    "這個月你最驕傲的一次選擇是什麼？",
    "這個月你最想感謝的一個人是誰？",
    "這個月你最大的成長是什麼？",
    "這個月你最需要放下的一件事是什麼？"
  ],
  quarterly: [
    "這一季你最想保留的價值觀是什麼？",
    "這一季你最想改變的生活節奏是什麼？",
    "這一季最讓你驚喜的自己是什麼樣子？",
    "這一季你想給未來自己的提醒是什麼？",
    "這一季你最想感謝的選擇是什麼？"
  ],
  icebreak: [
    "請隨機選擇一週內拍攝的照片並分享背後的故事。",
    "用一首歌形容你最近的狀態，為什麼？",
    "這週你最常做的一件小事是什麼？",
    "分享一個你最近在意的小物件。",
    "如果今天是一本書的封面，你會選什麼圖案？"
  ],
  star1: [
    "最近哪個瞬間讓你覺得自己很真實？",
    "這段時間你最想守護的界線是什麼？",
    "你最近最需要被理解的一件事是什麼？",
    "最近你對什麼事的看法有改變？",
    "說說你最近最常出現的一個情緒。"
  ],
  star2: [
    "你最近在堅持什麼？它對你意味著什麼？",
    "最近哪個選擇讓你感到為難？",
    "你現在最想學會的一件事是什麼？",
    "談談你最近最在意的一段關係。",
    "你覺得自己最近最需要被照顧的部分是什麼？"
  ],
  star3: [
    "如果能回到過去，你最想改變哪段經歷？如果那段經歷可以重來一次，你會怎麼做？",
    "你覺得什麼時候的自己最勇敢？",
    "如果要用一句話定義你的人生主題，那會是什麼？",
    "談談你曾經忽略，但現在想重新理解的一段關係。",
    "你最近最大的恐懼是什麼？它告訴你什麼？"
  ]
};

const DEFAULT_STATE = {
  settings: {
    reminderEnabled: false,
    reminderTime: "20:00",
    lockEnabled: false,
    pinHash: "",
    isLocked: false,
    lastReminderDate: "",
    partyMode: false
  },
  dailyEntries: {},
  ugcQuestions: [],
  partyHistory: [],
  partyParticipants: [],
  deep: {
    currentCategory: "",
    currentQuestion: "",
    currentQuestionType: ""
  },
  selectedDate: ""
};

const state = loadState();

const navButtons = document.querySelectorAll(".nav-btn");
const views = document.querySelectorAll(".view");
const calendarEl = document.getElementById("calendar");
const monthLabel = document.getElementById("month-label");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const selectedDateLabel = document.getElementById("selected-date-label");
const drawCardBtn = document.getElementById("draw-card");
const tarotCard = document.getElementById("tarot-card");
const dailyQuestionText = document.getElementById("daily-question-text");
const dailyAnswer = document.getElementById("daily-answer");
const questionMeta = document.getElementById("question-meta");
const saveAnswerBtn = document.getElementById("save-answer");
const clearAnswerBtn = document.getElementById("clear-answer");
const drawCardMobileBtn = document.getElementById("draw-card-mobile");
const saveAnswerMobileBtn = document.getElementById("save-answer-mobile");
const clearAnswerMobileBtn = document.getElementById("clear-answer-mobile");
const recentList = document.getElementById("recent-list");
const deepCategories = document.getElementById("deep-categories");
const deepQuestionEl = document.getElementById("deep-question");
const nextQuestionBtn = document.getElementById("next-question");
const saveRoundBtn = document.getElementById("save-round");
const nextQuestionMobileBtn = document.getElementById("next-question-mobile");
const saveRoundMobileBtn = document.getElementById("save-round-mobile");
const addParticipantMobileBtn = document.getElementById("add-participant-mobile");
const partyArea = document.getElementById("party-area");
const addParticipantBtn = document.getElementById("add-participant");
const participantsEl = document.getElementById("participants");
const partyHistoryEl = document.getElementById("party-history");
const reminderEnabled = document.getElementById("reminder-enabled");
const reminderTime = document.getElementById("reminder-time");
const requestNotifyBtn = document.getElementById("request-notify");
const lockEnabled = document.getElementById("lock-enabled");
const pinInput = document.getElementById("pin-input");
const setPinBtn = document.getElementById("set-pin");
const lockNowBtn = document.getElementById("lock-now");
const lockBtn = document.getElementById("lock-btn");
const lockScreen = document.getElementById("lock-screen");
const unlockPin = document.getElementById("unlock-pin");
const unlockBtn = document.getElementById("unlock-btn");
const lockMessage = document.getElementById("lock-message");
const partyToggle = document.getElementById("party-toggle");
const ugcType = document.getElementById("ugc-type");
const ugcText = document.getElementById("ugc-text");
const addUgcBtn = document.getElementById("add-ugc");
const shareUgcBtn = document.getElementById("share-ugc");
const ugcImport = document.getElementById("ugc-import");
const importUgcBtn = document.getElementById("import-ugc");
const exportTxtBtn = document.getElementById("export-txt");
const exportUgcBtn = document.getElementById("export-ugc");
const clearDataBtn = document.getElementById("clear-data");
const toast = document.getElementById("toast");

const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let debounceTimer = null;
let lastSharedUgc = null;
let partyParticipants = state.partyParticipants || [];

init();

function init() {
  if (state.settings.lockEnabled && state.settings.pinHash) {
    state.settings.isLocked = true;
    saveState();
  }
  bindNavigation();
  bindCalendarControls();
  bindDailyActions();
  bindDeepActions();
  bindSettings();
  bindLock();
  syncSettingsUI();
  setInitialDate();
  renderCalendar();
  renderRecent();
  renderParticipants();
  renderPartyHistory();
  checkReminder();
  setInterval(checkReminder, 60000);
}

function bindNavigation() {
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      navButtons.forEach((b) => b.classList.remove("is-active"));
      views.forEach((v) => v.classList.remove("is-active"));
      btn.classList.add("is-active");
      document.getElementById(`view-${view}`).classList.add("is-active");
    });
  });
}

function bindCalendarControls() {
  prevMonthBtn.addEventListener("click", () => {
    currentMonth -= 1;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear -= 1;
    }
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", () => {
    currentMonth += 1;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear += 1;
    }
    renderCalendar();
  });
}

function bindDailyActions() {
  drawCardBtn.addEventListener("click", () => {
    if (!state.selectedDate) {
      showToast("請先選擇日期");
      return;
    }
    revealDailyQuestion(state.selectedDate);
  });

  drawCardMobileBtn?.addEventListener("click", () => {
    if (!state.selectedDate) {
      showToast("請先選擇日期");
      return;
    }
    revealDailyQuestion(state.selectedDate);
  });

  tarotCard.addEventListener("click", () => {
    if (!state.selectedDate) {
      showToast("請先選擇日期");
      return;
    }
    revealDailyQuestion(state.selectedDate);
  });

  dailyAnswer.addEventListener("input", () => {
    if (!state.selectedDate) {
      return;
    }
    if (!state.dailyEntries[state.selectedDate]) {
      revealDailyQuestion(state.selectedDate);
    }
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      saveDailyAnswer();
    }, 400);
  });

  saveAnswerBtn.addEventListener("click", saveDailyAnswer);
  saveAnswerMobileBtn?.addEventListener("click", saveDailyAnswer);

  clearAnswerBtn.addEventListener("click", clearDailyAnswer);
  clearAnswerMobileBtn?.addEventListener("click", clearDailyAnswer);
}

function bindDeepActions() {
  deepCategories.addEventListener("click", (event) => {
    const card = event.target.closest(".topic-card");
    if (!card) return;
    const category = card.dataset.category;
    drawDeepQuestion(category);
  });

  nextQuestionBtn.addEventListener("click", () => {
    const category = state.deep.currentCategory || "icebreak";
    drawDeepQuestion(category);
  });

  nextQuestionMobileBtn?.addEventListener("click", () => {
    const category = state.deep.currentCategory || "icebreak";
    drawDeepQuestion(category);
  });

  addParticipantBtn.addEventListener("click", () => {
    const id = createId();
    partyParticipants.push({ id, name: `參與者 ${partyParticipants.length + 1}`, answer: "" });
    state.partyParticipants = partyParticipants;
    saveState();
    renderParticipants();
  });

  addParticipantMobileBtn?.addEventListener("click", () => {
    const id = createId();
    partyParticipants.push({ id, name: `參與者 ${partyParticipants.length + 1}`, answer: "" });
    state.partyParticipants = partyParticipants;
    saveState();
    renderParticipants();
  });

  saveRoundBtn.addEventListener("click", () => {
    if (!state.deep.currentQuestion) {
      showToast("請先抽一題");
      return;
    }
    const answers = partyParticipants.map((p) => ({ name: p.name, answer: p.answer }));
    const entry = {
      id: createId(),
      question: state.deep.currentQuestion,
      category: state.deep.currentCategory,
      createdAt: new Date().toISOString(),
      answers
    };
    state.partyHistory.unshift(entry);
    saveState();
    renderPartyHistory();
    showToast("已保存本輪");
  });

  saveRoundMobileBtn?.addEventListener("click", () => {
    if (!state.deep.currentQuestion) {
      showToast("請先抽一題");
      return;
    }
    const answers = partyParticipants.map((p) => ({ name: p.name, answer: p.answer }));
    const entry = {
      id: createId(),
      question: state.deep.currentQuestion,
      category: state.deep.currentCategory,
      createdAt: new Date().toISOString(),
      answers
    };
    state.partyHistory.unshift(entry);
    saveState();
    renderPartyHistory();
    showToast("已保存本輪");
  });
}

function bindSettings() {
  reminderEnabled.addEventListener("change", () => {
    state.settings.reminderEnabled = reminderEnabled.checked;
    saveState();
  });

  reminderTime.addEventListener("change", () => {
    state.settings.reminderTime = reminderTime.value;
    saveState();
  });

  requestNotifyBtn.addEventListener("click", async () => {
    if (!("Notification" in window)) {
      showToast("此瀏覽器不支援系統通知");
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      showToast("已啟用系統通知");
    } else {
      showToast("通知權限未開啟");
    }
  });

  lockEnabled.addEventListener("change", () => {
    state.settings.lockEnabled = lockEnabled.checked;
    if (!state.settings.lockEnabled) {
      state.settings.isLocked = false;
      lockScreen.classList.remove("active");
    }
    saveState();
  });

  setPinBtn.addEventListener("click", async () => {
    const pin = pinInput.value.trim();
    if (pin.length < 4 || pin.length > 8) {
      showToast("PIN 需為 4-8 位數");
      return;
    }
    state.settings.pinHash = await hashPin(pin);
    state.settings.lockEnabled = true;
    lockEnabled.checked = true;
    pinInput.value = "";
    saveState();
    showToast("已更新 PIN");
  });

  lockNowBtn.addEventListener("click", () => {
    if (!state.settings.lockEnabled || !state.settings.pinHash) {
      showToast("請先設定 PIN");
      return;
    }
    lockApp();
  });

  ugcType.addEventListener("change", () => {
    lastSharedUgc = null;
  });

  addUgcBtn.addEventListener("click", () => {
    const text = ugcText.value.trim();
    if (!text) {
      showToast("請輸入題目內容");
      return;
    }
    const item = {
      id: createId(),
      type: ugcType.value,
      text,
      createdAt: new Date().toISOString()
    };
    state.ugcQuestions.unshift(item);
    lastSharedUgc = item;
    ugcText.value = "";
    saveState();
    showToast("已加入題庫");
  });

  shareUgcBtn.addEventListener("click", async () => {
    const item = lastSharedUgc || {
      type: ugcType.value,
      text: ugcText.value.trim()
    };
    if (!item.text) {
      showToast("請先加入或輸入題目");
      return;
    }
    const payload = JSON.stringify({ type: item.type, text: item.text });
    await copyToClipboard(payload);
    showToast("已複製分享碼");
  });

  importUgcBtn.addEventListener("click", () => {
    const text = ugcImport.value.trim();
    if (!text) {
      showToast("請貼上分享碼");
      return;
    }
    try {
      const parsed = JSON.parse(text);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      let added = 0;
      items.forEach((item) => {
        if (!item || !item.text || !item.type) return;
        if (!DEFAULT_POOLS[item.type] && !["daily", "weekly", "monthly", "quarterly"].includes(item.type)) {
          return;
        }
        state.ugcQuestions.unshift({
          id: createId(),
          type: item.type,
          text: item.text,
          createdAt: new Date().toISOString()
        });
        added += 1;
      });
      ugcImport.value = "";
      saveState();
      showToast(`匯入 ${added} 題`);
    } catch (error) {
      showToast("分享碼格式錯誤");
    }
  });

  exportTxtBtn.addEventListener("click", () => {
    const text = buildExportText();
    downloadFile(text, `一日一問匯出_${formatDate(new Date())}.txt`);
  });

  exportUgcBtn.addEventListener("click", () => {
    const text = JSON.stringify(state.ugcQuestions, null, 2);
    downloadFile(text, `UGC題庫_${formatDate(new Date())}.json`);
  });

  clearDataBtn.addEventListener("click", () => {
    if (!confirm("確定要清除所有本機資料？")) return;
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  });
}

function bindLock() {
  lockBtn.addEventListener("click", () => {
    if (!state.settings.lockEnabled || !state.settings.pinHash) {
      showToast("請先設定 PIN");
      return;
    }
    lockApp();
  });

  unlockBtn.addEventListener("click", async () => {
    const pin = unlockPin.value.trim();
    const hash = await hashPin(pin);
    if (hash === state.settings.pinHash) {
      unlockApp();
    } else {
      lockMessage.textContent = "PIN 不正確";
    }
  });

  partyToggle.addEventListener("click", () => {
    state.settings.partyMode = !state.settings.partyMode;
    document.body.classList.toggle("party-mode", state.settings.partyMode);
    partyToggle.textContent = state.settings.partyMode ? "退出派對" : "派對模式";
    if (state.settings.partyMode) {
      navButtons.forEach((b) => b.classList.remove("is-active"));
      views.forEach((v) => v.classList.remove("is-active"));
      document.getElementById("view-deep").classList.add("is-active");
    }
    saveState();
  });
}

function syncSettingsUI() {
  reminderEnabled.checked = state.settings.reminderEnabled;
  reminderTime.value = state.settings.reminderTime;
  lockEnabled.checked = state.settings.lockEnabled;
  document.body.classList.toggle("party-mode", state.settings.partyMode);
  partyToggle.textContent = state.settings.partyMode ? "退出派對" : "派對模式";
  if (state.settings.lockEnabled && state.settings.isLocked) {
    lockScreen.classList.add("active");
  }
}

function setInitialDate() {
  const todayStr = formatDate(today);
  state.selectedDate = state.selectedDate || todayStr;
  currentYear = today.getFullYear();
  currentMonth = today.getMonth();
}

function renderCalendar() {
  monthLabel.textContent = `${currentYear} 年 ${String(currentMonth + 1).padStart(2, "0")} 月`;
  calendarEl.innerHTML = "";
  const dayNames = ["一", "二", "三", "四", "五", "六", "日"];
  dayNames.forEach((d) => {
    const label = document.createElement("div");
    label.className = "day-label";
    label.textContent = d;
    calendarEl.appendChild(label);
  });

  const firstDay = new Date(currentYear, currentMonth, 1);
  const startWeekday = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let i = 0; i < startWeekday; i += 1) {
    const empty = document.createElement("div");
    calendarEl.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(currentYear, currentMonth, day);
    const dateStr = formatDate(date);
    const isFuture = date > new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const cell = document.createElement("div");
    cell.className = "day";
    cell.textContent = day;

    if (isFuture) {
      cell.classList.add("locked");
    } else {
      cell.addEventListener("click", () => selectDate(dateStr));
    }

    if (dateStr === formatDate(today)) {
      cell.classList.add("today");
    }

    if (dateStr === state.selectedDate) {
      cell.classList.add("selected");
    }

    if (state.dailyEntries[dateStr] && state.dailyEntries[dateStr].answer) {
      const indicator = document.createElement("div");
      indicator.className = "indicator";
      cell.appendChild(indicator);
    }

    calendarEl.appendChild(cell);
  }

  selectDate(state.selectedDate);
}

function selectDate(dateStr) {
  if (!dateStr) return;
  state.selectedDate = dateStr;
  saveState();
  const selected = parseDate(dateStr);
  document.querySelectorAll(".calendar .day").forEach((dayEl) => {
    dayEl.classList.remove("selected");
    if (dayEl.textContent === String(selected.getDate())) {
      if (selected.getMonth() === currentMonth) {
        dayEl.classList.add("selected");
      }
    }
  });
  selectedDateLabel.textContent = `${dateStr} 的提問`;
  const entry = state.dailyEntries[dateStr];
  if (entry) {
    tarotCard.classList.add("revealed");
    dailyQuestionText.textContent = entry.question;
    questionMeta.textContent = entry.meta || "";
    dailyAnswer.value = entry.answer || "";
  } else {
    tarotCard.classList.remove("revealed");
    dailyQuestionText.textContent = "請抽牌揭示今日提問";
    questionMeta.textContent = "";
    dailyAnswer.value = "";
  }
}

function revealDailyQuestion(dateStr) {
  const entry = state.dailyEntries[dateStr];
  if (entry) {
    tarotCard.classList.add("revealed");
    dailyQuestionText.textContent = entry.question;
    questionMeta.textContent = entry.meta || "";
    dailyAnswer.value = entry.answer || "";
    return;
  }
  const date = parseDate(dateStr);
  const question = pickDailyQuestion(date);
  state.dailyEntries[dateStr] = {
    question: question.text,
    questionId: question.id,
    meta: question.meta,
    answer: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tarotCard.classList.add("revealed");
  dailyQuestionText.textContent = question.text;
  questionMeta.textContent = question.meta;
  dailyAnswer.value = "";
  saveState();
  renderCalendar();
}

function pickDailyQuestion(date) {
  const seed = hashString(formatDate(date));
  const rng = seededRandom(seed);
  const weights = buildWeights(date);
  const roll = rng();
  let cumulative = 0;
  let selectedType = "daily";
  for (const item of weights) {
    cumulative += item.weight;
    if (roll <= cumulative) {
      selectedType = item.type;
      break;
    }
  }
  const pool = getPool(selectedType);
  const index = Math.floor(rng() * pool.length);
  return {
    id: `${selectedType}-${index}`,
    text: pool[index] || DEFAULT_POOLS.daily[0],
    meta: buildMeta(date, selectedType)
  };
}

function buildWeights(date) {
  const isWeekEnd = date.getDay() === 0 || date.getDay() === 6;
  const isMonthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() === date.getDate();
  const isQuarterEnd = isMonthEnd && [2, 5, 8, 11].includes(date.getMonth());
  const base = [
    { type: "daily", weight: 0.7 },
    { type: "weekly", weight: isWeekEnd ? 0.18 : 0.05 },
    { type: "monthly", weight: isMonthEnd ? 0.08 : 0.02 },
    { type: "quarterly", weight: isQuarterEnd ? 0.04 : 0.01 }
  ];
  const total = base.reduce((sum, item) => sum + item.weight, 0);
  return base.map((item) => ({ ...item, weight: item.weight / total }));
}

function buildMeta(date, type) {
  if (type === "weekly") return "週末覆盤問題";
  if (type === "monthly") return "月末覆盤問題";
  if (type === "quarterly") return "季末覆盤問題";
  if (date.getDay() === 0 || date.getDay() === 6) return "今日是週末";
  return "日常提問";
}

function saveDailyAnswer() {
  if (!state.selectedDate) return;
  const entry = state.dailyEntries[state.selectedDate];
  if (!entry) return;
  entry.answer = dailyAnswer.value.trim();
  entry.updatedAt = new Date().toISOString();
  saveState();
  renderRecent();
  renderCalendar();
  showToast("已保存");
}

function clearDailyAnswer() {
  if (!state.selectedDate) {
    return;
  }
  if (!confirm("要清除此日期的回答嗎？")) {
    return;
  }
  const entry = state.dailyEntries[state.selectedDate];
  if (entry) {
    entry.answer = "";
    entry.updatedAt = new Date().toISOString();
  }
  dailyAnswer.value = "";
  saveState();
  renderRecent();
  renderCalendar();
}

function renderRecent() {
  const entries = Object.entries(state.dailyEntries)
    .filter(([, entry]) => entry.answer)
    .sort((a, b) => parseDate(b[0]) - parseDate(a[0]))
    .slice(0, 7);
  recentList.innerHTML = "";
  if (!entries.length) {
    recentList.innerHTML = "<div class=\"subtle\">尚未有回答記錄</div>";
    return;
  }
  entries.forEach(([dateStr, entry]) => {
    const card = document.createElement("div");
    card.className = "recent-card";
    card.innerHTML = `
      <strong>${dateStr}</strong>
      <div class="subtle">${entry.question}</div>
      <p>${entry.answer.slice(0, 60)}${entry.answer.length > 60 ? "..." : ""}</p>
    `;
    recentList.appendChild(card);
  });
}

function drawDeepQuestion(category) {
  const pool = getPool(category);
  if (!pool.length) {
    showToast("題庫尚未準備好");
    return;
  }
  const index = Math.floor(Math.random() * pool.length);
  const question = pool[index];
  state.deep.currentCategory = category;
  state.deep.currentQuestion = question;
  state.deep.currentQuestionType = category;
  deepQuestionEl.textContent = question;
  partyParticipants.forEach((p) => (p.answer = ""));
  state.partyParticipants = partyParticipants;
  renderParticipants();
  saveState();
}

function renderParticipants() {
  participantsEl.innerHTML = "";
  if (!partyParticipants.length) {
    partyParticipants = [{ id: createId(), name: "參與者 1", answer: "" }];
    state.partyParticipants = partyParticipants;
    saveState();
  }
  partyParticipants.forEach((p) => {
    const wrapper = document.createElement("div");
    wrapper.className = "participant";
    wrapper.innerHTML = `
      <label>名字</label>
      <input type="text" value="${p.name}" data-id="${p.id}" data-field="name" />
      <label>回答</label>
      <textarea rows="2" data-id="${p.id}" data-field="answer">${p.answer}</textarea>
    `;
    participantsEl.appendChild(wrapper);
  });

  participantsEl.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", (event) => {
      const id = event.target.dataset.id;
      const field = event.target.dataset.field;
      const participant = partyParticipants.find((p) => p.id === id);
      if (participant) {
        participant[field] = event.target.value;
        state.partyParticipants = partyParticipants;
        saveState();
      }
    });
  });
}

function renderPartyHistory() {
  partyHistoryEl.innerHTML = "";
  if (!state.partyHistory.length) {
    partyHistoryEl.innerHTML = "<div class=\"subtle\">尚未保存派對回答</div>";
    return;
  }
  state.partyHistory.slice(0, 10).forEach((entry) => {
    const item = document.createElement("div");
    item.className = "history-item";
    item.innerHTML = `
      <strong>${entry.question}</strong>
      <div class="subtle">${formatDateTime(entry.createdAt)} · ${labelCategory(entry.category)}</div>
      ${entry.answers
        .map((ans) => `<div><strong>${ans.name}：</strong>${ans.answer || "(未填)"}</div>`)
        .join("")}
    `;
    partyHistoryEl.appendChild(item);
  });
}

function checkReminder() {
  if (!state.settings.reminderEnabled) return;
  const now = new Date();
  const todayStr = formatDate(now);
  if (state.settings.lastReminderDate === todayStr) return;
  const [hours, minutes] = state.settings.reminderTime.split(":").map(Number);
  const reminderTimeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  if (now < reminderTimeToday) return;
  if (state.dailyEntries[todayStr] && state.dailyEntries[todayStr].answer) {
    state.settings.lastReminderDate = todayStr;
    saveState();
    return;
  }
  showToast("今天的一日一問尚未完成");
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("一日一問提醒", { body: "今天的提問還在等你回答" });
  }
  state.settings.lastReminderDate = todayStr;
  saveState();
}

function lockApp() {
  state.settings.isLocked = true;
  lockScreen.classList.add("active");
  lockMessage.textContent = "";
  unlockPin.value = "";
  saveState();
}

function unlockApp() {
  state.settings.isLocked = false;
  lockScreen.classList.remove("active");
  unlockPin.value = "";
  lockMessage.textContent = "";
  saveState();
}

function buildExportText() {
  const lines = [];
  lines.push("一日一問匯出");
  lines.push(`匯出日期：${formatDateTime(new Date().toISOString())}`);
  lines.push("");
  const entries = Object.entries(state.dailyEntries).sort((a, b) => parseDate(a[0]) - parseDate(b[0]));
  if (entries.length) {
    lines.push("【日記回答】");
    entries.forEach(([dateStr, entry]) => {
      lines.push(`${dateStr}`);
      lines.push(`提問：${entry.question}`);
      lines.push(`回答：${entry.answer || ""}`);
      lines.push("");
    });
  }
  if (state.partyHistory.length) {
    lines.push("【派對交流】");
    state.partyHistory.forEach((entry) => {
      lines.push(`${formatDateTime(entry.createdAt)} · ${labelCategory(entry.category)}`);
      lines.push(`問題：${entry.question}`);
      entry.answers.forEach((ans) => {
        lines.push(`${ans.name}：${ans.answer || ""}`);
      });
      lines.push("");
    });
  }
  return lines.join("\n");
}

function getPool(type) {
  const user = state.ugcQuestions.filter((q) => q.type === type).map((q) => q.text);
  const base = DEFAULT_POOLS[type] || [];
  return base.concat(user);
}

function labelCategory(category) {
  const labels = {
    icebreak: "破冰",
    star1: "一星",
    star2: "二星",
    star3: "三星",
    daily: "一日一問",
    weekly: "週末覆盤",
    monthly: "月末覆盤",
    quarterly: "季末覆盤"
  };
  return labels[category] || category;
}

function formatDate(date) {
  if (typeof date === "string") return date;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

function parseDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDateTime(iso) {
  const date = new Date(iso);
  return `${formatDate(date)} ${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}

function hashString(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

async function hashPin(pin) {
  if (window.crypto && window.crypto.subtle) {
    const data = new TextEncoder().encode(pin);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return btoa(pin);
}

function createId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const temp = document.createElement("textarea");
  temp.value = text;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  temp.remove();
}

function downloadFile(text, filename) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return JSON.parse(JSON.stringify(DEFAULT_STATE));
  try {
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      settings: { ...DEFAULT_STATE.settings, ...parsed.settings },
      deep: { ...DEFAULT_STATE.deep, ...parsed.deep }
    };
  } catch (error) {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      showToast("離線模式啟用失敗");
    });
  });
}
