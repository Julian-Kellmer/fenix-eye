

// document.addEventListener('scroll', function () {
//   const header = document.querySelector("#nav-responsive");
//   if (window.scrollY > 100) {
//     header.classList.add('transparent');
//   } else {
//     header.classList.remove('transparent');
//   }
// });


const sliders = [
  {
    left: document.querySelector('#btn-left1'),
    right: document.querySelector('#btn-right1'),
    slider: document.querySelector('#slider1'),
  },
  {
    left: document.querySelector('#btn-left2'),
    right: document.querySelector('#btn-right2'),
    slider: document.querySelector('#slider2'),
  },
];

sliders.forEach((s) => {
  let operacion = 0,
    widthImg = 100 / s.slider.querySelectorAll('.slider-section').length,
    counter = 0;

  s.left.addEventListener('click', () => moveToLeft(s));
  s.right.addEventListener('click', () => moveToRight(s));

  function moveToRight(s) {
    if (counter >= s.slider.querySelectorAll('.slider-section').length - 1) {
      operacion = 0;
      counter = 0;
      s.slider.style.transform = `translate(-${operacion}%)`;
      return;
    }
    counter++;
    operacion = operacion + widthImg;
    s.slider.style.transform = `translate(-${operacion}%)`;
    s.slider.style.transition = 'all ease .6s';
  }

  function moveToLeft(s) {
    counter--;
    if (counter < 0) {
      counter = s.slider.querySelectorAll('.slider-section').length - 1;
      operacion = widthImg * (s.slider.querySelectorAll('.slider-section').length - 1);
      s.slider.style.transform = `translate(-${operacion}%)`;
      return;
    }
    operacion = operacion - widthImg;
    s.slider.style.transform = `translate(-${operacion}%)`;
    s.slider.style.transition = 'all ease .6s';
  }
});

// toggle menu


  
