(() => {
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');
  const modal = document.querySelector('[data-contact-modal]');
  const form = document.querySelector('[data-contact-form]');
  const toast = document.querySelector('[data-toast]');
  const config = window.BALAI_CONFIG || {};
  const body = document.body;

  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 18);
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
  };
  document.querySelectorAll('[data-open-contact]').forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.direction)));
  document.querySelectorAll('[data-close-contact]').forEach(btn => btn.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeMenu(); } });

  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
  }), {threshold:.12, rootMargin:'0px 0px -35px'});
  document.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el));

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.desktop-nav a')];
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id));
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
        const subject = `BALAI enquiry — ${data.get('direction')}`;
        const message = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company') || '-'}\nDirection: ${data.get('direction')}\n\n${data.get('message')}`;
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
