(() => {
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');
  const modal = document.querySelector('[data-contact-modal]');
  const form = document.querySelector('[data-contact-form]');
  const toast = document.querySelector('[data-toast]');
  const config = window.BALAI_CONFIG || {};
  const body = document.body;
  const progress = document.querySelector('[data-scroll-progress]');
  let lastFocused = null;

  const onScroll = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 18);
    if (progress) {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      progress.style.transform = `scaleX(${Math.min(window.scrollY / max, 1)})`;
    }
  };
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 5200);
  };

  const closeMenu = () => {
    mobilePanel?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded','false');
    body.classList.remove('menu-open');
  };
  menuToggle?.addEventListener('click', () => {
    const open = !mobilePanel.classList.contains('is-open');
    mobilePanel.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    body.classList.toggle('menu-open', open);
  });
  mobilePanel?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  const openModal = (direction) => {
    closeMenu();
    lastFocused = document.activeElement;
    modal?.classList.add('is-open');
    modal?.setAttribute('aria-hidden','false');
    body.classList.add('modal-open');
    if (direction && form) form.elements.direction.value = direction;
    setTimeout(() => form?.elements.name?.focus(), 100);
  };
  const closeModal = () => {
    modal?.classList.remove('is-open');
    modal?.setAttribute('aria-hidden','true');
    body.classList.remove('modal-open');
    lastFocused?.focus?.();
  };
  document.querySelectorAll('[data-open-contact]').forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.direction)));
  document.querySelectorAll('[data-close-contact]').forEach(btn => btn.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeMenu(); }
    if (e.key === 'Tab' && modal?.classList.contains('is-open')) {
      const focusable = [...modal.querySelectorAll('button,input,select,textarea,a[href]')].filter(el => !el.disabled && el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
  }), {threshold:.12, rootMargin:'0px 0px -35px'});
  document.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el));

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.desktop-nav a')];
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin:'-35% 0px -55%'});
  sections.forEach(section => activeObserver.observe(section));

  form?.addEventListener('submit', async event => {
    event.preventDefault();
    const data = new FormData(form);
    const endpoint = (config.formEndpoint || '').trim();
    const email = (config.email || '').trim();
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    try {
      if (endpoint) {
        const response = await fetch(endpoint, {method:'POST', body:data, headers:{'Accept':'application/json'}});
        if (!response.ok) throw new Error('Form endpoint failed');
        form.reset(); closeModal(); showToast(body.dataset.formSuccess);
      } else if (email) {
        const direction = form.elements.direction.options[form.elements.direction.selectedIndex]?.text || data.get('direction');
        const subject = `BALAI enquiry — ${direction}`;
        const message = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company') || '-'}\nDirection: ${direction}\n\n${data.get('message')}`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      } else {
        showToast(body.dataset.formMissing);
      }
    } catch (error) {
      showToast(body.dataset.formError);
    } finally {
      submit.disabled = false;
    }
  });
})();
