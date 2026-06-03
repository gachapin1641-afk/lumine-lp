/* ============================================================
  FAQアコーディオン
============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    const icon = item.querySelector('.faq__icon');

    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('faq__item--open');

      faqItems.forEach(function (el) {
        el.classList.remove('faq__item--open');
        el.querySelector('.faq__answer').style.display = 'none';
        el.querySelector('.faq__icon').textContent = '▼';
        el.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('faq__item--open');
        answer.style.display = 'block';
        icon.textContent = '▲';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const firstItem = document.querySelector('.faq__item--open');
  if (firstItem) {
    firstItem.querySelector('.faq__answer').style.display = 'block';
  }

});

/* ============================================================
  ヘッダー：スクロールダウンで非表示・スクロールアップで表示
============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  const header = document.querySelector('.header');
  let lastScrollY = window.pageYOffset;
  let ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const currentScrollY = window.pageYOffset;

        if (currentScrollY > lastScrollY && currentScrollY > 60) {
          // スクロールダウン → ヘッダー非表示
          header.classList.add('header--hidden');
        } else {
          // スクロールアップ → ヘッダー表示
          header.classList.remove('header--hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  });

});

/* ============================================================
  スムーズスクロール
============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  const header = document.querySelector('.header');
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    });
  });

});

/* ============================================================
  スクロールフェードイン
============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  const fadeItems = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  // ページ読み込み時にすでに画面内にある要素は即表示
  fadeItems.forEach(function (el) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('is-visible');
    } else {
      observer.observe(el);
    }
  });

});
