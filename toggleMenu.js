document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-responsive');

  menuToggle.addEventListener('click', function () {
    nav.classList.toggle('show');
  });
});
