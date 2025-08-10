
const dataUrl = 'projects.json';

async function loadData() {
  const res = await fetch(dataUrl);
  const data = await res.json();

  const exp = document.getElementById('experience-list');
  data.experience.forEach(item => exp.appendChild(card(item)));

  const projects = document.getElementById('projects-list');
  data.projects.forEach(item => projects.appendChild(card(item)));

  const research = document.getElementById('research-list');
  data.research.forEach(item => research.appendChild(card(item)));

  document.getElementById('year').textContent = new Date().getFullYear();
}

function card(item) {
  const li = document.createElement('li');
  li.className = 'card';
  li.innerHTML = `
    <h3>${item.title}</h3>
    ${item.subtitle ? `<p><strong>${item.subtitle}</strong></p>` : ''}
    <p>${item.description}</p>
    ${item.tags?.length ? `<div>${item.tags.map(t => `<span class="badge">${t}</span>`).join('')}</div>` : ''}
    ${item.link ? `<p><a href="${item.link}" target="_blank" rel="noopener">Learn more →</a></p>` : ''}
  `;
  return li;
}

loadData();
