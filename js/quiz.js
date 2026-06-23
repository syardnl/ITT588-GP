// ============================================================
// quiz.js — Career Matching Logic
// ITT588 Group 5 · CareerPilot
// ============================================================
//
// HOW IT WORKS:
//
// The user picks exactly 1–3 interests AND 1–3 skills.
//
// Step 1 — If/else combination matching:
//   We check if the user's picks match known combinations.
//   Each combination of interests + skills directly returns
//   a specific set of 3 career IDs from data.js.
//
// Step 2 — Fallback scoring:
//   If no combination matches, we fall back to a scoring
//   system: +1 point per career for each matching interest
//   or skill, then rank and take top 3.
//
// Either way, saveProfile() bundles the results and saves
// them to localStorage for report.html to display.
// ============================================================


// ── COMBINATION TABLE ─────────────────────────────────────
// Format: 'interest1+interest2+interest3|skill1+skill2+skill3'
// Keys are sorted alphabetically so order doesn't matter.
// Values are arrays of career IDs from data.js.
//
// We cover all meaningful 3-interest + 3-skill combos,
// plus 2-pick and 1-pick fallbacks below.
// ─────────────────────────────────────────────────────────

var combinations = {

  // ── Technology-heavy combos ──────────────────────────────
  'logic+security+technology|networking+problem-solving+programming':
    ['cybersecurity', 'network-engineer', 'software-eng'],

  'data+technology+innovation|programming+problem-solving+sql':
    ['software-eng', 'ai-engineer', 'data-analyst'],

  'technology+innovation+research|programming+statistics+analysis':
    ['ai-engineer', 'data-analyst', 'software-eng'],

  'technology+logic+security|networking+attention-to-detail+critical-thinking':
    ['cybersecurity', 'network-engineer', 'cloud-engineer'],

  'technology+innovation+building|programming+problem-solving+teamwork':
    ['software-eng', 'cloud-engineer', 'ai-engineer'],

  'technology+data+research|sql+statistics+analysis':
    ['data-analyst', 'ai-engineer', 'business-analyst'],

  'technology+logic+math|programming+math+problem-solving':
    ['software-eng', 'ai-engineer', 'data-analyst'],

  'technology+building+innovation|networking+problem-solving+attention-to-detail':
    ['network-engineer', 'cloud-engineer', 'cybersecurity'],

  // ── Design combos ────────────────────────────────────────
  'art+design+innovation|creativity+design-tools+problem-solving':
    ['ux-designer', 'graphic-designer', 'marketing-manager'],

  'art+design+media|creativity+design-tools+communication':
    ['graphic-designer', 'ux-designer', 'marketing-manager'],

  'art+design+technology|creativity+design-tools+programming':
    ['ux-designer', 'graphic-designer', 'software-eng'],

  'art+design+marketing|creativity+seo+communication':
    ['graphic-designer', 'marketing-manager', 'ux-designer'],

  // ── Business combos ──────────────────────────────────────
  'business+finance+data|excel+analysis+critical-thinking':
    ['accountant', 'business-analyst', 'data-analyst'],

  'business+marketing+social-media|communication+seo+creativity':
    ['marketing-manager', 'journalist', 'business-analyst'],

  'business+finance+math|excel+math+attention-to-detail':
    ['accountant', 'business-analyst', 'data-analyst'],

  'business+marketing+innovation|leadership+communication+creativity':
    ['marketing-manager', 'business-analyst', 'journalist'],

  'business+writing+media|writing+communication+research':
    ['journalist', 'marketing-manager', 'lawyer'],

  'business+finance+writing|writing+critical-thinking+communication':
    ['lawyer', 'journalist', 'business-analyst'],

  // ── Healthcare combos ────────────────────────────────────
  'healthcare+science+helping-others|empathy+communication+critical-thinking':
    ['doctor', 'pharmacist', 'teacher'],

  'healthcare+science+research|analysis+attention-to-detail+critical-thinking':
    ['pharmacist', 'doctor', 'data-analyst'],

  'healthcare+helping-others+teaching|empathy+communication+leadership':
    ['teacher', 'doctor', 'lecturer'],

  // ── Education combos ─────────────────────────────────────
  'teaching+research+writing|communication+leadership+research':
    ['lecturer', 'teacher', 'journalist'],

  'teaching+helping-others+writing|communication+empathy+leadership':
    ['teacher', 'lecturer', 'pharmacist'],

  // ── Engineering combos ───────────────────────────────────
  'building+math+innovation|math+problem-solving+attention-to-detail':
    ['civil-engineer', 'mechanical-engineer', 'architect'],

  'building+design+innovation|creativity+problem-solving+math':
    ['architect', 'civil-engineer', 'ux-designer'],

  'building+technology+math|networking+math+problem-solving':
    ['network-engineer', 'civil-engineer', 'mechanical-engineer'],

  // ── Law / Media combos ────────────────────────────────────
  'writing+research+business|writing+critical-thinking+communication':
    ['lawyer', 'journalist', 'lecturer'],

  'media+writing+social-media|writing+seo+communication':
    ['journalist', 'marketing-manager', 'graphic-designer'],

};


// ── INTEREST → CAREER (for scoring fallback) ─────────────
var interestMap = {
  'technology':     ['software-eng', 'ai-engineer', 'network-engineer', 'cloud-engineer', 'cybersecurity'],
  'math':           ['data-analyst', 'ai-engineer', 'civil-engineer', 'mechanical-engineer', 'accountant'],
  'science':        ['doctor', 'pharmacist', 'mechanical-engineer', 'ai-engineer'],
  'art':            ['graphic-designer', 'ux-designer'],
  'business':       ['business-analyst', 'marketing-manager', 'accountant', 'lawyer'],
  'writing':        ['journalist', 'lawyer', 'lecturer'],
  'helping-others': ['doctor', 'pharmacist', 'teacher', 'lecturer'],
  'data':           ['data-analyst', 'business-analyst', 'ai-engineer'],
  'design':         ['graphic-designer', 'ux-designer', 'architect'],
  'logic':          ['software-eng', 'cybersecurity', 'ai-engineer', 'lawyer'],
  'social-media':   ['marketing-manager', 'journalist'],
  'marketing':      ['marketing-manager', 'business-analyst'],
  'healthcare':     ['doctor', 'pharmacist'],
  'finance':        ['accountant', 'business-analyst', 'lawyer'],
  'teaching':       ['teacher', 'lecturer'],
  'building':       ['civil-engineer', 'mechanical-engineer', 'architect', 'network-engineer'],
  'research':       ['ai-engineer', 'lecturer', 'journalist', 'data-analyst'],
  'innovation':     ['software-eng', 'ai-engineer', 'ux-designer', 'cloud-engineer'],
  'media':          ['journalist', 'marketing-manager', 'graphic-designer'],
  'security':       ['cybersecurity', 'network-engineer']
};

// ── SKILL → CAREER (for scoring fallback) ─────────────────
var skillMap = {
  'programming':         ['software-eng', 'ai-engineer', 'cloud-engineer'],
  'problem-solving':     ['software-eng', 'cybersecurity', 'ai-engineer', 'civil-engineer', 'mechanical-engineer'],
  'communication':       ['teacher', 'lecturer', 'marketing-manager', 'lawyer', 'journalist', 'pharmacist', 'doctor'],
  'creativity':          ['graphic-designer', 'ux-designer', 'marketing-manager', 'architect'],
  'math':                ['data-analyst', 'ai-engineer', 'civil-engineer', 'mechanical-engineer', 'accountant'],
  'analysis':            ['data-analyst', 'business-analyst', 'ai-engineer', 'lawyer'],
  'writing':             ['journalist', 'lecturer', 'lawyer'],
  'teamwork':            ['software-eng', 'business-analyst', 'doctor'],
  'leadership':          ['marketing-manager', 'teacher', 'lecturer'],
  'design-tools':        ['graphic-designer', 'ux-designer'],
  'excel':               ['data-analyst', 'business-analyst', 'accountant'],
  'sql':                 ['data-analyst', 'software-eng', 'ai-engineer'],
  'networking':          ['network-engineer', 'cybersecurity', 'cloud-engineer'],
  'research':            ['lecturer', 'journalist', 'data-analyst', 'ai-engineer'],
  'attention-to-detail': ['pharmacist', 'accountant', 'cybersecurity', 'architect'],
  'statistics':          ['data-analyst', 'ai-engineer'],
  'seo':                 ['marketing-manager', 'journalist'],
  'empathy':             ['doctor', 'pharmacist', 'teacher'],
  'organisation':        ['business-analyst', 'accountant', 'architect'],
  'critical-thinking':   ['lawyer', 'doctor', 'cybersecurity', 'data-analyst']
};


// ── makeKey(interests, skills) ────────────────────────────
// Sorts both arrays alphabetically and joins them with a '|'
// so 'logic+technology+security' is the same key regardless
// of what order the user clicked them.
function makeKey(interests, skills) {
  var sortedI = interests.slice().sort().join('+');
  var sortedS = skills.slice().sort().join('+');
  return sortedI + '|' + sortedS;
}


// ── lookupCombination(interests, skills) ──────────────────
// Checks the combinations table above.
// Returns an array of 3 career IDs if found, or null.
//
// Also tries partial matches (2-pick subsets) if no exact
// 3-pick match is found.
function lookupCombination(interests, skills) {

  // Try exact key first
  var key = makeKey(interests, skills);
  if (combinations[key]) {
    return combinations[key];
  }

  // Try all 2-interest × 2-skill subsets
  for (var ii = 0; ii < interests.length; ii++) {
    for (var ij = ii + 1; ij < interests.length; ij++) {
      for (var si = 0; si < skills.length; si++) {
        for (var sj = si + 1; sj < skills.length; sj++) {
          var subKey = makeKey(
            [interests[ii], interests[ij]],
            [skills[si], skills[sj]]
          );
          if (combinations[subKey]) return combinations[subKey];
        }
      }
    }
  }

  // Try single interest + single skill pairs
  for (var i = 0; i < interests.length; i++) {
    for (var s = 0; s < skills.length; s++) {
      var pairKey = makeKey([interests[i]], [skills[s]]);
      if (combinations[pairKey]) return combinations[pairKey];
    }
  }

  return null; // no match — fall through to scoring
}


// ── scoringFallback(interests, skills) ───────────────────
// If no combination matched, score every career and return
// the top 3 IDs.
function scoringFallback(interests, skills) {
  var scoreBoard = {};
  careers.forEach(function(career) {
    scoreBoard[career.id] = 0;
  });

  interests.forEach(function(interest) {
    var matched = interestMap[interest] || [];
    matched.forEach(function(id) {
      if (scoreBoard[id] !== undefined) scoreBoard[id] += 1;
    });
  });

  skills.forEach(function(skill) {
    var matched = skillMap[skill] || [];
    matched.forEach(function(id) {
      if (scoreBoard[id] !== undefined) scoreBoard[id] += 1;
    });
  });

  var sorted = Object.keys(scoreBoard).sort(function(a, b) {
    return scoreBoard[b] - scoreBoard[a];
  });

  return sorted.slice(0, 3);
}


// ── idToCareerObject(id, score) ───────────────────────────
// Turns a career ID into the full object report.js needs.
function idToCareerObject(id, matchScore) {
  var c = careers.find(function(x) { return x.id === id; });
  if (!c) return { id: id, title: id, matchScore: matchScore };
  return {
    id:          c.id,
    title:       c.title,
    cluster:     c.cluster,
    icon:        c.icon,
    color:       c.color,
    salary:      c.salary,
    outlook:     c.outlook,
    study:       c.study,
    description: c.description,
    matchScore:  matchScore
  };
}


// ── matchCareers(interests, skills) ──────────────────────
// Main matching function.
// 1. Try the combination table (if/else logic).
// 2. Fall back to scoring.
// Returns top 3 career objects with matchScore percentages.
function matchCareers(interests, skills) {

  var topIds;
  var usedCombination = false;

  // Step 1 — if/else combination lookup
  var combo = lookupCombination(interests, skills);

  if (combo !== null) {
    // Found an exact (or partial) combination match
    topIds = combo;
    usedCombination = true;
  } else {
    // Step 2 — scoring fallback
    topIds = scoringFallback(interests, skills);
    usedCombination = false;
  }

  // Convert IDs to career objects with realistic % scores
  // #1 gets highest %, then decreasing
  var baseScores = [92, 76, 61];

  return topIds.map(function(id, index) {
    return idToCareerObject(id, baseScores[index] || 50);
  });
}


// ── buildSkillChecklist(topCareerId, userSkills) ──────────
// Returns the beginner steps for the top career,
// marking steps as "completed" if the user already has
// matching skills.
function buildSkillChecklist(topCareerId, userSkills) {
  var steps = skillChecklist[topCareerId] || [];

  return steps.map(function(step) {
    var stepLower = step.toLowerCase();
    var done = userSkills.some(function(skill) {
      var words = skill.replace(/-/g, ' ');
      return stepLower.includes(words) || stepLower.includes(skill);
    });
    return { skill: step, completed: done };
  });
}


// ── saveProfile(profile) ──────────────────────────────────
// Called by submitQuiz() in quiz.html.
// Runs matchCareers(), builds the checklist, bundles
// everything, and saves to localStorage.
function saveProfile(profile) {
  var topCareers = matchCareers(profile.interests, profile.skills);
  var topId      = topCareers.length > 0 ? topCareers[0].id : 'software-eng';
  var checklist  = buildSkillChecklist(topId, profile.skills);

  var results = {
    name:           profile.name,
    studyLevel:     profile.studyLevel,
    fieldStudy:     profile.fieldStudy,
    notes:          profile.notes,
    interests:      profile.interests,
    skills:         profile.skills,
    topCareers:     topCareers,
    skillChecklist: checklist,
    completedDate:  new Date().toISOString().split('T')[0]
  };

  localStorage.setItem('careerCompassResults', JSON.stringify(results));
}


// ── initAnimations() ──────────────────────────────────────
// Fades in data-animate="fade-up" elements on scroll.
function initAnimations() {
  var targets = document.querySelectorAll('[data-animate="fade-up"]');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function(el) { el.style.opacity = 1; });
    return;
  }
  targets.forEach(function(el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(function(el) { observer.observe(el); });
}

