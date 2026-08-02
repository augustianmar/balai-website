(() => {
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');
  const modal = document.querySelector('[data-contact-modal]');
  const form = document.querySelector('[data-contact-form]');
  const toast = document.querySelector('[data-toast]');
  const legalModal = document.querySelector('[data-legal-modal]');
  const whatsappButton = document.querySelector('[data-whatsapp-contact]');
  const siteFooter = document.querySelector('.site-footer');
  let legalLastFocused = null;
  const config = window.BALAI_CONFIG || {};
  const body = document.body;
  const progress = document.querySelector('[data-scroll-progress]');
  let lastFocused = null;

  const email = String(config.email || '').trim();
  const formEndpoint = String(config.formEndpoint || '').trim();
  const whatsappNumber = String(config.whatsappNumber || '').replace(/\D/g,'');
  const contactReady = Boolean(email || formEndpoint);
  const legalReady = config.legalReady === true;
  const language = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
  const unavailableMessages = {
    en: 'BALAI’s direct contact channels are being prepared. Please check back shortly.',
    fi: 'BALAI:n suoria yhteydenottokanavia valmistellaan. Palaa pian uudelleen.',
    sv: 'BALAI:s direkta kontaktkanaler förbereds. Välkommen tillbaka inom kort.',
    id: 'Saluran kontak langsung BALAI sedang dipersiapkan. Silakan kembali dalam waktu dekat.'
  };
  const menuLabels = {
    en: {open: 'Open menu', close: 'Close menu'},
    fi: {open: 'Avaa valikko', close: 'Sulje valikko'},
    sv: {open: 'Öppna meny', close: 'Stäng meny'},
    id: {open: 'Buka menu', close: 'Tutup menu'}
  };
  const menuLabel = menuLabels[language] || menuLabels.en;

  if (menuToggle && mobilePanel) {
    mobilePanel.id ||= 'mobile-navigation';
    menuToggle.setAttribute('aria-controls', mobilePanel.id);
  }

  body.classList.toggle('contact-ready', contactReady);
  body.classList.toggle('whatsapp-ready', Boolean(whatsappNumber));
  body.classList.toggle('legal-ready', legalReady);

  if (!legalReady) {
    legalModal?.setAttribute('aria-hidden', 'true');
  }

  const onScroll = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 18);
    whatsappButton?.classList.toggle('is-visible', Boolean(whatsappNumber) && window.scrollY > 160);
    if (progress) {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      progress.style.transform = `scaleX(${Math.min(window.scrollY / max, 1)})`;
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  const showToast = message => {
    if (!toast || !message) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 5200);
  };

  const closeMenu = () => {
    mobilePanel?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded','false');
    menuToggle?.setAttribute('aria-label', menuLabel.open);
    body.classList.remove('menu-open');
  };
  menuToggle?.setAttribute('aria-label', menuLabel.open);
  menuToggle?.addEventListener('click', () => {
    const open = !mobilePanel?.classList.contains('is-open');
    mobilePanel?.classList.toggle('is-open', open);
    menuToggle?.setAttribute('aria-expanded', String(open));
    menuToggle?.setAttribute('aria-label', open ? menuLabel.close : menuLabel.open);
    body.classList.toggle('menu-open', open);
  });
  mobilePanel?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  const setSelectValue = (name, value) => {
    if (!form || !value || !form.elements[name]) return;
    const select = form.elements[name];
    const exists = [...select.options].some(option => option.value === value);
    if (exists) select.value = value;
  };

  const openModal = trigger => {
    closeMenu();
    if (!contactReady) {
      showToast(unavailableMessages[language] || unavailableMessages.en);
      return;
    }
    lastFocused = document.activeElement;
    modal?.classList.add('is-open');
    modal?.setAttribute('aria-hidden','false');
    body.classList.add('modal-open');
    if (trigger) {
      setSelectValue('direction', trigger.dataset.direction);
      setSelectValue('service', trigger.dataset.service);
    }
    setTimeout(() => form?.elements.name?.focus(), 100);
  };
  const closeModal = () => {
    if (!modal?.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    body.classList.remove('modal-open');
    lastFocused?.focus?.();
  };
  document.querySelectorAll('[data-open-contact]').forEach(btn => btn.addEventListener('click', () => openModal(btn)));
  document.querySelectorAll('[data-close-contact]').forEach(btn => btn.addEventListener('click', closeModal));

  const openLegal = (type, trigger) => {
    if (!legalReady || !legalModal) return;
    legalLastFocused = trigger || document.activeElement;
    legalModal.querySelectorAll('[data-legal-panel]').forEach(panel => {
      panel.hidden = panel.dataset.legalPanel !== type;
    });
    legalModal.classList.add('is-open');
    legalModal.setAttribute('aria-hidden','false');
    body.classList.add('modal-open');
    setTimeout(() => legalModal.querySelector('[data-close-legal]')?.focus(), 80);
  };

  const closeLegal = () => {
    if (!legalModal?.classList.contains('is-open')) return;
    legalModal.classList.remove('is-open');
    legalModal.setAttribute('aria-hidden','true');
    body.classList.remove('modal-open');
    legalLastFocused?.focus?.();
  };

  document.querySelectorAll('[data-open-legal]').forEach(btn => {
    btn.addEventListener('click', () => openLegal(btn.dataset.openLegal, btn));
  });
  document.querySelectorAll('[data-close-legal]').forEach(btn => btn.addEventListener('click', closeLegal));

  whatsappButton?.addEventListener('click', () => {
    if (!whatsappNumber) {
      showToast(unavailableMessages[language] || unavailableMessages.en);
      return;
    }
    const message = whatsappButton.dataset.whatsappMessage || '';
    const url = `https://wa.me/${whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  if ('IntersectionObserver' in window && siteFooter && whatsappButton) {
    const footerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => whatsappButton.classList.toggle('is-over-footer', entry.isIntersecting));
    }, {threshold:.05});
    footerObserver.observe(siteFooter);
  }


  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { closeLegal(); closeModal(); closeMenu(); }

    if (event.key === 'Tab' && legalModal?.classList.contains('is-open')) {
      const focusable = [...legalModal.querySelectorAll('button,a[href]')].filter(el => !el.disabled && el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }

    if (event.key === 'Tab' && modal?.classList.contains('is-open')) {
      const focusable = [...modal.querySelectorAll('button,input,select,textarea,a[href]')].filter(el => !el.disabled && el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
    }), {threshold:.1, rootMargin:'0px 0px -30px'});
    document.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el));

    const sections = [...document.querySelectorAll('main section[id]')];
    const navLinks = [...document.querySelectorAll('.desktop-nav a')];
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = new URL(link.href, window.location.href).hash === '#' + entry.target.id;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
        });
      });
    }, {rootMargin:'-35% 0px -55%'});
    sections.forEach(section => activeObserver.observe(section));
  } else {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
  }

  form?.addEventListener('submit', async event => {
    event.preventDefault();
    const data = new FormData(form);
    const endpoint = formEndpoint;
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    try {
      if (endpoint) {
        const response = await fetch(endpoint, {method:'POST', body:data, headers:{Accept:'application/json'}});
        if (!response.ok) throw new Error('Form endpoint failed');
        form.reset(); closeModal(); showToast(body.dataset.formSuccess);
      } else if (email) {
        const directionSelect = form.elements.direction;
        const serviceSelect = form.elements.service;
        const direction = directionSelect.options[directionSelect.selectedIndex]?.text || data.get('direction') || '-';
        const service = serviceSelect.options[serviceSelect.selectedIndex]?.text || data.get('service') || '-';
        const subject = `BALAI enquiry — ${service}`;
        const message = [
          `Name: ${data.get('name')}`,
          `Email: ${data.get('email')}`,
          `Company: ${data.get('company') || '-'}`,
          `Direction: ${direction}`,
          `Service: ${service}`,
          '',
          data.get('message')
        ].join('\n');
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      } else {
        showToast(unavailableMessages[language] || unavailableMessages.en);
      }
    } catch (error) {
      showToast(body.dataset.formError);
    } finally {
      submit.disabled = false;
    }
  });
})();
