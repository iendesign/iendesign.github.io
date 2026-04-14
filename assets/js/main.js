document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxPdf = document.getElementById('lightbox-pdf');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  let currentIndex = 0;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  if (lightbox && portfolioItems.length > 0) {
    portfolioItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        currentIndex = index;
        openLightbox(item);
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      navigate(-1);
    });

    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      navigate(1);
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  function openLightbox(item) {
    const type = item.getAttribute('data-type');
    const src = item.getAttribute('data-src');

    if (type === 'pdf') {
      lightboxImg.style.display = 'none';
      lightboxPdf.style.display = 'block';
      lightboxPdf.src = src;
    } else {
      lightboxPdf.style.display = 'none';
      lightboxPdf.src = '';
      lightboxImg.style.display = 'block';
      lightboxImg.src = src;
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxPdf.src = '';
    lightboxImg.src = '';
  }

  function navigate(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = portfolioItems.length - 1;
    if (currentIndex >= portfolioItems.length) currentIndex = 0;
    openLightbox(portfolioItems[currentIndex]);
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section-card, .service-card, .portfolio-item, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});