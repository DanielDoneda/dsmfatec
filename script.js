const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.nav');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  menu.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      menu.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const previousButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  const currentLabel = carousel.querySelector('[data-carousel-current]');
  const dotsContainer = carousel.querySelector('[data-carousel-dots]');
  let currentIndex = 0;

  const dots = slides.map((_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Exibir slide ${index + 1}`);
    button.addEventListener('click', () => showSlide(index));
    dotsContainer.appendChild(button);
    return button;
  });

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isCurrent = slideIndex === currentIndex;
      slide.hidden = !isCurrent;
      slide.setAttribute('aria-hidden', String(!isCurrent));
    });
    dots.forEach((dot, dotIndex) => {
      dot.setAttribute('aria-current', String(dotIndex === currentIndex));
    });
    currentLabel.textContent = String(currentIndex + 1);
  }

  previousButton.addEventListener('click', () => showSlide(currentIndex - 1));
  nextButton.addEventListener('click', () => showSlide(currentIndex + 1));
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showSlide(currentIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(currentIndex + 1);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      showSlide(0);
    }
    if (event.key === 'End') {
      event.preventDefault();
      showSlide(slides.length - 1);
    }
  });

  showSlide(0);
});
