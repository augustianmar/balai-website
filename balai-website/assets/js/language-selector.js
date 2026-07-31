(() => {
  const metaByLabel = {
    English: { code: 'EN', trigger: 'English' },
    Suomi: { code: 'FI', trigger: 'Suomi' },
    Svenska: { code: 'SV', trigger: 'Svenska' },
    'Bahasa Indonesia': { code: 'ID', trigger: 'Indonesia' }
  };

  const interfaceLabels = {
    en: { change: 'Change language', current: 'Current language', menu: 'Language' },
    fi: { change: 'Vaihda kieltä', current: 'Nykyinen kieli', menu: 'Kieli' },
    sv: { change: 'Byt språk', current: 'Nuvarande språk', menu: 'Språk' },
    id: { change: 'Ganti bahasa', current: 'Bahasa saat ini', menu: 'Bahasa' }
  };

  const chevron = '<svg class="language-trigger-chevron" aria-hidden="true" viewBox="0 0 20 20"><path d="m5.5 7.5 4.5 4.5 4.5-4.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"/></svg>';

  const languageLabel = link =>
    link.getAttribute('title') ||
    link.getAttribute('aria-label') ||
    link.textContent.trim();

  const enhanceSelector = selector => {
    if (!selector || selector.classList.contains('language-switcher--enhanced')) return;

    const links = [...selector.querySelectorAll('.lang-link')];
    if (links.length < 2) return;

    const active =
      links.find(link =>
        link.getAttribute('aria-current') === 'page' ||
        link.classList.contains('is-active')
      ) || links[0];

    const activeLabel = languageLabel(active);
    const activeMeta = metaByLabel[activeLabel] || {
      code: document.documentElement.lang.slice(0, 2).toUpperCase(),
      trigger: activeLabel
    };

    const pageLanguage = document.documentElement.lang.slice(0, 2).toLowerCase();
    const ui = interfaceLabels[pageLanguage] || interfaceLabels.en;

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'language-trigger';
    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', `${ui.change}. ${ui.current}: ${activeLabel}`);
    trigger.innerHTML = `
      <span class="language-trigger-code">${activeMeta.code}</span>
      <span class="language-trigger-divider" aria-hidden="true"></span>
      <span class="language-trigger-name">${activeMeta.trigger}</span>
      ${chevron}
    `;

    const menu = document.createElement('div');
    menu.className = 'language-menu';
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-label', ui.change);
    menu.innerHTML = `<div class="language-menu-label" aria-hidden="true">${ui.menu}</div>`;

    links.forEach(link => {
      const label = languageLabel(link);
      const meta = metaByLabel[label] || {
        code: label.slice(0, 2).toUpperCase(),
        trigger: label
      };
      const isActive = link === active;

      link.className = `language-option${isActive ? ' is-active' : ''}`;
      link.setAttribute('role', 'menuitemradio');
      link.setAttribute('aria-checked', String(isActive));
      link.setAttribute('tabindex', '-1');
      link.removeAttribute('title');

      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');

      link.innerHTML = `
        <span class="language-option-code">${meta.code}</span>
        <span class="language-option-name">${label}</span>
      `;

      menu.append(link);
    });

    selector.replaceChildren(trigger, menu);
    selector.classList.add('language-switcher--enhanced');

    const options = [...menu.querySelectorAll('.language-option')];

    const closeSelector = returnFocus => {
      selector.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      if (returnFocus) trigger.focus();
    };

    const openSelector = focusIndex => {
      document.querySelectorAll('.language-switcher--enhanced.is-open').forEach(other => {
        if (other !== selector) {
          other.classList.remove('is-open');
          other.querySelector('.language-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });

      selector.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');

      if (Number.isInteger(focusIndex)) {
        requestAnimationFrame(() => options[focusIndex]?.focus());
      }
    };

    options.forEach(option => {
      option.addEventListener('click', event => {
        const isActive = option.classList.contains('is-active');

        if (isActive) {
          event.preventDefault();
          closeSelector(true);
          return;
        }

        const target = new URL(option.href, window.location.href);
        if (!target.search && window.location.search) target.search = window.location.search;
        if (window.location.hash) target.hash = window.location.hash;

        event.preventDefault();
        window.location.assign(target.href);
      });
    });

    trigger.addEventListener('click', () => {
      if (selector.classList.contains('is-open')) closeSelector(false);
      else openSelector();
    });

    trigger.addEventListener('keydown', event => {
      const activeIndex = Math.max(
        options.findIndex(option => option.classList.contains('is-active')),
        0
      );

      if (['ArrowDown', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        openSelector(activeIndex);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        openSelector(options.length - 1);
      }
    });

    menu.addEventListener('keydown', event => {
      const currentIndex = options.indexOf(document.activeElement);

      if (event.key === 'Escape') {
        event.preventDefault();
        closeSelector(true);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        options[(currentIndex + 1 + options.length) % options.length]?.focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        options[(currentIndex - 1 + options.length) % options.length]?.focus();
      } else if (event.key === 'Home') {
        event.preventDefault();
        options[0]?.focus();
      } else if (event.key === 'End') {
        event.preventDefault();
        options.at(-1)?.focus();
      } else if (event.key === 'Tab') {
        closeSelector(false);
      }
    });

    document.addEventListener('pointerdown', event => {
      if (!selector.contains(event.target)) closeSelector(false);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && selector.classList.contains('is-open')) {
        closeSelector(true);
      }
    });

    window.addEventListener('resize', () => closeSelector(false), { passive: true });

    document.querySelectorAll(
      '[data-menu-toggle],[data-open-contact],[data-open-legal]'
    ).forEach(control => {
      control.addEventListener('click', () => closeSelector(false));
    });
  };

  const preserveMobileLanguagePosition = () => {
    document.querySelectorAll('.mobile-language-links a').forEach(link => {
      link.addEventListener('click', event => {
        if (
          link.getAttribute('aria-current') === 'page' ||
          link.classList.contains('is-active')
        ) return;

        const target = new URL(link.href, window.location.href);
        if (!target.search && window.location.search) target.search = window.location.search;
        if (window.location.hash) target.hash = window.location.hash;

        event.preventDefault();
        window.location.assign(target.href);
      });
    });
  };

  const init = () => {
    document.querySelectorAll('.language-switcher').forEach(enhanceSelector);
    preserveMobileLanguagePosition();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
