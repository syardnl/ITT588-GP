const mockData = {
  topCareers: [
    { title: "Web Developer", matchScore: 87 },
    { title: "UI/UX Designer", matchScore: 78 },
    { title: "Data Analyst", matchScore: 65 }
  ],
  skillChecklist: [
    { skill: "HTML & CSS", completed: true },
    { skill: "JavaScript Fundamentals", completed: true },
    { skill: "Responsive Design", completed: true },
    { skill: "Communication & Teamwork", completed: false },
    { skill: "Problem Solving", completed: false }
  ],
  completedDate: new Date().toISOString().split('T')[0]
};

// load data dari local storage
function loadReportData() {
  try {
    const stored = localStorage.getItem('careerCompassResults');
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn('Could not parse stored results, using mock data.', e);
  }
  return mockData;
}

// Format date
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Render full report
function renderReport(data) {
  const container = document.getElementById('reportContent');
  const genDate = document.getElementById('genDate');
  genDate.textContent = `Generated on ${formatDate(data.completedDate)}`;

  // Career match cards
  const careersSorted = [...data.topCareers].sort((a, b) => b.matchScore - a.matchScore);
  const careerCardsHTML = careersSorted.map((career, i) => `
    <div class="d-flex align-items-center gap-3 p-3 mb-3 rounded-3 border career-card ${i === 0 ? 'rank-1' : ''}"
         style="background-color: ${i === 0 ? '#fff' : 'var(--blue-50)'};">
      <div class="rank-badge">${i + 1}</div>
      <div class="flex-grow-1">
        <h3 class="h6 fw-semibold mb-2" style="color: var(--navy-900);">${career.title}</h3>
        <div class="progress" style="height: 8px;">
          <div class="progress-bar ${i === 0 ? 'bg-navy' : 'bg-blue'}" role="progressbar"
               style="width: ${career.matchScore}%;"
               aria-valuenow="${career.matchScore}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
      <div class="fw-bold fs-5" style="color: var(--navy-900); min-width: 56px; text-align: right;">
        ${career.matchScore}%
      </div>
    </div>
  `).join('');

  // Skill checklist
  const checklistHTML = data.skillChecklist.map(item => `
    <div class="d-flex align-items-center gap-3 p-3 mb-2 rounded-3 border">
      <span class="d-flex align-items-center justify-content-center rounded-circle"
            style="width: 28px; height: 28px; font-size: 0.8rem;
                   background-color: ${item.completed ? '#EAF3DE' : '#F1EFE8'};
                   color: ${item.completed ? '#3B6D11' : '#888780'};
                   border: ${item.completed ? 'none' : '1px solid #D3D1C7'};">
        <i class="fa-solid ${item.completed ? 'fa-check' : 'fa-minus'}"></i>
      </span>
      <span class="flex-grow-1 ${item.completed ? '' : 'text-muted'}">${item.skill}</span>
      <span class="badge rounded-pill"
            style="color: ${item.completed ? '#3B6D11' : '#888780'};
                   background-color: ${item.completed ? '#EAF3DE' : '#F1EFE8'};">
        ${item.completed ? 'Ready' : 'Needs work'}
      </span>
    </div>
  `).join('');

  // Overall readiness
  const total = data.skillChecklist.length;
  const done = data.skillChecklist.filter(s => s.completed).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const readinessMessage = pct >= 80
    ? "You're well prepared for your top career matches — keep it up!"
    : pct >= 50
      ? "You're on the right track. Focus on the remaining skills to boost your readiness."
      : "Consider exploring resources for the skills marked 'Needs work' to improve your readiness.";

  container.innerHTML = `
    <div class="card shadow-sm border mb-4">
      <div class="card-body p-4">
        <h2 class="h5 fw-semibold mb-3" style="color: var(--navy-900);">
          <i class="fa-solid fa-star me-2" style="color: var(--blue-400);"></i>Top career matches
        </h2>
        ${careerCardsHTML}
      </div>
    </div>

    <div class="card shadow-sm border mb-4">
      <div class="card-body p-4">
        <h2 class="h5 fw-semibold mb-3" style="color: var(--navy-900);">
          <i class="fa-solid fa-list-check me-2" style="color: var(--blue-400);"></i>Skill readiness checklist
        </h2>
        ${checklistHTML}
      </div>
    </div>

    <div class="card shadow-sm border mb-4">
      <div class="card-body p-4">
        <h2 class="h5 fw-semibold mb-3" style="color: var(--navy-900);">
          <i class="fa-solid fa-gauge-high me-2" style="color: var(--blue-400);"></i>Overall readiness
        </h2>
        <div class="d-flex align-items-center gap-4 flex-wrap">
          <div class="readiness-circle" style="--pct:${pct}">
            <div class="inner">
              <strong class="fs-3 fw-bold" style="color: var(--navy-900);">${pct}%</strong>
              <span class="small text-muted">Ready</span>
            </div>
          </div>
          <div class="flex-grow-1" style="min-width: 200px;">
            <p class="mb-0 text-secondary">
              You've completed <strong>${done} of ${total}</strong> recommended skills.
              ${readinessMessage}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center gap-3 flex-wrap no-print mb-4">
      <button class="btn btn-lg px-4" style="background-color: var(--navy-900); color: #fff;" onclick="window.print()">
        <i class="fa-solid fa-print me-2"></i>Print / Save as PDF
      </button>
      <a href="quiz.html" class="btn btn-outline-secondary btn-lg px-4">
        <i class="fa-solid fa-rotate-left me-2"></i>Retake quiz
      </a>
    </div>
  `;
}

// Run
renderReport(loadReportData());