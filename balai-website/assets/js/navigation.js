
(() => {
  const translations = {
    en: {
      home: 'Home',
      markets: 'Markets',
      services: 'Services',
      approach: 'Approach',
      insights: 'Insights',
      founder: 'Founder',
      explore: 'EXPLORE'
    },
    fi: {
      home: 'Etusivu',
      markets: 'Markkinat',
      services: 'Palvelut',
      approach: 'Toimintatapa',
      insights: 'Näkemykset',
      founder: 'Perustaja',
      explore: 'TUTUSTU'
    },
    sv: {
      home: 'Hem',
      markets: 'Marknader',
      services: 'Tjänster',
      approach: 'Arbetssätt',
      insights: 'Insikter',
      founder: 'Grundare',
      explore: 'UTFORSKA'
    },
    id: {
      home: 'Beranda',
      markets: 'Pasar',
      services: 'Layanan',
      approach: 'Pendekatan',
      insights: 'Wawasan',
      founder: 'Pendiri',
      explore: 'JELAJAHI'
    }
  };

  const language = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
  const copy = translations[language] || translations.en;
  const path = window.location.pathname;
  const isInsights = path.includes('/insights/');
  const isArticle = isInsights && /\/insights\/[^/]+\/(?:index\.html)?$/.test(path);
  const languagePrefix = language === 'en' ? '' : `${language}/`;

  const navigationScript = document.currentScript?.src;
  const siteRoot = navigationScript
    ? new URL('../../', navigationScript)
    : new URL('./', document.baseURI);

  const homeUrl = new URL(`${languagePrefix}index.html`, siteRoot).href;
  const insightsUrl = new URL(`${languagePrefix}insights/`, siteRoot).href;

  const navItems = [
    { key: 'home', href: `${homeUrl}#top` },
    { key: 'markets', href: `${homeUrl}#directions` },
    { key: 'services', href: `${homeUrl}#services` },
    { key: 'approach', href: `${homeUrl}#approach` },
    { key: 'insights', href: insightsUrl, external: true },
    { key: 'founder', href: `${homeUrl}#about` }
  ];

  const buildLinks = (mobile = false) => navItems.map(item => {
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = copy[item.key];
    link.dataset.navKey = item.key;
    if (item.external) link.classList.add('nav-external');
    if (isInsights && item.key === 'insights') {
      link.classList.add('is-active');
      link.setAttribute('aria-current', isArticle ? 'page' : 'page');
    }
    if (mobile) link.addEventListener('click', () => {
      document.querySelector('[data-mobile-panel]')?.classList.remove('is-open');
      document.querySelector('[data-menu-toggle]')?.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
    return link;
  });

  const desktopNav = document.querySelector('.desktop-nav');
  if (desktopNav) desktopNav.replaceChildren(...buildLinks());

  const mobileNav = document.querySelector('[data-mobile-panel] nav');
  if (mobileNav) {
    [...mobileNav.children]
      .filter(child => child.matches('a'))
      .forEach(child => child.remove());
    const reference = mobileNav.querySelector('.mobile-language-row, button');
    buildLinks(true).forEach(link => mobileNav.insertBefore(link, reference || null));
  }

  const footerExplore = [...document.querySelectorAll('.footer-grid > div')]
    .find(block => block.querySelector(':scope > span')?.textContent.trim().toUpperCase() === copy.explore ||
                   block.querySelector(':scope > a'));
  if (footerExplore) {
    const label = footerExplore.querySelector(':scope > span');
    footerExplore.replaceChildren();
    const heading = document.createElement('span');
    heading.textContent = copy.explore;
    footerExplore.append(heading);
    navItems.forEach(item => {
      const link = document.createElement('a');
      link.href = item.href;
      link.textContent = copy[item.key];
      if (item.key === 'insights') link.classList.add('footer-insights-link');
      footerExplore.append(link);
    });
  }



  if (!isInsights && 'IntersectionObserver' in window) {
    const freshNavLinks = [...document.querySelectorAll('.desktop-nav a[data-nav-key]')];
    const sections = [...document.querySelectorAll('main section[id]')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        freshNavLinks.forEach(link => {
          const key = link.dataset.navKey;
          const active =
            (entry.target.id === 'top' && key === 'home') ||
            (entry.target.id === 'directions' && key === 'markets') ||
            (entry.target.id === 'services' && key === 'services') ||
            (entry.target.id === 'approach' && key === 'approach') ||
            (entry.target.id === 'about' && key === 'founder');
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-34% 0px -56%' });
    sections.forEach(section => observer.observe(section));
  }

  const params = new URLSearchParams(window.location.search);
  if (!isInsights && (params.has('contact') || params.has('legal'))) {
    window.addEventListener('load', () => {
      window.setTimeout(() => {
        if (params.get('contact') === '1') {
          document.querySelector('[data-open-contact]')?.click();
        }
        const legal = params.get('legal');
        if (legal) {
          document.querySelector(`[data-open-legal="${legal}"]`)?.click();
        }
        params.delete('contact');
        params.delete('legal');
        const cleaned = `${window.location.pathname}${params.toString() ? `?${params}` : ''}${window.location.hash}`;
        window.history.replaceState({}, '', cleaned);
      }, 140);
    }, { once: true });
  }
})();
