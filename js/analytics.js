(function () {
  var config = window.PROPERTYBOOST_CONFIG || {};
  var measurementId = config.gaMeasurementId;
  var loaded = false;

  function canTrack() {
    if (!measurementId) return false;
    if (!window.PropertyBoostConsent || !window.PropertyBoostConsent.hasAnalytics) return false;
    return window.PropertyBoostConsent.get() === 'granted';
  }

  function loadGtag() {
    if (loaded || !canTrack()) return;
    loaded = true;

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId, { anonymize_ip: true, send_page_view: true });
  }

  function trackEvent(name, params) {
    if (!canTrack() || typeof window.gtag !== 'function') return;
    window.gtag('event', name, params || {});
  }

  function bindWhatsAppTracking() {
    document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
      if (link.dataset.analyticsBound) return;
      link.dataset.analyticsBound = '1';
      link.addEventListener('click', function () {
        var label = link.getAttribute('aria-label') || link.textContent.trim() || 'whatsapp';
        trackEvent('whatsapp_click', {
          event_category: 'engagement',
          event_label: label.slice(0, 100),
          link_url: link.href,
        });
      });
    });
  }

  function init() {
    loadGtag();
    bindWhatsAppTracking();
  }

  window.addEventListener('propertyboost:consent', function () {
    init();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
