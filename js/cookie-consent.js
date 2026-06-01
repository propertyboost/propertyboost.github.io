(function () {
  var STORAGE_KEY = 'propertyboost_cookie_consent';
  var config = window.PROPERTYBOOST_CONFIG || {};
  var hasAnalytics = Boolean(config.gaMeasurementId);

  var copy = {
    en: {
      title: 'Cookies & privacy',
      text: 'We use essential cookies and, if you accept, Google Analytics to understand visits and WhatsApp contact interest. You can refuse analytics cookies.',
      accept: 'Accept all',
      reject: 'Essential only',
      policy: 'Privacy',
    },
    'pt-BR': {
      title: 'Cookies e privacidade',
      text: 'Usamos cookies essenciais e, se você aceitar, o Google Analytics para entender visitas e interesse em contato pelo WhatsApp. Você pode recusar cookies de análise.',
      accept: 'Aceitar todos',
      reject: 'Apenas essenciais',
      policy: 'Privacidade',
    },
    fr: {
      title: 'Cookies et confidentialité',
      text: 'Nous utilisons des cookies essentiels et, si vous acceptez, Google Analytics pour comprendre les visites et l’intérêt pour WhatsApp. Vous pouvez refuser les cookies d’analyse.',
      accept: 'Tout accepter',
      reject: 'Essentiels uniquement',
      policy: 'Confidentialité',
    },
  };

  function lang() {
    var l = (document.documentElement.lang || 'en').toLowerCase();
    if (l.startsWith('pt')) return 'pt-BR';
    if (l.startsWith('fr')) return 'fr';
    return 'en';
  }

  function getCopy() {
    return copy[lang()] || copy.en;
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent('propertyboost:consent', { detail: { value: value } }));
  }

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function removeBanner() {
    var el = document.getElementById('cookieConsent');
    if (el) el.remove();
    document.body.classList.remove('has-cookie-banner');
  }

  function renderBanner() {
    if (!hasAnalytics || getConsent()) return;

    var t = getCopy();
    var banner = document.createElement('div');
    banner.id = 'cookieConsent';
    banner.className = 'cookie-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', t.title);
    banner.innerHTML =
      '<div class="cookie-consent__inner">' +
      '<p class="cookie-consent__title">' + t.title + '</p>' +
      '<p class="cookie-consent__text">' + t.text + '</p>' +
      '<div class="cookie-consent__actions">' +
      '<button type="button" class="cookie-consent__btn cookie-consent__btn--primary" data-consent="granted">' +
      t.accept +
      '</button>' +
      '<button type="button" class="cookie-consent__btn cookie-consent__btn--ghost" data-consent="denied">' +
      t.reject +
      '</button>' +
      '</div></div>';

    banner.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-consent]');
      if (!btn) return;
      setConsent(btn.getAttribute('data-consent'));
      removeBanner();
    });

    document.body.appendChild(banner);
    document.body.classList.add('has-cookie-banner');
  }

  window.PropertyBoostConsent = {
    get: getConsent,
    set: setConsent,
    hasAnalytics: hasAnalytics,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBanner);
  } else {
    renderBanner();
  }

  if (getConsent() === 'granted') {
    window.dispatchEvent(new CustomEvent('propertyboost:consent', { detail: { value: 'granted' } }));
  }
})();
