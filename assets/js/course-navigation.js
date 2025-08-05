document.addEventListener('DOMContentLoaded', function() {
  // Add mobile menu toggle functionality
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      const mainMenu = document.querySelector('.main-menu');
      mainMenu.classList.toggle('active');
    });
  }
  
  // Highlight active lesson in sidebar
  const currentPath = window.location.pathname;
  const lessonLinks = document.querySelectorAll('.lesson-link');
  
  lessonLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.parentElement.classList.add('active');
    }
  });
});