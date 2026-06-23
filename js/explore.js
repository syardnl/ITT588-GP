// Copy all careers
let careerList = [...allCareers];

const searchInput = document.getElementById("searchInput");
const clusterFilter = document.getElementById("clusterFilter");
const salaryFilter = document.getElementById("salaryFilter");

const careerGrid = document.getElementById("careerGrid");
const resultCount = document.getElementById("resultCount");
const clearBtn = document.getElementById("clearBtn");

const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

function loadClusters() {

    let clusters = [];

    allCareers.forEach(function (career) {

        if (!clusters.includes(career.cluster)) {
            clusters.push(career.cluster);
        }

    });

    clusters.forEach(function (cluster) {

        clusterFilter.innerHTML += `
            <option value="${cluster}">
                ${cluster}
            </option>
        `;

    });

}


// Filter Career
function filterCareer() {

    const search = searchInput.value.toLowerCase().trim();
    const cluster = clusterFilter.value;
    const salary = salaryFilter.value;

    careerList = allCareers.filter(function (career) {

        // Search
        const matchSearch =
            career.title.toLowerCase().includes(search) ||
            career.description.toLowerCase().includes(search);

        // Cluster
        const matchCluster =
            cluster === "" ||
            career.cluster === cluster;

        // Salary (minimum salary)
        const amount = parseInt(
            career.salary.match(/\d[\d,]*/)[0].replace(/,/g, "")
        );

        let matchSalary = true;

        if (salary === "entry") {
            matchSalary = amount < 3000;
        }

        if (salary === "mid") {
            matchSalary = amount >= 3000 && amount < 6000;
        }

        if (salary === "high") {
            matchSalary = amount >= 6000;
        }

        return matchSearch && matchCluster && matchSalary;

    });

    displayCareer();

}
// Display Career
function displayCareer() {

    careerGrid.innerHTML = "";

    resultCount.innerHTML = careerList.length + " Careers Found";

    if (careerList.length === 0) {

        careerGrid.innerHTML = `
            <div class="col-12 text-center mt-5">
                <h4>No careers found.</h4>
            </div>
        `;

        return;
    }

    careerList.forEach(function (career) {

        careerGrid.innerHTML += `

        <div class="col-lg-4 col-md-6 mb-4">

            <div class="card career-card shadow-sm h-100">

                <div class="card-body">

                    <div class="text-center mb-3">

                        <i class="bi ${career.icon} fs-1"
                        style="color:${career.color}"></i>

                    </div>

                    <h5>${career.title}</h5>

                    <small class="text-muted">
                        ${career.cluster}
                    </small>

                    <p class="mt-3">

                        ${career.description}

                    </p>

                    <hr>

                    <p>

                        <strong>Salary</strong><br>

                        ${career.salary}

                    </p>

                    <p>

                        <strong>Outlook</strong><br>

                        ${career.outlook}

                    </p>

                    <button
                        class="btn btn-primary w-100"
                        onclick="showCareer('${career.id}')">

                        View Details

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}
// Show Career
function showCareer(id) {

    const career = allCareers.find(function (item) {

        return item.id === id;

    });

    let skillHTML = "";

    career.skills.forEach(function (skill) {

        skillHTML += `
            <span class="badge bg-primary me-2 mb-2">
                ${skill}
            </span>
        `;

    });

    let checklistHTML = "";

    if (skillChecklist[id]) {

        skillChecklist[id].forEach(function (item) {

            checklistHTML += `
                <li>${item}</li>
            `;

        });

    }

    modalTitle.innerHTML = career.title;

    modalBody.innerHTML = `

        <div class="text-center mb-3">

            <i class="bi ${career.icon} fs-1"
            style="color:${career.color}"></i>

        </div>

        <p>

            ${career.description}

        </p>

        <hr>

        <p>

            <strong>Cluster:</strong>

            ${career.cluster}

        </p>

        <p>

            <strong>Salary:</strong>

            ${career.salary}

        </p>

        <p>

            <strong>Job Outlook:</strong>

            ${career.outlook}

        </p>

        <p>

            <strong>Study Path:</strong>

            ${career.study}

        </p>

        <hr>

        <h5>Skills</h5>

        ${skillHTML}

        <hr>

        <h5>Beginner Checklist</h5>

        <ul>

            ${checklistHTML}

        </ul>

    `;

    const modal = new bootstrap.Modal(
        document.getElementById("careerModal")
    );

    modal.show();

}

// Clear Filter
function clearFilter() {

    searchInput.value = "";
    clusterFilter.value = "";
    salaryFilter.value = "";

    filterCareer();

}

// Events
searchInput.addEventListener("input", filterCareer);

clusterFilter.addEventListener("change", filterCareer);

salaryFilter.addEventListener("change", filterCareer);

clearBtn.addEventListener("click", clearFilter);


// Start
loadClusters();
filterCareer();