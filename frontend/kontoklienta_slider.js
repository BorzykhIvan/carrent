let currentSlide = 1;

  function changeSlide(n) {
    showSlides(currentSlide += n);
  }

  function showSlides(n) {
    let slides = document.querySelector('.carousel-inner');

    if (n > slides.children.length - 2) {
      currentSlide = 1;
    }

    if (n < 1) {
      currentSlide = slides.children.length - 2;
    }

    slides.style.transform = `translateX(${-33.33 * (currentSlide - 1)}%)`;
  }