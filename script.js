let allProjects = [];

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    allProjects = data.projects;
    renderCards(allProjects);
    setupFilterButtons();
    setupFilterScroll();
  });

const renderCards = (projects) => {
  const container = document.querySelector('.filterable-cards');
  container.innerHTML = '';
  
  projects.forEach(project => {
    const linksHTML = project.links.map(link => `
      <a class="a-services" href="${link.url}" target="_blank">
        <div class="card-organ">
          <i class="${link.icon} fa-lg"></i>
          <p>${link.type}</p>
        </div>
      </a>
    `).join('');

    const toolsHTML = project.tools.map(tool => `
      <div class="label-info"><p>${tool}</p></div>
    `).join('');

    const card = `
      <div class="card" data-name="${project.category}">
        <div class="card-title">
          <h4 id="h4-bold">${project.title}</h4><br>
          <p>${project.description}</p>
        </div>
        <div class="label">${toolsHTML}</div>
        <img src="${project.image}" alt="${project.title}">
        <div class="card-body">${linksHTML}</div>
      </div>
    `;
    container.innerHTML += card;
  });
};

const setupFilterButtons = () => {
  const filterButtons = document.querySelectorAll('.filter-button-container button');
  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-button-nav')) return;
      
      document.querySelector('.filter-active').classList.remove('filter-active');
      e.target.classList.add('filter-active');
      
      const filtered = e.target.dataset.name === 'all' 
        ? allProjects 
        : allProjects.filter(p => p.category === e.target.dataset.name);
      
      renderCards(filtered);
    });
  });
};

const setupFilterScroll = () => {
  const container = document.querySelector('.filter-button-container');
  const prevBtn = document.querySelector('.filter-button-nav.prev');
  const nextBtn = document.querySelector('.filter-button-nav.next');
  
  const scrollAmount = 300;
  
  // Navigation button clicks
  prevBtn.addEventListener('click', () => {
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });
  
  nextBtn.addEventListener('click', () => {
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
  
  // Drag to scroll
  let isDown = false;
  let startX;
  let scrollLeft;
  
  container.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });
  
  container.addEventListener('mouseleave', () => {
    isDown = false;
  });
  
  container.addEventListener('mouseup', () => {
    isDown = false;
  });
  
  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  });
  
  // Touch support for mobile
  container.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });
  
  container.addEventListener('touchend', () => {
    isDown = false;
  });
  
  container.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  });
};

const setupMobileMenu = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navRight = document.querySelector('.nav-right');
  const navA = document.querySelector('.nav-a');

  menuToggle.addEventListener('click', () => {
    navRight.classList.toggle('active');
    navA.classList.toggle('active');
  });

  const navLinks = document.querySelectorAll('.nav-a a, .nav-right a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navRight.classList.remove('active');
      navA.classList.remove('active');
    });
  });
};

document.addEventListener('DOMContentLoaded', setupMobileMenu);

