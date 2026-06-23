// ============================================================
// report.js — Career Readiness Report
// ITT588 Group 5 · CareerPilot
// ============================================================
// Reads the quiz results saved by quiz.js from localStorage
// and renders the full personalised report.
// ============================================================


// ----------------------------------------------------------
// Fallback data — shown if user visits report.html directly
// without completing the quiz first.
// ----------------------------------------------------------
var mockData = {
  name:       'Student',
  studyLevel: "Bachelor's Degree",
  fieldStudy: 'Computer Science',
  interests:  ['technology', 'logic'],
  skills:     ['programming', 'problem-solving'],
  topCareers: [
    {
      id: 'software-eng', title: 'Software Engineer', cluster: 'Technology',
      icon: 'bi-code-slash', color: '#4361ee',
      salary: 'RM 4,000 – RM 12,000/mo', outlook: 'Excellent',
      study: 'Computer Science', description: 'Design and build software applications.',
      matchScore: 87
    },
    {
      id: 'ai-engineer', title: 'AI Engineer', cluster: 'Technology',
      icon: 'bi-cpu', color: '#3a86ff',
      salary: 'RM 6,000 – RM 18,000/mo', outlook: 'Excellent',
      study: 'Artificial Intelligence / Computer Science',
      description: 'Develop artificial intelligence and machine learning solutions.',
      matchScore: 74
    },
    {
      id: 'cybersecurity', title: 'Cybersecurity Analyst', cluster: 'Technology',
      icon: 'bi-shield-check', color: '#d62828',
      salary: 'RM 4,500 – RM 11,000/mo', outlook: 'Excellent',
      study: 'Cybersecurity / IT',
      description: 'Protect systems from cyber attacks.',
      matchScore: 60
    }
  ],
  skillChecklist: [
    { skill: 'Learn HTML, CSS, JavaScript', completed: true  },
    { skill: 'Build small projects',        completed: true  },
    { skill: 'Learn Git basics',            completed: false }
  ],
  completedDate: new Date().toISOString().split('T')[0]
};


// ----------------------------------------------------------
// loadReportData()
// Tries to read real quiz results from localStorage.
// Falls back to mockData if nothing is saved yet.
// ----------------------------------------------------------
function loadReportData() {
  try {
    var stored = localStorage.getItem('careerCompassResults');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Could not read quiz results, using sample data.', e);
  }
  return mockData;
}

function formatDate(dateStr) {
  var d = new Date(dateStr);
  return d.toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' });
}


// ----------------------------------------------------------
// getOutlookBadgeColor(outlook)
// Returns a colour based on the job outlook string.
// ----------------------------------------------------------
function getOutlookBadgeColor(outlook) {
  if (!outlook) return '#6c757d';
  var o = outlook.toLowerCase();
  if (o === 'excellent')  return '#198754';
  if (o === 'very good')  return '#20c997';
  if (o === 'good')       return '#0d6efd';
  if (o === 'stable')     return '#6610f2';
  return '#6c757d';
}


// ----------------------------------------------------------
// renderReport(data)
// Main function — builds all the HTML for the report page.
// ----------------------------------------------------------
function renderReport(data) {

  var container = document.getElementById('reportContent');
  var genDate   = document.getElementById('genDate');

  // Show name + date in the subtitle
  var name = (data.name && data.name !== 'Student') ? data.name : null;
  genDate.textContent = name
    ? 'Report for ' + name + '  ·  Generated on ' + formatDate(data.completedDate)
    : 'Generated on ' + formatDate(data.completedDate);

  // Also update the page <h1> to be personalised
  var heading = document.querySelector('h1');
  if (heading && name) {
    heading.textContent = name + "'s Career Readiness Report";
  }

  // --------------------------------------------------------
  // SECTION 1: Top Career Matches
  // Shows the top 3 careers from the quiz with match % bars.
  // These careers come directly from data.js via quiz.js.
  // --------------------------------------------------------
  var careerCardsHTML = '';
  var sorted = data.topCareers.slice().sort(function(a, b) {
    return b.matchScore - a.matchScore;
  });

  sorted.forEach(function(career, i) {
    var isTop     = (i === 0);
    var rankStyle = isTop
      ? 'border: 2px solid var(--blue-400); background-color: #fff;'
      : 'background-color: var(--blue-50);';
    var badgeStyle = isTop
      ? 'background-color: var(--navy-900); color: #fff;'
      : 'background-color: var(--blue-50); color: var(--navy-900);';
    var barClass   = isTop ? 'bg-navy' : 'bg-blue';
    var crownHTML  = isTop ? '<i class="fa-solid fa-crown me-1" style="color:#f4d03f; font-size:0.75rem;"></i>' : '';

    careerCardsHTML += `
      <div class="d-flex align-items-center gap-3 p-3 mb-3 rounded-3 border" style="${rankStyle}">
        <div class="rank-badge" style="${badgeStyle}">${i + 1}</div>
        <i class="bi ${career.icon} fs-4" style="color:${career.color}; min-width:24px;"></i>
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h3 class="h6 fw-semibold mb-0" style="color:var(--navy-900);">
              ${crownHTML}${career.title}
              <span class="badge ms-2 small" style="background-color:${getOutlookBadgeColor(career.outlook)}; font-size:0.65rem;">
                ${career.outlook}
              </span>
            </h3>
            <span class="fw-bold" style="color:var(--navy-900); min-width:44px; text-align:right;">
              ${career.matchScore}%
            </span>
          </div>
          <div class="progress mb-1" style="height:8px;">
            <div class="progress-bar ${barClass}" role="progressbar"
                 style="width:${career.matchScore}%;"
                 aria-valuenow="${career.matchScore}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <small class="text-muted">${career.cluster} · ${career.salary}</small>
        </div>
      </div>`;
  });


  // --------------------------------------------------------
  // SECTION 2: Top Career Detail
  // Shows a fuller card for the #1 matched career —
  // description, study path, and a link to Explore Careers.
  // --------------------------------------------------------
  var topCareer = sorted[0];
  var topDetailHTML = '';
  if (topCareer) {
    topDetailHTML = `
      <div class="card shadow-sm border mb-4">
        <div class="card-body p-4">
          <h2 class="h5 fw-semibold mb-3" style="color:var(--navy-900);">
            <i class="fa-solid fa-trophy me-2" style="color:var(--blue-400);"></i>
            Your Best Match — ${topCareer.title}
          </h2>
          <div class="d-flex gap-3 align-items-start flex-wrap">
            <div class="text-center p-3 rounded-3" style="background:var(--blue-50); min-width:90px;">
              <i class="bi ${topCareer.icon} fs-1" style="color:${topCareer.color};"></i>
            </div>
            <div class="flex-grow-1">
              <p class="mb-2">${topCareer.description}</p>
              <p class="mb-1"><strong>Cluster:</strong> ${topCareer.cluster}</p>
              <p class="mb-1"><strong>Salary Range:</strong> ${topCareer.salary}</p>
              <p class="mb-1"><strong>Job Outlook:</strong>
                <span class="badge" style="background-color:${getOutlookBadgeColor(topCareer.outlook)};">
                  ${topCareer.outlook}
                </span>
              </p>
              <p class="mb-0"><strong>Recommended Study Path:</strong> ${topCareer.study}</p>
            </div>
          </div>
          <div class="mt-3">
            <a href="explore.html" class="btn btn-sm btn-outline-primary">
              <i class="bi bi-compass me-1"></i>Explore all careers
            </a>
          </div>
        </div>
      </div>`;
  }


  // --------------------------------------------------------
  // SECTION 3: Skill Readiness Checklist
  // Shows beginner steps for the #1 career, ticked based on
  // what the user already selected in the quiz.
  // --------------------------------------------------------
  var checklistHTML = '';
  if (data.skillChecklist && data.skillChecklist.length > 0) {
    data.skillChecklist.forEach(function(item) {
      var doneColor = item.completed ? '#EAF3DE' : '#F1EFE8';
      var textColor = item.completed ? '#3B6D11' : '#888780';
      var borderStyle = item.completed ? 'none' : '1px solid #D3D1C7';
      var icon = item.completed ? 'fa-check' : 'fa-minus';
      var badge = item.completed ? 'Ready' : 'Needs work';

      checklistHTML += `
        <div class="d-flex align-items-center gap-3 p-3 mb-2 rounded-3 border">
          <span class="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                style="width:28px; height:28px; font-size:0.8rem;
                       background-color:${doneColor}; color:${textColor}; border:${borderStyle};">
            <i class="fa-solid ${icon}"></i>
          </span>
          <span class="flex-grow-1 ${item.completed ? '' : 'text-muted'}">${item.skill}</span>
          <span class="badge rounded-pill" style="color:${textColor}; background-color:${doneColor};">
            ${badge}
          </span>
        </div>`;
    });
  }


  // --------------------------------------------------------
  // SECTION 4: Overall Readiness Circle
  // Calculates the percentages of the checklist steps that are done.
  // --------------------------------------------------------
  var total = data.skillChecklist ? data.skillChecklist.length : 0;
  var done  = data.skillChecklist ? data.skillChecklist.filter(function(s) { return s.completed; }).length : 0;
  var pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  var readinessMsg = pct >= 80
    ? "You're well prepared — keep building on your strengths!"
    : pct >= 50
      ? "You're on the right track. Work on the remaining steps to get fully ready."
      : "Focus on the 'Needs work' steps to build your readiness for this career.";


  // --------------------------------------------------------
  // SECTION 5: Profile Summary
  // Shows what the user entered in the quiz
  // --------------------------------------------------------
  var interestLabels = {
    'technology':'💻 Technology','math':'📐 Mathematics','science':'🔬 Science',
    'art':'🎨 Art & Design','business':'📈 Business','writing':'✍️ Writing',
    'helping-others':'🤝 Helping Others','data':'📊 Data & Numbers',
    'design':'🖌️ Visual Design','logic':'🧩 Logic & Puzzles',
    'social-media':'📱 Social Media','marketing':'📣 Marketing',
    'healthcare':'🏥 Healthcare','finance':'💰 Finance','teaching':'📚 Teaching',
    'building':'🏗️ Building Things','research':'🔍 Research',
    'innovation':'💡 Innovation','media':'🎬 Media','security':'🔒 Security'
  };
  var skillLabels = {
    'programming':'💻 Programming','problem-solving':'🧠 Problem Solving',
    'communication':'💬 Communication','creativity':'🎨 Creativity',
    'math':'🔢 Mathematics','analysis':'📊 Data Analysis','writing':'✍️ Writing',
    'teamwork':'🤝 Teamwork','leadership':'👑 Leadership','design-tools':'🖌️ Design Tools',
    'excel':'📋 Excel / Spreadsheets','sql':'🗄️ SQL / Databases',
    'networking':'🌐 Networking','research':'🔍 Research',
    'attention-to-detail':'🔎 Attention to Detail','statistics':'📈 Statistics',
    'seo':'🔗 SEO / Digital Marketing','empathy':'❤️ Empathy',
    'organisation':'📁 Organisation','critical-thinking':'🤔 Critical Thinking'
  };

  var interestBadges = (data.interests || []).map(function(v) {
    return '<span class="badge rounded-pill me-1 mb-1" style="background-color:var(--blue-50); color:var(--navy-900); border:1px solid var(--blue-400);">'
      + (interestLabels[v] || v) + '</span>';
  }).join('');

  var skillBadges = (data.skills || []).map(function(v) {
    return '<span class="badge rounded-pill me-1 mb-1" style="background-color:var(--blue-50); color:var(--navy-900); border:1px solid var(--blue-400);">'
      + (skillLabels[v] || v) + '</span>';
  }).join('');

  var profileHTML = `
    <div class="card shadow-sm border mb-4">
      <div class="card-body p-4">
        <h2 class="h5 fw-semibold mb-3" style="color:var(--navy-900);">
          <i class="fa-solid fa-user me-2" style="color:var(--blue-400);"></i>Your Profile
        </h2>
        <div class="row g-3">
          <div class="col-md-6">
            <p class="mb-1"><strong>Name:</strong> ${data.name || 'Student'}</p>
            <p class="mb-1"><strong>Level of Study:</strong> ${data.studyLevel || '—'}</p>
            <p class="mb-0"><strong>Field / Major:</strong> ${data.fieldStudy || '—'}</p>
          </div>
          <div class="col-md-6">
            ${data.notes ? '<p class="mb-1"><strong>Additional Notes:</strong> ' + data.notes + '</p>' : ''}
          </div>
        </div>
        <hr>
        <p class="fw-semibold mb-2">Selected Interests:</p>
        <div class="mb-3">${interestBadges || '<span class="text-muted small">None selected</span>'}</div>
        <p class="fw-semibold mb-2">Selected Skills:</p>
        <div>${skillBadges || '<span class="text-muted small">None selected</span>'}</div>
      </div>
    </div>`;


  // --------------------------------------------------------
  // Combination of all sections into the main container
  // --------------------------------------------------------
  container.innerHTML = `

    ${profileHTML}

    <div class="card shadow-sm border mb-4">
      <div class="card-body p-4">
        <h2 class="h5 fw-semibold mb-3" style="color:var(--navy-900);">
          <i class="fa-solid fa-star me-2" style="color:var(--blue-400);"></i>Top Career Matches
        </h2>
        <p class="text-muted small mb-3">
          Based on your interests and skills, here are the careers from our
          <a href="explore.html">Explore Careers</a> page that suit you best.
        </p>
        ${careerCardsHTML}
      </div>
    </div>

    ${topDetailHTML}

    <div class="card shadow-sm border mb-4">
      <div class="card-body p-4">
        <h2 class="h5 fw-semibold mb-3" style="color:var(--navy-900);">
          <i class="fa-solid fa-list-check me-2" style="color:var(--blue-400);"></i>
          Skill Readiness Checklist — ${topCareer ? topCareer.title : ''}
        </h2>
        <p class="text-muted small mb-3">
          These are the beginner steps recommended for your top matched career.
          Steps you already have skills for are marked <strong>Ready</strong>.
        </p>
        ${checklistHTML}
      </div>
    </div>

    <div class="card shadow-sm border mb-4">
      <div class="card-body p-4">
        <h2 class="h5 fw-semibold mb-3" style="color:var(--navy-900);">
          <i class="fa-solid fa-gauge-high me-2" style="color:var(--blue-400);"></i>Overall Readiness
        </h2>
        <div class="d-flex align-items-center gap-4 flex-wrap">
          <div class="readiness-circle" style="--pct:${pct}">
            <div class="inner">
              <strong class="fs-3 fw-bold" style="color:var(--navy-900);">${pct}%</strong>
              <span class="small text-muted">Ready</span>
            </div>
          </div>
          <div class="flex-grow-1" style="min-width:200px;">
            <p class="mb-0 text-secondary">
              You've completed <strong>${done} of ${total}</strong> recommended steps.
              ${readinessMsg}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center gap-3 flex-wrap no-print mb-5">
      <button class="btn btn-lg px-4" style="background-color:var(--navy-900); color:#fff;" onclick="window.print()">
        <i class="fa-solid fa-print me-2"></i>Print / Save as PDF
      </button>
      <a href="quiz.html" class="btn btn-outline-secondary btn-lg px-4">
        <i class="fa-solid fa-rotate-left me-2"></i>Retake Quiz
      </a>
      <a href="explore.html" class="btn btn-outline-secondary btn-lg px-4">
        <i class="bi bi-compass me-1"></i>Explore All Careers
      </a>
    </div>
  `;
}


// ----------------------------------------------------------
// If no quiz data — show a prompt to take the quiz first
// ----------------------------------------------------------
function showNoDataMessage() {
  var container = document.getElementById('reportContent');
  container.innerHTML = `
    <div class="text-center py-5">
      <i class="fa-solid fa-clipboard-question fs-1 mb-3" style="color:var(--blue-400);"></i>
      <h4 style="color:var(--navy-900);">No quiz results yet</h4>
      <p class="text-muted mb-4">
        Complete the Skill Quiz first and your personalised career report will appear here.
      </p>
      <a href="quiz.html" class="btn btn-lg px-5" style="background-color:var(--navy-900); color:#fff;">
        <i class="bi bi-magic me-2"></i>Take the Quiz
      </a>
    </div>`;
}


// ----------------------------------------------------------
// Run on page load
// ----------------------------------------------------------
var reportData = loadReportData();

// Check if the data is real (has topCareers from quiz)
if (reportData && reportData.topCareers && reportData.topCareers.length > 0) {
  renderReport(reportData);
} else {
  showNoDataMessage();
}
