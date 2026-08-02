(() => {
  const translations = {
    en: {
      home: 'Home', markets: 'Markets', services: 'Services', approach: 'Approach', insights: 'Insights', founder: 'Founder', explore: 'EXPLORE', language: 'Language',
      insightsEyebrow: 'BALAI INSIGHTS',
      insightsTitle: 'Market knowledge, made commercially useful.',
      insightsIntro: 'Focused observations for tourism companies that need clearer market signals, stronger partner decisions and practical routes forward.',
      featured: 'FEATURED INSIGHT', date: '1 AUGUST 2026', readTime: '6 MIN READ',
      articleTitle: 'The New Travel Gatekeeper',
      articleDeck: 'How AI-assisted discovery can shape which Lapland products reach a traveller’s shortlist.',
      readArticle: 'Read insight', viewAll: 'View all insights', insightIndex: 'INSIGHT / 02',
      chainLabel: 'Illustrative discovery chain',
      chainStages: ['Traveller question', 'AI-assisted shortlist', 'Trusted travel brand', 'Travel-trade partner', 'Lapland supplier']
    },
    fi: {
      home: 'Etusivu', markets: 'Markkinat', services: 'Palvelut', approach: 'Toimintatapa', insights: 'Näkemykset', founder: 'Perustaja', explore: 'TUTUSTU', language: 'Kieli',
      insightsEyebrow: 'BALAI-NÄKEMYKSET',
      insightsTitle: 'Markkinatietoa, josta on kaupallista hyötyä.',
      insightsIntro: 'Tarkennettuja havaintoja matkailuyrityksille, jotka tarvitsevat selkeämpiä markkinasignaaleja, parempia kumppanipäätöksiä ja käytännöllisiä etenemisreittejä.',
      featured: 'NOSTETTU NÄKEMYS', date: '1. ELOKUUTA 2026', readTime: '6 MIN LUKUAIKA',
      articleTitle: 'Matkailun uusi portinvartija',
      articleDeck: 'Miten tekoälyavusteinen matkasuunnittelu voi vaikuttaa siihen, mitkä Lapin matkailutuotteet päätyvät matkailijan valintalistalle.',
      readArticle: 'Lue näkemys', viewAll: 'Kaikki näkemykset', insightIndex: 'NÄKEMYS / 02',
      chainLabel: 'Havainnollistava löytämisketju',
      chainStages: ['Matkailijan kysymys', 'Tekoälyn muodostama valikoima', 'Luotettu matkailubrändi', 'Matkailualan kumppani', 'Lapin palveluntarjoaja']
    },
    sv: {
      home: 'Hem', markets: 'Marknader', services: 'Tjänster', approach: 'Arbetssätt', insights: 'Insikter', founder: 'Grundare', explore: 'UTFORSKA', language: 'Språk',
      insightsEyebrow: 'BALAI INSIKTER',
      insightsTitle: 'Marknadskunskap, gjord kommersiellt användbar.',
      insightsIntro: 'Fokuserade observationer för turismföretag som behöver tydligare marknadssignaler, bättre partnerbeslut och praktiska vägar framåt.',
      featured: 'UTVALD INSIKT', date: '1 AUGUSTI 2026', readTime: '6 MIN LÄSNING',
      articleTitle: 'Resandets nya portvakt',
      articleDeck: 'Hur AI-stödd reseplanering kan påverka vilka turistprodukter i Lappland som når resenärens urval.',
      readArticle: 'Läs insikten', viewAll: 'Visa alla insikter', insightIndex: 'INSIKT / 02',
      chainLabel: 'Illustrativ upptäcktskedja',
      chainStages: ['Resenärens fråga', 'AI-format urval', 'Betrott resevarumärke', 'Resebranschpartner', 'Leverantör i Lappland']
    },
    id: {
      home: 'Beranda', markets: 'Pasar', services: 'Layanan', approach: 'Pendekatan', insights: 'Wawasan', founder: 'Pendiri', explore: 'JELAJAHI', language: 'Bahasa',
      insightsEyebrow: 'WAWASAN BALAI',
      insightsTitle: 'Pengetahuan pasar yang berguna secara komersial.',
      insightsIntro: 'Pengamatan terarah bagi perusahaan pariwisata yang membutuhkan sinyal pasar lebih jelas, keputusan mitra lebih kuat, dan jalur maju yang praktis.',
      featured: 'WAWASAN UTAMA', date: '1 AGUSTUS 2026', readTime: '6 MENIT BACA',
      articleTitle: 'Penjaga Gerbang Baru di Dunia Perjalanan',
      articleDeck: 'Bagaimana penemuan perjalanan berbantuan AI dapat memengaruhi produk Lapland yang masuk ke dalam daftar pilihan wisatawan.',
      readArticle: 'Baca wawasan', viewAll: 'Lihat semua wawasan', insightIndex: 'WAWASAN / 02',
      chainLabel: 'Rantai penemuan ilustratif',
      chainStages: ['Pertanyaan wisatawan', 'Daftar pilihan berbantuan AI', 'Merek perjalanan tepercaya', 'Mitra perdagangan perjalanan', 'Pemasok Lapland']
    }
  };

  const serviceEngagement = {
    en: {
      labels: ['ENGAGEMENT FORMAT', 'CORE OUTPUT', 'SCHEDULE'],
      'market-opportunity-assessment': ['Project-based assessment', 'Written findings and recommended next steps', 'Schedule agreed after the scope is defined'],
      'partner-development': ['Phased partner-development project', 'Qualified partner shortlist, outreach and structured follow-up', 'Milestones agreed around the target market and partner criteria'],
      'market-representation': ['Ongoing monthly cooperation', 'Regular partner communication, CRM follow-up and market reporting', 'Cadence agreed to the client’s market priorities'],
      localisation: ['Focused review or project-based support', 'Practical adaptation recommendations for the offer, messaging and customer journey', 'Scope agreed around the materials or service being reviewed'],
      'trade-fair-representation': ['Event-specific project', 'Preparation, representation, lead capture and post-event report', 'Planned around the event calendar'],
      'internationalisation-consulting': ['Advisory sprint or ongoing cooperation', 'Priorities, a practical growth plan and recommended next steps', 'Cadence agreed after the initial scoping discussion']
    },
    fi: {
      labels: ['TOTEUTUSTAPA', 'KESKEINEN TUOTOS', 'AIKATAULU'],
      'market-opportunity-assessment': ['Projektiluonteinen arviointi', 'Kirjalliset havainnot ja suositellut jatkotoimet', 'Aikataulu sovitaan rajauksen vahvistamisen jälkeen'],
      'partner-development': ['Vaiheittainen kumppanikehitysprojekti', 'Valikoitu kumppanilista, yhteydenotot ja jäsennelty seuranta', 'Välitavoitteet sovitaan kohdemarkkinan ja kumppanikriteerien mukaan'],
      'market-representation': ['Jatkuva kuukausittainen yhteistyö', 'Säännöllinen kumppaniviestintä, CRM-seuranta ja markkinaraportointi', 'Työrytmi sovitaan asiakkaan markkinaprioriteettien mukaan'],
      localisation: ['Kohdennettu arviointi tai projektituki', 'Käytännön kehitysehdotukset tarjoomaan, viestintään ja asiakaspolkuun', 'Rajaus sovitaan arvioitavan materiaalin tai palvelun mukaan'],
      'trade-fair-representation': ['Tapahtumakohtainen projekti', 'Valmistelu, edustus, liidien keruu ja tapahtuman jälkiraportti', 'Aikataulu rakennetaan tapahtumakalenterin ympärille'],
      'internationalisation-consulting': ['Neuvontajakso tai jatkuva yhteistyö', 'Prioriteetit, käytännön kasvusuunnitelma ja suositellut jatkotoimet', 'Työrytmi sovitaan alkukartoituksen jälkeen']
    },
    sv: {
      labels: ['UPPLÄGG', 'HUVUDLEVERANS', 'TIDSPLAN'],
      'market-opportunity-assessment': ['Projektbaserad bedömning', 'Skriftliga observationer och rekommenderade nästa steg', 'Tidsplanen fastställs efter att omfattningen har definierats'],
      'partner-development': ['Etappindelat partnerutvecklingsprojekt', 'Kvalificerad partnerlista, kontaktarbete och strukturerad uppföljning', 'Delmålen anpassas till målmarknaden och partnerkriterierna'],
      'market-representation': ['Löpande månatligt samarbete', 'Regelbunden partnerkommunikation, CRM-uppföljning och marknadsrapportering', 'Arbetsrytmen anpassas till kundens marknadsprioriteringar'],
      localisation: ['Fokuserad granskning eller projektbaserat stöd', 'Praktiska anpassningsförslag för erbjudande, budskap och kundresa', 'Omfattningen fastställs utifrån materialet eller tjänsten som granskas'],
      'trade-fair-representation': ['Evenemangsspecifikt projekt', 'Förberedelser, representation, leadinsamling och rapportering efter evenemanget', 'Planeras utifrån evenemangskalendern'],
      'internationalisation-consulting': ['Rådgivningsinsats eller löpande samarbete', 'Prioriteringar, praktisk tillväxtplan och rekommenderade nästa steg', 'Arbetsrytmen fastställs efter den inledande avgränsningen']
    },
    id: {
      labels: ['FORMAT KERJA SAMA', 'HASIL UTAMA', 'JADWAL'],
      'market-opportunity-assessment': ['Asesmen berbasis proyek', 'Temuan tertulis dan rekomendasi langkah selanjutnya', 'Jadwal disepakati setelah ruang lingkup ditetapkan'],
      'partner-development': ['Proyek pengembangan mitra bertahap', 'Daftar pendek mitra yang memenuhi kriteria, pendekatan, dan tindak lanjut terstruktur', 'Tonggak kerja disepakati sesuai pasar sasaran dan kriteria mitra'],
      'market-representation': ['Kerja sama bulanan berkelanjutan', 'Komunikasi mitra rutin, tindak lanjut CRM, dan pelaporan pasar', 'Ritme kerja disesuaikan dengan prioritas pasar klien'],
      localisation: ['Tinjauan terfokus atau dukungan berbasis proyek', 'Rekomendasi adaptasi praktis untuk penawaran, pesan, dan perjalanan pelanggan', 'Ruang lingkup disepakati berdasarkan materi atau layanan yang ditinjau'],
      'trade-fair-representation': ['Proyek khusus acara', 'Persiapan, representasi, pengumpulan prospek, dan laporan pasca-acara', 'Direncanakan mengikuti kalender acara'],
      'internationalisation-consulting': ['Sesi konsultasi terfokus atau kerja sama berkelanjutan', 'Prioritas, rencana pertumbuhan praktis, dan rekomendasi langkah berikutnya', 'Ritme kerja disepakati setelah pembahasan ruang lingkup awal']
    }
  };

  const language = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
  const copy = translations[language] || translations.en;
  const path = window.location.pathname;
  const isInsights = path.includes('/insights/');
  const isArticle = isInsights && /\/insights\/[^/]+\/(?:index\.html)?$/.test(path);
  const serviceSlug = path.match(/\/services\/([^/]+)/)?.[1] || '';
  const languagePrefix = language === 'en' ? '' : `${language}/`;

  /* Move keyboard focus as well as the viewport when the skip link is used. */
  const skipLink = document.querySelector('.skip-link');
  skipLink?.addEventListener('click', () => {
    const targetId = skipLink.getAttribute('href')?.replace(/^#/, '');
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;
    target.setAttribute('tabindex', '-1');
    window.setTimeout(() => target.focus({ preventScroll: true }), 0);
  });

  const navigationScript = document.currentScript?.src;
  const siteRoot = navigationScript
    ? new URL('../../', navigationScript)
    : new URL('./', document.baseURI);

  const homeUrl = new URL(`${languagePrefix}index.html`, siteRoot).href;
  const insightsUrl = new URL(`${languagePrefix}insights/`, siteRoot).href;
  const articleUrl = new URL(`${languagePrefix}insights/new-travel-gatekeeper/`, siteRoot).href;
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

  const createServiceEngagementSummary = () => {
    if (!serviceSlug || document.querySelector('.service-engagement-section')) return;
    const languageCopy = serviceEngagement[language] || serviceEngagement.en;
    const details = languageCopy[serviceSlug];
    const finalCta = document.querySelector('.service-final');
    if (!details || !finalCta?.parentNode) return;

    const section = document.createElement('section');
    section.className = 'service-engagement-section';
    section.setAttribute('aria-label', languageCopy.labels[0]);
    section.innerHTML = `
      <div class="shell service-engagement-grid">
        ${details.map((detail, index) => `
          <article class="service-engagement-item">
            <span>${languageCopy.labels[index]}</span>
            <strong>${detail}</strong>
          </article>
        `).join('')}
      </div>
    `;
    finalCta.parentNode.insertBefore(section, finalCta);
  };

  createServiceEngagementSummary();

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
    const mobileLanguageLabel = mobileNav.querySelector('.mobile-language-row > span');
    if (mobileLanguageLabel) mobileLanguageLabel.textContent = copy.language;
    [...mobileNav.children]
      .filter(child => child.matches('a:not(.button)'))
      .forEach(child => child.remove());
    const reference = mobileNav.querySelector('.mobile-language-row, button, a.button');
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
