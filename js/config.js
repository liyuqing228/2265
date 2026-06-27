/* ===================================
   AI Interview Simulator - Configuration
   =================================== */

// ===================================
// 三维标签题库系统（专业/场景/题型）
// ===================================

/**
 * 题库数据结构说明：
 * - majorTags: 专业标签数组，支持多专业
 * - scenarioTags: 场景标签数组，支持多场景
 * - typeTags: 题型标签数组（behavioral/technical/situational/roleplay）
 * - difficulty: 难度等级（easy/medium/hard）
 * - text: 题目内容
 * - followUp: 追问列表
 */
const TAGGED_QUESTION_BANK = [
  // ===================================
  // 通用类题目（所有专业、所有场景）
  // ===================================
  {
    id: 'general_001',
    majorTags: ['all'],
    scenarioTags: ['campus', 'tech', 'graduate', 'civil', 'hospital', 'english', 'art', 'teacher'],
    typeTags: ['behavioral'],
    difficulty: 'easy',
    text: '请简单介绍一下你自己，包括你的教育背景和专业方向。',
    followUp: []
  },
  {
    id: 'general_002',
    majorTags: ['all'],
    scenarioTags: ['campus', 'tech', 'graduate', 'civil', 'hospital', 'english', 'art', 'teacher'],
    typeTags: ['behavioral'],
    difficulty: 'easy',
    text: '你为什么选择这个专业？你对这个领域有什么理解？',
    followUp: []
  },
  {
    id: 'general_003',
    majorTags: ['all'],
    scenarioTags: ['campus', 'tech', 'graduate', 'civil', 'hospital', 'english', 'art', 'teacher'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: '请描述一次你在团队合作中遇到冲突的经历，你是如何处理的？',
    followUp: [
      { text: '当时是什么情况？为什么会产生冲突？' },
      { text: '你当时的目标是什么？想要达成什么结果？' },
      { text: '你具体采取了哪些行动来解决这个冲突？' },
      { text: '最终冲突是如何解决的？团队关系有什么变化吗？' }
    ]
  },
  {
    id: 'general_004',
    majorTags: ['all'],
    scenarioTags: ['campus', 'tech', 'graduate', 'civil', 'hospital', 'english', 'art', 'teacher'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: '你认为自己最大的优点和缺点是什么？',
    followUp: [
      { text: '这个优点在什么情况下最能体现？' },
      { text: '你计划如何改进这个缺点？' }
    ]
  },
  {
    id: 'general_005',
    majorTags: ['all'],
    scenarioTags: ['campus', 'tech', 'graduate', 'civil', 'hospital', 'english', 'art', 'teacher'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你发现同事的工作方式有问题，你会怎么做？',
    followUp: []
  },

  // ===================================
  // 经管类专用题目
  // ===================================
  {
    id: 'business_001',
    majorTags: ['金融学', '经济学', '会计学', '工商管理', '市场营销', '财务管理', '国际贸易'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对当前经济形势的看法，以及它对我们这个行业的影响。',
    followUp: [
      { text: '你认为这种影响会持续多久？' },
      { text: '企业应该如何应对这种变化？' }
    ]
  },
  {
    id: 'business_002',
    majorTags: ['金融学', '会计学', '财务管理'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请分析一个你熟悉的财务报表案例，说说你从中发现了什么问题？',
    followUp: [
      { text: '这些问题可能对企业造成什么影响？' },
      { text: '你会提出什么改进建议？' }
    ]
  },
  {
    id: 'business_003',
    majorTags: ['市场营销', '工商管理'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '如果让你负责一个新产品的市场推广，你会制定什么样的营销策略？',
    followUp: [
      { text: '你会如何评估营销效果？' },
      { text: '预算有限的情况下，你会如何优化策略？' }
    ]
  },
  {
    id: 'business_004',
    majorTags: ['人力资源管理', '工商管理'],
    scenarioTags: ['campus', 'civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你是HR，如何评估一个候选人的综合素质？',
    followUp: [
      { text: '你会重点关注哪些方面？' },
      { text: '如何避免主观偏见？' }
    ]
  },
  {
    id: 'business_005',
    majorTags: ['金融学', '经济学'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释什么是货币政策的传导机制？目前我国的货币政策主要工具是什么？',
    followUp: [
      { text: '货币政策是如何影响实体经济的？' },
      { text: '近年来央行使用过哪些创新性货币政策工具？' }
    ]
  },
  {
    id: 'business_006',
    majorTags: ['金融学', '财务管理'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请谈谈你对杜邦分析法的理解，如何运用杜邦分析来评估企业的财务状况？',
    followUp: [
      { text: '杜邦分析法的核心指标是什么？' },
      { text: '如果净资产收益率下降，如何分析原因？' }
    ]
  },
  {
    id: 'business_007',
    majorTags: ['会计学', '财务管理'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请解释权责发生制和收付实现制的区别，为什么企业通常采用权责发生制？',
    followUp: [
      { text: '两种会计基础对利润表有什么影响？' },
      { text: '在什么情况下收付实现制更适用？' }
    ]
  },
  {
    id: 'business_008',
    majorTags: ['市场营销', '工商管理'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈4P营销理论和4C营销理论的区别，在互联网时代你更倾向于哪种？',
    followUp: [
      { text: '4C理论如何应用在数字营销中？' },
      { text: '你认为未来营销理论的发展趋势是什么？' }
    ]
  },
  {
    id: 'business_009',
    majorTags: ['金融学'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释CAPM模型（资本资产定价模型）的核心思想，它有哪些假设条件？',
    followUp: [
      { text: '如何计算股票的预期收益率？' },
      { text: 'CAPM模型在实际应用中有哪些局限性？' }
    ]
  },
  {
    id: 'business_010',
    majorTags: ['国际贸易'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请分析中美贸易摩擦对我国进出口企业的影响，企业应该如何应对？',
    followUp: [
      { text: '贸易摩擦的主要原因是什么？' },
      { text: '企业可以采取哪些措施降低贸易风险？' }
    ]
  },
  {
    id: 'business_011',
    majorTags: ['人力资源管理'],
    scenarioTags: ['campus', 'civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果团队中有一位老员工不愿意接受新的工作方式，你作为HR会如何处理？',
    followUp: [
      { text: '你会如何与这位员工沟通？' },
      { text: '如何平衡老员工的经验价值和团队的创新需求？' }
    ]
  },
  {
    id: 'business_012',
    majorTags: ['经济学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请谈谈你对宏观经济学中IS-LM模型的理解，它如何解释经济波动？',
    followUp: [
      { text: 'IS曲线和LM曲线分别代表什么？' },
      { text: '财政政策和货币政策在IS-LM模型中如何发挥作用？' }
    ]
  },

  // ===================================
  // 计算机/工科类专用题目
  // ===================================
  {
    id: 'engineering_001',
    majorTags: ['计算机科学与技术', '软件工程', '人工智能', '数据科学与大数据技术'],
    scenarioTags: ['campus', 'tech', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请介绍一下你最熟悉的一个技术栈，以及你在项目中是如何应用的。',
    followUp: [
      { text: '这个技术栈有什么优缺点？' },
      { text: '如果让你重新选择，你会选择什么技术？为什么？' }
    ]
  },
  {
    id: 'engineering_002',
    majorTags: ['计算机科学与技术', '软件工程', '人工智能'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请描述一个你解决过的最复杂的技术问题，你是如何分析和解决的？',
    followUp: [
      { text: '你用了什么方法来定位问题？' },
      { text: '从这次经历中你学到了什么？' }
    ]
  },
  {
    id: 'engineering_003',
    majorTags: ['计算机科学与技术', '软件工程', '人工智能'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释一下你理解的算法复杂度，并举例说明时间复杂度和空间复杂度的权衡。',
    followUp: [
      { text: '在实际项目中，你会如何权衡时间和空间？' },
      { text: '能举一个具体的例子吗？' }
    ]
  },
  {
    id: 'engineering_004',
    majorTags: ['电子信息工程', '通信工程', '自动化', '机械工程', '电气工程'],
    scenarioTags: ['campus', 'tech', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请描述一个你参与过的工程项目，你在其中扮演了什么角色？',
    followUp: [
      { text: '项目中遇到了哪些技术难点？' },
      { text: '你是如何解决这些问题的？' }
    ]
  },
  {
    id: 'engineering_005',
    majorTags: ['计算机科学与技术', '软件工程'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释TCP三次握手和四次挥手的过程，为什么需要三次握手而不是两次？',
    followUp: [
      { text: '三次握手过程中每一步的目的是什么？' },
      { text: '如果第二次握手失败会发生什么？' }
    ]
  },
  {
    id: 'engineering_006',
    majorTags: ['计算机科学与技术', '软件工程'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请谈谈你对分布式系统CAP定理的理解，在实际项目中如何权衡一致性和可用性？',
    followUp: [
      { text: 'CAP定理的三个要素分别是什么？' },
      { text: '举例说明在什么场景下你会选择牺牲一致性？' }
    ]
  },
  {
    id: 'engineering_007',
    majorTags: ['计算机科学与技术', '人工智能', '数据科学与大数据技术'],
    scenarioTags: ['campus', 'tech', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释梯度下降算法的原理，批量梯度下降、随机梯度下降和小批量梯度下降有什么区别？',
    followUp: [
      { text: '梯度下降中学习率的选择有什么影响？' },
      { text: '如何处理梯度消失和梯度爆炸问题？' }
    ]
  },
  {
    id: 'engineering_008',
    majorTags: ['计算机科学与技术', '软件工程'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请解释RESTful API的设计原则，如何设计一个好的API接口？',
    followUp: [
      { text: 'RESTful API常用的HTTP方法有哪些？分别用于什么场景？' },
      { text: '如何处理API版本控制？' }
    ]
  },
  {
    id: 'engineering_009',
    majorTags: ['计算机科学与技术', '数据科学与大数据技术'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对数据库索引的理解，什么情况下需要创建索引？什么情况下不需要？',
    followUp: [
      { text: '索引的优缺点是什么？' },
      { text: '如何优化SQL查询性能？' }
    ]
  },
  {
    id: 'engineering_010',
    majorTags: ['电子信息工程', '通信工程'],
    scenarioTags: ['campus', 'tech', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释傅里叶变换的原理及其在信号处理中的应用，快速傅里叶变换（FFT）有什么优势？',
    followUp: [
      { text: '傅里叶变换和拉普拉斯变换有什么区别？' },
      { text: '在实际项目中你用过哪些信号处理算法？' }
    ]
  },
  {
    id: 'engineering_011',
    majorTags: ['机械工程', '自动化'],
    scenarioTags: ['campus', 'tech', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对PID控制算法的理解，如何调整PID参数？',
    followUp: [
      { text: 'P、I、D分别代表什么？各有什么作用？' },
      { text: '在什么情况下需要使用模糊控制或自适应控制？' }
    ]
  },
  {
    id: 'engineering_012',
    majorTags: ['电气工程'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请解释三相交流电的原理，为什么工业用电普遍采用三相制？',
    followUp: [
      { text: '三相电的星形接法和三角形接法有什么区别？' },
      { text: '如何计算三相电路的功率？' }
    ]
  },
  {
    id: 'engineering_013',
    majorTags: ['人工智能'],
    scenarioTags: ['campus', 'tech', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请谈谈你对深度学习中卷积神经网络（CNN）的理解，卷积层和池化层的作用是什么？',
    followUp: [
      { text: 'CNN为什么适合处理图像数据？' },
      { text: '你了解哪些常用的CNN架构？' }
    ]
  },
  {
    id: 'engineering_014',
    majorTags: ['计算机科学与技术', '软件工程'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你发现线上服务性能下降，你会如何排查问题？',
    followUp: [
      { text: '你会关注哪些指标？' },
      { text: '如何定位性能瓶颈？' }
    ]
  },

  // ===================================
  // 理学类专用题目
  // ===================================
  {
    id: 'science_001',
    majorTags: ['数学', '物理学', '化学', '生物学', '环境科学', '地质学', '心理学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请介绍一下你研究领域的一个核心理论或概念，以及它的实际应用。',
    followUp: [
      { text: '这个理论有什么局限性？' },
      { text: '你认为未来的发展方向是什么？' }
    ]
  },
  {
    id: 'science_002',
    majorTags: ['数学', '物理学', '化学', '生物学'],
    scenarioTags: ['graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请描述一个你做过的实验研究，你的研究假设是什么？结果如何？',
    followUp: [
      { text: '实验过程中遇到了哪些困难？' },
      { text: '这个研究有什么实际意义？' }
    ]
  },
  {
    id: 'science_003',
    majorTags: ['心理学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对某个心理学理论的理解，以及它在现实生活中的应用。',
    followUp: [
      { text: '这个理论有什么争议？' },
      { text: '你会如何应用这个理论？' }
    ]
  },
  {
    id: 'science_004',
    majorTags: ['数学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释微积分的基本定理，它在数学分析中有什么重要意义？',
    followUp: [
      { text: '微积分基本定理的两个部分分别是什么？' },
      { text: '如何利用微积分解决实际问题？' }
    ]
  },
  {
    id: 'science_005',
    majorTags: ['物理学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释牛顿力学和量子力学的区别，在什么尺度下需要使用量子力学？',
    followUp: [
      { text: '量子力学的基本假设是什么？' },
      { text: '量子纠缠是什么？有什么应用前景？' }
    ]
  },
  {
    id: 'science_006',
    majorTags: ['化学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请解释化学平衡的原理，影响化学平衡的因素有哪些？',
    followUp: [
      { text: '勒沙特列原理是什么？' },
      { text: '如何计算化学平衡常数？' }
    ]
  },
  {
    id: 'science_007',
    majorTags: ['生物学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释DNA复制的过程，DNA复制为什么是半保留复制？',
    followUp: [
      { text: 'DNA复制需要哪些酶的参与？' },
      { text: '端粒酶的作用是什么？' }
    ]
  },
  {
    id: 'science_008',
    majorTags: ['环境科学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对气候变化的理解，温室效应是如何形成的？',
    followUp: [
      { text: '主要的温室气体有哪些？' },
      { text: '应对气候变化的措施有哪些？' }
    ]
  },
  {
    id: 'science_009',
    majorTags: ['心理学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你发现身边有人出现抑郁倾向，你会如何帮助他？',
    followUp: [
      { text: '如何判断一个人是否需要专业帮助？' },
      { text: '在帮助他人时需要注意什么？' }
    ]
  },
  {
    id: 'science_010',
    majorTags: ['数学'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释线性代数中矩阵的特征值和特征向量的概念，它们有什么实际应用？',
    followUp: [
      { text: '如何计算矩阵的特征值？' },
      { text: '特征值分解和奇异值分解有什么区别？' }
    ]
  },
  {
    id: 'science_011',
    majorTags: ['统计学'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请解释假设检验的原理，P值和显著性水平有什么关系？',
    followUp: [
      { text: '第一类错误和第二类错误分别是什么？' },
      { text: '如何选择合适的检验方法？' }
    ]
  },

  // ===================================
  // 医学类专用题目
  // ===================================
  {
    id: 'medicine_001',
    majorTags: ['临床医学', '口腔医学', '医学影像学', '麻醉学'],
    scenarioTags: ['campus', 'hospital', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请描述一个你参与过的临床病例，你的诊断思路是什么？',
    followUp: [
      { text: '你考虑了哪些鉴别诊断？' },
      { text: '治疗过程中遇到了什么问题？' }
    ]
  },
  {
    id: 'medicine_002',
    majorTags: ['临床医学', '护理学', '药学'],
    scenarioTags: ['campus', 'hospital'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果患者拒绝接受治疗，你会如何沟通？',
    followUp: [
      { text: '你会如何了解患者的顾虑？' },
      { text: '如果患者坚持拒绝，你会怎么做？' }
    ]
  },
  {
    id: 'medicine_003',
    majorTags: ['临床医学', '护理学'],
    scenarioTags: ['campus', 'hospital'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: '请描述一次你与患者沟通的经历，你是如何建立信任的？',
    followUp: [
      { text: '你认为医患沟通中最重要的是什么？' },
      { text: '如何处理患者的情绪？' }
    ]
  },
  {
    id: 'medicine_004',
    majorTags: ['药学'],
    scenarioTags: ['campus', 'hospital'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对药物相互作用的理解，以及临床用药中需要注意什么。',
    followUp: [
      { text: '你能举一个具体的例子吗？' },
      { text: '如何避免药物相互作用？' }
    ]
  },
  {
    id: 'medicine_005',
    majorTags: ['临床医学'],
    scenarioTags: ['campus', 'hospital', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释急性心肌梗死的临床表现和救治原则，溶栓治疗的适应症和禁忌症是什么？',
    followUp: [
      { text: '心肌梗死的心电图特征是什么？' },
      { text: '如何进行心肺复苏？' }
    ]
  },
  {
    id: 'medicine_006',
    majorTags: ['临床医学'],
    scenarioTags: ['campus', 'hospital'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对抗生素合理使用的理解，如何避免抗生素滥用？',
    followUp: [
      { text: '抗生素的分类有哪些？' },
      { text: '细菌耐药性是如何产生的？' }
    ]
  },
  {
    id: 'medicine_007',
    majorTags: ['护理学'],
    scenarioTags: ['campus', 'hospital'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请解释无菌操作的原则和注意事项，在临床护理中如何保证无菌？',
    followUp: [
      { text: '无菌操作的具体流程是什么？' },
      { text: '如果无菌操作被破坏怎么办？' }
    ]
  },
  {
    id: 'medicine_008',
    majorTags: ['临床医学', '护理学'],
    scenarioTags: ['campus', 'hospital'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你发现一位患者在病房内突然晕倒，你会如何处理？',
    followUp: [
      { text: '首先要做什么？' },
      { text: '如何判断患者的病情？' }
    ]
  },
  {
    id: 'medicine_009',
    majorTags: ['药学'],
    scenarioTags: ['campus', 'hospital'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释药物代谢动力学的基本概念，药物的吸收、分布、代谢和排泄分别指什么？',
    followUp: [
      { text: '首过效应是什么？' },
      { text: '影响药物吸收的因素有哪些？' }
    ]
  },
  {
    id: 'medicine_010',
    majorTags: ['临床医学', '口腔医学'],
    scenarioTags: ['campus', 'hospital'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对医患沟通的理解，如何与患者进行有效的沟通？',
    followUp: [
      { text: '医患沟通的技巧有哪些？' },
      { text: '如何处理患者的投诉？' }
    ]
  },
  {
    id: 'medicine_011',
    majorTags: ['中医学'],
    scenarioTags: ['campus', 'hospital'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释中医的阴阳理论和五行学说，它们在中医诊疗中有什么作用？',
    followUp: [
      { text: '中医的辨证论治是什么？' },
      { text: '中西医结合治疗有什么优势？' }
    ]
  },
  {
    id: 'medicine_012',
    majorTags: ['医学影像学'],
    scenarioTags: ['campus', 'hospital'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请解释CT和MRI的原理和区别，在什么情况下选择CT，什么情况下选择MRI？',
    followUp: [
      { text: 'CT和MRI的优缺点分别是什么？' },
      { text: '如何解读影像学报告？' }
    ]
  },

  // ===================================
  // 农林类专用题目
  // ===================================
  {
    id: 'agriculture_001',
    majorTags: ['农学', '园艺', '植物保护', '动物科学', '动物医学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请描述一个你参与过的农业实验或项目，你的研究内容是什么？',
    followUp: [
      { text: '实验结果如何？有什么实际应用价值？' },
      { text: '你在项目中承担了什么责任？' }
    ]
  },
  {
    id: 'agriculture_002',
    majorTags: ['农学', '园艺', '植物保护'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对现代农业发展趋势的看法，以及我们应该如何应对。',
    followUp: [
      { text: '你认为传统农业和现代农业有什么区别？' },
      { text: '如何平衡经济效益和环境保护？' }
    ]
  },
  {
    id: 'agriculture_003',
    majorTags: ['农学', '植物保护'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请解释植物病虫害综合防治的原理，如何合理使用农药？',
    followUp: [
      { text: '生物防治和化学防治有什么区别？' },
      { text: '如何减少农药残留？' }
    ]
  },
  {
    id: 'agriculture_004',
    majorTags: ['动物科学', '动物医学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对动物福利的理解，如何在畜牧业生产中保障动物福利？',
    followUp: [
      { text: '动物福利的基本原则是什么？' },
      { text: '规模化养殖如何兼顾动物福利？' }
    ]
  },
  {
    id: 'agriculture_005',
    majorTags: ['食品科学与工程'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请解释食品加工中的HACCP体系，如何保证食品安全？',
    followUp: [
      { text: 'HACCP的七个原理是什么？' },
      { text: '如何进行食品质量控制？' }
    ]
  },
  {
    id: 'agriculture_006',
    majorTags: ['园艺', '风景园林'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对城市园林绿化的理解，如何选择适合城市环境的植物？',
    followUp: [
      { text: '城市绿化的作用是什么？' },
      { text: '如何设计一个城市公园？' }
    ]
  },

  // ===================================
  // 艺术类专用题目
  // ===================================
  {
    id: 'art_001',
    majorTags: ['视觉传达设计', '环境设计', '产品设计', '动画'],
    scenarioTags: ['campus', 'art'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请展示并讲解一个你最满意的设计作品，你的设计理念是什么？',
    followUp: [
      { text: '你在设计中遇到了哪些挑战？' },
      { text: '如果重新设计，你会如何改进？' }
    ]
  },
  {
    id: 'art_002',
    majorTags: ['视觉传达设计', '环境设计', '产品设计'],
    scenarioTags: ['campus', 'art'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对某个设计风格的理解，以及它在现代设计中的应用。',
    followUp: [
      { text: '这种风格有什么特点？' },
      { text: '你会如何将这种风格应用到实际项目中？' }
    ]
  },
  {
    id: 'art_003',
    majorTags: ['音乐表演', '音乐学', '舞蹈表演'],
    scenarioTags: ['campus', 'art'],
    typeTags: ['roleplay'],
    difficulty: 'medium',
    text: '请展示一段你的专业表演，并谈谈你对这段作品的理解。',
    followUp: [
      { text: '你在表演中想表达什么情感？' },
      { text: '你如何理解这个作品的内涵？' }
    ]
  },
  {
    id: 'art_004',
    majorTags: ['广播电视编导', '影视摄影与制作', '播音与主持艺术'],
    scenarioTags: ['campus', 'art'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请描述一个你参与过的影视或广播项目，你在其中扮演了什么角色？',
    followUp: [
      { text: '项目中遇到了哪些创作难题？' },
      { text: '你是如何解决这些问题的？' }
    ]
  },
  {
    id: 'art_005',
    majorTags: ['视觉传达设计', '产品设计'],
    scenarioTags: ['campus', 'art'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对用户体验设计（UX）的理解，如何在设计中体现以用户为中心？',
    followUp: [
      { text: '用户体验设计的流程是什么？' },
      { text: '如何进行用户研究？' }
    ]
  },
  {
    id: 'art_006',
    majorTags: ['环境设计'],
    scenarioTags: ['campus', 'art'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对可持续设计的理解，如何在室内设计中体现环保理念？',
    followUp: [
      { text: '可持续设计的原则是什么？' },
      { text: '有哪些环保材料可以使用？' }
    ]
  },
  {
    id: 'art_007',
    majorTags: ['动画'],
    scenarioTags: ['campus', 'art'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请解释动画制作的基本流程，二维动画和三维动画有什么区别？',
    followUp: [
      { text: '动画制作需要哪些软件？' },
      { text: '如何制作流畅的动画？' }
    ]
  },
  {
    id: 'art_008',
    majorTags: ['音乐表演', '音乐学'],
    scenarioTags: ['campus', 'art'],
    typeTags: ['roleplay'],
    difficulty: 'medium',
    text: '请谈谈你对音乐教育的理解，如何培养学生的音乐素养？',
    followUp: [
      { text: '音乐教育的目标是什么？' },
      { text: '如何激发学生对音乐的兴趣？' }
    ]
  },

  // ===================================
  // 师范类专用题目
  // ===================================
  {
    id: 'education_001',
    majorTags: ['汉语言文学', '数学与应用数学', '英语', '物理学', '化学', '生物科学', '教育学', '心理学'],
    scenarioTags: ['campus', 'teacher'],
    typeTags: ['roleplay'],
    difficulty: 'medium',
    text: '请模拟一节10分钟的课堂导入，你会如何激发学生的学习兴趣？',
    followUp: [
      { text: '你为什么选择这种导入方式？' },
      { text: '如果学生反应不积极，你会怎么做？' }
    ]
  },
  {
    id: 'education_002',
    majorTags: ['教育学', '心理学', '思想政治教育'],
    scenarioTags: ['campus', 'teacher'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果学生在课堂上提出一个你无法回答的问题，你会如何处理？',
    followUp: [
      { text: '你认为这样处理有什么好处？' },
      { text: '课后你会如何准备这个问题？' }
    ]
  },
  {
    id: 'education_003',
    majorTags: ['教育学', '心理学'],
    scenarioTags: ['campus', 'teacher', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对某个教育理论的理解，以及它在教学实践中的应用。',
    followUp: [
      { text: '这个理论有什么局限性？' },
      { text: '你会如何将这个理论应用到实际教学中？' }
    ]
  },
  {
    id: 'education_004',
    majorTags: ['汉语言文学', '数学与应用数学', '英语', '物理学', '化学', '生物科学'],
    scenarioTags: ['campus', 'teacher'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对学科核心素养的理解，以及如何在教学中培养。',
    followUp: [
      { text: '你能举一个具体的教学案例吗？' },
      { text: '如何评价学生的核心素养发展水平？' }
    ]
  },
  {
    id: 'education_005',
    majorTags: ['教育学', '心理学'],
    scenarioTags: ['campus', 'teacher', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释建构主义学习理论，如何将其应用到课堂教学中？',
    followUp: [
      { text: '建构主义的核心观点是什么？' },
      { text: '与传统教学方法有什么区别？' }
    ]
  },
  {
    id: 'education_006',
    majorTags: ['教育学', '汉语言文学'],
    scenarioTags: ['campus', 'teacher'],
    typeTags: ['roleplay'],
    difficulty: 'medium',
    text: '请模拟一堂语文课的课堂提问，如何设计有效的问题引导学生思考？',
    followUp: [
      { text: '有效的课堂提问有什么特点？' },
      { text: '如何处理学生回答不出问题的情况？' }
    ]
  },
  {
    id: 'education_007',
    majorTags: ['教育学', '心理学'],
    scenarioTags: ['campus', 'teacher'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果发现学生在课堂上玩手机，你会如何处理？',
    followUp: [
      { text: '如何平衡课堂纪律和学生的个性发展？' },
      { text: '课后你会如何与学生沟通？' }
    ]
  },
  {
    id: 'education_008',
    majorTags: ['教育学', '数学与应用数学'],
    scenarioTags: ['campus', 'teacher'],
    typeTags: ['roleplay'],
    difficulty: 'medium',
    text: '请谈谈你对数学思维的理解，如何培养学生的数学思维能力？',
    followUp: [
      { text: '数学思维包括哪些方面？' },
      { text: '你会设计哪些活动来培养数学思维？' }
    ]
  },
  {
    id: 'education_009',
    majorTags: ['教育学', '英语'],
    scenarioTags: ['campus', 'teacher'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对英语听说教学的理解，如何提高学生的口语表达能力？',
    followUp: [
      { text: '听说教学的原则是什么？' },
      { text: '有哪些有效的教学方法？' }
    ]
  },
  {
    id: 'education_010',
    majorTags: ['教育学'],
    scenarioTags: ['campus', 'teacher'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果班级中有学生成绩差异很大，你会如何进行差异化教学？',
    followUp: [
      { text: '差异化教学的策略有哪些？' },
      { text: '如何平衡教学进度和个别需求？' }
    ]
  },

  // ===================================
  // 文法类专用题目
  // ===================================
  {
    id: 'humanities_001',
    majorTags: ['法学', '政治学与行政学', '社会学', '社会工作'],
    scenarioTags: ['campus', 'civil', 'graduate'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '请谈谈你对某个社会热点问题的看法，以及你认为应该如何解决。',
    followUp: [
      { text: '你认为这个问题产生的原因是什么？' },
      { text: '你的解决方案有什么可行性？' }
    ]
  },
  {
    id: 'humanities_002',
    majorTags: ['法学'],
    scenarioTags: ['campus', 'civil'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请分析一个你熟悉的法律案例，说说你的观点和理由。',
    followUp: [
      { text: '你认为这个案例有什么争议点？' },
      { text: '从法律角度，你会如何改进？' }
    ]
  },
  {
    id: 'humanities_003',
    majorTags: ['新闻传播学', '网络与新媒体', '广告学'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对新媒体发展趋势的看法，以及传统媒体应该如何应对。',
    followUp: [
      { text: '你认为新媒体有什么优势？' },
      { text: '传统媒体如何保持竞争力？' }
    ]
  },
  {
    id: 'humanities_004',
    majorTags: ['社会工作', '社会学'],
    scenarioTags: ['campus', 'civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你是一名社会工作者，如何帮助一个面临多重困难的家庭？',
    followUp: [
      { text: '你会如何评估这个家庭的需求？' },
      { text: '你会链接哪些资源？' }
    ]
  },
  {
    id: 'humanities_005',
    majorTags: ['法学'],
    scenarioTags: ['campus', 'civil'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释法律的基本原则，什么是法治？法治和人治有什么区别？',
    followUp: [
      { text: '法律的价值有哪些？' },
      { text: '如何理解法律面前人人平等？' }
    ]
  },
  {
    id: 'humanities_006',
    majorTags: ['法学'],
    scenarioTags: ['campus', 'civil'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对程序正义的理解，为什么程序正义很重要？',
    followUp: [
      { text: '程序正义的标准是什么？' },
      { text: '实体正义和程序正义哪个更重要？' }
    ]
  },
  {
    id: 'humanities_007',
    majorTags: ['新闻传播学', '网络与新媒体'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对新闻真实性的理解，如何在新媒体环境下保证新闻真实？',
    followUp: [
      { text: '新闻失实的原因有哪些？' },
      { text: '如何辨别虚假新闻？' }
    ]
  },
  {
    id: 'humanities_008',
    majorTags: ['新闻传播学', '广告学'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请解释媒介融合的概念，传统媒体如何应对新媒体的挑战？',
    followUp: [
      { text: '媒介融合的形式有哪些？' },
      { text: '传统媒体的优势是什么？' }
    ]
  },
  {
    id: 'humanities_009',
    majorTags: ['政治学与行政学', '法学'],
    scenarioTags: ['campus', 'civil'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对公共政策的理解，公共政策制定的过程是什么？',
    followUp: [
      { text: '公共政策的类型有哪些？' },
      { text: '如何评估公共政策的效果？' }
    ]
  },
  {
    id: 'humanities_010',
    majorTags: ['历史学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请谈谈你对历史唯物主义的理解，如何运用历史唯物主义分析历史事件？',
    followUp: [
      { text: '历史唯物主义的基本观点是什么？' },
      { text: '历史研究的方法有哪些？' }
    ]
  },

  // ===================================
  // 公务员面试专用题目
  // ===================================
  {
    id: 'civil_001',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你是一名基层公务员，群众对你的工作不满意并投诉，你会如何处理？',
    followUp: [
      { text: '你会如何了解群众的具体诉求？' },
      { text: '如果投诉内容不实，你会怎么做？' }
    ]
  },
  {
    id: 'civil_002',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '请谈谈你对"为人民服务"的理解，以及如何在工作中体现。',
    followUp: [
      { text: '你能举一个具体的例子吗？' },
      { text: '如何平衡群众利益和工作要求？' }
    ]
  },
  {
    id: 'civil_003',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你负责组织一次大型活动，你会如何安排？',
    followUp: [
      { text: '活动组织的流程是什么？' },
      { text: '如何应对突发情况？' }
    ]
  },
  {
    id: 'civil_004',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你的领导做出了一个你认为不正确的决定，你会怎么做？',
    followUp: [
      { text: '如何与领导沟通？' },
      { text: '如果领导坚持自己的决定怎么办？' }
    ]
  },
  {
    id: 'civil_005',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '请谈谈你对团队协作的理解，如何在团队中发挥自己的作用？',
    followUp: [
      { text: '团队协作的重要性是什么？' },
      { text: '如何处理团队中的冲突？' }
    ]
  },

  // ===================================
  // 考研复试专用题目
  // ===================================
  {
    id: 'graduate_001',
    majorTags: ['all'],
    scenarioTags: ['graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请谈谈你的研究方向和兴趣，以及为什么选择这个方向。',
    followUp: [
      { text: '你对这个领域的最新研究有什么了解？' },
      { text: '你计划如何开展研究？' }
    ]
  },
  {
    id: 'graduate_002',
    majorTags: ['all'],
    scenarioTags: ['graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请介绍一篇你读过的学术论文，说说你的理解和评价。',
    followUp: [
      { text: '这篇论文有什么创新点？' },
      { text: '你认为这篇论文有什么不足？' }
    ]
  },
  {
    id: 'graduate_003',
    majorTags: ['all'],
    scenarioTags: ['graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请谈谈你对研究生阶段的规划，你希望在研究生期间取得什么成果？',
    followUp: [
      { text: '你的短期目标和长期目标是什么？' },
      { text: '你计划如何实现这些目标？' }
    ]
  },
  {
    id: 'graduate_004',
    majorTags: ['all'],
    scenarioTags: ['graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释你专业领域的一个核心理论，它的发展历程是什么？',
    followUp: [
      { text: '这个理论的主要贡献是什么？' },
      { text: '目前研究的热点是什么？' }
    ]
  },

  // ===================================
  // 英语口语面试专用题目
  // ===================================
  {
    id: 'english_001',
    majorTags: ['all'],
    scenarioTags: ['english'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: 'Please introduce yourself and your academic background.',
    followUp: []
  },
  {
    id: 'english_002',
    majorTags: ['all'],
    scenarioTags: ['english'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: 'Why did you choose your major? What interests you most about this field?',
    followUp: []
  },
  {
    id: 'english_003',
    majorTags: ['all'],
    scenarioTags: ['english'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: 'Describe a challenging situation you faced and how you overcame it.',
    followUp: []
  },
  {
    id: 'english_004',
    majorTags: ['all'],
    scenarioTags: ['english'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: 'What are your strengths and weaknesses? How have you been working to improve your weaknesses?',
    followUp: []
  },
  {
    id: 'english_005',
    majorTags: ['all'],
    scenarioTags: ['english'],
    typeTags: ['situational'],
    difficulty: 'hard',
    text: 'If you could change one thing about your university experience, what would it be and why?',
    followUp: []
  },
  {
    id: 'english_006',
    majorTags: ['all'],
    scenarioTags: ['english'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: 'Discuss a recent technological advancement in your field and its impact.',
    followUp: []
  },

  // ===================================
  // 医院面试专项题目
  // ===================================
  {
    id: 'hospital_001',
    majorTags: ['临床医学', '护理学', '药学'],
    scenarioTags: ['hospital'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释心肺复苏（CPR）的操作流程，胸外按压和人工呼吸的比例是多少？',
    followUp: [
      { text: '心肺复苏的适应症是什么？' },
      { text: '如何判断患者是否需要心肺复苏？' }
    ]
  },
  {
    id: 'hospital_002',
    majorTags: ['临床医学', '护理学'],
    scenarioTags: ['hospital'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果患者家属对治疗方案不满意并情绪激动，你会如何处理？',
    followUp: [
      { text: '如何安抚家属情绪？' },
      { text: '如何解释治疗方案？' }
    ]
  },
  {
    id: 'hospital_003',
    majorTags: ['临床医学'],
    scenarioTags: ['hospital'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释糖尿病的分型和诊断标准，血糖控制的目标是什么？',
    followUp: [
      { text: '糖尿病的并发症有哪些？' },
      { text: '如何进行糖尿病患者的健康教育？' }
    ]
  },
  {
    id: 'hospital_004',
    majorTags: ['护理学'],
    scenarioTags: ['hospital'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请解释静脉输液的注意事项，如何预防输液反应？',
    followUp: [
      { text: '常见的输液反应有哪些？' },
      { text: '如何处理输液反应？' }
    ]
  },

  // ===================================
  // 教资面试专项题目
  // ===================================
  {
    id: 'teacher_001',
    majorTags: ['education'],
    scenarioTags: ['teacher'],
    typeTags: ['roleplay'],
    difficulty: 'medium',
    text: '请模拟一下如何进行课堂导入，导入的原则是什么？',
    followUp: [
      { text: '导入的方法有哪些？' },
      { text: '如何评价导入的效果？' }
    ]
  },
  {
    id: 'teacher_002',
    majorTags: ['education'],
    scenarioTags: ['teacher'],
    typeTags: ['roleplay'],
    difficulty: 'medium',
    text: '请模拟一下课堂提问的技巧，如何设计有效的问题？',
    followUp: [
      { text: '提问的类型有哪些？' },
      { text: '如何处理学生的不同回答？' }
    ]
  },
  {
    id: 'teacher_003',
    majorTags: ['education'],
    scenarioTags: ['teacher'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对课堂管理的理解，如何维持课堂秩序？',
    followUp: [
      { text: '课堂管理的原则是什么？' },
      { text: '如何处理课堂突发事件？' }
    ]
  },
  {
    id: 'teacher_004',
    majorTags: ['education'],
    scenarioTags: ['teacher'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释教学设计的基本要素，如何设计一堂优质课？',
    followUp: [
      { text: '教学设计的流程是什么？' },
      { text: '如何进行教学评价？' }
    ]
  },

  // ===================================
  // 补充题库：确保每个专业+场景组合有足够题目
  // ===================================

  // 经管类补充
  {
    id: 'business_013',
    majorTags: ['金融学'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释金融衍生品的概念和分类，常见的金融衍生品有哪些？',
    followUp: [
      { text: '金融衍生品的作用是什么？' },
      { text: '金融衍生品有什么风险？' }
    ]
  },
  {
    id: 'business_014',
    majorTags: ['会计学'],
    scenarioTags: ['campus', 'civil'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请解释会计核算的基本原则，权责发生制和收付实现制有什么区别？',
    followUp: [
      { text: '会计信息质量要求有哪些？' },
      { text: '如何保证会计信息的真实性？' }
    ]
  },
  {
    id: 'business_015',
    majorTags: ['市场营销'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对数字营销的理解，常见的数字营销手段有哪些？',
    followUp: [
      { text: '数字营销和传统营销有什么区别？' },
      { text: '如何衡量数字营销的效果？' }
    ]
  },
  {
    id: 'business_016',
    majorTags: ['工商管理'],
    scenarioTags: ['campus', 'civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你是一名管理者，如何激励团队成员提高工作效率？',
    followUp: [
      { text: '激励的理论有哪些？' },
      { text: '如何根据不同员工的特点进行激励？' }
    ]
  },
  {
    id: 'business_017',
    majorTags: ['财务管理'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释资本结构理论，企业如何确定最优资本结构？',
    followUp: [
      { text: 'MM理论的基本观点是什么？' },
      { text: '影响资本结构的因素有哪些？' }
    ]
  },

  // 工科类补充
  {
    id: 'engineering_012',
    majorTags: ['计算机科学与技术', '软件工程'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释微服务架构的优缺点，如何实现微服务之间的通信？',
    followUp: [
      { text: '微服务和单体应用有什么区别？' },
      { text: '如何保证微服务的高可用性？' }
    ]
  },
  {
    id: 'engineering_013',
    majorTags: ['数据科学与大数据技术'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请谈谈你对大数据处理框架的理解，Spark和Hadoop有什么区别？',
    followUp: [
      { text: 'Spark的核心组件有哪些？' },
      { text: '如何处理大规模数据的实时计算？' }
    ]
  },
  {
    id: 'engineering_014',
    majorTags: ['人工智能'],
    scenarioTags: ['campus', 'tech', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释深度学习的基本原理，卷积神经网络和循环神经网络有什么区别？',
    followUp: [
      { text: '深度学习和机器学习有什么区别？' },
      { text: '你熟悉哪些深度学习框架？' }
    ]
  },
  {
    id: 'engineering_015',
    majorTags: ['电子信息工程', '通信工程'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请解释数字信号处理的基本概念，常见的数字滤波方法有哪些？',
    followUp: [
      { text: '数字信号和模拟信号有什么区别？' },
      { text: '傅里叶变换在信号处理中有什么应用？' }
    ]
  },
  {
    id: 'engineering_016',
    majorTags: ['机械工程'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对智能制造的理解，工业4.0的核心技术有哪些？',
    followUp: [
      { text: '智能制造和传统制造有什么区别？' },
      { text: '如何实现生产过程的自动化？' }
    ]
  },

  // 理学类补充
  {
    id: 'science_012',
    majorTags: ['数学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释实变函数的基本概念，勒贝格积分和黎曼积分有什么区别？',
    followUp: [
      { text: '测度论的基本思想是什么？' },
      { text: '泛函分析的研究对象是什么？' }
    ]
  },
  {
    id: 'science_013',
    majorTags: ['物理学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释相对论的基本原理，狭义相对论和广义相对论有什么区别？',
    followUp: [
      { text: '光速不变原理是什么？' },
      { text: '相对论对现代物理学有什么影响？' }
    ]
  },
  {
    id: 'science_014',
    majorTags: ['化学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请解释量子化学的基本概念，薛定谔方程的物理意义是什么？',
    followUp: [
      { text: '量子力学在化学中有什么应用？' },
      { text: '计算化学的方法有哪些？' }
    ]
  },
  {
    id: 'science_015',
    majorTags: ['生物学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释基因表达调控的机制，转录因子在其中起什么作用？',
    followUp: [
      { text: '真核生物和原核生物的基因表达调控有什么区别？' },
      { text: '表观遗传学是什么？' }
    ]
  },
  {
    id: 'science_016',
    majorTags: ['心理学'],
    scenarioTags: ['campus', 'graduate'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对认知心理学的理解，信息加工理论的基本观点是什么？',
    followUp: [
      { text: '认知心理学的研究方法有哪些？' },
      { text: '人工智能和认知心理学有什么关系？' }
    ]
  },

  // 医学类补充
  {
    id: 'medicine_013',
    majorTags: ['临床医学'],
    scenarioTags: ['campus', 'hospital'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释高血压的诊断标准和治疗原则，常用的降压药物有哪些？',
    followUp: [
      { text: '高血压的危险因素有哪些？' },
      { text: '如何进行高血压患者的健康教育？' }
    ]
  },
  {
    id: 'medicine_014',
    majorTags: ['临床医学'],
    scenarioTags: ['campus', 'hospital'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释肺炎的临床表现和诊断方法，抗生素的选择原则是什么？',
    followUp: [
      { text: '肺炎的并发症有哪些？' },
      { text: '如何预防医院获得性肺炎？' }
    ]
  },
  {
    id: 'medicine_015',
    majorTags: ['护理学'],
    scenarioTags: ['campus', 'hospital'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你负责护理一位老年患者，你会注意哪些方面？',
    followUp: [
      { text: '老年患者的护理特点是什么？' },
      { text: '如何预防压疮？' }
    ]
  },
  {
    id: 'medicine_016',
    majorTags: ['药学'],
    scenarioTags: ['campus', 'hospital'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请解释药物不良反应的分类，如何预防和处理药物不良反应？',
    followUp: [
      { text: '药物不良反应的报告制度是什么？' },
      { text: '如何进行药物临床监测？' }
    ]
  },

  // 师范类补充
  {
    id: 'education_011',
    majorTags: ['education'],
    scenarioTags: ['teacher'],
    typeTags: ['roleplay'],
    difficulty: 'medium',
    text: '请模拟一下课堂小结的方法，如何进行有效的课堂总结？',
    followUp: [
      { text: '课堂小结的目的是什么？' },
      { text: '有哪些课堂小结的方法？' }
    ]
  },
  {
    id: 'education_012',
    majorTags: ['education'],
    scenarioTags: ['teacher'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释教育评价的概念和类型，如何进行学生综合素质评价？',
    followUp: [
      { text: '形成性评价和总结性评价有什么区别？' },
      { text: '如何保证评价的公平性？' }
    ]
  },
  {
    id: 'education_013',
    majorTags: ['education'],
    scenarioTags: ['teacher'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果家长对孩子的成绩不满意并指责老师，你会如何处理？',
    followUp: [
      { text: '如何与家长进行有效的沟通？' },
      { text: '如何建立良好的家校关系？' }
    ]
  },

  // 文法类补充
  {
    id: 'humanities_011',
    majorTags: ['法学'],
    scenarioTags: ['campus', 'civil'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释刑法中的罪刑法定原则，它的基本含义和意义是什么？',
    followUp: [
      { text: '罪刑法定原则的派生原则有哪些？' },
      { text: '如何理解"法无明文规定不为罪"？' }
    ]
  },
  {
    id: 'humanities_012',
    majorTags: ['法学'],
    scenarioTags: ['campus', 'civil'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对民法基本原则的理解，诚实信用原则在实践中有什么作用？',
    followUp: [
      { text: '民法的基本原则有哪些？' },
      { text: '如何适用诚实信用原则？' }
    ]
  },
  {
    id: 'humanities_013',
    majorTags: ['新闻传播学'],
    scenarioTags: ['campus', 'tech'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对舆论引导的理解，如何在新媒体环境下进行有效的舆论引导？',
    followUp: [
      { text: '舆论引导的原则是什么？' },
      { text: '如何处理网络舆情？' }
    ]
  },

  // 公务员补充
  {
    id: 'civil_006',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '请谈谈你对政务公开的理解，如何推进政务公开？',
    followUp: [
      { text: '政务公开的原则是什么？' },
      { text: '如何保障公民的知情权？' }
    ]
  },
  {
    id: 'civil_007',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你负责一项惠民政策的落实，你会如何确保政策效果？',
    followUp: [
      { text: '政策落实的流程是什么？' },
      { text: '如何评估政策效果？' }
    ]
  },
  {
    id: 'civil_008',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '请谈谈你对廉洁从政的理解，如何做到廉洁自律？',
    followUp: [
      { text: '廉洁从政的要求有哪些？' },
      { text: '如何防范腐败风险？' }
    ]
  },
  {
    id: 'civil_009',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: '请谈谈你报考公务员的初衷和动机，为什么想成为一名公务员？',
    followUp: [
      { text: '你对公务员工作有什么了解？' },
      { text: '你的长期职业规划是什么？' }
    ]
  },
  {
    id: 'civil_010',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你在工作中发现同事存在违规行为，你会如何处理？',
    followUp: [
      { text: '你会直接向领导汇报吗？' },
      { text: '如何保护自己同时又坚持原则？' }
    ]
  },
  {
    id: 'civil_011',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '请谈谈你对基层工作的理解，你愿意从基层做起吗？',
    followUp: [
      { text: '基层工作有什么特点和挑战？' },
      { text: '你如何在基层工作中发挥作用？' }
    ]
  },
  {
    id: 'civil_012',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'hard',
    text: '请谈谈你对当前国家重大发展战略的理解，如乡村振兴或高质量发展。',
    followUp: [
      { text: '这些战略对地方发展有什么指导意义？' },
      { text: '作为基层公务员如何落实这些战略？' }
    ]
  },
  {
    id: 'civil_013',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你被分配到一个条件艰苦的地区工作，你会如何适应？',
    followUp: [
      { text: '你有什么优势和劣势？' },
      { text: '你如何保持工作热情？' }
    ]
  },
  {
    id: 'civil_014',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['behavioral'],
    difficulty: 'easy',
    text: '请介绍一下你的教育背景和实习或工作经历。',
    followUp: [
      { text: '这些经历对你报考公务员有什么帮助？' },
      { text: '你遇到过最大的困难是什么？如何克服的？' }
    ]
  },
  {
    id: 'civil_015',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '请谈谈你对群众路线的理解，如何在实际工作中践行群众路线？',
    followUp: [
      { text: '如何拉近与群众的距离？' },
      { text: '群众利益与政府规定冲突时怎么办？' }
    ]
  },
  {
    id: 'civil_016',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '请谈谈你对依法治国和以德治国关系的理解。',
    followUp: [
      { text: '法治和德治哪个更重要？' },
      { text: '如何在工作中体现法治精神？' }
    ]
  },
  {
    id: 'civil_017',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果群众来上访，情绪非常激动，你会如何处理？',
    followUp: [
      { text: '首先应该做什么？' },
      { text: '如何做到既安抚情绪又解决问题？' }
    ]
  },
  {
    id: 'civil_018',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'hard',
    text: '请谈谈你对数字政府建设的理解，数字化转型对政府工作有什么影响？',
    followUp: [
      { text: '数字化政务服务的优势是什么？' },
      { text: '如何推进政府数字化转型？' }
    ]
  },
  {
    id: 'civil_019',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: '请谈谈你的优点和缺点，以及如何发挥优点、改进缺点。',
    followUp: [
      { text: '你的缺点会影响公务员工作吗？' },
      { text: '你如何不断提升自己？' }
    ]
  },
  {
    id: 'civil_020',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你被录用，你对未来五年有什么规划？',
    followUp: [
      { text: '短期目标和长期目标分别是什么？' },
      { text: '你准备如何实现这些目标？' }
    ]
  },
  {
    id: 'civil_021',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '请谈谈你对公务员职业道德的认识。',
    followUp: [
      { text: '公务员职业道德的基本要求是什么？' },
      { text: '如何在工作中坚守职业道德？' }
    ]
  },
  {
    id: 'civil_022',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'hard',
    text: '请谈谈你对当前社会主要矛盾的理解。',
    followUp: [
      { text: '社会主要矛盾变化说明了什么？' },
      { text: '如何解决发展不平衡不充分的问题？' }
    ]
  },
  {
    id: 'civil_023',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你和直接领导在工作方法上有分歧，你会怎么办？',
    followUp: [
      { text: '你会坚持自己的意见吗？' },
      { text: '如何在服从安排的同时有效沟通？' }
    ]
  },
  {
    id: 'civil_024',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '请谈谈你对生态文明建设的理解，如何实现绿色发展？',
    followUp: [
      { text: '经济发展和环境保护如何平衡？' },
      { text: '基层政府如何推进生态文明建设？' }
    ]
  },
  {
    id: 'civil_025',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: '请描述一次你成功解决复杂问题的经历。',
    followUp: [
      { text: '问题的难点在哪里？' },
      { text: '你从中学到了什么？' }
    ]
  },
  {
    id: 'civil_026',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '请谈谈你对中华民族伟大复兴的理解，年轻人应该如何贡献力量？',
    followUp: [
      { text: '中国梦的内涵是什么？' },
      { text: '你的专业如何服务于国家发展？' }
    ]
  },
  {
    id: 'civil_027',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'hard',
    text: '请谈谈你对全过程人民民主的理解。',
    followUp: [
      { text: '全过程人民民主有哪些特点？' },
      { text: '如何在基层实践中体现人民民主？' }
    ]
  },
  {
    id: 'civil_028',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果遇到媒体采访，你会如何应对？',
    followUp: [
      { text: '面对敏感问题如何回答？' },
      { text: '如何与媒体建立良好关系？' }
    ]
  },
  {
    id: 'civil_029',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: '请谈谈你的学习能力和抗压能力，有没有具体例子？',
    followUp: [
      { text: '你是如何保持学习动力的？' },
      { text: '压力大的时候如何调整心态？' }
    ]
  },
  {
    id: 'civil_030',
    majorTags: ['all'],
    scenarioTags: ['civil'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '请谈谈你对公文写作的理解，优秀的公文应该具备哪些特点？',
    followUp: [
      { text: '你写过哪些类型的公文？' },
      { text: '如何提高公文写作能力？' }
    ]
  },

  // 考研复试补充
  {
    id: 'graduate_005',
    majorTags: ['all'],
    scenarioTags: ['graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请谈谈你对学术诚信的理解，如何保证学术研究的真实性？',
    followUp: [
      { text: '学术不端行为有哪些？' },
      { text: '如何正确引用文献？' }
    ]
  },
  {
    id: 'graduate_006',
    majorTags: ['all'],
    scenarioTags: ['graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请介绍一位你最敬佩的学者，说说你从他身上学到了什么？',
    followUp: [
      { text: '这位学者的主要贡献是什么？' },
      { text: '你希望在哪些方面向他学习？' }
    ]
  },
  {
    id: 'graduate_007',
    majorTags: ['all'],
    scenarioTags: ['graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请谈谈你的读研动机，为什么选择继续深造？',
    followUp: [
      { text: '你对研究生生活有什么期待？' },
      { text: '如何应对研究中的挫折？' }
    ]
  },
  {
    id: 'graduate_008',
    majorTags: ['all'],
    scenarioTags: ['graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请介绍你的本科毕业设计或论文，主要创新点是什么？',
    followUp: [
      { text: '研究中遇到的最大困难是什么？' },
      { text: '你的研究有什么实际应用价值？' }
    ]
  },
  {
    id: 'graduate_009',
    majorTags: ['all'],
    scenarioTags: ['graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请谈谈你对我校该专业的了解，为什么选择我们学校？',
    followUp: [
      { text: '你对我们学校有什么期待？' },
      { text: '你了解哪些导师的研究方向？' }
    ]
  },
  {
    id: 'graduate_010',
    majorTags: ['all'],
    scenarioTags: ['graduate'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '如果你的研究兴趣和导师的研究方向不一致，你会怎么办？',
    followUp: [
      { text: '如何与导师沟通调整研究方向？' },
      { text: '如何平衡自己的兴趣和导师的要求？' }
    ]
  },

  // 英语口语补充
  {
    id: 'english_007',
    majorTags: ['all'],
    scenarioTags: ['english'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: 'Describe a time when you worked in a team and achieved success.',
    followUp: []
  },
  {
    id: 'english_008',
    majorTags: ['all'],
    scenarioTags: ['english'],
    typeTags: ['situational'],
    difficulty: 'hard',
    text: 'How do you handle stress and pressure in academic or work situations?',
    followUp: []
  },
  {
    id: 'english_009',
    majorTags: ['all'],
    scenarioTags: ['english'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: 'What are your career goals for the next five years?',
    followUp: []
  },
  {
    id: 'english_010',
    majorTags: ['all'],
    scenarioTags: ['english'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: 'Please describe your hometown and what you like most about it.',
    followUp: []
  },
  {
    id: 'english_011',
    majorTags: ['all'],
    scenarioTags: ['english'],
    typeTags: ['behavioral'],
    difficulty: 'easy',
    text: 'What is your greatest strength and weakness?',
    followUp: []
  },
  {
    id: 'english_012',
    majorTags: ['all'],
    scenarioTags: ['english'],
    typeTags: ['situational'],
    difficulty: 'hard',
    text: 'If you could travel anywhere in the world, where would you go and why?',
    followUp: []
  },
  {
    id: 'english_013',
    majorTags: ['all'],
    scenarioTags: ['english'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: 'What do you usually do in your free time? What are your hobbies?',
    followUp: []
  },
  {
    id: 'english_014',
    majorTags: ['all'],
    scenarioTags: ['english'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: 'Who is your biggest inspiration and why?',
    followUp: []
  },
  {
    id: 'english_015',
    majorTags: ['all'],
    scenarioTags: ['english'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: 'What do you think are the advantages and disadvantages of technology in education?',
    followUp: []
  },

  // 医院面试补充
  {
    id: 'hospital_005',
    majorTags: ['临床医学', '护理学', '药学'],
    scenarioTags: ['hospital'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对医学人文关怀的理解，如何在诊疗过程中体现？',
    followUp: [
      { text: '医学人文关怀的重要性是什么？' },
      { text: '如何平衡技术治疗和人文关怀？' }
    ]
  },
  {
    id: 'hospital_006',
    majorTags: ['临床医学'],
    scenarioTags: ['hospital'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释肝功能检查的主要指标及临床意义。',
    followUp: [
      { text: '如何判断肝功能异常的原因？' },
      { text: '保肝治疗的原则是什么？' }
    ]
  },
  {
    id: 'hospital_007',
    majorTags: ['护理学'],
    scenarioTags: ['hospital'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对护理职业的理解，护理工作的核心价值是什么？',
    followUp: [
      { text: '护理人员应具备哪些素质？' },
      { text: '如何做好护患沟通？' }
    ]
  },
  {
    id: 'hospital_008',
    majorTags: ['临床医学', '护理学'],
    scenarioTags: ['hospital'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果患者坚持要出院但病情不允许，你会如何劝说？',
    followUp: [
      { text: '如何尊重患者自主权的同时保护患者安全？' },
      { text: '需要履行哪些法律程序？' }
    ]
  },
  {
    id: 'hospital_009',
    majorTags: ['药学'],
    scenarioTags: ['hospital'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释常见药物的配伍禁忌，哪些药物不能一起使用？',
    followUp: [
      { text: '配伍禁忌的危害是什么？' },
      { text: '如何避免配伍禁忌？' }
    ]
  },
  {
    id: 'hospital_010',
    majorTags: ['临床医学', '护理学'],
    scenarioTags: ['hospital'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对临床路径的理解，如何按临床路径规范诊疗？',
    followUp: [
      { text: '临床路径的优点是什么？' },
      { text: '临床路径和诊疗指南有什么区别？' }
    ]
  },
  {
    id: 'hospital_011',
    majorTags: ['临床医学'],
    scenarioTags: ['hospital'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请解释围手术期管理的要点，术前术后需要注意什么？',
    followUp: [
      { text: '如何预防术后并发症？' },
      { text: '术后镇痛管理原则是什么？' }
    ]
  },
  {
    id: 'hospital_012',
    majorTags: ['护理学'],
    scenarioTags: ['hospital'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈如何做好病房管理，保持病房环境整洁有序。',
    followUp: [
      { text: '病房管理的重点是什么？' },
      { text: '如何做好病房感染控制？' }
    ]
  },

  // 教资面试补充
  {
    id: 'teacher_005',
    majorTags: ['education'],
    scenarioTags: ['teacher'],
    typeTags: ['roleplay'],
    difficulty: 'medium',
    text: '请模拟一下学生回答问题错误时，你会如何纠正和引导。',
    followUp: [
      { text: '如何保护学生的自尊心？' },
      { text: '如何鼓励学生积极参与？' }
    ]
  },
  {
    id: 'teacher_006',
    majorTags: ['education'],
    scenarioTags: ['teacher'],
    typeTags: ['roleplay'],
    difficulty: 'medium',
    text: '请模拟一下如何表扬和批评学生，如何做到有效反馈？',
    followUp: [
      { text: '表扬和批评的比例应该是多少？' },
      { text: '如何避免学生产生骄傲或自卑心理？' }
    ]
  },
  {
    id: 'teacher_007',
    majorTags: ['education'],
    scenarioTags: ['teacher'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请谈谈你对"双减"政策的理解，对教师工作有什么影响？',
    followUp: [
      { text: '如何提高课堂效率来减轻学生课外负担？' },
      { text: '如何做好课后服务？' }
    ]
  },
  {
    id: 'teacher_008',
    majorTags: ['education'],
    scenarioTags: ['teacher'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果班上有一名单亲家庭的孩子，性格孤僻，你会如何关心和帮助他？',
    followUp: [
      { text: '如何保护学生隐私同时给予帮助？' },
      { text: '如何发动班级力量帮助他？' }
    ]
  },
  {
    id: 'teacher_009',
    majorTags: ['education'],
    scenarioTags: ['teacher'],
    typeTags: ['roleplay'],
    difficulty: 'medium',
    text: '请谈谈你对因材施教的理解，如何在教学中实施差异化教学？',
    followUp: [
      { text: '分层教学的具体方法有哪些？' },
      { text: '如何评估差异化教学的效果？' }
    ]
  },
  {
    id: 'teacher_010',
    majorTags: ['education'],
    scenarioTags: ['teacher'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请谈谈你对新课程改革的理解，新课改的主要理念是什么？',
    followUp: [
      { text: '三维目标是什么？' },
      { text: '核心素养与三维目标有什么关系？' }
    ]
  },
  {
    id: 'teacher_011',
    majorTags: ['education'],
    scenarioTags: ['teacher'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果学生上课注意力不集中，你会采用什么方法吸引学生注意力？',
    followUp: [
      { text: '如何设计有趣的课堂？' },
      { text: '多媒体教学如何有效运用？' }
    ]
  },
  {
    id: 'teacher_012',
    majorTags: ['education'],
    scenarioTags: ['teacher'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请谈谈你对信息技术与学科教学融合的理解。',
    followUp: [
      { text: '智慧教育的特点是什么？' },
      { text: '如何避免信息技术喧宾夺主？' }
    ]
  },

  // 艺术面试补充
  {
    id: 'art_009',
    majorTags: ['视觉传达设计', '环境设计', '产品设计'],
    scenarioTags: ['art'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对中国传统元素在现代设计中应用的看法。',
    followUp: [
      { text: '你能举一些成功案例吗？' },
      { text: '如何在设计中传承与创新？' }
    ]
  },
  {
    id: 'art_010',
    majorTags: ['动画'],
    scenarioTags: ['art'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你最喜欢的动画作品，分析其艺术风格和特点。',
    followUp: [
      { text: '这部作品对你有什么影响？' },
      { text: '你想创作什么风格的作品？' }
    ]
  },
  {
    id: 'art_011',
    majorTags: ['广播电视编导', '影视摄影与制作'],
    scenarioTags: ['art'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请谈谈你对短视频发展趋势的理解，如何创作优质的短视频内容？',
    followUp: [
      { text: '短视频和传统影视有什么区别？' },
      { text: '如何把握用户心理创作爆款内容？' }
    ]
  },
  {
    id: 'art_012',
    majorTags: ['播音与主持艺术'],
    scenarioTags: ['art'],
    typeTags: ['roleplay'],
    difficulty: 'medium',
    text: '请模拟一段新闻播报的开场白。',
    followUp: [
      { text: '新闻播报有哪些注意事项？' },
      { text: '如何把握播报的节奏和语气？' }
    ]
  },
  {
    id: 'art_013',
    majorTags: ['音乐表演', '音乐学'],
    scenarioTags: ['art'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对音乐审美的理解，什么样的音乐才是好音乐？',
    followUp: [
      { text: '如何培养学生正确的音乐审美？' },
      { text: '高雅音乐和流行音乐的关系是什么？' }
    ]
  },
  {
    id: 'art_014',
    majorTags: ['视觉传达设计', '产品设计'],
    scenarioTags: ['art'],
    typeTags: ['technical'],
    difficulty: 'hard',
    text: '请谈谈可持续设计理念，如何在设计中践行环保理念？',
    followUp: [
      { text: '绿色设计的原则是什么？' },
      { text: '有哪些环保材料可以使用？' }
    ]
  },
  {
    id: 'art_015',
    majorTags: ['环境设计', '风景园林'],
    scenarioTags: ['art'],
    typeTags: ['technical'],
    difficulty: 'medium',
    text: '请谈谈你对海绵城市建设的理解，景观设计如何融入海绵城市理念？',
    followUp: [
      { text: '海绵城市的设计原则是什么？' },
      { text: '如何平衡景观美化和功能需求？' }
    ]
  },

  // 通用行为面试题（补充数量）
  {
    id: 'general_001',
    majorTags: ['all'],
    scenarioTags: ['all'],
    typeTags: ['behavioral'],
    difficulty: 'easy',
    text: '请介绍一次你独立完成的重要任务，你是如何规划和执行的？',
    followUp: []
  },
  {
    id: 'general_002',
    majorTags: ['all'],
    scenarioTags: ['all'],
    typeTags: ['behavioral'],
    difficulty: 'easy',
    text: '你最大的优点和缺点是什么？请举例说明。',
    followUp: []
  },
  {
    id: 'general_003',
    majorTags: ['all'],
    scenarioTags: ['all'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你的工作成果被同事抢走了，你会如何处理？',
    followUp: []
  },
  {
    id: 'general_004',
    majorTags: ['all'],
    scenarioTags: ['all'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: '请描述一次你学习新技能的经历，你是如何掌握的？',
    followUp: []
  },
  {
    id: 'general_005',
    majorTags: ['all'],
    scenarioTags: ['all'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果工作中遇到了你不懂的问题，你会如何解决？',
    followUp: []
  },
  {
    id: 'general_006',
    majorTags: ['all'],
    scenarioTags: ['all'],
    typeTags: ['behavioral'],
    difficulty: 'easy',
    text: '你为什么选择我们公司/学校？你对我们有什么了解？',
    followUp: []
  },
  {
    id: 'general_007',
    majorTags: ['all'],
    scenarioTags: ['all'],
    typeTags: ['situational'],
    difficulty: 'medium',
    text: '如果你和同事意见不一致，你会如何处理？',
    followUp: []
  },
  {
    id: 'general_008',
    majorTags: ['all'],
    scenarioTags: ['all'],
    typeTags: ['behavioral'],
    difficulty: 'medium',
    text: '请谈谈你的职业规划，未来三年你有什么目标？',
    followUp: []
  }
];

// ===================================
// 题库筛选工具函数
// ===================================

/**
 * 根据专业、场景、难度筛选题目
 * @param {string} major - 专业名称
 * @param {string} scenario - 场景ID
 * @param {string} difficulty - 难度等级
 * @param {number} count - 需要的题目数量
 * @returns {Array} 筛选后的题目列表
 */
function filterQuestions(major, scenario, difficulty, count = 5) {
  const majorToCategory = {
    '金融学': 'business', '会计学': 'business', '经济学': 'business',
    '工商管理': 'business', '市场营销': 'business', '人力资源管理': 'business',
    '财务管理': 'business', '国际贸易': 'business', '信息管理与信息系统': 'business',
    '统计学': 'business',
    '计算机科学与技术': 'engineering', '软件工程': 'engineering',
    '人工智能': 'engineering', '数据科学与大数据技术': 'engineering',
    '网络工程': 'engineering', '电子信息工程': 'engineering',
    '通信工程': 'engineering', '自动化': 'engineering',
    '机械工程': 'engineering', '电气工程': 'engineering',
    '数学': 'science', '物理学': 'science', '化学': 'science',
    '生物学': 'science', '环境科学': 'science', '地质学': 'science',
    '心理学': 'science', '生态学': 'science', '天文学': 'science',
    '临床医学': 'medicine', '护理学': 'medicine', '药学': 'medicine',
    '口腔医学': 'medicine', '公共卫生与预防医学': 'medicine',
    '中医学': 'medicine', '中西医临床医学': 'medicine',
    '医学影像学': 'medicine', '麻醉学': 'medicine', '康复治疗学': 'medicine',
    '农学': 'agriculture', '园艺': 'agriculture', '植物保护': 'agriculture',
    '动物科学': 'agriculture', '动物医学': 'agriculture', '林学': 'agriculture',
    '水土保持与荒漠化防治': 'agriculture', '农业资源与环境': 'agriculture',
    '食品科学与工程': 'agriculture', '风景园林': 'agriculture',
    '视觉传达设计': 'art', '环境设计': 'art', '产品设计': 'art',
    '动画': 'art', '音乐表演': 'art', '音乐学': 'art',
    '舞蹈表演': 'art', '广播电视编导': 'art',
    '影视摄影与制作': 'art', '播音与主持艺术': 'art',
    '汉语言文学': 'education', '数学与应用数学': 'education',
    '英语': 'education', '物理学': 'education', '化学': 'education',
    '生物科学': 'education', '思想政治教育': 'education',
    '教育学': 'education', '心理学': 'education', '体育教育': 'education',
    '法学': 'humanities', '政治学与行政学': 'humanities',
    '社会学': 'humanities', '社会工作': 'humanities',
    '新闻传播学': 'humanities', '网络与新媒体': 'humanities',
    '广告学': 'humanities', '历史学': 'humanities',
    '哲学': 'humanities', '考古学': 'humanities'
  };

  const category = majorToCategory[major];

  let filtered = TAGGED_QUESTION_BANK.filter(q => {
    const scenarioMatch = q.scenarioTags.includes(scenario) || q.scenarioTags.includes('all');
    if (!scenarioMatch) return false;

    if (difficulty && q.difficulty !== difficulty) return false;

    const hasAll = q.majorTags.includes('all');
    const hasCategory = category && q.majorTags.includes(category);
    const hasMajor = q.majorTags.includes(major);

    return hasMajor || hasCategory || hasAll;
  });

  filtered.sort((a, b) => {
    const aHasMajor = a.majorTags.includes(major);
    const bHasMajor = b.majorTags.includes(major);
    if (aHasMajor && !bHasMajor) return -1;
    if (!aHasMajor && bHasMajor) return 1;

    const aHasCategory = category && a.majorTags.includes(category);
    const bHasCategory = category && b.majorTags.includes(category);
    if (aHasCategory && !bHasCategory) return -1;
    if (!aHasCategory && bHasCategory) return 1;

    const aHasAll = a.majorTags.includes('all');
    const bHasAll = b.majorTags.includes('all');
    if (!aHasAll && bHasAll) return -1;
    if (aHasAll && !bHasAll) return 1;

    return 0;
  });

  return filtered.slice(0, count);
}

/**
 * 获取题目类型标签的中文名称
 * @param {string} type - 类型标签
 * @returns {string} 中文名称
 */
function getQuestionTypeName(type) {
  const typeMap = {
    'behavioral': '行为面试题',
    'technical': '专业面试题',
    'situational': '情境面试题',
    'roleplay': '角色扮演题'
  };
  return typeMap[type] || type;
}

// ===================================
// 兼容旧版题库结构（保持向后兼容）
// ===================================
const QUESTION_BANKS = {
  campus: {
    name: '校园招聘',
    icon: '💼',
    description: '模拟企业校招面试流程',
    questions: { easy: [], medium: [], hard: [] }
  },
  tech: {
    name: '大厂技术岗',
    icon: '💻',
    description: '互联网大厂技术岗位面试',
    questions: { easy: [], medium: [], hard: [] }
  },
  teacher: {
    name: '教资面试',
    icon: '📚',
    description: '教师资格证面试场景模拟',
    questions: { easy: [], medium: [], hard: [] }
  },
  graduate: {
    name: '考研复试',
    icon: '🎓',
    description: '研究生入学面试场景模拟',
    questions: { easy: [], medium: [], hard: [] }
  },
  civil: {
    name: '公务员面试',
    icon: '🏛️',
    description: '公务员结构化面试场景模拟',
    questions: { easy: [], medium: [], hard: [] }
  },
  hospital: {
    name: '医院面试',
    icon: '⚕️',
    description: '医疗机构面试场景模拟',
    questions: { easy: [], medium: [], hard: [] }
  },
  english: {
    name: '英语口语面试',
    icon: '🗣️',
    description: '英语口语面试场景模拟',
    questions: { easy: [], medium: [], hard: [] }
  },
  art: {
    name: '艺术专业面试',
    icon: '🎨',
    description: '艺术类专业面试场景模拟',
    questions: { easy: [], medium: [], hard: [] }
  }
};

// 动态填充旧版题库结构（兼容性处理）
Object.keys(QUESTION_BANKS).forEach(scenarioId => {
  ['easy', 'medium', 'hard'].forEach(difficulty => {
    const questions = TAGGED_QUESTION_BANK.filter(q =>
      q.scenarioTags.includes(scenarioId) && q.difficulty === difficulty
    );
    QUESTION_BANKS[scenarioId].questions[difficulty] = questions;
  });
});

// ===================================
// 评分维度配置
// ===================================
const SCORING_DIMENSIONS = {
  professional: {
    name: '专业匹配度',
    weight: 25,
    max: 25,
    description: '专业知识掌握程度与岗位要求匹配度'
  },
  logic: {
    name: '逻辑表达',
    weight: 20,
    max: 20,
    description: '回答的逻辑性、条理性和结构化程度'
  },
  adaptability: {
    name: '临场应变',
    weight: 20,
    max: 20,
    description: '面对追问和压力时的反应能力和灵活性'
  },
  professionalism: {
    name: '职业素养',
    weight: 15,
    max: 15,
    description: '责任心、团队合作和持续学习意识'
  },
  etiquette: {
    name: '语言礼仪',
    weight: 20,
    max: 20,
    description: '表达流畅度、礼貌用语和专业形象'
  }
};

// ===================================
// AI面试官提示词模板
// ===================================
const EVALUATION_PROMPT_TEMPLATE = `你是一位资深的面试官，正在对求职者进行面试评估。

【面试基本信息】
- 目标岗位：{position}
- 目标专业：{major}
- 面试难度：{difficulty}
- 面试风格：{style}

【当前题目】
题目内容：{question}
求职者回答：{answer}

【评分维度】
请根据以下五个维度对求职者的回答进行评分（每个维度满分5分）：
1. 专业匹配度：专业知识掌握程度与岗位要求匹配度
2. 逻辑表达：回答的逻辑性、条理性和结构化程度
3. 临场应变：面对追问和压力时的反应能力和灵活性
4. 职业素养：责任心、团队合作和持续学习意识
5. 语言礼仪：表达流畅度、礼貌用语和专业形象

【输出格式要求】
必须严格按照以下JSON格式输出，不要包含任何其他文字：
{
  "professional": 专业匹配度得分(0-5),
  "logic": 逻辑表达得分(0-5),
  "adaptability": 临场应变得分(0-5),
  "professionalism": 职业素养得分(0-5),
  "etiquette": 语言礼仪得分(0-5),
  "feedback": "简短的反馈意见，指出优点和不足"
}

请开始评分。`;

// AI复盘评语生成提示词模板 - 结构化输出
const REPORT_PROMPT_TEMPLATE = `你是一位资深的面试导师和职业规划专家。请根据以下完整的面试对话记录，生成一份详细、专业、个性化的复盘评语报告（≥300字）。

【面试基本信息】
- 目标岗位：{position}
- 目标专业：{major}
- 面试难度：{difficulty}
- 面试风格：{style}

【完整对话记录】
{conversation}

【五维评分结果】
{scores}

【输出格式要求】
必须严格按照以下三大板块结构输出，每个板块标题加粗（使用**加粗**），内容详实具体：

## 一、整体评级总评

根据总分给出对应评级（优秀/良好/中等/及格/薄弱/较差），结合面试表现进行综合评价。分析求职者的整体优势和核心竞争力，指出面试中的关键表现。

## 二、逐题复盘分析

对每道题目进行深入分析，引用求职者回答中的原文内容，标注亮点（✅）和漏洞（❌）：
- 亮点：具体指出回答中的优点、闪光点、专业表述
- 漏洞：具体指出回答中的不足、逻辑问题、知识盲区

## 三、低分维度改进方案

针对得分较低的维度（低于该维度满分的55%），给出具体、可操作的改进建议和练习方法。每个低分维度至少给出2条针对性改进措施。

【写作要求】
- 总字数≥300字，内容详实具体，避免通用模板套话
- 引用求职者回答原文时用「」标注
- 使用具体案例和数据支撑观点
- 语言专业但通俗易懂，具有指导性
- 改进方案要切实可行，有明确的执行步骤
- 保持客观中立，既要肯定优点，也要指出不足

请开始生成复盘评语报告。`;

// ===================================
// 专项训练题型库 - 按维度分类
// ===================================
const TRAINING_QUESTIONS = {
  professional: {
    name: '专业匹配度训练',
    icon: '💼',
    description: '测试专业知识和岗位匹配能力',
    questions: [
      {
        id: 'train_pro_1',
        text: '请谈谈你对这个行业未来发展趋势的理解，你认为哪些技术或理念将产生重大影响？',
        targetDimension: 'professional',
        followUp: [
          { text: '你能举出一些具体的数据或案例来支撑你的观点吗？' },
          { text: '基于你的分析，企业应该做好哪些准备？' }
        ]
      },
      {
        id: 'train_pro_2',
        text: '在你看来，从事这个岗位需要具备哪些核心专业技能？你目前掌握了多少？',
        targetDimension: 'professional',
        followUp: [
          { text: '你通过什么方式学习这些技能的？' },
          { text: '你觉得哪些技能还需要加强？计划如何提升？' }
        ]
      },
      {
        id: 'train_pro_3',
        text: '请分享一个你在学习或项目中遇到的专业难题，你是如何解决的？',
        targetDimension: 'professional',
        followUp: [
          { text: '解决这个问题用到了哪些专业知识？' },
          { text: '从这次经历中你学到了什么？' }
        ]
      },
      {
        id: 'train_pro_4',
        text: '如果让你负责一个新项目，你会如何快速了解行业并制定专业的工作方案？',
        targetDimension: 'professional',
        followUp: [
          { text: '你会从哪些渠道获取行业信息？' },
          { text: '如何判断信息的可靠性和价值？' }
        ]
      }
    ]
  },
  logic: {
    name: '逻辑表达训练',
    icon: '🧠',
    description: '提升回答的结构化和条理性',
    questions: [
      {
        id: 'train_log_1',
        text: '请用STAR法则描述一次你成功完成任务的经历。',
        targetDimension: 'logic',
        followUp: [
          { text: '当时的情境是什么？面临哪些困难？' },
          { text: '你具体采取了哪些行动？' },
          { text: '最终取得了什么成果？' }
        ]
      },
      {
        id: 'train_log_2',
        text: '请分析一下为什么很多年轻人选择"躺平"，从多个角度谈谈你的看法。',
        targetDimension: 'logic',
        followUp: [
          { text: '你能从经济、社会、个人三个层面详细分析吗？' },
          { text: '这种现象对社会有什么影响？' }
        ]
      },
      {
        id: 'train_log_3',
        text: '如果让你向一位非专业人士解释你专业领域的一个复杂概念，你会怎么说？',
        targetDimension: 'logic',
        followUp: [
          { text: '能用一个生活中的例子类比一下吗？' },
          { text: '对方可能会追问哪些问题？如何回答？' }
        ]
      },
      {
        id: 'train_log_4',
        text: '请用"首先、其次、最后"的结构，谈谈如何提升团队协作效率。',
        targetDimension: 'logic',
        followUp: [
          { text: '每个要点能具体说明一下吗？' },
          { text: '这三个方面之间有什么内在联系？' }
        ]
      }
    ]
  },
  adaptability: {
    name: '临场应变训练',
    icon: '⚡',
    description: '锻炼面对压力和追问的应对能力',
    questions: [
      {
        id: 'train_adp_1',
        text: '如果你在工作中犯了一个错误，但这个错误还没有被发现，你会怎么做？',
        targetDimension: 'adaptability',
        followUp: [
          { text: '如果主动承认可能会受到批评，你还会这么做吗？为什么？' },
          { text: '如何避免类似错误再次发生？' }
        ]
      },
      {
        id: 'train_adp_2',
        text: '假设你的领导安排了一项你完全不熟悉的任务，deadline很紧，你会怎么办？',
        targetDimension: 'adaptability',
        followUp: [
          { text: '你会如何向领导沟通你的困难？' },
          { text: '在完全没有经验的情况下，你如何保证任务完成质量？' }
        ]
      },
      {
        id: 'train_adp_3',
        text: '如果在面试中面试官对你的某个回答表示质疑甚至否定，你会如何应对？',
        targetDimension: 'adaptability',
        followUp: [
          { text: '如果确实是你的观点有偏差，你会承认吗？' },
          { text: '如何在被质疑时保持冷静并展现思考能力？' }
        ]
      },
      {
        id: 'train_adp_4',
        text: '假设你在做一个重要项目时，突然被告知项目方向要全部调整，你会如何应对？',
        targetDimension: 'adaptability',
        followUp: [
          { text: '之前的工作成果要如何处理？' },
          { text: '如何在高压下快速调整心态和工作计划？' }
        ]
      }
    ]
  },
  professionalism: {
    name: '职业素养训练',
    icon: '🎯',
    description: '培养责任心和团队合作意识',
    questions: [
      {
        id: 'train_prf_1',
        text: '请描述一次你主动承担额外工作任务的经历，为什么你会这么做？',
        targetDimension: 'professionalism',
        followUp: [
          { text: '额外的工作对你的本职工作有什么影响？' },
          { text: '你从中学到了什么？' }
        ]
      },
      {
        id: 'train_prf_2',
        text: '在团队项目中，如果你发现某个成员经常拖延影响整体进度，你会怎么做？',
        targetDimension: 'professionalism',
        followUp: [
          { text: '你尝试过哪些方法？效果如何？' },
          { text: '是否考虑过向领导汇报？为什么？' }
        ]
      },
      {
        id: 'train_prf_3',
        text: '请谈谈你是如何保持持续学习和自我提升的？最近学到了什么新知识？',
        targetDimension: 'professionalism',
        followUp: [
          { text: '你是如何平衡学习和工作时间的？' },
          { text: '学习的知识在实际中得到了应用吗？' }
        ]
      },
      {
        id: 'train_prf_4',
        text: '如果公司利益和个人利益发生冲突，你会如何处理？请举例说明。',
        targetDimension: 'professionalism',
        followUp: [
          { text: '你能接受利益受损的情况吗？为什么？' },
          { text: '长期来看，这种选择对你的职业发展有什么影响？' }
        ]
      }
    ]
  },
  etiquette: {
    name: '语言礼仪训练',
    icon: '💬',
    description: '提升表达的流畅度和专业度',
    questions: [
      {
        id: 'train_etq_1',
        text: '请用2分钟介绍一下你自己，要求表达流畅、结构清晰。',
        targetDimension: 'etiquette',
        followUp: [
          { text: '你的自我介绍有哪些亮点可以让人印象深刻？' },
          { text: '如果时间只有30秒，你会如何精简？' }
        ]
      },
      {
        id: 'train_etq_2',
        text: '请复述一下你刚才的回答，注意避免口头禅，保持表达的流畅和连贯。',
        targetDimension: 'etiquette',
        followUp: [
          { text: '你觉得两次回答有什么区别？' },
          { text: '你计划如何克服表达中的不足？' }
        ]
      },
      {
        id: 'train_etq_3',
        text: '如果面试结束时面试官问你"你还有什么问题想问我们吗？"，你会问什么？',
        targetDimension: 'etiquette',
        followUp: [
          { text: '什么样的问题能给面试官留下好印象？' },
          { text: '有哪些问题是应该避免问的？为什么？' }
        ]
      },
      {
        id: 'train_etq_4',
        text: '请模拟一下入职第一天向同事自我介绍的场景，你会怎么说？',
        targetDimension: 'etiquette',
        followUp: [
          { text: '如何在短时间内让同事记住你？' },
          { text: '你的自我介绍展现了哪些职业素养？' }
        ]
      }
    ]
  }
};

// ===================================
// 示例回答模板
// ===================================
const SAMPLE_ANSWERS = {
  default: {
    excellent: '这是一个非常出色的回答，体现了申请者扎实的专业能力和出色的沟通技巧。回答结构清晰，使用了具体的数据和案例支撑观点，充分展示了STAR法则的各个要素。',
    good: '回答整体不错，逻辑清晰，但可以进一步丰富细节，增加具体案例和数据支撑，使回答更具说服力。',
    needsImprovement: '回答过于简略或缺乏条理性。建议增加具体例子，清晰阐述背景、目标、行动和结果，使用STAR法则组织回答。'
  }
};

// ===================================
// Interview configuration options
// ===================================
const CONFIG_OPTIONS = {
  scenarios: [
    {
      id: 'campus',
      name: '校园招聘',
      icon: '💼',
      description: '模拟企业校招面试流程',
      focus: '综合能力考察，注重项目经验、实习经历、职业规划',
      categories: ['business', 'engineering', 'humanities', 'science']
    },
    {
      id: 'tech',
      name: '大厂技术岗',
      icon: '💻',
      description: '互联网大厂技术岗位面试',
      focus: '算法能力、技术深度、项目架构、代码能力',
      categories: ['engineering']
    },
    {
      id: 'teacher',
      name: '教资面试',
      icon: '📚',
      description: '教师资格证面试场景模拟',
      focus: '教学设计能力、课堂组织、教育理念、板书技能',
      categories: ['education']
    },
    {
      id: 'graduate',
      name: '考研复试',
      icon: '🎓',
      description: '研究生入学面试场景模拟',
      focus: '专业基础知识、科研潜力、英语能力、学术规划',
      categories: ['science', 'engineering', 'humanities', 'medicine']
    },
    {
      id: 'civil',
      name: '公务员面试',
      icon: '🏛️',
      description: '公务员结构化面试场景模拟',
      focus: '综合分析能力、组织协调能力、应变能力、政治素养',
      categories: ['humanities', 'business', 'education']
    },
    {
      id: 'hospital',
      name: '医院面试',
      icon: '⚕️',
      description: '医疗机构面试场景模拟',
      focus: '医学专业知识、临床技能、职业素养、医德医风',
      categories: ['medicine']
    },
    {
      id: 'english',
      name: '英语口语面试',
      icon: '🗣️',
      description: '英语口语面试场景模拟',
      focus: '口语表达能力、听力理解、跨文化交流、专业英语',
      categories: ['education', 'humanities', 'business']
    },
    {
      id: 'art',
      name: '艺术专业面试',
      icon: '🎨',
      description: '艺术类专业面试场景模拟',
      focus: '专业技能展示、创意设计能力、艺术修养、作品集',
      categories: ['art']
    }
  ],

  majors: [
    '计算机科学与技术', '软件工程', '人工智能', '数据科学',
    '金融学', '经济学', '会计学', '工商管理',
    '法学', '汉语言文学', '新闻学', '广告学',
    '机械工程', '电子信息工程', '土木工程', '材料科学',
    '生物医学工程', '环境工程', '化学', '物理',
    '英语', '日语', '法语', '教育学',
    '心理学', '社会学', '哲学', '历史学',
    '临床医学', '护理学', '药学', '公共卫生',
    '农学', '园艺', '动物科学', '林学',
    '音乐学', '美术学', '设计学', '戏剧影视学'
  ],

  positions: [
    '前端开发工程师', '后端开发工程师', '算法工程师', '产品经理',
    '金融分析师', '投资银行家', '会计师', '审计师',
    '律师', '法官', '检察官', '公务员',
    '教师', '教授', '研究员', '医生',
    '护士', '药剂师', '记者', '编辑',
    '设计师', '摄影师', '导演', '演员',
    '建筑师', '工程师', '项目经理', '数据分析师'
  ],

  difficulties: [
    { value: 'easy', label: '简单', description: '适合初学者，基础问题为主' },
    { value: 'medium', label: '中等', description: '标准难度，综合考察能力' },
    { value: 'hard', label: '困难', description: '高难度，深度专业问题' }
  ],

  styles: [
    { value: 'normal', label: '正常', description: '标准面试节奏' },
    { value: 'strict', label: '严格', description: '高标准，追问频繁' },
    { value: 'friendly', label: '友好', description: '轻松氛围，鼓励为主' }
  ],

  durations: [
    { value: 5, label: '5分钟' },
    { value: 10, label: '10分钟' },
    { value: 15, label: '15分钟' },
    { value: 20, label: '20分钟' },
    { value: 30, label: '30分钟' }
  ]
};

// Export for use in other modules
window.INTERVIEW_CONFIG = {
  QUESTION_BANKS,
  SAMPLE_ANSWERS,
  CONFIG_OPTIONS,
  SCORING_DIMENSIONS,
  EVALUATION_PROMPT_TEMPLATE,
  REPORT_PROMPT_TEMPLATE,
  TRAINING_QUESTIONS,
  TAGGED_QUESTION_BANK,
  filterQuestions,
  getQuestionTypeName
};

// ===================================
// 八大类大学专业预设列表（全学科覆盖）
// ===================================
const MAJOR_CATEGORIES = {
  business: {
    name: '经管类',
    icon: '💼',
    color: '#3b82f6',
    majors: [
      { value: '金融学', label: '金融学', category: 'business' },
      { value: '会计学', label: '会计学', category: 'business' },
      { value: '经济学', label: '经济学', category: 'business' },
      { value: '工商管理', label: '工商管理', category: 'business' },
      { value: '市场营销', label: '市场营销', category: 'business' },
      { value: '人力资源管理', label: '人力资源管理', category: 'business' },
      { value: '财务管理', label: '财务管理', category: 'business' },
      { value: '国际贸易', label: '国际贸易', category: 'business' },
      { value: '信息管理与信息系统', label: '信息管理与信息系统', category: 'business' },
      { value: '统计学', label: '统计学', category: 'business' }
    ]
  },
  engineering: {
    name: '计算机/工科类',
    icon: '💻',
    color: '#10b981',
    majors: [
      { value: '计算机科学与技术', label: '计算机科学与技术', category: 'engineering' },
      { value: '软件工程', label: '软件工程', category: 'engineering' },
      { value: '人工智能', label: '人工智能', category: 'engineering' },
      { value: '数据科学与大数据技术', label: '数据科学与大数据技术', category: 'engineering' },
      { value: '网络工程', label: '网络工程', category: 'engineering' },
      { value: '电子信息工程', label: '电子信息工程', category: 'engineering' },
      { value: '通信工程', label: '通信工程', category: 'engineering' },
      { value: '自动化', label: '自动化', category: 'engineering' },
      { value: '机械工程', label: '机械工程', category: 'engineering' },
      { value: '电气工程', label: '电气工程', category: 'engineering' }
    ]
  },
  science: {
    name: '理学类',
    icon: '🔬',
    color: '#8b5cf6',
    majors: [
      { value: '数学', label: '数学', category: 'science' },
      { value: '物理学', label: '物理学', category: 'science' },
      { value: '化学', label: '化学', category: 'science' },
      { value: '生物学', label: '生物学', category: 'science' },
      { value: '环境科学', label: '环境科学', category: 'science' },
      { value: '地质学', label: '地质学', category: 'science' },
      { value: '心理学', label: '心理学', category: 'science' },
      { value: '统计学', label: '统计学', category: 'science' },
      { value: '生态学', label: '生态学', category: 'science' },
      { value: '天文学', label: '天文学', category: 'science' }
    ]
  },
  medicine: {
    name: '医学类',
    icon: '⚕️',
    color: '#ef4444',
    majors: [
      { value: '临床医学', label: '临床医学', category: 'medicine' },
      { value: '护理学', label: '护理学', category: 'medicine' },
      { value: '药学', label: '药学', category: 'medicine' },
      { value: '口腔医学', label: '口腔医学', category: 'medicine' },
      { value: '公共卫生与预防医学', label: '公共卫生与预防医学', category: 'medicine' },
      { value: '中医学', label: '中医学', category: 'medicine' },
      { value: '中西医临床医学', label: '中西医临床医学', category: 'medicine' },
      { value: '医学影像学', label: '医学影像学', category: 'medicine' },
      { value: '麻醉学', label: '麻醉学', category: 'medicine' },
      { value: '康复治疗学', label: '康复治疗学', category: 'medicine' }
    ]
  },
  agriculture: {
    name: '农林类',
    icon: '🌾',
    color: '#84cc16',
    majors: [
      { value: '农学', label: '农学', category: 'agriculture' },
      { value: '园艺', label: '园艺', category: 'agriculture' },
      { value: '植物保护', label: '植物保护', category: 'agriculture' },
      { value: '动物科学', label: '动物科学', category: 'agriculture' },
      { value: '动物医学', label: '动物医学', category: 'agriculture' },
      { value: '林学', label: '林学', category: 'agriculture' },
      { value: '水土保持与荒漠化防治', label: '水土保持与荒漠化防治', category: 'agriculture' },
      { value: '农业资源与环境', label: '农业资源与环境', category: 'agriculture' },
      { value: '食品科学与工程', label: '食品科学与工程', category: 'agriculture' },
      { value: '风景园林', label: '风景园林', category: 'agriculture' }
    ]
  },
  art: {
    name: '艺术类',
    icon: '🎨',
    color: '#f472b6',
    majors: [
      { value: '视觉传达设计', label: '视觉传达设计', category: 'art' },
      { value: '环境设计', label: '环境设计', category: 'art' },
      { value: '产品设计', label: '产品设计', category: 'art' },
      { value: '动画', label: '动画', category: 'art' },
      { value: '音乐表演', label: '音乐表演', category: 'art' },
      { value: '音乐学', label: '音乐学', category: 'art' },
      { value: '舞蹈表演', label: '舞蹈表演', category: 'art' },
      { value: '广播电视编导', label: '广播电视编导', category: 'art' },
      { value: '影视摄影与制作', label: '影视摄影与制作', category: 'art' },
      { value: '播音与主持艺术', label: '播音与主持艺术', category: 'art' }
    ]
  },
  education: {
    name: '师范类',
    icon: '📚',
    color: '#f59e0b',
    majors: [
      { value: '汉语言文学', label: '汉语言文学', category: 'education' },
      { value: '数学与应用数学', label: '数学与应用数学', category: 'education' },
      { value: '英语', label: '英语', category: 'education' },
      { value: '物理学', label: '物理学', category: 'education' },
      { value: '化学', label: '化学', category: 'education' },
      { value: '生物科学', label: '生物科学', category: 'education' },
      { value: '思想政治教育', label: '思想政治教育', category: 'education' },
      { value: '教育学', label: '教育学', category: 'education' },
      { value: '心理学', label: '心理学', category: 'education' },
      { value: '体育教育', label: '体育教育', category: 'education' }
    ]
  },
  humanities: {
    name: '文法学院类',
    icon: '📖',
    color: '#6366f1',
    majors: [
      { value: '法学', label: '法学', category: 'humanities' },
      { value: '政治学与行政学', label: '政治学与行政学', category: 'humanities' },
      { value: '社会学', label: '社会学', category: 'humanities' },
      { value: '社会工作', label: '社会工作', category: 'humanities' },
      { value: '新闻传播学', label: '新闻传播学', category: 'humanities' },
      { value: '网络与新媒体', label: '网络与新媒体', category: 'humanities' },
      { value: '广告学', label: '广告学', category: 'humanities' },
      { value: '历史学', label: '历史学', category: 'humanities' },
      { value: '哲学', label: '哲学', category: 'humanities' },
      { value: '考古学', label: '考古学', category: 'humanities' }
    ]
  }
};

// 获取所有预设专业列表（平铺）
const PRESET_MAJORS = [];
Object.values(MAJOR_CATEGORIES).forEach(cat => {
  PRESET_MAJORS.push(...cat.majors);
});

// ===================================
// localStorage工具函数 - 自定义专业管理
// ===================================

/**
 * 从localStorage读取自定义专业列表
 * @returns {Array} 自定义专业数组
 */
function getCustomMajors() {
  try {
    const data = localStorage.getItem('customMajors');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('读取自定义专业失败:', e);
    return [];
  }
}

/**
 * 保存自定义专业列表到localStorage
 * @param {Array} majors 自定义专业数组
 * @returns {boolean} 是否保存成功
 */
function saveCustomMajors(majors) {
  try {
    localStorage.setItem('customMajors', JSON.stringify(majors));
    return true;
  } catch (e) {
    console.error('保存自定义专业失败:', e);
    return false;
  }
}

/**
 * 添加自定义专业
 * @param {string} majorName 专业名称
 * @returns {boolean} 是否添加成功
 */
function addCustomMajor(majorName) {
  // 校验：非空且不含特殊符号
  if (!majorName || !majorName.trim()) {
    return false;
  }

  // 校验：不允许特殊符号（只允许中文、英文、数字、空格）
  const validPattern = /^[\u4e00-\u9fa5a-zA-Z0-9\s]+$/;
  if (!validPattern.test(majorName.trim())) {
    return false;
  }

  const trimmedName = majorName.trim();
  const customMajors = getCustomMajors();

  // 检查是否已存在（包括预设专业）
  const allMajors = [...PRESET_MAJORS, ...customMajors];
  const exists = allMajors.some(m => m.value === trimmedName || m.label === trimmedName);

  if (exists) {
    return false;
  }

  // 添加到自定义专业列表
  customMajors.push({ value: trimmedName, label: trimmedName, isCustom: true });
  return saveCustomMajors(customMajors);
}

/**
 * 删除自定义专业
 * @param {string} majorValue 专业值
 * @returns {boolean} 是否删除成功
 */
function removeCustomMajor(majorValue) {
  const customMajors = getCustomMajors();
  const filtered = customMajors.filter(m => m.value !== majorValue);

  if (filtered.length === customMajors.length) {
    return false; // 没有找到要删除的专业
  }

  return saveCustomMajors(filtered);
}

/**
 * 获取所有专业列表（预设+自定义）
 * @returns {Array} 所有专业数组
 */
function getAllMajors() {
  const customMajors = getCustomMajors();
  return [...PRESET_MAJORS, ...customMajors];
}

// 导出专业相关函数
window.MAJOR_UTILS = {
  MAJOR_CATEGORIES,
  PRESET_MAJORS,
  getCustomMajors,
  saveCustomMajors,
  addCustomMajor,
  removeCustomMajor,
  getAllMajors
};

// ===================================
// 全学科预设岗位列表
// ===================================
const PRESET_POSITIONS = [
  { value: '金融分析师', label: '金融分析师', majors: ['金融学', '经济学', '统计学'], category: 'business' },
  { value: '会计师', label: '会计师', majors: ['会计学', '财务管理'], category: 'business' },
  { value: '市场营销专员', label: '市场营销专员', majors: ['市场营销', '工商管理'], category: 'business' },
  { value: '人力资源专员', label: '人力资源专员', majors: ['人力资源管理', '工商管理'], category: 'business' },
  { value: '产品经理', label: '产品经理', majors: ['信息管理与信息系统', '计算机科学与技术', '市场营销'], category: 'business' },
  { value: '前端开发工程师', label: '前端开发工程师', majors: ['计算机科学与技术', '软件工程'], category: 'engineering' },
  { value: '后端开发工程师', label: '后端开发工程师', majors: ['计算机科学与技术', '软件工程'], category: 'engineering' },
  { value: '算法工程师', label: '算法工程师', majors: ['计算机科学与技术', '人工智能', '数学'], category: 'engineering' },
  { value: '数据分析师', label: '数据分析师', majors: ['数据科学与大数据技术', '统计学', '数学'], category: 'engineering' },
  { value: '测试工程师', label: '测试工程师', majors: ['计算机科学与技术', '软件工程'], category: 'engineering' },
  { value: '硬件工程师', label: '硬件工程师', majors: ['电子信息工程', '通信工程', '自动化'], category: 'engineering' },
  { value: '机械工程师', label: '机械工程师', majors: ['机械工程', '自动化'], category: 'engineering' },
  { value: '教师', label: '教师', majors: ['汉语言文学', '数学与应用数学', '英语', '物理学', '化学', '生物科学', '教育学'], category: 'education' },
  { value: '小学教师', label: '小学教师', majors: ['教育学', '心理学', '汉语言文学', '数学与应用数学'], category: 'education' },
  { value: '中学教师', label: '中学教师', majors: ['汉语言文学', '数学与应用数学', '英语', '物理学', '化学', '生物科学'], category: 'education' },
  { value: '医生', label: '医生', majors: ['临床医学', '口腔医学', '医学影像学', '麻醉学'], category: 'medicine' },
  { value: '护士', label: '护士', majors: ['护理学'], category: 'medicine' },
  { value: '药剂师', label: '药剂师', majors: ['药学'], category: 'medicine' },
  { value: '公务员', label: '公务员', majors: ['法学', '政治学与行政学', '汉语言文学', '经济学', '会计学'], category: 'humanities' },
  { value: '律师', label: '律师', majors: ['法学'], category: 'humanities' },
  { value: '记者', label: '记者', majors: ['新闻传播学', '汉语言文学'], category: 'humanities' },
  { value: '新媒体运营', label: '新媒体运营', majors: ['网络与新媒体', '广告学', '新闻传播学'], category: 'humanities' },
  { value: '设计师', label: '设计师', majors: ['视觉传达设计', '环境设计', '产品设计'], category: 'art' },
  { value: '动画师', label: '动画师', majors: ['动画'], category: 'art' },
  { value: '编导', label: '编导', majors: ['广播电视编导', '影视摄影与制作'], category: 'art' },
  { value: '科研人员', label: '科研人员', majors: ['数学', '物理学', '化学', '生物学', '环境科学'], category: 'science' },
  { value: '心理咨询师', label: '心理咨询师', majors: ['心理学'], category: 'science' },
  { value: '农林技术员', label: '农林技术员', majors: ['农学', '园艺', '植物保护', '动物科学', '动物医学'], category: 'agriculture' },
  { value: '食品工程师', label: '食品工程师', majors: ['食品科学与工程'], category: 'agriculture' },
  { value: '园林设计师', label: '园林设计师', majors: ['风景园林', '园艺'], category: 'agriculture' }
];

// ===================================
// localStorage工具函数 - 自定义岗位管理
// ===================================

/**
 * 从localStorage读取自定义岗位列表
 * @returns {Array} 自定义岗位数组
 */
function getCustomPositions() {
  try {
    const data = localStorage.getItem('customPositions');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('读取自定义岗位失败:', e);
    return [];
  }
}

/**
 * 保存自定义岗位列表到localStorage
 * @param {Array} positions 自定义岗位数组
 * @returns {boolean} 是否保存成功
 */
function saveCustomPositions(positions) {
  try {
    localStorage.setItem('customPositions', JSON.stringify(positions));
    return true;
  } catch (e) {
    console.error('保存自定义岗位失败:', e);
    return false;
  }
}

/**
 * 添加自定义岗位
 * @param {string} positionName 岗位名称
 * @returns {boolean} 是否添加成功
 */
function addCustomPosition(positionName) {
  // 校验：非空且不含特殊符号
  if (!positionName || !positionName.trim()) {
    return false;
  }

  // 校验：不允许特殊符号（只允许中文、英文、数字、空格）
  const validPattern = /^[\u4e00-\u9fa5a-zA-Z0-9\s]+$/;
  if (!validPattern.test(positionName.trim())) {
    return false;
  }

  const trimmedName = positionName.trim();
  const customPositions = getCustomPositions();

  // 检查是否已存在（包括预设岗位）
  const allPositions = [...PRESET_POSITIONS, ...customPositions];
  const exists = allPositions.some(p => p.value === trimmedName || p.label === trimmedName);

  if (exists) {
    return false;
  }

  // 添加到自定义岗位列表
  customPositions.push({ value: trimmedName, label: trimmedName, isCustom: true });
  return saveCustomPositions(customPositions);
}

/**
 * 删除自定义岗位
 * @param {string} positionValue 岗位值
 * @returns {boolean} 是否删除成功
 */
function removeCustomPosition(positionValue) {
  const customPositions = getCustomPositions();
  const filtered = customPositions.filter(p => p.value !== positionValue);

  if (filtered.length === customPositions.length) {
    return false; // 没有找到要删除的岗位
  }

  return saveCustomPositions(filtered);
}

/**
 * 获取所有岗位列表（预设+自定义）
 * @returns {Array} 所有岗位数组
 */
function getAllPositions() {
  const customPositions = getCustomPositions();
  return [...PRESET_POSITIONS, ...customPositions];
}

/**
 * 根据专业获取推荐岗位
 * @param {string} majorValue 专业值
 * @returns {Array} 推荐岗位数组
 */
function getRecommendedPositions(majorValue) {
  const allPositions = getAllPositions();
  // 优先返回匹配该专业的岗位，再返回其他岗位
  const matched = allPositions.filter(p => p.majors && p.majors.includes(majorValue));
  const others = allPositions.filter(p => !p.majors || !p.majors.includes(majorValue));

  return [...matched, ...others];
}

// 导出岗位相关函数
window.POSITION_UTILS = {
  PRESET_POSITIONS,
  getCustomPositions,
  saveCustomPositions,
  addCustomPosition,
  removeCustomPosition,
  getAllPositions,
  getRecommendedPositions
};