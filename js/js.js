const languageButton = document.querySelector('.language-selector');
const languageWrapper = document.querySelector('.language-selector-wrapper');
const languageDropdown = document.querySelector('.language-dropdown');

if (languageButton && languageDropdown) {

    languageButton.addEventListener('click', function (e) {
        e.stopPropagation();

        languageDropdown.classList.toggle('active');
    });

    document.addEventListener('click', function () {
        languageDropdown.classList.remove('active');
    });

    languageWrapper.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    document
        .querySelectorAll('.language-option')
        .forEach(option => {
            option.addEventListener('click', () => {
                languageDropdown.classList.remove('active');
            });
        });
}

      (function() {
        const slides = Array.from(document.querySelectorAll('[data-slide]'));
        const thumbs = Array.from(document.querySelectorAll('.thumb-item'));
        const dots = Array.from(document.querySelectorAll('.dot-item'));
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const currentIndexLabel = document.getElementById('current-index');
        const thumbRail = document.getElementById('thumb-rail');
        const stage = document.getElementById('slide-stage');
        const handle = document.getElementById('compare-handle');

        let activeIndex = 0;
        let comparePosition = 50;
        let dragging = false;

        function updateCompare(position) {
          comparePosition = Math.max(0, Math.min(100, position));
          const activeSlide = slides[activeIndex];
          if (!activeSlide) return;

          slides.forEach(function(slide, i) {
            slide.style.setProperty('--compare-position', (i === activeIndex ? comparePosition : 50) + '%');
          });

          if (handle) handle.style.left = comparePosition + '%';
        }

        function showSlide(index) {
          activeIndex = (index + slides.length) % slides.length;

          slides.forEach((slide, i) => {
            const active = i === activeIndex;
            slide.style.opacity = active ? '1' : '0';
            slide.style.pointerEvents = active ? 'auto' : 'none';
            slide.style.zIndex = active ? '2' : '1';
            slide.setAttribute('aria-hidden', active ? 'false' : 'true');
          });

          thumbs.forEach((thumb, i) => {
            const active = i === activeIndex;
            thumb.classList.toggle('thumb-active', active);
            thumb.setAttribute('aria-current', active ? 'true' : 'false');
            if (active) {
              thumb.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
              });
            }
          });

          dots.forEach((dot, i) => {
            const active = i === activeIndex;
            dot.classList.toggle('dot-active', active);
            dot.setAttribute('aria-current', active ? 'true' : 'false');
          });

          if (currentIndexLabel) {
            currentIndexLabel.textContent = String(activeIndex + 1).padStart(2, '0');
          }

          updateCompare(comparePosition);

          if (thumbRail) {
            const activeThumb = thumbs[activeIndex];
            if (activeThumb) {
              const railRect = thumbRail.getBoundingClientRect();
              const thumbRect = activeThumb.getBoundingClientRect();
              const offset = activeThumb.offsetLeft - (railRect.width / 2) + (thumbRect.width / 2);
              thumbRail.scrollTo({
                left: offset,
                behavior: 'smooth'
              });
            }
          }
        }

        function positionFromPointer(clientX) {
          const rect = stage.getBoundingClientRect();
          return ((clientX - rect.left) / rect.width) * 100;
        }

        function startDrag(clientX) {
          dragging = true;
          updateCompare(positionFromPointer(clientX));
        }

        function onMove(clientX) {
          if (!dragging) return;
          updateCompare(positionFromPointer(clientX));
        }

        if (handle) {
          handle.addEventListener('mousedown', function(e) {
            e.preventDefault();
            startDrag(e.clientX);
          });

          handle.addEventListener('touchstart', function(e) {
            startDrag(e.touches[0].clientX);
          }, {
            passive: true
          });
        }

        if (stage) {
          stage.addEventListener('mousedown', function(e) {
            if (e.target === prevBtn || e.target === nextBtn) return;
            startDrag(e.clientX);
          });

          stage.addEventListener('touchstart', function(e) {
            startDrag(e.touches[0].clientX);
          }, {
            passive: true
          });
        }

        window.addEventListener('mousemove', function(e) {
          onMove(e.clientX);
        });

        window.addEventListener('mouseup', function() {
          dragging = false;
        });

        window.addEventListener('touchmove', function(e) {
          if (!dragging) return;
          onMove(e.touches[0].clientX);
        }, {
          passive: true
        });

        window.addEventListener('touchend', function() {
          dragging = false;
        });

        if (prevBtn) {
          prevBtn.addEventListener('click', function() {
            showSlide(activeIndex - 1);
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', function() {
            showSlide(activeIndex + 1);
          });
        }

        thumbs.forEach(function(thumb) {
          thumb.addEventListener('click', function() {
            showSlide(Number(thumb.dataset.index));
          });
        });

        dots.forEach(function(dot) {
          dot.addEventListener('click', function() {
            showSlide(Number(dot.dataset.index));
          });
        });

        slides.forEach(function(slide) {
          slide.style.transition = 'opacity .45s ease, transform .45s ease';
        });

        showSlide(0);
        updateCompare(50);
      })();