let currentCareers = [...allCareers];

const cf = document.getElementById('clusterFilter');
careerClusters.forEach(c => {
  cf.innerHTML += `<option value="${c.name}">${c.icon} ${c.name}</option>`;
});