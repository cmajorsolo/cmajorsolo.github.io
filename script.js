
const dataUrl = 'data.json';
const themeToggle = document.getElementById('themeToggle');

function applyTheme(){
  const t = localStorage.getItem('theme') || 'dark';
  document.documentElement.classList.toggle('light', t === 'light');
  themeToggle.querySelector('.material-icons').textContent = t === 'light' ? 'light_mode' : 'dark_mode';
}
applyTheme();

themeToggle.addEventListener('click', ()=>{
  const current = localStorage.getItem('theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme();
});

document.addEventListener('click', (e)=>{
  const target = e.target.closest('.ripple');
  if(!target) return;
  const rect = target.getBoundingClientRect();
  target.style.setProperty('--x', `${e.clientX - rect.left}px`);
  target.style.setProperty('--y', `${e.clientY - rect.top}px`);
});

async function load(){
  const res = await fetch(dataUrl);
  const data = await res.json();

  const exp = document.getElementById('experience-list');
  data.experience.forEach(x => exp.appendChild(card(x)));

  const proj = document.getElementById('projects-list');
  data.projects.forEach(x => proj.appendChild(card(x)));

  const research = document.getElementById('research-list');
  data.research.forEach(x => research.appendChild(card(x)));

  document.getElementById('year').textContent = new Date().getFullYear();
}

function card(item){
  const li = document.createElement('li');
  li.className = 'card surface elevation-1';
  li.innerHTML = `
    <h3>${item.title}</h3>
    ${item.subtitle ? `<p><strong>${item.subtitle}</strong></p>` : ''}
    <p>${item.description}</p>
    ${item.tags?.length ? `<div class="badges">${item.tags.map(t => `<span class="badge">${t}</span>`).join('')}</div>` : ''}
    ${item.link ? `<p><a class="btn btn--tonal ripple" href="${item.link}" target="_blank" rel="noopener">Learn more</a></p>` : ''}
  `;
  return li;
}

load();
