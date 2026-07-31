(() => {
  const meta = {
    English: { code: 'EN', key: 'en' },
    Suomi: { code: 'FI', key: 'fi' },
    Svenska: { code: 'SV', key: 'sv' },
    'Bahasa Indonesia': { code: 'ID', key: 'id' }
  };

  const interfaceLabels = {
    en: { change: 'Change language', current: 'Current language' },
    fi: { change: 'Vaihda kieltä', current: 'Nykyinen kieli' },
    sv: { change: 'Byt språk', current: 'Nuvarande språk' },
    id: { change: 'Ganti bahasa', current: 'Bahasa saat ini' }
  };

  /* Self-contained flags avoid duplicate SVG IDs and missing/blank flags. */
  const flags = {
    en: `<svg aria-hidden="true" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#012169"/>
      <path d="M0 0 60 40M60 0 0 40" stroke="#fff" stroke-width="9"/>
      <path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" stroke-width="4"/>
      <path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="13"/>
      <path d="M30 0v40M0 20h60" stroke="#C8102E" stroke-width="7"/>
    </svg>`,
    fi: `<svg aria-hidden="true" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#fff"/>
      <rect x="17" width="8" height="40" fill="#003580"/>
      <rect y="16" width="60" height="8" fill="#003580"/>
    </svg>`,
    sv: `<svg aria-hidden="true" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#006AA7"/>
      <rect x="18" width="7" height="40" fill="#FECC00"/>
      <rect y="16" width="60" height="7" fill="#FECC00"/>
    </svg>`,
    id: `<svg aria-hidden="true" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="20" fill="#CE1126"/>
      <rect y="20" width="60" height="20" fill="#fff"/>
    </svg>`
  };

  const languageLabel = link =>
    link.getAttribute('title') ||
    link.getAttribute('aria-label') ||
    link.textContent.trim();

  const enhance = selector => {
    if (!selector || selector.classList.contains('balai-language-selector')) return;

    const originalLinks = [...selector.querySelectorAll('.lang-link')];
    if (originalLinks.length < 2) return;

    const active =
      originalLinks.find(link =>
        link.getAttribute('aria-current') === 'page' ||
        link.classList.contains('is-active')
      ) || originalLinks[0];

    const activeLabel = languageLabel(active);
    const activeMeta = meta[activeLabel] || {
      code: document.documentElement.lang.slice(0, 2).toUpperCase(),
      key: document.documentElement.lang.slice(0, 2).toLowerCase()
    };

    const pageLanguage = document.documentElement.lang.slice(0, 2).toLowerCase();
    const ui = interfaceLabels[pageLanguage] || interfaceLabels.en;

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'balai-language-trigger';
    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', `${ui.change}. ${ui.current}: ${activeLabel}`);
    trigger.innerHTML = `
      <span class="balai-current-flag">${flags[activeMeta.key] || ''}</span>
      <span class="balai-language-sr">${activeMeta.code} ${activeLabel}</span>
    `;

    const menu = document.createElement('div');
    menu.className = 'balai-language-menu';
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-label', ui.change);

    originalLinks.forEach(link => {
      const label = languageLabel(link);
      const itemMeta = meta[label] || {
        code: label.slice(0, 2).toUpperCase(),
        key: label.slice(0, 2).toLowerCase()
      };
      const isActive = link === active;

      link.className = `balai-language-option${isActive ? ' is-active' : ''}`;
      link.setAttribute('role', 'menuitemradio');
      link.setAttribute('aria-checked', String(isActive));
      link.setAttribute('tabindex', '-1');
      link.removeAttribute('title');

      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');

      link.innerHTML = `
        <span class="balai-language-option-flag">${flags[itemMeta.key] || ''}</span>
        <span class="balai-language-code">${itemMeta.code}</span>
        <span class="balai-language-name">${label}</span>
      `;

      menu.append(link);
    });

    selector.replaceChildren(trigger, menu);
    selector.classList.add('balai-language-selector');

    const options = [...menu.querySelectorAll('.balai-language-option')];
    const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let closeTimer = 0;
    let openTimer = 0;

    const cancelClose = () => window.clearTimeout(closeTimer);
    const cancelOpen = () => window.clearTimeout(openTimer);

    const open = focusIndex => {
      cancelOpen();
      cancelClose();

      document.querySelectorAll('.balai-language-selector.is-open').forEach(other => {
        if (other !== selector) {
          other.classList.remove('is-open');
          other.querySelector('.balai-language-trigger')
            ?.setAttribute('aria-expanded', 'false');
        }
      });

      selector.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');

      if (Number.isInteger(focusIndex)) {
        requestAnimationFrame(() => options[focusIndex]?.focus());
      }
    };

    const close = (returnFocus = false, delay = 0) => {
      cancelOpen();
      cancelClose();

      const finish = () => {
        selector.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        if (returnFocus) trigger.focus();
      };

      if (delay) closeTimer = window.setTimeout(finish, delay);
      else finish();
    };

    if (hoverCapable) {
      selector.addEventListener('pointerenter', () => {
        cancelClose();
        cancelOpen();
        openTimer = window.setTimeout(() => open(), 85);
      });
      selector.addEventListener('pointerleave', () => close(false, 150));
    }

    selector.addEventListener('focusin', cancelClose);
    selector.addEventListener('focusout', event => {
      if (!selector.contains(event.relatedTarget)) close(false, 80);
    });

    trigger.addEventListener('click', () => {
      if (selector.classList.contains('is-open')) close();
      else open();
    });

    trigger.addEventListener('keydown', event => {
      const activeIndex = Math.max(
        options.findIndex(option => option.classList.contains('is-active')),
        0
      );

      if (['ArrowDown', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        open(activeIndex);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        open(options.length - 1);
      }
    });

    options.forEach(option => {
      option.addEventListener('click', event => {
        if (option.classList.contains('is-active')) {
          event.preventDefault();
          close(true);
          return;
        }

        const target = new URL(option.href, window.location.href);
        if (!target.search && window.location.search) target.search = window.location.search;
        if (window.location.hash) target.hash = window.location.hash;

        event.preventDefault();
        window.location.assign(target.href);
      });
    });

    menu.addEventListener('keydown', event => {
      const currentIndex = options.indexOf(document.activeElement);

      if (event.key === 'Escape') {
        event.preventDefault();
        close(true);
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
        close();
      }
    });

    document.addEventListener('pointerdown', event => {
      if (!selector.contains(event.target)) close();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && selector.classList.contains('is-open')) {
        close(true);
      }
    });

    document.querySelectorAll(
      '[data-menu-toggle],[data-open-contact],[data-open-legal]'
    ).forEach(control => {
      control.addEventListener('click', () => close());
    });

    window.addEventListener('resize', () => close(), { passive: true });
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
    document.querySelectorAll('.language-switcher').forEach(enhance);
    preserveMobileLanguagePosition();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
