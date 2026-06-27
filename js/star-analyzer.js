/* ===================================
   AI Interview Simulator - STAR Analyzer
   Analyzes answers for STAR法则 elements
   =================================== */

class StarAnalyzer {
  constructor() {
    this.elements = {
      S: {
        name: 'Situation',
        keywords: [
          '当时', '情况', '背景', '环境', '公司', '团队', '项目',
          '那时候', '之前', '最初', '一开始', '曾经', '参加',
          '面临', '遇到', '发现', '作为', '职责', '担任',
          'situation', 'context', 'background', 'when', 'at that time'
        ],
        patterns: [
          /当时/gi, /情况是/gi, /背景是/gi, /那时候/gi,
          /一开始/gi, /最初/gi, /我记得/gi, /有一次/gi
        ]
      },
      T: {
        name: 'Task',
        keywords: [
          '目标', '任务', '负责', '解决', '完成', '达到',
          '我的任务是', '我要', '需要', '目的是', '为了',
          'goal', 'task', 'responsibility', 'objective', 'aim'
        ],
        patterns: [
          /我的目标是/gi, /任务是/gi, /需要完成/gi,
          /目的是/gi, /为了达成/gi, /目标是/gi
        ]
      },
      A: {
        name: 'Action',
        keywords: [
          '我做了', '我采取了', '我决定', '我主动', '我带领',
          '我组织', '我协调', '我和', '我首先', '然后',
          '具体来说', '通过', '使用了', '采用了',
          'action', 'did', 'took', 'decided', 'led', 'organized'
        ],
        patterns: [
          /我做了(\w+)/gi, /我采取了/gi, /我决定/gi,
          /具体来说/gi, /通过.*方式/gi, /使用了/gi
        ]
      },
      R: {
        name: 'Result',
        keywords: [
          '结果', '成果', '效果', '最终', '达到了', '完成了',
          '提升了', '增长了', '改善了', '获得了', '学会了',
          'result', 'outcome', 'achieved', 'completed', 'improved', 'increased'
        ],
        patterns: [
          /最终(结果|达到)/gi, /达到了/gi, /结果是/gi,
          /完成了.*目标/gi, /提升了.*%/gi
        ]
      }
    };
  }

  analyze(text) {
    const results = {
      S: { detected: false, score: 0, evidence: [] },
      T: { detected: false, score: 0, evidence: [] },
      A: { detected: false, score: 0, evidence: [] },
      R: { detected: false, score: 0, evidence: [] }
    };

    // Analyze each element
    for (const [element, data] of Object.entries(this.elements)) {
      // Check keywords
      let keywordMatches = 0;
      for (const keyword of data.keywords) {
        const regex = new RegExp(keyword, 'gi');
        const matches = text.match(regex);
        if (matches) {
          keywordMatches += matches.length;
        }
      }

      // Check patterns
      let patternMatches = 0;
      for (const pattern of data.patterns) {
        const matches = text.match(pattern);
        if (matches) {
          patternMatches += matches.length;
        }
      }

      // Calculate score (0-100)
      const totalScore = Math.min(100, (keywordMatches * 15) + (patternMatches * 25));
      results[element].score = totalScore;

      // Mark as detected if score is above threshold
      results[element].detected = totalScore >= 30;

      // Extract evidence
      if (results[element].detected) {
        results[element].evidence = this.extractEvidence(text, data.patterns);
      }
    }

    // Calculate overall STAR completeness (0-100)
    const detectedCount = Object.values(results).filter(r => r.detected).length;
    const avgScore = Object.values(results).reduce((sum, r) => sum + r.score, 0) / 4;
    results.completeness = Math.round(avgScore);
    results.elementCount = detectedCount;

    return results;
  }

  extractEvidence(text, patterns) {
    const evidence = [];
    for (const pattern of patterns) {
      const matches = text.match(pattern);
      if (matches) {
        evidence.push(...matches.slice(0, 3)); // Limit to 3 per pattern
      }
    }
    return [...new Set(evidence)].slice(0, 5); // Remove duplicates, limit to 5
  }

  getNextElement(currentElements) {
    // Determine which STAR element to follow up on based on what's missing
    const order = ['S', 'T', 'A', 'R'];
    for (const element of order) {
      if (!currentElements.includes(element)) {
        return element;
      }
    }
    return null; // All elements covered
  }

  generateFollowUp(element, context) {
    const followUps = {
      S: [
        '当时的具体情况是怎样的？能描述一下背景吗？',
        '是什么环境和条件下发生的？',
        '当时团队/公司的情况如何？'
      ],
      T: [
        '你当时的目标是什么？想要达成什么样的结果？',
        '这个任务的主要挑战是什么？',
        '你期望取得什么样的成果？'
      ],
      A: [
        '你具体采取了哪些行动？能详细说说吗？',
        '你是如何解决遇到的困难的？',
        '在这个过程中你发挥了什么作用？'
      ],
      R: [
        '最终的结果如何？有没有量化的成果？',
        '这次经历给你带来了什么收获或成长？',
        '这个成果对你后续有什么影响？'
      ]
    };

    const options = followUps[element];
    return options[Math.floor(Math.random() * options.length)];
  }

  // Analyze answer quality
  analyzeQuality(text) {
    const analysis = {
      fluency: this.analyzeFluency(text),
      structure: this.analyzeStructure(text),
      details: this.analyzeDetails(text),
      overall: 0
    };

    // Calculate overall score
    analysis.overall = Math.round(
      (analysis.fluency * 0.3) +
      (analysis.structure * 0.4) +
      (analysis.details * 0.3)
    );

    return analysis;
  }

  analyzeFluency(text) {
    // Check for filler words
    const fillerWords = /嗯|啊|那个|然后|就是说|basically|like|well|you know/gi;
    const fillerCount = (text.match(fillerWords) || []).length;
    const fillerRatio = fillerCount / text.split(/\s+/).length;

    // Calculate fluency score
    let score = 100;
    if (fillerRatio > 0.15) score -= 30;
    else if (fillerRatio > 0.1) score -= 20;
    else if (fillerRatio > 0.05) score -= 10;

    // Check for sentence completeness
    const sentences = text.split(/[.!?。！？]/);
    const incompleteSentences = sentences.filter(s => s.trim().length < 5);
    if (incompleteSentences.length > sentences.length * 0.3) {
      score -= 15;
    }

    return Math.max(0, score);
  }

  analyzeStructure(text) {
    const starResult = this.analyze(text);
    const elementCount = starResult.elementCount;

    // Base score on STAR element coverage
    let score = elementCount * 25;

    // Bonus for balanced elements
    const avgScore = Object.values(starResult)
      .filter(r => typeof r.score === 'number')
      .reduce((a, b) => a + b, 0) / 4;

    score += avgScore * 0.1;

    return Math.min(100, Math.round(score));
  }

  analyzeDetails(text) {
    // Check for specific details (numbers, percentages, names)
    const hasNumbers = /\d+%|\d+年|\d+人|\d+次|\d+个/g.test(text);
    const hasNames = /(王|李|张|刘|陈|他们|我们|团队)/g.test(text);
    const hasSpecifics = /(具体|详细|比如|例如)/g.test(text);

    let score = 50;
    if (hasNumbers) score += 20;
    if (hasNames) score += 15;
    if (hasSpecifics) score += 15;

    // Check length (too short is bad, but too long isn't necessarily better)
    const wordCount = text.replace(/\s+/g, '').length;
    if (wordCount < 50) score -= 20;
    else if (wordCount > 200) score += 10;

    return Math.min(100, score);
  }
}

// Export for use
window.StarAnalyzer = StarAnalyzer;