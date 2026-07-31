(() => {
  const translations = {
    en: {
      home: 'Home', markets: 'Markets', services: 'Services', approach: 'Approach', insights: 'Insights', founder: 'Founder', explore: 'EXPLORE',
      insightsEyebrow: 'BALAI INSIGHTS',
      insightsTitle: 'Market knowledge, made commercially useful.',
      insightsIntro: 'Focused observations for tourism companies that need clearer market signals, stronger partner decisions and practical routes forward.',
      featured: 'FEATURED INSIGHT', date: '31 JULY 2026', readTime: '4 MIN READ',
      articleTitle: 'The Market Behind the Middleman',
      articleDeck: 'Why Indonesian demand in Lapland may be less visible than direct booking figures suggest.',
      readArticle: 'Read insight', viewAll: 'View all insights', insightIndex: 'INSIGHT / 01',
      chainLabel: 'Illustrative booking chain',
      chainStages: ['Traveller in Indonesia', 'Indonesian agency', 'International wholesaler', 'Finnish DMC', 'Lapland supplier']
    },
    fi: {
      home: 'Etusivu', markets: 'Markkinat', services: 'Palvelut', approach: 'Toimintatapa', insights: 'Näkemykset', founder: 'Perustaja', explore: 'TUTUSTU',
      insightsEyebrow: 'BALAI-NÄKEMYKSET',
      insightsTitle: 'Markkinatietoa, josta on kaupallista hyötyä.',
      insightsIntro: 'Tarkennettuja havaintoja matkailuyrityksille, jotka tarvitsevat selkeämpiä markkinasignaaleja, parempia kumppanipäätöksiä ja käytännöllisiä etenemisreittejä.',
      featured: 'NOSTETTU NÄKEMYS', date: '31. HEINÄKUUTA 2026', readTime: '4 MIN LUKUAIKA',
      articleTitle: 'Markkina välikäden takana',
      articleDeck: 'Miksi Indonesian kysyntä Lapissa voi näkyä suoria varauslukuja heikommin.',
      readArticle: 'Lue näkemys', viewAll: 'Kaikki näkemykset', insightIndex: 'NÄKEMYS / 01',
      chainLabel: 'Havainnollistava varausketju',
      chainStages: ['Matkailija Indonesiassa', 'Indonesialainen matkatoimisto', 'Kansainvälinen tukkumyyjä', 'Suomalainen DMC', 'Lapin palveluntarjoaja']
    },
    sv: {
      home: 'Hem', markets: 'Marknader', services: 'Tjänster', approach: 'Arbetssätt', insights: 'Insikter', founder: 'Grundare', explore: 'UTFORSKA',
      insightsEyebrow: 'BALAI INSIKTER',
      insightsTitle: 'Marknadskunskap, gjord kommersiellt användbar.',
      insightsIntro: 'Fokuserade observationer för turismföretag som behöver tydligare marknadssignaler, bättre partnerbeslut och praktiska vägar framåt.',
      featured: 'UTVALD INSIKT', date: '31 JULI 2026', readTime: '4 MIN LÄSNING',
      articleTitle: 'Marknaden bakom mellanhanden',
      articleDeck: 'Varför indonesisk efterfrågan i Lappland kan vara mindre synlig än de direkta bokningssiffrorna antyder.',
      readArticle: 'Läs insikten', viewAll: 'Visa alla insikter', insightIndex: 'INSIKT / 01',
      chainLabel: 'Illustrativ bokningskedja',
      chainStages: ['Resenär i Indonesien', 'Indonesisk resebyrå', 'Internationell grossist', 'Finländsk DMC', 'Leverantör i Lappland']
    },
    id: {
      home: 'Beranda', markets: 'Pasar', services: 'Layanan', approach: 'Pendekatan', insights: 'Wawasan', founder: 'Pendiri', explore: 'JELAJAHI',
      insightsEyebrow: 'WAWASAN BALAI',
      insightsTitle: 'Pengetahuan pasar yang berguna secara komersial.',
      insightsIntro: 'Pengamatan terarah bagi perusahaan pariwisata yang membutuhkan sinyal pasar lebih jelas, keputusan mitra lebih kuat, dan jalur maju yang praktis.',
      featured: 'WAWASAN UTAMA', date: '31 JULI 2026', readTime: '4 MENIT BACA',
      articleTitle: 'Pasar di Balik Perantara',
      articleDeck: 'Mengapa permintaan Indonesia di Lapland dapat terlihat lebih kecil daripada yang ditunjukkan oleh angka pemesanan langsung.',
      readArticle: 'Baca wawasan', viewAll: 'Lihat semua wawasan', insightIndex: 'WAWASAN / 01',
      chainLabel: 'Rantai pemesanan ilustratif',
      chainStages: ['Wisatawan di Indonesia', 'Agen perjalanan Indonesia', 'Wholesaler internasional', 'DMC Finlandia', 'Pemasok Lapland']
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
  const articleUrl = new URL(`${languagePrefix}insights/market-behind-the-middleman/`, siteRoot).href;
  const createHomepageInsightsPreview = () => {
    if (isInsights || document.getElementById('insights')) return;

    const main = document.querySelector('main');
    if (!main) return;

    const section = document.createElement('section');
    section.id = 'insights';
    section.className = 'section home-insights-preview';
    section.innerHTML = `
      <div class="shell home-insights-heading">
        <div>
          <p class="eyebrow">${copy.insightsEyebrow}</p>
          <h2>${copy.insightsTitle}</h2>
        </div>
        <div class="home-insights-intro">
          <p>${copy.insightsIntro}</p>
          <a class="home-insights-all" href="${insightsUrl}">
            <span>${copy.viewAll}</span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div class="shell">
        <article class="home-insight-card">
          <a class="home-insight-art" href="${articleUrl}" aria-label="${copy.readArticle}: ${copy.articleTitle}">
            <span class="home-insight-index">${copy.insightIndex}</span>
            <span class="home-insight-orbit home-insight-orbit--one" aria-hidden="true"></span>
            <span class="home-insight-orbit home-insight-orbit--two" aria-hidden="true"></span>
            <ol class="home-insight-chain" aria-label="${copy.chainLabel}">
              ${copy.chainStages.map((stage, index) => `<li><small>0${index + 1}</small><span>${stage}</span></li>`).join('')}
            </ol>
          </a>
          <div class="home-insight-copy">
            <div class="home-insight-meta">
              <span>${copy.featured}</span><span>${copy.date}</span><span>${copy.readTime}</span>
            </div>
            <h3><a href="${articleUrl}">${copy.articleTitle}</a></h3>
            <p>${copy.articleDeck}</p>
            <div class="home-insight-actions">
              <a class="button button--dark" href="${articleUrl}">${copy.readArticle}<span aria-hidden="true">↗</span></a>
              <a class="text-link" href="${insightsUrl}">${copy.viewAll}<span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </article>
      </div>
    `;

    const founder = document.getElementById('about');
    if (founder?.parentNode === main) main.insertBefore(section, founder);
    else main.append(section);

    if (window.location.hash === '#insights') {
      window.setTimeout(() => section.scrollIntoView({ block: 'start' }), 60);
    }
  };

  createHomepageInsightsPreview();

  const navItems = [
    { key: 'home', href: `${homeUrl}#top` },
    { key: 'markets', href: `${homeUrl}#directions` },
    { key: 'services', href: `${homeUrl}#services` },
    { key: 'approach', href: `${homeUrl}#approach` },
    { key: 'insights', href: isInsights ? insightsUrl : `${homeUrl}#insights`, external: isInsights },
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
      link.setAttribute('aria-current', 'page');
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
            (entry.target.id === 'insights' && key === 'insights') ||
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
        if (params.get('contact') === '1') document.querySelector('[data-open-contact]')?.click();
        const legal = params.get('legal');
        if (legal) document.querySelector(`[data-open-legal="${legal}"]`)?.click();
        params.delete('contact');
        params.delete('legal');
        const cleaned = `${window.location.pathname}${params.toString() ? `?${params}` : ''}${window.location.hash}`;
        window.history.replaceState({}, '', cleaned);
      }, 140);
    }, { once: true });
  }
})();
