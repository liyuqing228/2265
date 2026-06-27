/* ===================================
   AI Interview Simulator - Scorer v4
   五维加权评分系统：专业25+逻辑20+应变20+素养15+礼仪20=100分
   支持全学科专业评估
   =================================== */

class InterviewScorer {
  constructor() {
    // 五维评分权重配置
    this.dimensions = {
      professional: { name: '专业匹配度', weight: 25, icon: '💼' },
      logic: { name: '逻辑表达', weight: 20, icon: '🧠' },
      adaptability: { name: '临场应变', weight: 20, icon: '⚡' },
      professionalism: { name: '职业素养', weight: 15, icon: '🎯' },
      etiquette: { name: '语言礼仪', weight: 20, icon: '💬' }
    };

    this.evaluationHistory = []; // 存储每道题的评分详情
    this.totalWeight = 100; // 总权重
    this.currentMajor = null; // 当前专业
    this.currentScenario = null; // 当前场景
  }

  /**
   * 设置当前专业和场景
   */
  setContext(major, scenario) {
    this.currentMajor = major;
    this.currentScenario = scenario;
  }

  /**
   * 获取专业关键词（根据专业返回对应的关键词）
   */
  getProfessionalKeywords(major) {
    // 专业关键词库 - 按八大类分类
    const keywordDatabase = {
      // 经管类
      business: [
        '金融', '经济', '会计', '财务', '投资', '市场', '营销', '品牌', '销售',
        '成本', '利润', '预算', '审计', '税务', '风险', '管理', '战略', '运营',
        '数据', '分析', 'KPI', 'ROI', '客户', '用户', '产品', '项目', '团队'
      ],
      // 计算机/工科类
      engineering: [
        '编程', '代码', '算法', '数据结构', '架构', '设计', '开发', '测试', '部署',
        '系统', '网络', '数据库', '前端', '后端', 'API', '框架', '语言', '工具',
        '项目', '技术', '性能', '优化', '安全', 'bug', '调试', '版本', '迭代'
      ],
      // 理学类
      science: [
        '实验', '研究', '理论', '假设', '数据', '分析', '结论', '论文', '文献',
        '模型', '方法', '验证', '发现', '创新', '科学', '学术', '知识', '原理',
        '现象', '规律', '计算', '模拟', '统计', '概率', '逻辑', '推理', '证明'
      ],
      // 医学类
      medicine: [
        '临床', '诊断', '治疗', '患者', '病情', '症状', '病史', '检查', '检验',
        '药物', '手术', '护理', '康复', '预防', '健康', '疾病', '医学', '医疗',
        '病例', '方案', '效果', '副作用', '并发症', '急救', '监护', '医嘱', '随访'
      ],
      // 农林类
      agriculture: [
        '农业', '种植', '养殖', '作物', '品种', '土壤', '肥料', '农药', '灌溉',
        '病虫害', '防治', '产量', '质量', '技术', '实验', '研究', '推广', '应用',
        '生态', '环境', '可持续', '绿色', '有机', '机械化', '智能化', '设施', '温室'
      ],
      // 艺术类
      art: [
        '设计', '创意', '作品', '风格', '表现', '技法', '色彩', '构图', '形式',
        '艺术', '审美', '创作', '展示', '表演', '音乐', '舞蹈', '戏剧', '影视',
        '视觉', '听觉', '情感', '表达', '灵感', '理念', '文化', '传统', '创新'
      ],
      // 师范类
      education: [
        '教学', '教育', '学习', '学生', '课程', '课堂', '知识', '能力', '素养',
        '方法', '策略', '评价', '考核', '指导', '辅导', '启发', '引导', '激励',
        '教师', '师生', '互动', '合作', '探究', '实践', '体验', '反思', '成长'
      ],
      // 文法类
      humanities: [
        '法律', '法规', '政策', '制度', '社会', '文化', '历史', '哲学', '思想',
        '政治', '经济', '管理', '服务', '公众', '权益', '责任', '义务', '规范',
        '分析', '研究', '调查', '报道', '传播', '媒体', '舆论', '观点', '论证'
      ]
    };

    // 根据专业名称映射到专业类别
    const majorToCategory = {
      // 经管类
      '金融学': 'business', '经济学': 'business', '会计学': 'business',
      '工商管理': 'business', '市场营销': 'business', '财务管理': 'business',
      '人力资源管理': 'business', '国际贸易': 'business', '信息管理与信息系统': 'business',
      '统计学': 'business',
      // 计算机/工科类
      '计算机科学与技术': 'engineering', '软件工程': 'engineering',
      '人工智能': 'engineering', '数据科学与大数据技术': 'engineering',
      '网络工程': 'engineering', '电子信息工程': 'engineering',
      '通信工程': 'engineering', '自动化': 'engineering',
      '机械工程': 'engineering', '电气工程': 'engineering',
      // 理学类
      '数学': 'science', '物理学': 'science', '化学': 'science',
      '生物学': 'science', '环境科学': 'science', '地质学': 'science',
      '心理学': 'science', '生态学': 'science', '天文学': 'science',
      // 医学类
      '临床医学': 'medicine', '护理学': 'medicine', '药学': 'medicine',
      '口腔医学': 'medicine', '公共卫生与预防医学': 'medicine',
      '中医学': 'medicine', '中西医临床医学': 'medicine',
      '医学影像学': 'medicine', '麻醉学': 'medicine', '康复治疗学': 'medicine',
      // 农林类
      '农学': 'agriculture', '园艺': 'agriculture', '植物保护': 'agriculture',
      '动物科学': 'agriculture', '动物医学': 'agriculture', '林学': 'agriculture',
      '水土保持与荒漠化防治': 'agriculture', '农业资源与环境': 'agriculture',
      '食品科学与工程': 'agriculture', '风景园林': 'agriculture',
      // 艺术类
      '视觉传达设计': 'art', '环境设计': 'art', '产品设计': 'art',
      '动画': 'art', '音乐表演': 'art', '音乐学': 'art',
      '舞蹈表演': 'art', '广播电视编导': 'art',
      '影视摄影与制作': 'art', '播音与主持艺术': 'art',
      // 师范类
      '汉语言文学': 'education', '数学与应用数学': 'education',
      '英语': 'education', '物理学': 'education', '化学': 'education',
      '生物科学': 'education', '思想政治教育': 'education',
      '教育学': 'education', '心理学': 'education', '体育教育': 'education',
      // 文法类
      '法学': 'humanities', '政治学与行政学': 'humanities',
      '社会学': 'humanities', '社会工作': 'humanities',
      '新闻传播学': 'humanities', '网络与新媒体': 'humanities',
      '广告学': 'humanities', '历史学': 'humanities',
      '哲学': 'humanities', '考古学': 'humanities'
    };

    // 获取专业类别
    const category = majorToCategory[major] || 'business';

    // 返回对应专业的关键词
    return keywordDatabase[category] || keywordDatabase.business;
  }

  /**
   * 评估单条回答（智能分析）
   * 根据回答质量真实浮动，避免固定分数
   */
  evaluateAnswer(answer, question, isFollowUp = false, followUpCount = 0) {
    const text = answer.content || '';
    const starElement = answer.starElement || null;

    // 计算基础质量分数（0-100）
    const baseQuality = this.calculateBaseQuality(text);

    // 五个维度的独立评估
    const evaluation = {
      professional: this.evaluateProfessional(text, question, baseQuality),
      logic: this.evaluateLogic(text, question, baseQuality, starElement),
      adaptability: this.evaluateAdaptability(text, isFollowUp, followUpCount, baseQuality),
      professionalism: this.evaluateProfessionalism(text, question, baseQuality),
      etiquette: this.evaluateEtiquette(text, baseQuality)
    };

    // 计算本题加权总分
    const weightedTotal =
      evaluation.professional.score +
      evaluation.logic.score +
      evaluation.adaptability.score +
      evaluation.professionalism.score +
      evaluation.etiquette.score;

    // 构成本题得分详情
    const questionScore = {
      questionId: question.id,
      questionText: question.text,
      timestamp: Date.now(),
      isFollowUp: isFollowUp,
      starElement: starElement,
      dimensions: evaluation,
      totalScore: weightedTotal,
      baseQuality: baseQuality
    };

    this.evaluationHistory.push(questionScore);
    return questionScore;
  }

  /**
   * 计算基础质量分数（0-100）
   * 综合考虑回答长度、内容丰富度、语言质量
   */
  calculateBaseQuality(text) {
    const length = text.length;
    let quality = 40; // 默认基准分（从60降到40，更加严格）

    // 长度评分：适中为佳
    if (length < 10) {
      quality = 10; // 极短，几乎没有内容
    } else if (length < 20) {
      quality = 20; // 过短
    } else if (length < 50) {
      quality = 35; // 较短
    } else if (length < 100) {
      quality = 50; // 一般
    } else if (length < 200) {
      quality = 65; // 适中
    } else if (length < 400) {
      quality = 75; // 良好
    } else if (length < 600) {
      quality = 70; // 开始冗余
    } else {
      quality = 55; // 过长
    }

    // 句子数量（反映逻辑结构）
    const sentences = text.split(/[。！？.!?]/).filter(s => s.trim().length > 0).length;
    if (sentences >= 3 && sentences <= 8) {
      quality += 5;
    } else if (sentences >= 9) {
      quality -= 5;
    } else if (sentences < 2) {
      quality -= 10; // 句子太少，逻辑不完整
    }

    // 段落结构（换行符）
    const paragraphs = text.split('\n').filter(p => p.trim().length > 0).length;
    if (paragraphs >= 2 && paragraphs <= 4) {
      quality += 3;
    }

    // 词汇丰富度（避免重复）
    const words = text.split(/[\s，,、。！？.!?]/).filter(w => w.length > 1);
    const uniqueWords = new Set(words);
    if (words.length > 0 && uniqueWords.size / words.length > 0.7) {
      quality += 2;
    } else if (words.length > 5 && uniqueWords.size / words.length < 0.4) {
      quality -= 10; // 重复内容过多
    }

    // 无意义内容检测
    const meaninglessPatterns = [
      /^(哈|呵|嘿|嘻|哦|啊|嗯|好|是|对){3,}$/, // 连续重复的语气词
      /^[a-zA-Z]{3,}$/, // 纯字母（非英文回答）
      /^[0-9]{3,}$/, // 纯数字
      /^(\u3000|\s){3,}$/, // 纯空格
      /^(测试|test|随便|不知道|不清楚){2,}$/ // 重复的无意义词
    ];
    if (meaninglessPatterns.some(pattern => pattern.test(text.trim()))) {
      quality = Math.max(5, quality - 30); // 严重扣分
    }

    // 检查是否包含有效内容（至少有几个中文字符）
    const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    if (chineseChars < 2) {
      quality = Math.max(5, quality - 15); // 缺少中文内容
    }

    return length === 0 ? 0 : Math.min(100, Math.max(5, quality));
  }

  /**
   * 评估专业匹配度（25分）
   * 根据当前专业动态调整关键词库
   */
  evaluateProfessional(text, question, baseQuality) {
    let score = Math.round(baseQuality * 0.25); // 转换为25分制
    let reason = '';
    let deduction = [];

    // 根据当前专业获取对应的专业关键词
    const professionalKeywords = this.getProfessionalKeywords(this.currentMajor);

    const keywordCount = professionalKeywords.filter(kw => text.includes(kw)).length;

    // 数据量化能力
    const hasNumbers = /\d+[%人元万个百千万]/.test(text);
    const hasQuantities = (text.match(/\d+/g) || []).length;
    const hasPercentage = /%\d+|\d+%/.test(text);

    // 专业深度评分
    if (keywordCount >= 6 && hasNumbers && hasQuantities >= 3) {
      score = Math.min(25, score + 6);
      reason = `回答包含丰富的${this.currentMajor || '专业'}描述和量化数据支撑`;
    } else if (keywordCount >= 4 && (hasNumbers || hasQuantities >= 2)) {
      score = Math.min(25, score + 4);
      reason = '回答有专业内容和数据支撑';
    } else if (keywordCount >= 2) {
      score = Math.max(10, score - 2);
      reason = '专业内容偏少，建议增加具体案例';
      deduction.push('缺乏具体专业案例');
    } else {
      score = Math.max(8, score - 8);
      reason = '缺乏专业相关内容，显得空洞';
      deduction.push('专业内容不足');
    }

    // 情境相关性
    if (question.star && text.toLowerCase().includes(question.star.toLowerCase())) {
      score = Math.min(25, score + 2);
    }

    // 根据场景调整评分标准
    const scenarioKeywords = {
      'campus': ['项目', '实习', '校园', '社团', '实践'],
      'tech': ['技术', '架构', '性能', '优化', '安全'],
      'teacher': ['教学', '学生', '课程', '课堂', '教育'],
      'graduate': ['研究', '论文', '实验', '学术', '理论'],
      'civil': ['服务', '群众', '政策', '法规', '责任'],
      'hospital': ['患者', '临床', '医疗', '护理', '诊断'],
      'english': ['English', 'language', 'communication', 'professional'],
      'art': ['作品', '创作', '设计', '艺术', '表现']
    };

    const currentScenarioKeywords = scenarioKeywords[this.currentScenario] || [];
    const scenarioKeywordCount = currentScenarioKeywords.filter(kw => text.includes(kw)).length;
    if (scenarioKeywordCount >= 2) {
      score = Math.min(25, score + 2);
    }

    return {
      score: Math.round(score),
      maxScore: 25,
      reason: reason || '专业匹配度一般',
      deduction: deduction,
      level: this.getScoreLevel(score, 25)
    };
  }

  /**
   * 评估逻辑表达（20分）
   */
  evaluateLogic(text, question, baseQuality, starElement) {
    let score = Math.round(baseQuality * 0.20); // 转换为20分制
    let reason = '';
    let deduction = [];

    // STAR结构检测
    const hasSTAR = {
      S: text.includes('情况') || text.includes('背景') || text.includes('当时') ||
        text.includes('项目') || text.includes('公司') || text.includes('之前'),
      T: text.includes('目标') || text.includes('任务') || text.includes('需要') ||
        text.includes('为了') || text.includes('目的是'),
      A: text.includes('我') && (text.includes('做') || text.includes('实施') ||
        text.includes('完成') || text.includes('采取') || text.includes('决定')),
      R: text.includes('结果') || text.includes('最终') || text.includes('成效') ||
        text.includes('完成') || text.includes('达到') || text.includes('实现')
    };

    const starCount = Object.values(hasSTAR).filter(v => v).length;

    // 连接词检测（逻辑衔接）
    const transitions = [
      '首先', '其次', '然后', '最后', '第一', '第二', '第三', '一方面', '另一方面',
      '因为', '所以', '因此', '虽然', '但是', '然而', '并且', '同时', '此外'
    ];
    const transitionCount = transitions.filter(t => text.includes(t)).length;

    // 逻辑结构评分
    if (starCount >= 3 && transitionCount >= 2) {
      score = Math.min(20, score + 5);
      reason = '回答结构清晰，使用了STAR法则';
    } else if (starCount >= 2 || transitionCount >= 2) {
      score = Math.min(20, score + 3);
      reason = '回答有一定逻辑性';
    } else if (text.length > 100) {
      score = Math.max(8, score - 3);
      reason = '回答较长但逻辑层次不够清晰';
      deduction.push('缺乏清晰的逻辑结构');
    } else {
      score = Math.max(6, score - 4);
      reason = '回答较为零散';
      deduction.push('逻辑结构不清晰');
    }

    // 追问场景额外评分
    if (starElement) {
      const elementKeywords = {
        S: ['情况', '背景', '当时'],
        T: ['目标', '任务', '期望'],
        A: ['做法', '行动', '实施'],
        R: ['结果', '成效', '收获']
      };
      const hasElement = elementKeywords[starElement]?.some(k => text.includes(k));
      if (hasElement) {
        score = Math.min(20, score + 2);
      }
    }

    // 因果关系检测
    const hasCausality = /因为|所以|因此|导致|由于|从而/.test(text);
    if (hasCausality) {
      score = Math.min(20, score + 1);
    }

    return {
      score: Math.round(score),
      maxScore: 20,
      reason: reason || '逻辑表达有待提升',
      deduction: deduction,
      level: this.getScoreLevel(score, 20)
    };
  }

  /**
   * 评估临场应变（20分）
   */
  evaluateAdaptability(text, isFollowUp, followUpCount, baseQuality) {
    let score = Math.round(baseQuality * 0.20); // 转换为20分制
    let reason = '';
    let deduction = [];

    // 追问场景评分
    if (isFollowUp) {
      if (text.length < 30) {
        score = Math.max(5, score - 6);
        reason = '追问回答过于简短';
        deduction.push('追问回答不够详细');
      } else if (text.length >= 50 && !text.includes('不知道') && !text.includes('不太清楚')) {
        score = Math.min(20, score + 4);
        reason = '追问回答详细，思考深入';
      }

      // 连续追问递减效应
      if (followUpCount >= 2) {
        score = Math.max(8, score - (followUpCount - 1) * 2);
        reason = reason || '面对连续追问略显吃力';
        deduction.push('连续追问应对能力不足');
      }
    }

    // 压力应对检测
    const pressureIndicators = ['可能', '大概', '也许', '不太确定', '我不太清楚', '这个'];
    const hedgingCount = pressureIndicators.filter(p => text.includes(p)).length;

    if (hedgingCount >= 2) {
      score = Math.max(6, score - 4);
      reason = reason || '表达过于不确定';
      deduction.push('缺乏自信');
    } else if (!isFollowUp && text.length > 80 && hedgingCount === 0) {
      score = Math.min(20, score + 2);
      reason = reason || '回答自信有条理';
    }

    // 承认不足并改进的表述加分
    if (text.includes('不足') || text.includes('需要改进') || text.includes('从中学习')) {
      score = Math.min(20, score + 2);
    }

    // 无知但回避
    if ((text.includes('不知道') || text.includes('不清楚')) && text.length < 50) {
      score = Math.max(5, score - 5);
      reason = '直接承认不了解，未展现学习意愿';
      deduction.push('缺乏学习意愿');
    }

    // 应对突发情况/挑战
    const challengeKeywords = ['挑战', '困难', '问题', '解决', '应对', '克服'];
    if (challengeKeywords.some(k => text.includes(k))) {
      score = Math.min(20, score + 1);
    }

    return {
      score: Math.round(score),
      maxScore: 20,
      reason: reason || '临场应变表现一般',
      deduction: deduction,
      level: this.getScoreLevel(score, 20)
    };
  }

  /**
   * 评估职业素养（15分）
   */
  evaluateProfessionalism(text, question, baseQuality) {
    let score = Math.round(baseQuality * 0.15); // 转换为15分制
    let reason = '';
    let deduction = [];

    // 责任心体现
    const responsibilityKeywords = ['负责', '承担', '主动', '积极', '努力', '尽力'];
    const hasResponsibility = responsibilityKeywords.some(k => text.includes(k));

    // 团队合作
    const teamworkKeywords = ['团队', '合作', '协作', '配合', '沟通', '协调'];
    const hasTeamwork = teamworkKeywords.some(k => text.includes(k));

    // 学习成长
    const learningKeywords = ['学习', '提升', '进步', '成长', '改进', '优化'];
    const hasLearning = learningKeywords.some(k => text.includes(k));

    // 目标导向
    const goalKeywords = ['目标', '计划', '规划', '方向', '愿景', '期望'];
    const hasGoal = goalKeywords.some(k => text.includes(k));

    // 评分
    if (hasResponsibility && hasTeamwork && hasLearning) {
      score = Math.min(15, score + 4);
      reason = '体现了良好的职业素养';
    } else if (hasResponsibility && (hasTeamwork || hasLearning)) {
      score = Math.min(15, score + 2);
      reason = '职业素养表现良好';
    } else if (!hasResponsibility && !hasTeamwork && !hasLearning) {
      score = Math.max(5, score - 3);
      reason = '职业素养体现不足';
      deduction.push('缺乏职业素养体现');
    }

    // 目标意识
    if (hasGoal) {
      score = Math.min(15, score + 1);
    }

    // 持续改进意识
    if (text.includes('反思') || text.includes('总结') || text.includes('复盘')) {
      score = Math.min(15, score + 1);
    }

    // 职业规划
    if (text.includes('规划') || text.includes('发展') || text.includes('职业')) {
      score = Math.min(15, score + 1);
    }

    return {
      score: Math.round(score),
      maxScore: 15,
      reason: reason || '职业素养表现一般',
      deduction: deduction,
      level: this.getScoreLevel(score, 15)
    };
  }

  /**
   * 评估语言礼仪（20分）
   */
  evaluateEtiquette(text, baseQuality) {
    let score = Math.round(baseQuality * 0.20); // 转换为20分制
    let reason = '';
    let deduction = [];

    // 口头禅和犹豫词
    const fillers = [
      '嗯', '啊', '那个', '然后', '就是', '怎么说呢',
      '呃', '哦', '好吧', '对吧', '是吧', '那个'
    ];
    const fillerCount = fillers.filter(f => text.includes(f)).length;

    // 礼貌用语
    const politeWords = ['谢谢', '感谢', '请', '麻烦', '辛苦', '您好'];
    const hasPolite = politeWords.some(p => text.includes(p));

    // 职业化用语
    const professionalSpeech = [
      '我认为', '我相信', '我的看法是', '根据我的经验',
      '从我的角度', '我理解', '我的优势', '我觉得'
    ];
    const hasProfessional = professionalSpeech.some(p => text.includes(p));

    // 评分
    if (fillerCount === 0 && hasPolite) {
      score = Math.min(20, score + 5);
      reason = '表达流畅有礼貌，语言专业得体';
    } else if (fillerCount <= 2 && hasProfessional) {
      score = Math.min(20, score + 3);
      reason = '语言表达较为专业';
    } else if (fillerCount >= 5) {
      score = Math.max(6, score - 6);
      reason = '口头禅过多，影响表达流畅性';
      deduction.push('口头禅过多');
    } else if (fillerCount >= 3) {
      score = Math.max(8, score - 3);
      reason = '存在少量口头禅';
      deduction.push('有口头禅');
    }

    // 语速/长度异常
    const charPerSecond = text.length / 5; // 假设5秒回答时间
    if (charPerSecond > 80) {
      score = Math.max(6, score - 3);
      reason = reason || '语速过快，表达不够从容';
      deduction.push('表达不够从容');
    }

    // 语言简洁性
    if (text.length > 500 && !text.includes('\n')) {
      score = Math.max(8, score - 2);
      reason = reason || '表达过于冗长';
      deduction.push('表达冗长');
    }

    return {
      score: Math.round(score),
      maxScore: 20,
      reason: reason || '语言礼仪表现中等',
      deduction: deduction,
      level: this.getScoreLevel(score, 20)
    };
  }

  /**
   * 获取分数等级
   */
  getScoreLevel(score, maxScore) {
    const ratio = score / maxScore;
    if (ratio >= 0.85) return 'excellent';
    if (ratio >= 0.7) return 'good';
    if (ratio >= 0.55) return 'average';
    if (ratio >= 0.4) return 'pass';
    if (ratio >= 0.25) return 'weak';
    return 'poor';
  }

  /**
   * 计算当前总得分和各项平均分
   */
  calculateCurrentScore() {
    if (this.evaluationHistory.length === 0) {
      return {
        overall: 0,
        dimensions: {
          professional: { avg: 0, current: 0, max: 25 },
          logic: { avg: 0, current: 0, max: 20 },
          adaptability: { avg: 0, current: 0, max: 20 },
          professionalism: { avg: 0, current: 0, max: 15 },
          etiquette: { avg: 0, current: 0, max: 20 }
        },
        questionCount: 0
      };
    }

    const totals = {
      professional: 0,
      logic: 0,
      adaptability: 0,
      professionalism: 0,
      etiquette: 0
    };

    let totalScoreSum = 0;

    this.evaluationHistory.forEach(eq => {
      totals.professional += eq.dimensions.professional.score;
      totals.logic += eq.dimensions.logic.score;
      totals.adaptability += eq.dimensions.adaptability.score;
      totals.professionalism += eq.dimensions.professionalism.score;
      totals.etiquette += eq.dimensions.etiquette.score;
      totalScoreSum += eq.totalScore;
    });

    const count = this.evaluationHistory.length;

    // 获取最新一题的分数（用于current字段）
    const latest = this.evaluationHistory[this.evaluationHistory.length - 1];

    return {
      overall: Math.round(totalScoreSum / count),
      dimensions: {
        professional: {
          avg: Math.round(totals.professional / count),
          current: latest.dimensions.professional.score,
          max: 25
        },
        logic: {
          avg: Math.round(totals.logic / count),
          current: latest.dimensions.logic.score,
          max: 20
        },
        adaptability: {
          avg: Math.round(totals.adaptability / count),
          current: latest.dimensions.adaptability.score,
          max: 20
        },
        professionalism: {
          avg: Math.round(totals.professionalism / count),
          current: latest.dimensions.professionalism.score,
          max: 15
        },
        etiquette: {
          avg: Math.round(totals.etiquette / count),
          current: latest.dimensions.etiquette.score,
          max: 20
        }
      },
      questionCount: count
    };
  }

  /**
   * 获取评级（6档）
   */
  getGrade(score) {
    if (score >= 90) return { label: '优秀', class: 'excellent', color: '#10b981', desc: '面试表现卓越' };
    if (score >= 80) return { label: '良好', class: 'good', color: '#3b82f6', desc: '面试表现不错' };
    if (score >= 70) return { label: '中等', class: 'average', color: '#6b7280', desc: '面试表现一般' };
    if (score >= 60) return { label: '及格', class: 'pass', color: '#f59e0b', desc: '需要继续努力' };
    if (score >= 40) return { label: '薄弱', class: 'weak', color: '#f97316', desc: '表现较为薄弱' };
    return { label: '较差', class: 'poor', color: '#ef4444', desc: '建议重新准备' };
  }

  /**
   * 生成综合报告
   */
  generateReport(conversationData, scenario, config) {
    const currentScore = this.calculateCurrentScore();

    const report = {
      scenario: scenario,
      config: config,
      timestamp: Date.now(),
      overallScore: currentScore.overall,
      dimensions: currentScore.dimensions,
      evaluations: this.evaluationHistory,
      grade: this.getGrade(currentScore.overall),
      strengths: this.identifyStrengths(currentScore.dimensions),
      weaknesses: this.identifyWeaknesses(currentScore.dimensions),
      suggestions: this.generateSuggestions(currentScore.dimensions, scenario),
      conversationSummary: this.summarizeConversation(conversationData),
      fullConversation: conversationData,
      comment: null
    };

    return report;
  }

  prepareReportPrompt(report) {
    const template = window.INTERVIEW_CONFIG.REPORT_PROMPT_TEMPLATE;

    const position = report.config.position || '未指定';
    const major = report.config.major || '未指定';
    const difficulty = report.config.difficulty || 'medium';
    const style = report.config.style || 'normal';

    const conversationText = report.fullConversation.map(c => {
      const role = c.role === 'user' ? '求职者' : '面试官';
      return `${role}: ${c.content}`;
    }).join('\n');

    const scoresText = Object.entries(report.dimensions).map(([key, dim]) => {
      const dimConfig = this.dimensions[key];
      return `${dimConfig.name}: ${Math.round(dim.avg)} / ${dim.max}分 (得分率${Math.round((dim.avg / dim.max) * 100)}%)`;
    }).join('\n');

    return template
      .replace('{position}', position)
      .replace('{major}', major)
      .replace('{difficulty}', difficulty)
      .replace('{style}', style)
      .replace('{conversation}', conversationText)
      .replace('{scores}', scoresText);
  }

  /**
   * 识别优势
   */
  identifyStrengths(dimensions) {
    const strengths = [];
    const threshold = 0.75; // 得分率75%以上为优势

    if (dimensions.professional.avg / dimensions.professional.max >= threshold) {
      strengths.push({
        dimension: '专业匹配度',
        icon: '💼',
        title: '专业能力扎实',
        desc: '回答体现了良好的专业素养，与岗位要求契合度高'
      });
    }

    if (dimensions.logic.avg / dimensions.logic.max >= threshold) {
      strengths.push({
        dimension: '逻辑表达',
        icon: '🧠',
        title: '思维清晰有条理',
        desc: '回答结构化强，能清晰阐述观点和经历'
      });
    }

    if (dimensions.adaptability.avg / dimensions.adaptability.max >= threshold) {
      strengths.push({
        dimension: '临场应变',
        icon: '⚡',
        title: '应变能力强',
        desc: '面对追问从容应对，展现良好的思考能力'
      });
    }

    if (dimensions.professionalism.avg / dimensions.professionalism.max >= threshold) {
      strengths.push({
        dimension: '职业素养',
        icon: '🎯',
        title: '职业素养良好',
        desc: '体现了责任心、团队合作和持续学习的意识'
      });
    }

    if (dimensions.etiquette.avg / dimensions.etiquette.max >= threshold) {
      strengths.push({
        dimension: '语言礼仪',
        icon: '💬',
        title: '表达专业得体',
        desc: '语言流畅有礼貌，给面试官良好印象'
      });
    }

    return strengths;
  }

  /**
   * 识别劣势
   */
  identifyWeaknesses(dimensions) {
    const weaknesses = [];
    const threshold = 0.55; // 得分率55%以下为劣势

    if (dimensions.professional.avg / dimensions.professional.max < threshold) {
      weaknesses.push({
        dimension: '专业匹配度',
        icon: '💼',
        title: '专业深度不足',
        desc: '建议增加具体项目经验和量化成果展示'
      });
    }

    if (dimensions.logic.avg / dimensions.logic.max < threshold) {
      weaknesses.push({
        dimension: '逻辑表达',
        icon: '🧠',
        title: '逻辑结构需加强',
        desc: '建议使用STAR法则组织回答，让结构更清晰'
      });
    }

    if (dimensions.adaptability.avg / dimensions.adaptability.max < threshold) {
      weaknesses.push({
        dimension: '临场应变',
        icon: '⚡',
        title: '应变能力需提高',
        desc: '面对追问时需要更冷静思考，展现深度'
      });
    }

    if (dimensions.professionalism.avg / dimensions.professionalism.max < threshold) {
      weaknesses.push({
        dimension: '职业素养',
        icon: '🎯',
        title: '职业素养需提升',
        desc: '建议增强责任心、团队合作和持续学习意识'
      });
    }

    if (dimensions.etiquette.avg / dimensions.etiquette.max < threshold) {
      weaknesses.push({
        dimension: '语言礼仪',
        icon: '💬',
        title: '语言表达需优化',
        desc: '建议减少口头禅，保持更专业的表达方式'
      });
    }

    return weaknesses;
  }

  /**
   * 获取需要专项训练的短板维度（得分最低的1-2项）
   * @param {Object} dimensions - 五维评分数据
   * @param {number} count - 返回数量，默认2
   * @returns {Array} 短板维度数组
   */
  getWeakDimensions(dimensions, count = 2) {
    const dimensionConfigs = {
      professional: { name: '专业匹配度', icon: '💼', max: 25, unit: '分' },
      logic: { name: '逻辑表达', icon: '🧠', max: 20, unit: '分' },
      adaptability: { name: '临场应变', icon: '⚡', max: 20, unit: '分' },
      professionalism: { name: '职业素养', icon: '🎯', max: 15, unit: '分' },
      etiquette: { name: '语言礼仪', icon: '💬', max: 20, unit: '分' }
    };

    const dimensionList = Object.entries(dimensions).map(([key, data]) => {
      const config = dimensionConfigs[key];
      const ratio = data.avg / data.max;
      return {
        id: key,
        name: config.name,
        icon: config.icon,
        score: Math.round(data.avg),
        max: config.max,
        ratio: Math.round(ratio * 100),
        unit: config.unit
      };
    });

    dimensionList.sort((a, b) => a.ratio - b.ratio);

    return dimensionList.slice(0, count);
  }

  /**
   * 生成改进建议
   */
  generateSuggestions(dimensions, scenario) {
    const suggestions = [];

    // 按得分率排序，最低的优先建议
    const sortedDims = [
      { id: 'professional', ...dimensions.professional, name: '专业匹配度' },
      { id: 'logic', ...dimensions.logic, name: '逻辑表达' },
      { id: 'adaptability', ...dimensions.adaptability, name: '临场应变' },
      { id: 'professionalism', ...dimensions.professionalism, name: '职业素养' },
      { id: 'etiquette', ...dimensions.etiquette, name: '语言礼仪' }
    ].sort((a, b) => (a.avg / a.max) - (b.avg / b.max));

    // 生成3条建议
    sortedDims.slice(0, 3).forEach(dim => {
      const ratio = dim.avg / dim.max;
      if (ratio < 0.7) {
        suggestions.push(this.getSuggestionForDimension(dim.id, ratio));
      }
    });

    return suggestions.slice(0, 3);
  }

  /**
   * 获取特定维度的建议
   */
  getSuggestionForDimension(dimId, currentLevel) {
    const allSuggestions = {
      professional: [
        {
          title: '增加具体案例和量化数据',
          content: '在回答中加入具体的数字、百分比、时间等细节，让成果更具说服力',
          example: '不要说"提高了效率"，而说"将响应时间从500ms降低到200ms，性能提升60%"'
        },
        {
          title: '展示专业深度',
          content: '通过具体项目经历展示专业知识，体现你对领域的理解',
          example: '描述你在项目中遇到的技术难点及解决方案'
        }
      ],
      logic: [
        {
          title: '使用STAR法则组织回答',
          content: '按照Situation（情境）、Task（任务）、Action（行动）、Result（结果）的顺序组织内容',
          example: '当时我作为项目负责人（S），需要在两周内完成系统上线（T），我首先分析了技术难点，然后制定了每日任务清单（A），最终提前一天完成了项目（R）'
        },
        {
          title: '使用连接词增强逻辑',
          content: '使用"首先、其次、最后"或"因为、所以、因此"等连接词让回答更连贯',
          example: '首先，我分析了问题的核心原因；其次，我制定了三个解决方案；最后，我选择了最优方案执行'
        }
      ],
      adaptability: [
        {
          title: '培养思考习惯',
          content: '遇到不熟悉的问题时，不要急于开口，可以稍作思考再回答',
          example: '"这个问题很好，让我想想...我认为可以从以下几个方面来分析"'
        },
        {
          title: '展示学习意愿',
          content: '面对追问时，即使不确定也要展现思考过程和学习意愿',
          example: '虽然这个领域我接触不多，但根据我的理解...'
        }
      ],
      professionalism: [
        {
          title: '增强责任心意识',
          content: '在回答中体现主动承担责任的态度',
          example: '使用"我负责"、"我主动承担"等表述'
        },
        {
          title: '展现团队合作精神',
          content: '强调与团队的协作和沟通',
          example: '描述如何与团队成员配合完成任务'
        }
      ],
      etiquette: [
        {
          title: '减少口头禅',
          content: '注意避免"嗯、啊、那个、然后"等口头禅，保持表达流畅',
          example: '可以通过录音练习来发现自己常用的口头禅并刻意改正'
        },
        {
          title: '保持专业自信',
          content: '使用肯定性语言，避免过度谦虚或使用不确定的措辞',
          example: '不要说"可能我不太确定"，而说"我的看法是..."'
        }
      ]
    };

    const dimSuggestions = allSuggestions[dimId] || allSuggestions.professional;
    return currentLevel < 0.5 ? dimSuggestions[1] : dimSuggestions[0];
  }

  /**
   * 总结对话
   */
  summarizeConversation(conversationData) {
    return {
      totalQuestions: this.evaluationHistory.length,
      totalAnswers: conversationData.filter(c => c.role === 'user').length,
      totalDuration: conversationData.length > 0 ?
        (Date.now() - conversationData[0].timestamp) / 1000 : 0
    };
  }

  /**
   * 重置评分历史
   */
  reset() {
    this.evaluationHistory = [];
  }
}

// 导出评分器类
window.InterviewScorer = InterviewScorer;

/* ===================================
   五边形雷达图组件 - 纯原生Canvas实现
   =================================== */

class RadarChart {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error('Canvas element not found:', canvasId);
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.options = {
      width: 300,
      height: 300,
      padding: 20,
      layers: 5,
      theme: 'dark',
      ...options
    };

    this.data = [];
    this.dimensions = [
      { key: 'professional', name: '专业匹配度', max: 25 },
      { key: 'logic', name: '逻辑表达', max: 20 },
      { key: 'adaptability', name: '临场应变', max: 20 },
      { key: 'professionalism', name: '职业素养', max: 15 },
      { key: 'etiquette', name: '语言礼仪', max: 20 }
    ];

    this.hoverIndex = -1;
    this.animationProgress = 0;
    this.animatedData = [];

    this.resize();
    this.bindEvents();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height);
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.ctx.scale(dpr, dpr);

    this.width = size;
    this.height = size;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.radius = (Math.min(this.width, this.height) - this.options.padding * 2) / 2;
  }

  bindEvents() {
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseleave', () => this.handleMouseLeave());
    window.addEventListener('resize', () => this.handleResize());
  }

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (e.clientX - rect.left) * dpr;
    const y = (e.clientY - rect.top) * dpr;

    const points = this.calculatePoints(this.data);
    const hoverRadius = 15 * dpr;

    for (let i = 0; i < points.length; i++) {
      const dx = points[i].x - x;
      const dy = points[i].y - y;
      if (dx * dx + dy * dy <= hoverRadius * hoverRadius) {
        this.hoverIndex = i;
        this.canvas.style.cursor = 'pointer';
        this.draw();
        return;
      }
    }

    this.hoverIndex = -1;
    this.canvas.style.cursor = 'default';
    this.draw();
  }

  handleMouseLeave() {
    this.hoverIndex = -1;
    this.canvas.style.cursor = 'default';
    this.draw();
  }

  handleResize() {
    this.resize();
    this.draw();
  }

  setTheme(theme) {
    this.options.theme = theme;
    this.draw();
  }

  setData(data) {
    this.data = data;
    this.animationProgress = 0;
    this.animatedData = data.map(() => 0);
    this.animate();
  }

  animate() {
    if (this.animationProgress >= 1) {
      this.animatedData = [...this.data];
      this.draw();
      return;
    }

    this.animationProgress += 0.05;
    const eased = this.easeOutQuad(this.animationProgress);

    this.animatedData = this.data.map((value, index) => {
      return value * eased;
    });

    this.draw();
    requestAnimationFrame(() => this.animate());
  }

  easeOutQuad(t) {
    return t * (2 - t);
  }

  calculatePoints(values) {
    const angleStep = (Math.PI * 2) / this.dimensions.length;
    const startAngle = -Math.PI / 2;

    return values.map((value, index) => {
      const angle = startAngle + index * angleStep;
      const dimension = this.dimensions[index];
      const ratio = value / dimension.max;
      const r = this.radius * ratio;

      return {
        x: this.centerX + r * Math.cos(angle),
        y: this.centerY + r * Math.sin(angle),
        value: value,
        max: dimension.max,
        ratio: ratio
      };
    });
  }

  draw() {
    if (!this.canvas) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    const isDark = this.options.theme === 'dark';
    const textColor = isDark ? '#f8fafc' : '#1e293b';
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const axisColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
    const fillColor = 'rgba(59, 130, 246, 0.3)';
    const strokeColor = '#3b82f6';

    this.drawGrid(gridColor, axisColor, textColor);
    this.drawData(fillColor, strokeColor);
    this.drawLabels(textColor);
    this.drawHoverTooltip(textColor);
  }

  drawGrid(gridColor, axisColor, textColor) {
    const ctx = this.ctx;
    const angleStep = (Math.PI * 2) / this.dimensions.length;
    const startAngle = -Math.PI / 2;

    // 绘制五层网格
    for (let layer = 1; layer <= this.options.layers; layer++) {
      const ratio = layer / this.options.layers;
      const r = this.radius * ratio;

      ctx.beginPath();
      for (let i = 0; i < this.dimensions.length; i++) {
        const angle = startAngle + i * angleStep;
        const x = this.centerX + r * Math.cos(angle);
        const y = this.centerY + r * Math.sin(angle);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // 绘制刻度标签
      if (layer === this.options.layers) {
        ctx.font = '10px "Noto Sans SC", sans-serif';
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.fillText('100%', this.centerX, this.centerY - r - 5);
      }
    }

    // 绘制轴
    for (let i = 0; i < this.dimensions.length; i++) {
      const angle = startAngle + i * angleStep;
      const x = this.centerX + this.radius * Math.cos(angle);
      const y = this.centerY + this.radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(this.centerX, this.centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = axisColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  drawData(fillColor, strokeColor) {
    const ctx = this.ctx;
    const points = this.calculatePoints(this.animatedData);

    if (points.length === 0) return;

    // 绘制填充区域
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      if (i === 0) {
        ctx.moveTo(points[i].x, points[i].y);
      } else {
        ctx.lineTo(points[i].x, points[i].y);
      }
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();

    // 绘制边框
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      if (i === 0) {
        ctx.moveTo(points[i].x, points[i].y);
      } else {
        ctx.lineTo(points[i].x, points[i].y);
      }
    }
    ctx.closePath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 绘制顶点
    const isDark = this.options.theme === 'dark';

    points.forEach((point, index) => {
      const isHovered = this.hoverIndex === index;
      const radius = isHovered ? 8 : 5;

      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);

      if (isHovered) {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      }

      ctx.fillStyle = strokeColor;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(point.x, point.y, radius - 2, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#f8fafc' : '#ffffff';
      ctx.fill();

      // 绘制顶点数值
      ctx.font = 'bold 12px "Noto Sans SC", sans-serif';
      ctx.fillStyle = isDark ? '#f8fafc' : '#1e293b';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.round(point.value), point.x, point.y);
    });
  }

  drawLabels(textColor) {
    const ctx = this.ctx;
    const angleStep = (Math.PI * 2) / this.dimensions.length;
    const startAngle = -Math.PI / 2;
    const labelRadius = this.radius + 25;

    ctx.font = '12px "Noto Sans SC", sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';

    this.dimensions.forEach((dim, index) => {
      const angle = startAngle + index * angleStep;
      const x = this.centerX + labelRadius * Math.cos(angle);
      const y = this.centerY + labelRadius * Math.sin(angle);

      ctx.textBaseline = angle > Math.PI / 2 || angle < -Math.PI / 2 ? 'top' : 'bottom';
      if (Math.abs(Math.sin(angle)) < 0.1) {
        ctx.textBaseline = 'middle';
      }

      ctx.fillText(dim.name, x, y);
    });
  }

  drawHoverTooltip(textColor) {
    if (this.hoverIndex === -1) return;

    const ctx = this.ctx;
    const point = this.calculatePoints(this.animatedData)[this.hoverIndex];
    const dim = this.dimensions[this.hoverIndex];

    const tooltipWidth = 120;
    const tooltipHeight = 45;
    const padding = 8;

    let x = point.x + 15;
    let y = point.y - tooltipHeight / 2;

    // 边界检查
    if (x + tooltipWidth > this.width) {
      x = point.x - tooltipWidth - 15;
    }
    if (y < 10) y = 10;
    if (y + tooltipHeight > this.height - 10) {
      y = this.height - tooltipHeight - 10;
    }

    // 绘制背景
    const isDark = this.options.theme === 'dark';
    const bgColor = isDark ? 'rgba(10, 22, 40, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    const borderColor = '#3b82f6';

    ctx.beginPath();
    this.roundRect(ctx, x, y, tooltipWidth, tooltipHeight, 6);
    ctx.fillStyle = bgColor;
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    // 绘制箭头
    ctx.beginPath();
    const arrowX = x < point.x ? x + tooltipWidth : x;
    ctx.moveTo(arrowX, point.y);
    ctx.lineTo(arrowX + (x < point.x ? 8 : -8), point.y - 6);
    ctx.lineTo(arrowX + (x < point.x ? 8 : -8), point.y + 6);
    ctx.closePath();
    ctx.fillStyle = bgColor;
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.stroke();

    // 绘制内容
    ctx.font = 'bold 13px "Noto Sans SC", sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(dim.name, x + padding, y + padding);

    ctx.font = '12px "Noto Sans SC", sans-serif';
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(`${Math.round(point.value)} / ${dim.max}`, x + padding, y + padding + 20);
  }

  roundRect(ctx, x, y, width, height, radius) {
    if (ctx.roundRect) {
      ctx.roundRect(x, y, width, height, radius);
    } else {
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }
  }

  destroy() {
    window.removeEventListener('resize', () => this.handleResize());
    this.canvas.removeEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.removeEventListener('mouseleave', () => this.handleMouseLeave());
  }
}

// 导出雷达图类
window.RadarChart = RadarChart;