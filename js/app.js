/* ===================================
   AI Interview Simulator - Complete Fixed Version
   =================================== */

class InterviewApp {
  constructor() {
    this.currentPage = 'home';
    this.selectedScenario = null;
    this.selectedMajor = null;
    this.config = {
      scenario: null,
      major: '',
      position: '',
      difficulty: 'medium',
      duration: 10,
      style: 'normal'
    };

    // Interview state
    this.conversation = [];
    this.currentQuestionIndex = 0;
    this.questions = [];
    this.isRecording = false;
    this.timer = null;
    this.timeRemaining = 0;
    this.isPaused = false;
    this.followUpStage = 0;
    this.answeredElements = [];
    this.currentFollowUpElement = null;

    // Report state
    this.report = null;

    // Training mode state
    this.isTrainingMode = false;
    this.trainingDimension = null;
    this.trainingQuestions = [];
    this.trainingQuestionIndex = 0;
    this.trainingTimer = null;
    this.trainingTimeRemaining = 300;
    this.trainingScorer = null;
    this.trainingConversation = [];

    // Modules
    this.speechModule = null;
    this.starAnalyzer = null;

    this.init();
  }

  init() {
    this.initTheme();
    this.renderScenarioCards();
    this.bindEvents();
    this.loadSavedConfig();
    this.initModules();
    this.loadMajorOptions();
    this.loadPositionOptions();
    this.updateNavigation();

    this.showPage('home');
  }

  // ===================================
  // Theme
  // ===================================

  initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.setTheme(savedTheme);
  }

  setTheme(theme) {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

    if (theme === 'light') {
      body.setAttribute('data-theme', 'light');
      themeIcon.textContent = '☀️';
      themeText.textContent = '浅色';
    } else {
      body.removeAttribute('data-theme');
      themeIcon.textContent = '🌙';
      themeText.textContent = '深色';
    }

    localStorage.setItem('theme', theme);

    if (this.radarChartMini) {
      this.radarChartMini.setTheme(theme);
    }
    if (this.radarChartLarge) {
      this.radarChartLarge.setTheme(theme);
    }
  }

  toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  initModules() {
    this.speechModule = new SpeechModule();
    this.starAnalyzer = new StarAnalyzer();
    this.scorer = new InterviewScorer();
    this.radarChartMini = null;
    this.radarChartLarge = null;
  }

  // ===================================
  // 专业管理
  // ===================================

  /**
   * 加载专业选项（预设+自定义）
   */
  loadMajorOptions() {
    const majorSelect = document.getElementById('majorInput');
    if (!majorSelect) return;

    // 获取所有专业（预设+自定义）
    const allMajors = window.MAJOR_UTILS.getAllMajors();

    // 清空现有选项（保留第一个默认选项）
    majorSelect.innerHTML = '<option value="">请选择专业</option>';

    // 添加预设专业
    window.MAJOR_UTILS.PRESET_MAJORS.forEach(major => {
      const option = document.createElement('option');
      option.value = major.value;
      option.textContent = major.label;
      option.dataset.type = 'preset'; // 标记为预设专业
      majorSelect.appendChild(option);
    });

    // 添加自定义专业
    const customMajors = window.MAJOR_UTILS.getCustomMajors();
    customMajors.forEach(major => {
      const option = document.createElement('option');
      option.value = major.value;
      option.textContent = major.label;
      option.dataset.type = 'custom'; // 标记为自定义专业
      majorSelect.appendChild(option);
    });

    // 渲染自定义专业列表
    this.renderCustomMajorsList();

    // 恢复之前选择的专业
    if (this.config.major) {
      majorSelect.value = this.config.major;
    }
  }

  /**
   * 渲染自定义专业列表
   */
  renderCustomMajorsList() {
    const container = document.getElementById('customMajorsList');
    if (!container) return;

    const customMajors = window.MAJOR_UTILS.getCustomMajors();

    if (customMajors.length === 0) {
      container.innerHTML = '<div class="custom-majors-empty">暂无自定义专业</div>';
      return;
    }

    container.innerHTML = customMajors.map(major => `
      <div class="custom-major-item">
        <span class="custom-major-name">${major.label}</span>
        <button class="delete-major-btn" data-major="${major.value}" title="删除">×</button>
      </div>
    `).join('');
  }

  /**
   * 添加自定义专业
   */
  addCustomMajor() {
    const input = document.getElementById('customMajorInput');
    if (!input) return;

    const majorName = input.value.trim();

    // 校验输入
    if (!majorName) {
      this.showInputError(input, '请输入专业名称');
      return;
    }

    // 调用工具函数添加专业
    const success = window.MAJOR_UTILS.addCustomMajor(majorName);

    if (!success) {
      this.showInputError(input, '专业已存在或包含特殊符号');
      return;
    }

    // 清空输入框
    input.value = '';
    this.clearInputError(input);

    // 重新加载专业选项
    this.loadMajorOptions();

    // 显示成功提示
    this.showToast('自定义专业添加成功', 'success');
  }

  /**
   * 删除自定义专业
   * @param {string} majorValue 专业值
   */
  removeCustomMajor(majorValue) {
    const success = window.MAJOR_UTILS.removeCustomMajor(majorValue);

    if (!success) {
      this.showToast('删除失败', 'error');
      return;
    }

    // 如果删除的是当前选择的专业，清空选择
    if (this.config.major === majorValue) {
      this.config.major = '';
      const majorSelect = document.getElementById('majorInput');
      if (majorSelect) {
        majorSelect.value = '';
      }
      this.saveConfig();
    }

    // 重新加载专业选项
    this.loadMajorOptions();

    // 显示成功提示
    this.showToast('自定义专业已删除', 'success');
  }

  /**
   * 显示输入框错误提示
   * @param {HTMLElement} input 输入框元素
   * @param {string} message 错误消息
   */
  showInputError(input, message) {
    input.classList.add('input-error');
    input.title = message;

    // 3秒后自动清除错误状态
    setTimeout(() => {
      this.clearInputError(input);
    }, 3000);
  }

  /**
   * 清除输入框错误提示
   * @param {HTMLElement} input 输入框元素
   */
  clearInputError(input) {
    input.classList.remove('input-error');
    input.title = '';
  }

  /**
   * 显示友好弹窗提示
   * @param {string} message 提示消息
   * @param {string} type 提示类型：success/error/info（默认info）
   */
  showToast(message, type = 'info') {
    // 创建弹窗覆盖层
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    // 根据类型选择图标
    const icons = {
      success: '✓',
      error: '✕',
      info: 'ℹ'
    };

    // 创建弹窗内容
    overlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-icon">${icons[type] || icons.info}</div>
        <div class="modal-title">${type === 'success' ? '操作成功' : type === 'error' ? '操作失败' : '提示'}</div>
        <div class="modal-message">${message}</div>
        <button class="modal-btn">确定</button>
      </div>
    `;

    // 添加到页面
    document.body.appendChild(overlay);

    // 触发动画
    setTimeout(() => {
      overlay.classList.add('show');
    }, 10);

    // 绑定关闭事件
    const btn = overlay.querySelector('.modal-btn');
    const closeModal = () => {
      overlay.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 300);
    };

    btn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });
  }

  // ===================================
  // 岗位管理
  // ===================================

  /**
   * 加载岗位选项（预设+自定义），支持专业联动
   * @param {string} majorValue 专业值（可选，用于推荐排序）
   */
  loadPositionOptions(majorValue = null) {
    const positionSelect = document.getElementById('positionInput');
    if (!positionSelect) return;

    // 获取岗位列表（如果有专业，则按推荐排序）
    const positions = majorValue
      ? window.POSITION_UTILS.getRecommendedPositions(majorValue)
      : window.POSITION_UTILS.getAllPositions();

    // 保存当前选中的岗位
    const currentPosition = positionSelect.value;

    // 清空现有选项（保留第一个默认选项）
    positionSelect.innerHTML = '<option value="">请选择岗位</option>';

    // 添加预设岗位
    window.POSITION_UTILS.PRESET_POSITIONS.forEach(position => {
      const option = document.createElement('option');
      option.value = position.value;
      option.textContent = position.label;
      option.dataset.type = 'preset'; // 标记为预设岗位
      // 如果该岗位匹配当前专业，添加推荐标识
      if (majorValue && position.majors && position.majors.includes(majorValue)) {
        option.textContent += ' ✓';
      }
      positionSelect.appendChild(option);
    });

    // 添加自定义岗位
    const customPositions = window.POSITION_UTILS.getCustomPositions();
    customPositions.forEach(position => {
      const option = document.createElement('option');
      option.value = position.value;
      option.textContent = position.label;
      option.dataset.type = 'custom'; // 标记为自定义岗位
      positionSelect.appendChild(option);
    });

    // 渲染自定义岗位列表
    this.renderCustomPositionsList();

    // 恢复之前选择的岗位
    if (currentPosition) {
      positionSelect.value = currentPosition;
    }
  }

  /**
   * 渲染自定义岗位列表
   */
  renderCustomPositionsList() {
    const container = document.getElementById('customPositionsList');
    if (!container) return;

    const customPositions = window.POSITION_UTILS.getCustomPositions();

    if (customPositions.length === 0) {
      container.innerHTML = '<div class="custom-positions-empty">暂无自定义岗位</div>';
      return;
    }

    container.innerHTML = customPositions.map(position => `
      <div class="custom-position-item">
        <span class="custom-position-name">${position.label}</span>
        <button class="delete-position-btn" data-position="${position.value}" title="删除">×</button>
      </div>
    `).join('');
  }

  /**
   * 添加自定义岗位
   */
  addCustomPosition() {
    const input = document.getElementById('customPositionInput');
    if (!input) return;

    const positionName = input.value.trim();

    // 校验输入
    if (!positionName) {
      this.showInputError(input, '请输入岗位名称');
      return;
    }

    // 调用工具函数添加岗位
    const success = window.POSITION_UTILS.addCustomPosition(positionName);

    if (!success) {
      this.showInputError(input, '岗位已存在或包含特殊符号');
      return;
    }

    // 清空输入框
    input.value = '';
    this.clearInputError(input);

    // 重新加载岗位选项（保持专业联动）
    this.loadPositionOptions(this.config.major);

    // 显示成功提示
    this.showToast('自定义岗位添加成功', 'success');
  }

  /**
   * 删除自定义岗位
   * @param {string} positionValue 岗位值
   */
  removeCustomPosition(positionValue) {
    const success = window.POSITION_UTILS.removeCustomPosition(positionValue);

    if (!success) {
      this.showToast('删除失败', 'error');
      return;
    }

    // 如果删除的是当前选择的岗位，清空选择
    if (this.config.position === positionValue) {
      this.config.position = '';
      const positionSelect = document.getElementById('positionInput');
      if (positionSelect) {
        positionSelect.value = '';
      }
      this.saveConfig();
    }

    // 重新加载岗位选项（保持专业联动）
    this.loadPositionOptions(this.config.major);

    // 显示成功提示
    this.showToast('自定义岗位已删除', 'success');
  }

  // ===================================
  // Navigation
  // ===================================

  showPage(pageName) {
    document.getElementById('pageHome').style.display = 'none';
    document.getElementById('pageInterview').style.display = 'none';
    document.getElementById('pageReport').style.display = 'none';

    const pageId = 'page' + pageName.charAt(0).toUpperCase() + pageName.slice(1);
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.style.display = 'block';
    }

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    const activeLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
    if (activeLink) activeLink.classList.add('active');

    this.currentPage = pageName;
    this.updateNavigation();
    window.scrollTo(0, 0);
  }

  updateNavigation() {
    const navInterview = document.getElementById('navInterview');
    const navReport = document.getElementById('navReport');

    if (this.currentPage === 'interview') {
      navInterview.style.display = '';
      navReport.style.display = 'none';
    } else if (this.currentPage === 'report') {
      navInterview.style.display = 'none';
      navReport.style.display = '';
    } else {
      navInterview.style.display = 'none';
      navReport.style.display = 'none';
    }
  }

  // ===================================
  // Home Page
  // ===================================

  renderScenarioCards() {
    const grid = document.getElementById('scenarioGrid');
    if (!grid) return;

    const scenarios = window.INTERVIEW_CONFIG.CONFIG_OPTIONS.scenarios;
    grid.innerHTML = scenarios.map(s => `
      <div class="scenario-card" data-scenario="${s.id}" title="${s.focus || s.description}">
        <div class="scenario-icon">${s.icon}</div>
        <div class="scenario-name">${s.name}</div>
        <div class="scenario-desc">${s.description}</div>
        ${s.focus ? `<div class="scenario-focus">📌 ${s.focus}</div>` : ''}
      </div>
    `).join('');
  }

  selectScenario(scenarioId) {
    document.querySelectorAll('.scenario-card').forEach(card => {
      card.classList.remove('selected');
    });

    const card = document.querySelector(`[data-scenario="${scenarioId}"]`);
    if (card) {
      card.classList.add('selected');
      this.selectedScenario = scenarioId;
      this.config.scenario = scenarioId;
      this.updateStartButton();
      this.saveConfig();
    }
  }

  updateStartButton() {
    const btn = document.getElementById('startBtn');
    if (btn) {
      btn.disabled = !this.selectedScenario;
    }
  }

  updateDifficulty(value) {
    const labels = document.querySelectorAll('.difficulty-label');
    labels.forEach((label, index) => {
      label.classList.toggle('active', index === parseInt(value));
    });

    const difficulties = ['easy', 'medium', 'hard'];
    this.config.difficulty = difficulties[value];

    const names = ['简单', '中等', '困难'];
    const valueEl = document.getElementById('difficultyValue');
    if (valueEl) valueEl.textContent = names[value];

    this.saveConfig();
  }

  startInterview() {
    if (!this.selectedScenario) {
      this.showToast('请先选择一个面试场景', 'error');
      return;
    }

    sessionStorage.setItem('interviewConfig', JSON.stringify(this.config));
    sessionStorage.setItem('currentScenario', this.selectedScenario);

    this.showCountdown();
  }

  showCountdown() {
    const overlay = document.getElementById('countdownOverlay');
    const numberEl = document.getElementById('countdownNumber');

    if (!overlay || !numberEl) return;

    overlay.style.display = 'flex';
    let count = 3;

    const interval = setInterval(() => {
      numberEl.textContent = count;
      count--;

      if (count < 0) {
        clearInterval(interval);
        numberEl.textContent = 'GO!';

        setTimeout(() => {
          overlay.style.display = 'none';
          numberEl.textContent = '3';

          this.showPage('interview');
          this.initInterview();
        }, 800);
      }
    }, 1000);
  }

  initInterview() {
    this.loadInterviewConfig();
    this.setupInterviewUI();
    this.startInterviewFlow();
  }

  loadInterviewConfig() {
    const saved = sessionStorage.getItem('interviewConfig');
    if (saved) {
      this.config = JSON.parse(saved);
      this.selectedScenario = this.config.scenario;
      this.selectedMajor = this.config.major || null;
    } else {
      this.config = { scenario: 'campus', difficulty: 'medium', duration: 10, style: 'normal', major: '' };
      this.selectedScenario = 'campus';
      this.selectedMajor = null;
    }

    // Set language
    if (this.speechModule) {
      const lang = this.selectedScenario === 'english' ? 'en-US' : 'zh-CN';
      this.speechModule.setLanguage(lang);
    }
  }

  setupInterviewUI() {
    const scenarioTag = document.getElementById('scenarioTag');
    if (scenarioTag) {
      const config = window.INTERVIEW_CONFIG.QUESTION_BANKS[this.selectedScenario];
      scenarioTag.textContent = config.icon + ' ' + config.name;
    }

    this.conversation = [];
    this.currentQuestionIndex = 0;
    this.followUpStage = 0;
    this.answeredElements = [];
    this.currentFollowUpElement = null;

    const conv = document.getElementById('conversation');
    if (conv) conv.innerHTML = '';

    // 加载保存的计时器状态
    const savedTimer = this.loadTimerState();
    if (savedTimer) {
      this.timeRemaining = savedTimer.timeRemaining;
      this.isPaused = savedTimer.isPaused;
    } else {
      this.timeRemaining = this.config.duration * 60;
      this.isPaused = false;
    }

    this.updateTimerDisplay();
    this.updateProgress();

    // 显示全局倒计时面板
    this.showGlobalTimer();

    // 显示计时控制按钮
    const timerControls = document.getElementById('timerControls');
    if (timerControls) {
      timerControls.style.display = 'flex';
    }
  }

  startInterviewFlow() {
    // 设置评分器的专业和场景上下文
    this.scorer.setContext(this.selectedMajor, this.selectedScenario);

    this.loadQuestions();
    this.startTimer();
    this.askNextQuestion();
  }

  loadQuestions() {
    // 使用三维标签题库系统，根据专业、场景、难度筛选题目
    const difficulty = this.config.difficulty;
    const major = this.selectedMajor || 'all';
    const scenario = this.selectedScenario;

    console.log(`开始加载题目：专业=${major}, 场景=${scenario}, 难度=${difficulty}`);

    // 使用filterQuestions函数筛选题目（优先匹配专业+场景）
    let questions = [];

    try {
      questions = window.INTERVIEW_CONFIG.filterQuestions(
        major,
        scenario,
        difficulty,
        Math.min(Math.ceil(this.config.duration / 1.5), 7)
      );
      console.log(`filterQuestions返回 ${questions.length} 道题目`);
    } catch (error) {
      console.error('filterQuestions执行出错:', error);
      questions = [];
    }

    // 如果筛选结果为空，使用场景专属题库兜底
    if (questions.length === 0) {
      console.warn('filterQuestions返回空，尝试场景专属题库兜底');
      try {
        const questionBank = window.INTERVIEW_CONFIG.QUESTION_BANKS[scenario];
        if (questionBank && questionBank.questions && questionBank.questions[difficulty]) {
          questions = [...questionBank.questions[difficulty]];
          console.log(`场景题库兜底获取 ${questions.length} 道题目`);
        }
      } catch (error) {
        console.error('场景题库兜底出错:', error);
      }
    }

    // 终极兜底：直接从TAGGED_QUESTION_BANK获取通用题目
    if (questions.length === 0) {
      console.warn('场景题库也空，使用通用题目终极兜底');
      try {
        const allQuestions = window.INTERVIEW_CONFIG.TAGGED_QUESTION_BANK || [];
        // 获取所有majorTags包含'all'的题目
        const generalQuestions = allQuestions.filter(q =>
          q.majorTags && q.majorTags.includes('all')
        );
        // 如果指定了难度，按难度筛选
        if (difficulty) {
          const difficultyQuestions = generalQuestions.filter(q => q.difficulty === difficulty);
          if (difficultyQuestions.length > 0) {
            questions = difficultyQuestions;
          } else {
            // 如果该难度没有题目，使用所有通用题目
            questions = generalQuestions;
          }
        } else {
          questions = generalQuestions;
        }
        console.log(`终极兜底获取 ${questions.length} 道通用题目`);
      } catch (error) {
        console.error('终极兜底出错:', error);
      }
    }

    // 如果还是空，使用硬编码的紧急题目
    if (questions.length === 0) {
      console.warn('所有兜底都失败，使用硬编码紧急题目');
      questions = [
        {
          id: 'emergency_001',
          text: '请简单介绍一下你自己，包括你的教育背景和专业方向。',
          difficulty: 'easy',
          followUp: []
        },
        {
          id: 'emergency_002',
          text: '你为什么选择这个专业？你对这个领域有什么理解？',
          difficulty: 'easy',
          followUp: []
        },
        {
          id: 'emergency_003',
          text: '请描述一次你在团队合作中遇到冲突的经历，你是如何处理的？',
          difficulty: 'medium',
          followUp: []
        }
      ];
    }

    // 打乱题目顺序
    questions = this.shuffleArray(questions);

    // 限制题目数量：约1.5分钟1道题，最多7道题
    const maxQuestions = Math.min(questions.length, Math.min(Math.ceil(this.config.duration / 1.5), 7));
    this.questions = questions.slice(0, maxQuestions);
    this.currentQuestionIndex = 0;
    this.followUpStage = 0;
    this.answeredElements = [];

    console.log(`最终加载 ${this.questions.length} 道题目`);

    if (this.questions.length === 0) {
      console.error('严重错误：所有题目加载方式都失败了！');
      this.showToast('题目加载失败，请刷新页面重试', 'error');
    }
  }

  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  startTimer() {
    if (this.timer) clearInterval(this.timer);

    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.timeRemaining--;
        this.updateTimerDisplay();
        this.saveTimerState();

        if (this.timeRemaining <= 0) {
          this.endInterview();
        }
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const mins = Math.floor(this.timeRemaining / 60);
    const secs = this.timeRemaining % 60;
    const timeStr = mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');

    // 更新面试页面计时器
    const timerEl = document.getElementById('timer');
    if (timerEl) {
      timerEl.textContent = timeStr;
      timerEl.classList.remove('warning', 'danger');
      if (this.timeRemaining <= 60) {
        timerEl.classList.add('danger');
      } else if (this.timeRemaining <= 180) {
        timerEl.classList.add('warning');
      }
    }

    // 更新全局倒计时面板
    const globalTimerEl = document.getElementById('timerValue');
    if (globalTimerEl) {
      globalTimerEl.textContent = timeStr;
      globalTimerEl.classList.remove('timer-danger', 'timer-warning');
      if (this.timeRemaining <= 60) {
        globalTimerEl.classList.add('timer-danger');
      } else if (this.timeRemaining <= 180) {
        globalTimerEl.classList.add('timer-warning');
      }
    }

    // 更新状态文本
    const statusEl = document.getElementById('timerStatus');
    if (statusEl) {
      statusEl.textContent = this.isPaused ? '已暂停' : '运行中';
      statusEl.className = 'timer-status ' + (this.isPaused ? 'timer-paused' : '');
    }
  }

  /**
   * 保存计时器状态到localStorage
   */
  saveTimerState() {
    const state = {
      timeRemaining: this.timeRemaining,
      isPaused: this.isPaused,
      startTime: Date.now() - ((this.config.duration * 60) - this.timeRemaining) * 1000
    };
    localStorage.setItem('interviewTimer', JSON.stringify(state));
  }

  /**
   * 从localStorage加载计时器状态
   */
  loadTimerState() {
    const saved = localStorage.getItem('interviewTimer');
    if (!saved) return null;

    try {
      const state = JSON.parse(saved);
      return state;
    } catch (e) {
      console.error('加载计时器状态失败:', e);
      return null;
    }
  }

  /**
   * 清除计时器状态
   */
  clearTimerState() {
    localStorage.removeItem('interviewTimer');
  }

  /**
   * 暂停计时
   */
  pauseTimer() {
    this.isPaused = true;
    this.updateTimerDisplay();
    const pauseBtn = document.getElementById('pauseTimerBtn');
    if (pauseBtn) {
      pauseBtn.textContent = '▶️ 继续';
    }
  }

  /**
   * 继续计时
   */
  resumeTimer() {
    this.isPaused = false;
    this.updateTimerDisplay();
    const pauseBtn = document.getElementById('pauseTimerBtn');
    if (pauseBtn) {
      pauseBtn.textContent = '⏸️ 暂停';
    }
  }

  /**
   * 切换暂停/继续
   */
  togglePauseTimer() {
    if (this.isPaused) {
      this.resumeTimer();
    } else {
      this.pauseTimer();
    }
  }

  /**
   * 重置计时器
   */
  resetTimer() {
    clearInterval(this.timer);
    this.timer = null;
    this.timeRemaining = this.config.duration * 60;
    this.isPaused = false;
    this.clearTimerState();
    this.updateTimerDisplay();
    const pauseBtn = document.getElementById('pauseTimerBtn');
    if (pauseBtn) {
      pauseBtn.textContent = '⏸️ 暂停';
    }
  }

  /**
   * 确认自定义时长
   */
  confirmCustomDuration() {
    const input = document.getElementById('customDurationInput');
    if (!input) return;

    const value = parseInt(input.value);

    // 边界校验
    if (isNaN(value)) {
      this.showToast('请输入有效的数字', 'error');
      return;
    }

    if (value < 5) {
      this.showToast('面试时长不能小于5分钟', 'error');
      return;
    }

    if (value > 60) {
      this.showToast('面试时长不能超过60分钟', 'error');
      return;
    }

    // 设置时长并保存
    this.config.duration = value;
    this.saveConfig();

    // 隐藏输入框
    document.getElementById('customDurationWrapper').style.display = 'none';

    // 显示成功提示
    this.showToast(`面试时长已设置为 ${value} 分钟`, 'success');
  }

  /**
   * 显示全局倒计时面板
   */
  showGlobalTimer() {
    const timerEl = document.getElementById('globalTimer');
    if (timerEl) {
      timerEl.style.display = 'flex';
    }
  }

  /**
   * 隐藏全局倒计时面板
   */
  hideGlobalTimer() {
    const timerEl = document.getElementById('globalTimer');
    if (timerEl) {
      timerEl.style.display = 'none';
    }
  }

  askNextQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      this.endInterview();
      return;
    }

    const question = this.questions[this.currentQuestionIndex];
    this.followUpStage = 0;
    this.answeredElements = [];
    this.currentFollowUpElement = null;

    this.displayMessage('question', question.text);
    this.updateProgress();
  }

  askFollowUp(element) {
    const question = this.questions[this.currentQuestionIndex];
    const followUp = question.followUp.find(f => f.element === element);

    if (!followUp) {
      // No more follow-ups for this element, check if there are more follow-ups
      const remainingFollowUps = question.followUp.filter(f => !this.answeredElements.includes(f.element));
      if (remainingFollowUps.length > 0) {
        // Ask next follow-up
        const nextElement = remainingFollowUps[0].element;
        setTimeout(() => this.askFollowUp(nextElement), 1000);
      } else {
        // All follow-ups answered, move to next question
        this.currentQuestionIndex++;
        setTimeout(() => this.askNextQuestion(), 1500);
      }
      return;
    }

    this.followUpStage++;
    this.currentFollowUpElement = element;
    this.answeredElements.push(element);

    this.displayMessage('question', followUp.text, element);
    this.updateProgress();
  }

  displayMessage(type, content, starElement, evaluation) {
    const conv = document.getElementById('conversation');
    if (!conv) return;

    const isAI = type === 'question';
    const time = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

    const div = document.createElement('div');
    div.className = 'message ' + (isAI ? 'ai-message' : 'user-message');

    const starHtml = starElement ? `<div class="star-indicator">${starElement}追问</div>` : '';

    let evaluationHtml = '';
    if (!isAI && evaluation) {
      const dims = evaluation.dimensions;
      const getLevelClass = (level) => {
        if (level === 'excellent') return 'score-excellent';
        if (level === 'good') return 'score-good';
        if (level === 'average') return 'score-average';
        if (level === 'poor') return 'score-poor';
        return 'score-very-poor';
      };
      evaluationHtml = `
        <div class="evaluation-badges">
          <div class="eval-badge ${getLevelClass(dims.professional.level)}" title="${dims.professional.reason}">💼 ${dims.professional.score}</div>
          <div class="eval-badge ${getLevelClass(dims.logic.level)}" title="${dims.logic.reason}">🧠 ${dims.logic.score}</div>
          <div class="eval-badge ${getLevelClass(dims.adaptability.level)}" title="${dims.adaptability.reason}">⚡ ${dims.adaptability.score}</div>
          <div class="eval-badge ${getLevelClass(dims.etiquette.level)}" title="${dims.etiquette.reason}">🎯 ${dims.etiquette.score}</div>
          <div class="eval-total">${evaluation.totalScore}分</div>
        </div>
      `;
    }

    div.innerHTML = `
      <div class="message-avatar">${isAI ? '🤖' : '👤'}</div>
      <div class="message-content">
        <div class="message-text">${this.escapeHtml(content)}</div>
        ${starHtml}
        ${evaluationHtml}
        <div class="message-time">${time}</div>
      </div>
    `;

    conv.appendChild(div);
    conv.scrollTop = conv.scrollHeight;

    this.conversation.push({ type, content, timestamp: Date.now() });
  }

  processAnswer(answer) {
    if (!answer.trim()) return;

    const question = this.questions[this.currentQuestionIndex];
    const isFollowUp = this.followUpStage > 0;
    const followUpCount = this.followUpStage;

    // 评估回答（只有主问题回答才计入评分，追问回答不单独计分）
    let evaluation = null;
    if (!isFollowUp) {
      evaluation = this.scorer.evaluateAnswer(
        { content: answer, starElement: null },
        question,
        isFollowUp,
        followUpCount
      );
      // 更新实时评分面板
      this.updateScorePanel();
    }

    this.displayMessage('answer', answer, null, evaluation);

    // Check if this question has follow-ups
    if (question.followUp && question.followUp.length > 0) {
      // Analyze the answer
      const analysis = this.starAnalyzer.analyze(answer);
      const starElements = ['S', 'T', 'A', 'R'];

      if (this.followUpStage === 0) {
        // First answer to main question
        // Find which STAR elements are missing
        const missingElements = starElements.filter(el => !this.answeredElements.includes(el));
        const detectedElements = starElements.filter(el => analysis[el] && analysis[el].detected);

        // If we detected some elements and they're not all answered yet
        const nextElement = missingElements.length > 0 ? missingElements[0] : null;

        if (nextElement) {
          // Ask follow-up for next missing element
          this.followUpStage++;
          setTimeout(() => this.askFollowUp(nextElement), 1000);
        } else {
          // All elements covered, move to next question
          this.currentQuestionIndex++;
          this.followUpStage = 0;
          this.answeredElements = [];
          setTimeout(() => this.askNextQuestion(), 1500);
        }
      } else {
        // Follow-up answer
        const remainingFollowUps = question.followUp.filter(f => !this.answeredElements.includes(f.element));

        if (remainingFollowUps.length > 0) {
          // Ask next follow-up
          this.followUpStage++;
          setTimeout(() => this.askFollowUp(remainingFollowUps[0].element), 1000);
        } else {
          // All follow-ups answered, move to next question
          this.currentQuestionIndex++;
          this.followUpStage = 0;
          this.answeredElements = [];
          setTimeout(() => this.askNextQuestion(), 1500);
        }
      }
    } else {
      // No follow-ups for this question, move to next
      this.currentQuestionIndex++;
      this.followUpStage = 0;
      this.answeredElements = [];
      setTimeout(() => this.askNextQuestion(), 1500);
    }
  }

  // 更新实时评分面板
  updateScorePanel() {
    const currentScore = this.scorer.calculateCurrentScore();

    // 更新总分
    const scoreTotal = document.getElementById('scoreTotal');
    if (scoreTotal) {
      scoreTotal.textContent = currentScore.overall;
    }

    // 更新评级标签
    const gradeBadge = document.getElementById('gradeBadge');
    if (gradeBadge) {
      const grade = this.scorer.getGrade(currentScore.overall);
      gradeBadge.textContent = grade.label;
      gradeBadge.className = 'grade-badge ' + grade.class;
      gradeBadge.style.backgroundColor = grade.color;
    }

    // 获取五维数据用于雷达图
    const dimensions = ['professional', 'logic', 'adaptability', 'professionalism', 'etiquette'];
    const radarData = dimensions.map(dim => {
      const dimData = currentScore.dimensions[dim];
      return dimData ? dimData.current : 0;
    });

    // 更新迷你雷达图
    if (!this.radarChartMini && document.getElementById('radarChartMini')) {
      const theme = document.body.getAttribute('data-theme') || 'dark';
      this.radarChartMini = new RadarChart('radarChartMini', { theme });
    }
    if (this.radarChartMini) {
      this.radarChartMini.setData(radarData);
    }

    // 更新各维度分数显示
    dimensions.forEach(dim => {
      const dimData = currentScore.dimensions[dim];
      const scoreEl = document.getElementById('score' + dim.charAt(0).toUpperCase() + dim.slice(1));
      if (scoreEl && dimData) {
        scoreEl.textContent = dimData.current;
      }
    });

    // 更新最近评分列表
    this.updateRecentScores();
  }

  // 更新最近评分列表
  updateRecentScores() {
    const recentList = document.querySelector('.score-recent-list');
    if (!recentList) return;

    const evaluations = this.scorer.evaluationHistory.slice(-3).reverse();
    recentList.innerHTML = evaluations.map(ev => `
      <div class="recent-score-item">
        <div class="recent-score-q">${ev.questionText.substring(0, 20)}...</div>
        <div class="recent-score-dims">
          <span class="dim-badge" title="专业匹配度">💼 ${ev.dimensions.professional.score}</span>
          <span class="dim-badge" title="逻辑表达">🧠 ${ev.dimensions.logic.score}</span>
          <span class="dim-badge" title="临场应变">⚡ ${ev.dimensions.adaptability.score}</span>
          <span class="dim-badge" title="职业素养">🎯 ${ev.dimensions.professionalism.score}</span>
          <span class="dim-badge" title="语言礼仪">💬 ${ev.dimensions.etiquette.score}</span>
        </div>
        <div class="recent-score-total">小计: ${ev.totalScore}分</div>
      </div>
    `).join('');
  }

  updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressLabel = document.getElementById('progressLabel');
    const questionCount = document.getElementById('questionCount');
    const answerCount = document.getElementById('answerCount');

    const totalQuestions = this.questions.length;
    const answered = this.currentQuestionIndex;
    const progress = totalQuestions > 0 ? Math.min(100, (answered / totalQuestions) * 100) : 0;

    if (progressFill) progressFill.style.width = progress + '%';
    if (progressLabel) progressLabel.textContent = '已回答 ' + answered + ' / ' + totalQuestions + ' 题';
    if (questionCount) questionCount.textContent = totalQuestions;
    if (answerCount) answerCount.textContent = answered;
  }

  confirmExit() {
    if (this.conversation.length < 2) {
      this.showPage('home');
      return;
    }
    document.getElementById('endModal').classList.add('active');
  }

  endInterview() {
    clearInterval(this.timer);
    this.timer = null;
    this.clearTimerState();
    this.hideGlobalTimer();
    this.saveResults();
    this.showPage('report');
    this.renderReport();
  }

  hideEndModal() {
    document.getElementById('endModal').classList.remove('active');
  }

  saveResults() {
    const scorer = this.scorer || new InterviewScorer();
    this.report = scorer.generateReport(this.conversation, this.selectedScenario, this.config);

    this.generateAIReportComment();

    sessionStorage.setItem('interviewReport', JSON.stringify(this.report));

    this.saveRecordToServer();
  }

  async saveRecordToServer() {
    try {
      let userId = localStorage.getItem('userId');
      const userStr = localStorage.getItem('user');

      if (!userId && userStr) {
        try {
          const user = JSON.parse(userStr);
          userId = user.id || userId;
        } catch (e) { }
      }

      if (!this.report) {
        console.warn('没有报告数据，跳过保存');
        return;
      }

      const uid = parseInt(userId || '0');
      if (!uid || uid === 0) {
        console.warn('用户ID无效，跳过保存:', userId);
        return;
      }

      console.log('正在保存面试记录，uid:', uid);
      let users;
      try {
        users = JSON.parse(localStorage.getItem('users') || '[]');
      } catch (e) { users = []; }
      const idx = users.findIndex(u => u.id === uid);
      if (idx < 0) {
        console.warn('未找到用户，跳过保存');
        return;
      }
      if (!users[idx].records) users[idx].records = [];
      users[idx].records.push({
        id: Date.now(),
        time: new Date().toLocaleString('zh-CN', { hour12: false }),
        content: JSON.stringify(this.report),
        major: (this.report && this.report.config && this.report.config.majorName) || '',
        position: (this.report && this.report.config && this.report.config.positionName) || ''
      });
      localStorage.setItem('users', JSON.stringify(users));
      console.log('面试记录本地保存成功，当前用户记录数:', users[idx].records.length);
    } catch (error) {
      console.error('保存面试记录失败:', error);
    }
  }

  async generateAIReportComment() {
    if (!this.report || !this.report.fullConversation || this.report.fullConversation.length === 0) {
      return;
    }

    const scorer = this.scorer || new InterviewScorer();
    const prompt = scorer.prepareReportPrompt(this.report);

    this.report.generatedPrompt = prompt;

    if (window.ClaudeAPI && typeof window.ClaudeAPI.sendMessage === 'function') {
      try {
        const response = await window.ClaudeAPI.sendMessage(prompt);
        this.report.comment = response.content || this.generateLocalComment();
      } catch (error) {
        console.warn('AI API调用失败，使用本地评语生成:', error);
        this.report.comment = this.generateLocalComment();
      }
    } else {
      this.report.comment = this.generateLocalComment();
    }
  }

  generateLocalComment() {
    const report = this.report;
    const grade = report.grade;
    const strengths = report.strengths || [];
    const weaknesses = report.weaknesses || [];
    const suggestions = report.suggestions || [];

    let comment = `## 一、整体评级总评

你本次面试的综合得分为${report.overallScore}分，评级为${grade.label}。${grade.desc}

`;

    if (strengths.length > 0) {
      comment += `### 优势分析
`;
      strengths.forEach(s => {
        comment += `- ${s.icon} **${s.title}**：${s.desc}
`;
      });
      comment += `
`;
    }

    comment += `## 二、逐题复盘分析

`;
    report.evaluations.forEach((ev, idx) => {
      const qText = ev.questionText.substring(0, 50) + (ev.questionText.length > 50 ? '...' : '');
      comment += `### Q${idx + 1}: ${qText}
`;

      Object.entries(ev.dimensions).forEach(([key, dim]) => {
        const dimName = this.scorer.dimensions[key]?.name || key;
        const ratio = dim.score / (key === 'professional' ? 25 : key === 'professionalism' ? 15 : 20);
        if (ratio >= 0.7) {
          comment += `✅ ${dimName}(${dim.score}分)：${dim.reason}
`;
        } else if (ratio < 0.55) {
          comment += `❌ ${dimName}(${dim.score}分)：${dim.reason}
`;
        } else {
          comment += `➡️ ${dimName}(${dim.score}分)：${dim.reason}
`;
        }
      });
      comment += `本题得分：${ev.totalScore}分

`;
    });

    if (weaknesses.length > 0) {
      comment += `## 三、低分维度改进方案

`;
      weaknesses.forEach(w => {
        comment += `### ${w.icon} ${w.title}
${w.desc}
`;
      });
    }

    if (suggestions.length > 0) {
      comment += `### 针对性建议
`;
      suggestions.forEach((s, idx) => {
        comment += `${idx + 1}. **${s.title}**：${s.content}
   示例：${s.example}
`;
      });
    }

    return comment;
  }

  // ===================================
  // Report Page
  // ===================================

  renderReport() {
    this.loadReportData();
    this.renderOverview();
    this.renderScoreTable();
    this.renderRadarChart();
    this.renderDimensions();
    this.renderConversationHistory();
    this.renderAnalysis();
    this.renderSuggestions();
    this.renderPractice();
    this.renderReportComment();
  }

  renderScoreTable() {
    const tbody = document.getElementById('scoreTableBody');
    if (!tbody || !this.report.evaluations || this.report.evaluations.length === 0) {
      const section = document.getElementById('scoreTableSection');
      if (section) section.style.display = 'none';
      return;
    }

    const section = document.getElementById('scoreTableSection');
    if (section) section.style.display = 'block';

    const dimensions = Object.entries(window.INTERVIEW_CONFIG.SCORING_DIMENSIONS).map(([id, dim]) => ({
      id,
      ...dim,
      maxScore: dim.max
    }));

    tbody.innerHTML = this.report.evaluations.map((ev, idx) => {
      const dims = ev.dimensions;
      const totalScore = ev.totalScore;

      const isRowLow = (dimKey) => {
        const dim = dimensions.find(d => d.id === dimKey);
        const max = dim?.maxScore || 100;
        const score = dims[dimKey]?.score || 0;
        return (score / max) < 0.55;
      };

      return `
        <tr class="${isRowLow('professional') || isRowLow('logic') || isRowLow('adaptability') || isRowLow('professionalism') || isRowLow('etiquette') ? 'row-low' : ''}">
          <td class="q-col">Q${idx + 1}</td>
          <td class="score-col ${isRowLow('professional') ? 'score-low' : ''}">
            <div class="dim-col">💼 ${dims.professional?.score || 0}/${dimensions[0]?.maxScore || 25}</div>
            <div class="reason-col">${dims.professional?.reason || ''}</div>
          </td>
          <td class="score-col ${isRowLow('logic') ? 'score-low' : ''}">
            <div class="dim-col">🧠 ${dims.logic?.score || 0}/${dimensions[1]?.maxScore || 20}</div>
            <div class="reason-col">${dims.logic?.reason || ''}</div>
          </td>
          <td class="score-col ${isRowLow('adaptability') ? 'score-low' : ''}">
            <div class="dim-col">⚡ ${dims.adaptability?.score || 0}/${dimensions[2]?.maxScore || 20}</div>
            <div class="reason-col">${dims.adaptability?.reason || ''}</div>
          </td>
          <td class="score-col ${isRowLow('professionalism') ? 'score-low' : ''}">
            <div class="dim-col">🎯 ${dims.professionalism?.score || 0}/${dimensions[3]?.maxScore || 15}</div>
            <div class="reason-col">${dims.professionalism?.reason || ''}</div>
          </td>
          <td class="score-col ${isRowLow('etiquette') ? 'score-low' : ''}">
            <div class="dim-col">💬 ${dims.etiquette?.score || 0}/${dimensions[4]?.maxScore || 20}</div>
            <div class="reason-col">${dims.etiquette?.reason || ''}</div>
          </td>
          <td class="score-col">${totalScore}分</td>
        </tr>
      `;
    }).join('');
  }

  renderReportComment() {
    const strengthsEl = document.getElementById('reportStrengths');
    const weaknessesEl = document.getElementById('reportWeaknesses');
    const commentEl = document.getElementById('reportCommentText');

    if (!strengthsEl || !weaknessesEl || !commentEl) return;

    if (this.report) {
      this.renderStrengthsSection(strengthsEl);
      this.renderWeaknessesSection(weaknessesEl);

      if (this.report.comment) {
        commentEl.innerHTML = this.formatMarkdown(this.report.comment);
      } else if (this.report.evaluations && this.report.evaluations.length > 0) {
        this.generateAIReportComment().then(() => {
          if (this.report.comment) {
            commentEl.innerHTML = this.formatMarkdown(this.report.comment);
          }
        });
      } else {
        commentEl.innerHTML = '<p>暂无评语，请完成面试后查看完整报告。</p>';
      }
    } else {
      strengthsEl.innerHTML = '<p>面试完成后查看优势分析...</p>';
      weaknessesEl.innerHTML = '<p>面试完成后查看短板分析...</p>';
      commentEl.innerHTML = '<p>面试完成后查看详细评价...</p>';
    }
  }

  renderStrengthsSection(container) {
    const strengths = this.report.strengths || [];

    if (strengths.length === 0) {
      container.innerHTML = '<p class="no-data">暂无明显优势，建议加强各维度练习。</p>';
      return;
    }

    let html = '';
    strengths.forEach(s => {
      html += `
        <div class="strength-item">
          <div class="strength-icon">${s.icon}</div>
          <div class="strength-content">
            <h4>${s.title}</h4>
            <p>${s.desc}</p>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  renderWeaknessesSection(container) {
    const weaknesses = this.report.weaknesses || [];

    if (weaknesses.length === 0) {
      container.innerHTML = '<p class="no-data">各维度表现均衡，继续保持！</p>';
      return;
    }

    let html = '';
    weaknesses.forEach(w => {
      html += `
        <div class="weakness-item">
          <div class="weakness-icon">${w.icon}</div>
          <div class="weakness-content">
            <h4>${w.title}</h4>
            <p>${w.desc}</p>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  formatMarkdown(text) {
    let html = text;

    html = html.replace(/^## (.*$)/gim, '<h2 class="report-section-title">$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3 class="report-subtitle">$1</h3>');
    html = html.replace(/^\*\*\*(.*?)\*\*\*/gim, '<strong class="report-strong">$1</strong>');
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/^\- (.*$)/gim, '<li class="report-list-item">$1</li>');
    html = html.replace(/^(\d+)\. (.*$)/gim, '<li class="report-list-item numbered">$1. $2</li>');
    html = html.replace(/✅/g, '<span class="badge badge-success">亮点</span>');
    html = html.replace(/❌/g, '<span class="badge badge-error">漏洞</span>');
    html = html.replace(/➡️/g, '<span class="badge badge-warning">一般</span>');
    html = html.replace(/「([^」]+)」/g, '<code class="report-quote">$1</code>');
    html = html.replace(/\n/g, '<br>');

    return html;
  }

  loadReportData() {
    const data = sessionStorage.getItem('interviewReport');
    if (data) {
      this.report = JSON.parse(data);
    } else {
      this.report = this.generateSampleReport();
    }
  }

  generateSampleReport() {
    // 使用scorer的真实评估数据（如果有的话）
    if (this.scorer && this.scorer.evaluationHistory.length > 0) {
      return this.scorer.generateReport(this.conversation, this.selectedScenario, this.config);
    }

    return {
      scenario: this.selectedScenario || 'campus',
      overallScore: 0,
      grade: { label: '暂无评分', class: 'average' },
      dimensions: {
        professional: { avg: 0, current: 0, max: 35 },
        logic: { avg: 0, current: 0, max: 25 },
        adaptability: { avg: 0, current: 0, max: 25 },
        etiquette: { avg: 0, current: 0, max: 15 }
      },
      evaluations: [],
      strengths: [],
      weaknesses: [],
      suggestions: [],
      practiceQuestions: [],
      conversationSummary: { totalQuestions: this.questions.length, totalAnswers: 0, totalDuration: (this.config.duration * 60) - this.timeRemaining, evaluatedQuestions: 0 }
    };
  }

  renderOverview() {
    const scoreValue = document.getElementById('scoreValue');
    const gradeBadge = document.getElementById('gradeBadge');
    const statQuestions = document.getElementById('statQuestions');
    const statAnswers = document.getElementById('statAnswers');
    const statDuration = document.getElementById('statDuration');

    if (scoreValue) scoreValue.textContent = this.report.overallScore;
    if (gradeBadge) {
      gradeBadge.textContent = this.report.grade.label;
      gradeBadge.className = 'badge badge-' + (this.report.overallScore >= 70 ? 'success' : 'error');
    }

    const summary = this.report.conversationSummary;
    if (statQuestions) statQuestions.textContent = summary.totalQuestions;
    if (statAnswers) statAnswers.textContent = summary.totalAnswers;
    if (statDuration) statDuration.textContent = Math.round(summary.totalDuration / 60) + '分钟';
  }

  renderRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;

    const dimensions = ['professional', 'logic', 'adaptability', 'professionalism', 'etiquette'];
    const data = this.report.dimensions;

    const radarData = dimensions.map(dim => {
      const dimData = data[dim];
      return dimData ? (dimData.avg || dimData.current || 0) : 0;
    });

    if (!this.radarChartLarge) {
      const theme = document.body.getAttribute('data-theme') || 'dark';
      this.radarChartLarge = new RadarChart('radarChart', { theme });
    }
    this.radarChartLarge.setData(radarData);
  }

  renderDimensions() {
    const grid = document.getElementById('dimensionsGrid');
    if (!grid) return;

    const dimensions = Object.entries(window.INTERVIEW_CONFIG.SCORING_DIMENSIONS).map(([id, dim]) => ({
      id,
      ...dim,
      maxScore: dim.max
    }));
    const data = this.report.dimensions;

    grid.innerHTML = dimensions.map(dim => {
      const dimData = data[dim.id] || { avg: 0, current: 0, max: dim.maxScore || 100 };
      const score = dimData.avg || dimData.current || 0;
      const max = dimData.max || dim.maxScore || 100;
      const percentage = (score / max) * 100;
      const isWeak = percentage < 55;

      return `
        <div class="dimension-card ${isWeak ? 'dimension-weak' : ''}">
          <div class="dimension-icon">${dim.icon || ''}</div>
          <div class="dimension-name">${dim.name}</div>
          <div class="dimension-score ${isWeak ? 'score-low' : ''}">${score}/${max}</div>
          <div class="dimension-bar"><div class="dimension-bar-fill ${isWeak ? 'fill-low' : ''}" style="width:${percentage}%"></div></div>
        </div>
      `;
    }).join('');
  }

  renderConversationHistory() {
    const container = document.getElementById('conversationHistory');
    if (!container || !this.conversation) return;

    container.innerHTML = this.conversation.map(msg => {
      if (msg.type === 'question') {
        return `<div class="conversation-item"><div class="conversation-item-question"><span class="conversation-label question">问题</span><span class="conversation-text">${this.escapeHtml(msg.content)}</span></div></div>`;
      } else {
        return `<div class="conversation-item"><div class="conversation-item-answer"><span class="conversation-label answer">回答</span><span class="conversation-text">${this.escapeHtml(msg.content)}</span></div></div>`;
      }
    }).join('');
  }

  renderAnalysis() {
    const strengthsList = document.getElementById('strengthsList');
    const weaknessesList = document.getElementById('weaknessesList');

    if (strengthsList && this.report.strengths) {
      strengthsList.innerHTML = this.report.strengths.map(s => `
        <div class="list-item strength">
          <div class="list-item-icon">✓</div>
          <div><div class="list-item-title">${s.title}</div><div class="list-item-desc">${s.desc}</div></div>
        </div>
      `).join('') || '<div class="list-item"><div class="list-item-desc">暂无明显优势</div></div>';
    }

    if (weaknessesList && this.report.weaknesses) {
      weaknessesList.innerHTML = this.report.weaknesses.map(w => `
        <div class="list-item weakness">
          <div class="list-item-icon">!</div>
          <div><div class="list-item-title">${w.title}</div><div class="list-item-desc">${w.desc}</div></div>
        </div>
      `).join('') || '<div class="list-item"><div class="list-item-desc">暂无明显弱点</div></div>';
    }
  }

  renderSuggestions() {
    const list = document.getElementById('suggestionsList');
    if (!list || !this.report.suggestions) return;

    list.innerHTML = this.report.suggestions.map((s, i) => `
      <div class="suggestion-item">
        <div class="suggestion-number">${i + 1}</div>
        <div class="suggestion-content">
          <h4>${s.title}</h4>
          <p>${s.content}</p>
          ${s.example ? `<div class="suggestion-example">示例：${s.example}</div>` : ''}
        </div>
      </div>
    `).join('');
  }

  renderPractice() {
    const grid = document.getElementById('practiceGrid');
    if (!grid) return;

    const weakDimensions = this.scorer ?
      this.scorer.getWeakDimensions(this.report.dimensions) : [];

    if (weakDimensions.length === 0) {
      grid.innerHTML = `
        <div class="practice-empty">
          <p>各维度表现均衡，继续保持！</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = weakDimensions.map(dim => `
      <div class="practice-card weak-dimension-card" data-dimension="${dim.id}">
        <div class="practice-card-header">
          <span class="practice-card-icon">${dim.icon}</span>
          <span class="practice-card-score">${dim.score}${dim.unit} / ${dim.max}${dim.unit}</span>
        </div>
        <div class="practice-card-title">${dim.name}专项训练</div>
        <div class="practice-card-desc">当前得分率：${dim.ratio}%</div>
        <button class="btn btn-primary btn-sm training-start-btn" data-dimension="${dim.id}">
          开始训练
        </button>
      </div>
    `).join('');

    grid.querySelectorAll('.training-start-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dimension = e.target.dataset.dimension;
        this.startTraining(dimension);
      });
    });
  }

  // ===================================
  // Training Mode
  // ===================================

  startTraining(dimension) {
    this.isTrainingMode = true;
    this.trainingDimension = dimension;
    this.trainingQuestionIndex = 0;
    this.trainingConversation = [];
    this.trainingScorer = new InterviewScorer();
    this.trainingTimeRemaining = 300;

    const trainingConfig = window.INTERVIEW_CONFIG.TRAINING_QUESTIONS[dimension];
    if (!trainingConfig) {
      this.showToast('训练题库不存在', 'error');
      return;
    }

    // 优先使用匹配专业+场景的题目
    const major = this.selectedMajor || 'all';
    const scenario = this.selectedScenario || 'campus';

    // 从专项训练题库中筛选题目
    let trainingQuestions = trainingConfig.questions.filter(q => {
      // 检查题目是否适合当前专业和场景
      // 这里可以添加更复杂的筛选逻辑
      return true; // 暂时返回所有题目，后续可以根据需要优化
    });

    // 如果专项训练题目不足，从通用题库中补充
    if (trainingQuestions.length < 3) {
      const additionalQuestions = window.INTERVIEW_CONFIG.filterQuestions(
        major,
        scenario,
        'medium',
        3 - trainingQuestions.length
      );
      trainingQuestions = [...trainingQuestions, ...additionalQuestions];
    }

    this.trainingQuestions = this.shuffleArray(trainingQuestions).slice(0, 3);

    document.getElementById('trainingModalTitle').textContent =
      `${trainingConfig.icon} ${trainingConfig.name}`;
    document.getElementById('trainingDimensionBadge').innerHTML = `
      <span class="badge-icon">${trainingConfig.icon}</span>
      <span class="badge-text">${trainingConfig.name}</span>
    `;

    this.showTrainingModal();
    this.askTrainingQuestion();
    this.startTrainingTimer();

    console.log(`已加载 ${this.trainingQuestions.length} 道专项训练题目（维度: ${dimension}, 专业: ${major}, 场景: ${scenario}）`);
  }

  showTrainingModal() {
    const modal = document.getElementById('trainingModal');
    if (modal) {
      modal.classList.add('active');
    }
  }

  hideTrainingModal() {
    const modal = document.getElementById('trainingModal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  startTrainingTimer() {
    this.stopTrainingTimer();
    this.updateTrainingTimerDisplay();

    this.trainingTimer = setInterval(() => {
      this.trainingTimeRemaining--;
      this.updateTrainingTimerDisplay();

      if (this.trainingTimeRemaining <= 0) {
        this.stopTrainingTimer();
        this.showToast('训练时间结束！', 'info');
        this.endTraining();
      }
    }, 1000);
  }

  stopTrainingTimer() {
    if (this.trainingTimer) {
      clearInterval(this.trainingTimer);
      this.trainingTimer = null;
    }
  }

  updateTrainingTimerDisplay() {
    const minutes = Math.floor(this.trainingTimeRemaining / 60);
    const seconds = this.trainingTimeRemaining % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const timerEl = document.getElementById('trainingTimer');
    if (timerEl) {
      timerEl.textContent = display;
    }
  }

  askTrainingQuestion() {
    if (this.trainingQuestionIndex >= this.trainingQuestions.length) {
      this.showToast('恭喜完成所有练习题！', 'success');
      this.endTraining();
      return;
    }

    const question = this.trainingQuestions[this.trainingQuestionIndex];
    document.getElementById('trainingQuestionNum').textContent =
      this.trainingQuestionIndex + 1;
    document.getElementById('trainingQuestionText').textContent = question.text;
    document.getElementById('trainingAnswerInput').value = '';
    document.getElementById('trainingFollowupWrapper').style.display = 'none';

    this.trainingConversation.push({
      role: 'interviewer',
      content: question.text,
      timestamp: Date.now()
    });
  }

  submitTrainingAnswer() {
    const answerInput = document.getElementById('trainingAnswerInput');
    const answer = answerInput.value.trim();

    if (!answer) {
      this.showToast('请输入你的回答', 'warning');
      return;
    }

    const question = this.trainingQuestions[this.trainingQuestionIndex];

    this.trainingConversation.push({
      role: 'user',
      content: answer,
      timestamp: Date.now()
    });

    const questionData = {
      id: question.id,
      text: question.text
    };

    this.trainingScorer.evaluateAnswer(
      { content: answer, starElement: null },
      questionData,
      false,
      0
    );

    const evaluation = this.trainingScorer.evaluationHistory.slice(-1)[0];

    if (question.followUp && question.followUp.length > 0 &&
      this.trainingQuestionIndex < question.followUp.length) {
      const followUp = question.followUp[this.trainingQuestionIndex];
      document.getElementById('trainingFollowupText').textContent = followUp.text;
      document.getElementById('trainingFollowupWrapper').style.display = 'block';

      this.trainingConversation.push({
        role: 'interviewer',
        content: followUp.text,
        timestamp: Date.now()
      });
    } else {
      this.trainingQuestionIndex++;
      if (this.trainingQuestionIndex < this.trainingQuestions.length) {
        this.askTrainingQuestion();
      } else {
        this.endTraining();
      }
    }
  }

  submitTrainingFollowup() {
    const answerInput = document.getElementById('trainingAnswerInput');
    const answer = answerInput.value.trim();

    if (!answer) {
      this.showToast('请输入你的追问回答', 'warning');
      return;
    }

    const question = this.trainingQuestions[this.trainingQuestionIndex];

    this.trainingConversation.push({
      role: 'user',
      content: answer,
      timestamp: Date.now()
    });

    const questionData = {
      id: question.id,
      text: question.text + ' (追问)'
    };

    this.trainingScorer.evaluateAnswer(
      { content: answer, starElement: null },
      questionData,
      true,
      this.trainingQuestionIndex
    );

    this.trainingQuestionIndex++;
    if (this.trainingQuestionIndex < this.trainingQuestions.length) {
      this.askTrainingQuestion();
    } else {
      this.endTraining();
    }
  }

  endTraining() {
    this.stopTrainingTimer();
    this.hideTrainingModal();

    const score = this.trainingScorer.calculateCurrentScore();
    const report = this.trainingScorer.generateReport(
      this.trainingConversation,
      null,
      { dimension: this.trainingDimension }
    );

    this.saveTrainingRecord({
      dimension: this.trainingDimension,
      dimensionName: this.scorer.dimensions[this.trainingDimension]?.name || this.trainingDimension,
      score: score.overall,
      totalScore: 100,
      grade: this.trainingScorer.getGrade(score.overall),
      questionsCount: this.trainingQuestions.length,
      timestamp: Date.now(),
      evaluations: this.trainingScorer.evaluationHistory
    });

    this.showToast(`训练完成！得分：${score.overall}分`, 'success');

    this.isTrainingMode = false;
    this.trainingDimension = null;
    this.trainingQuestions = [];
    this.trainingQuestionIndex = 0;
    this.trainingConversation = [];
    this.trainingScorer = null;
  }

  saveTrainingRecord(record) {
    const history = this.getTrainingHistory();
    history.unshift(record);
    if (history.length > 50) {
      history.pop();
    }
    localStorage.setItem('trainingHistory', JSON.stringify(history));
  }

  getTrainingHistory() {
    const data = localStorage.getItem('trainingHistory');
    return data ? JSON.parse(data) : [];
  }

  clearTrainingHistory() {
    localStorage.removeItem('trainingHistory');
    this.renderTrainingHistory();
    this.showToast('训练记录已清空', 'success');
  }

  renderTrainingHistory() {
    const history = this.getTrainingHistory();
    const totalEl = document.getElementById('totalTrainings');
    const avgEl = document.getElementById('avgTrainingScore');
    const listEl = document.getElementById('historyList');

    if (totalEl) totalEl.textContent = history.length;

    if (history.length > 0) {
      const avgScore = Math.round(
        history.reduce((sum, r) => sum + r.score, 0) / history.length
      );
      if (avgEl) avgEl.textContent = avgScore;
    } else {
      if (avgEl) avgEl.textContent = '0';
    }

    if (listEl) {
      if (history.length === 0) {
        listEl.innerHTML = '<div class="history-empty">暂无训练记录，开始你的第一次专项训练吧！</div>';
      } else {
        listEl.innerHTML = history.slice(0, 20).map(record => `
          <div class="history-item">
            <div class="history-item-header">
              <span class="history-dimension">${record.dimensionName}</span>
              <span class="history-score grade-${record.grade.class}">${record.score}分 - ${record.grade.label}</span>
            </div>
            <div class="history-item-meta">
              <span>${record.questionsCount}道题</span>
              <span>${new Date(record.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        `).join('');
      }
    }
  }

  showHistoryModal() {
    this.renderTrainingHistory();
    const modal = document.getElementById('historyModal');
    if (modal) {
      modal.classList.add('active');
    }
  }

  hideHistoryModal() {
    const modal = document.getElementById('historyModal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // ===================================
  // Speech
  // ===================================

  toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  startRecording() {
    if (!this.speechModule.isAvailable()) {
      this.showToast('语音识别不可用，请使用文字输入', 'error');
      return;
    }

    // Stop any existing recording
    this.stopRecording();

    const self = this;

    this.speechModule.startListening(
      function () {
        self.isRecording = true;
        self.updateRecordingUI(true);
      },
      function (final, interim) {
        const input = document.getElementById('textInput');
        if (input) input.value = final + (interim ? ' ' + interim : '');
      },
      function (final) {
        self.isRecording = false;
        self.updateRecordingUI(false);
        if (final && final.trim()) {
          // Clear input first
          const input = document.getElementById('textInput');
          if (input) input.value = '';
          // Process the answer
          self.processAnswer(final);
        }
      },
      function (err) {
        self.isRecording = false;
        self.updateRecordingUI(false);
        console.error('Speech error:', err);
        if (err !== 'no-speech') {
          self.showToast('语音识别出错，请使用文字输入', 'error');
        }
      }
    );
  }

  stopRecording() {
    if (this.speechModule) {
      this.speechModule.stopListening();
    }
    this.isRecording = false;
    this.updateRecordingUI(false);
  }

  updateRecordingUI(recording) {
    const micBtn = document.getElementById('micBtn');
    const visualizer = document.getElementById('audioVisualizer');

    if (micBtn) micBtn.classList.toggle('recording', recording);
    if (visualizer) visualizer.classList.toggle('active', recording);
  }

  sendTextMessage() {
    const input = document.getElementById('textInput');
    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    this.processAnswer(text);
  }

  // ===================================
  // Utils
  // ===================================

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showToast(message, type) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'info');
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  saveConfig() {
    localStorage.setItem('interviewConfig', JSON.stringify(this.config));
  }

  loadSavedConfig() {
    const saved = localStorage.getItem('interviewConfig');
    if (saved) {
      try {
        const config = JSON.parse(saved);
        Object.assign(this.config, config);

        if (config.scenario) this.selectScenario(config.scenario);

        const diffIndex = ['easy', 'medium', 'hard'].indexOf(config.difficulty);
        if (diffIndex >= 0) {
          this.updateDifficulty(diffIndex);
          const slider = document.getElementById('difficultySlider');
          if (slider) slider.value = diffIndex;
        }

        const durationRadio = document.querySelector(`input[name="duration"][value="${config.duration}"]`);
        if (durationRadio) durationRadio.checked = true;

        if (config.major) {
          const majorInput = document.getElementById('majorInput');
          if (majorInput) majorInput.value = config.major;
        }

        if (config.position) {
          const positionInput = document.getElementById('positionInput');
          if (positionInput) positionInput.value = config.position;
        }
      } catch (e) {
        console.error('Failed to load config:', e);
      }
    }
  }

  // ===================================
  // Event Bindings
  // ===================================

  bindEvents() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
      this.toggleTheme();
    });

    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const page = link.dataset.page;
        if (page === 'interview' && this.currentPage !== 'interview') {
          this.showPage('interview');
        } else if (page === 'report') {
          this.showPage('report');
          this.renderReport();
        } else if (page === 'home') {
          this.showPage('home');
        }
      });
    });

    // Scenario selection
    document.getElementById('scenarioGrid').addEventListener('click', e => {
      const card = e.target.closest('.scenario-card');
      if (card) this.selectScenario(card.dataset.scenario);
    });

    // Difficulty slider
    document.getElementById('difficultySlider').addEventListener('input', e => {
      this.updateDifficulty(e.target.value);
    });

    // Duration
    document.querySelectorAll('input[name="duration"]').forEach(radio => {
      radio.addEventListener('change', e => {
        if (e.target.value === 'custom') {
          document.getElementById('customDurationWrapper').style.display = 'flex';
        } else {
          document.getElementById('customDurationWrapper').style.display = 'none';
          this.config.duration = parseInt(e.target.value);
          this.saveConfig();
        }
      });
    });

    // 自定义时长确认按钮
    document.getElementById('confirmDurationBtn').addEventListener('click', () => {
      this.confirmCustomDuration();
    });

    // 自定义时长输入框回车事件
    document.getElementById('customDurationInput').addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.confirmCustomDuration();
      }
    });

    // 暂停计时按钮
    document.getElementById('pauseTimerBtn').addEventListener('click', () => {
      this.togglePauseTimer();
    });

    // 重置计时按钮
    document.getElementById('resetTimerBtn').addEventListener('click', () => {
      this.resetTimer();
    });

    // Style
    document.querySelectorAll('.style-option').forEach(option => {
      option.addEventListener('click', () => {
        document.querySelectorAll('.style-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        document.querySelector('input[name="style"]').value = option.dataset.style;
        this.config.style = option.dataset.style;
        this.saveConfig();
      });
    });

    // Major/Position
    document.getElementById('positionInput').addEventListener('change', e => {
      this.config.position = e.target.value;
      this.saveConfig();
    });

    // 自定义专业添加按钮
    document.getElementById('addMajorBtn').addEventListener('click', () => {
      this.addCustomMajor();
    });

    // 自定义专业输入框回车事件
    document.getElementById('customMajorInput').addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.addCustomMajor();
      }
    });

    // 自定义专业删除按钮（事件委托）
    document.getElementById('customMajorsList').addEventListener('click', e => {
      if (e.target.classList.contains('delete-major-btn')) {
        const majorValue = e.target.dataset.major;
        this.removeCustomMajor(majorValue);
      }
    });

    // 自定义岗位添加按钮
    document.getElementById('addPositionBtn').addEventListener('click', () => {
      this.addCustomPosition();
    });

    // 自定义岗位输入框回车事件
    document.getElementById('customPositionInput').addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.addCustomPosition();
      }
    });

    // 自定义岗位删除按钮（事件委托）
    document.getElementById('customPositionsList').addEventListener('click', e => {
      if (e.target.classList.contains('delete-position-btn')) {
        const positionValue = e.target.dataset.position;
        this.removeCustomPosition(positionValue);
      }
    });

    // 专业选择联动岗位推荐
    document.getElementById('majorInput').addEventListener('change', e => {
      this.config.major = e.target.value;
      this.selectedMajor = e.target.value;
      this.saveConfig();
      this.loadPositionOptions(e.target.value);
    });

    // Start button
    document.getElementById('startBtn').addEventListener('click', () => {
      this.startInterview();
    });

    // Interview page
    document.getElementById('backBtn').addEventListener('click', () => {
      this.confirmExit();
    });

    document.getElementById('micBtn').addEventListener('click', () => {
      this.toggleRecording();
    });

    document.getElementById('sendBtn').addEventListener('click', () => {
      this.sendTextMessage();
    });

    document.getElementById('textInput').addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.sendTextMessage();
      }
    });

    document.getElementById('confirmEndBtn').addEventListener('click', () => {
      this.hideEndModal();
      this.endInterview();
    });

    document.getElementById('cancelEndBtn').addEventListener('click', () => {
      this.hideEndModal();
    });

    // Report page
    document.getElementById('backHomeBtn').addEventListener('click', () => {
      this.showPage('home');
    });

    document.getElementById('retryBtn').addEventListener('click', () => {
      this.startInterview();
    });

    document.getElementById('retryInterviewBtn').addEventListener('click', () => {
      this.startInterview();
    });

    document.getElementById('backHomeBtn2').addEventListener('click', () => {
      this.showPage('home');
    });

    // Analysis tabs
    document.querySelectorAll('.analysis-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.analysis-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.analysis-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
      });
    });

    // Training mode events
    document.getElementById('viewTrainingHistoryBtn').addEventListener('click', () => {
      this.showHistoryModal();
    });

    document.getElementById('closeTrainingBtn').addEventListener('click', () => {
      if (confirm('确定要结束本次训练吗？')) {
        this.endTraining();
      }
    });

    document.getElementById('trainingEndBtn').addEventListener('click', () => {
      if (confirm('确定要结束本次训练吗？')) {
        this.endTraining();
      }
    });

    document.getElementById('trainingSubmitBtn').addEventListener('click', () => {
      const followupWrapper = document.getElementById('trainingFollowupWrapper');
      if (followupWrapper && followupWrapper.style.display !== 'none') {
        this.submitTrainingFollowup();
      } else {
        this.submitTrainingAnswer();
      }
    });

    document.getElementById('trainingSpeechBtn').addEventListener('click', () => {
      if (this.speechModule && this.speechModule.isAvailable()) {
        const input = document.getElementById('trainingAnswerInput');
        if (this.isRecording) {
          this.stopRecording();
        } else {
          const self = this;
          this.speechModule.startListening(
            function () { self.isRecording = true; },
            function (final, interim) {
              input.value = final + (interim ? ' ' + interim : '');
            },
            function (final) {
              self.isRecording = false;
              input.value = final;
            }
          );
        }
      } else {
        this.showToast('语音识别不可用，请使用文字输入', 'error');
      }
    });

    // History modal events
    document.getElementById('closeHistoryBtn').addEventListener('click', () => {
      this.hideHistoryModal();
    });

    document.getElementById('closeHistoryModalBtn').addEventListener('click', () => {
      this.hideHistoryModal();
    });

    document.getElementById('clearHistoryBtn').addEventListener('click', () => {
      if (confirm('确定要清空所有训练记录吗？')) {
        this.clearTrainingHistory();
      }
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  window.app = new InterviewApp();
});