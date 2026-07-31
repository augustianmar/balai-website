(() => {
  const languageMeta = {
    English: { code: 'EN' },
    Suomi: { code: 'FI' },
    Svenska: { code: 'SV' },
    'Bahasa Indonesia': { code: 'ID' }
  };

  const interfaceLabels = {
    en: { change: 'Change language', current: 'Current language' },
    fi: { change: 'Vaihda kieltä', current: 'Nykyinen kieli' },
    sv: { change: 'Byt språk', current: 'Nuvarande språk' },
    id: { change: 'Ganti bahasa', current: 'Bahasa saat ini' }
  };

  const languageLabel = link =>
    link.getAttribute('title') ||
    link.getAttribute('aria-label') ||
    link.textContent.trim();

  const enhanceSelector = selector => {
    if (!selector || selector.classList.contains('language-switcher--flag-expand')) return;

    const links = [...selector.querySelectorAll('.lang-link')];
    if (links.length < 2) return;

    const active =
      links.find(link =>
        link.getAttribute('aria-current') === 'page' ||
        link.classList.contains('is-active')
      ) || links[0];

    const activeLabel = languageLabel(active);
    const pageLanguage = document.documentElement.lang.slice(0, 2).toLowerCase();
    const ui = interfaceLabels[pageLanguage] || interfaceLabels.en;
    const activeFlag = active.querySelector('svg')?.outerHTML || '';
    const activeMeta = languageMeta[activeLabel] || {
      code: pageLanguage.toUpperCase()
    };

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'language-flag-trigger';
    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', `${ui.change}. ${ui.current}: ${activeLabel}`);
    trigger.innerHTML = `
      <span class="language-flag" aria-hidden="true">${activeFlag}</span>
      <span class="language-switcher-status">${activeMeta.code} ${activeLabel}</span>
    `;

    const panel = document.createElement('div');
    panel.className = 'language-expand-panel';
    panel.setAttribute('role', 'menu');
    panel.setAttribute('aria-label', ui.change);

    const options = document.createElement('div');
    options.className = 'language-expand-options';

    links.forEach(link => {
      const label = languageLabel(link);
      const meta = languageMeta[label] || {
        code: label.slice(0, 2).toUpperCase()
      };
      const isActive = link === active;
      const flag = link.querySelector('svg')?.outerHTML || '';

      link.className = `language-expand-option${isActive ? ' is-active' : ''}`;
      link.setAttribute('role', 'menuitemradio');
      link.setAttribute('aria-checked', String(isActive));
      link.setAttribute('tabindex', '-1');
      link.removeAttribute('title');

      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');

      link.innerHTML = `
        <span class="language-option-flag" aria-hidden="true">${flag}</span>
        <span class="language-option-code">${meta.code}</span>
        <span class="language-option-name">${label}</span>
      `;

      options.append(link);
    });

    panel.append(options);
    selector.replaceChildren(trigger, panel);
    selector.classList.add('language-switcher--flag-expand');

    const optionLinks = [...options.querySelectorAll('.language-expand-option')];
    let closeTimer = 0;

    const cancelClose = () => {
      window.clearTimeout(closeTimer);
    };

    const openSelector = focusIndex => {
      cancelClose();

      document
        .querySelectorAll('.language-switcher--flag-expand.is-open')
        .forEach(other => {
          if (other !== selector) {
            other.classList.remove('is-open');
            other.querySelector('.language-flag-trigger')
              ?.setAttribute('aria-expanded', 'false');
          }
        });

      selector.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');

      if (Number.isInteger(focusIndex)) {
        requestAnimationFrame(() => optionLinks[focusIndex]?.focus());
      }
    };

    const closeSelector = (returnFocus = false, delay = 0) => {
      cancelClose();

      const close = () => {
        selector.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        if (returnFocus) trigger.focus();
      };

      if (delay) closeTimer = window.setTimeout(close, delay);
      else close();
    };

    selector.addEventListener('pointerenter', () => openSelector());
    selector.addEventListener('pointerleave', () => closeSelector(false, 150));
    selector.addEventListener('focusin', cancelClose);
    selector.addEventListener('focusout', event => {
      if (!selector.contains(event.relatedTarget)) closeSelector(false, 80);
    });

    trigger.addEventListener('click', () => {
      if (selector.classList.contains('is-open')) closeSelector();
      else openSelector();
    });

    trigger.addEventListener('keydown', event => {
      const activeIndex = Math.max(
        optionLinks.findIndex(option => option.classList.contains('is-active')),
        0
      );

      if (['ArrowDown', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        openSelector(activeIndex);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        openSelector(optionLinks.length - 1);
      }
    });

    optionLinks.forEach(option => {
      option.addEventListener('click', event => {
        if (option.classList.contains('is-active')) {
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

    panel.addEventListener('keydown', event => {
      const currentIndex = optionLinks.indexOf(document.activeElement);

      if (event.key === 'Escape') {
        event.preventDefault();
        closeSelector(true);
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        optionLinks[(currentIndex + 1 + optionLinks.length) % optionLinks.length]?.focus();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        optionLinks[(currentIndex - 1 + optionLinks.length) % optionLinks.length]?.focus();
      } else if (event.key === 'Home') {
        event.preventDefault();
        optionLinks[0]?.focus();
      } else if (event.key === 'End') {
        event.preventDefault();
        optionLinks.at(-1)?.focus();
      } else if (event.key === 'Tab') {
        closeSelector();
      }
    });

    document.addEventListener('pointerdown', event => {
      if (!selector.contains(event.target)) closeSelector();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && selector.classList.contains('is-open')) {
        closeSelector(true);
      }
    });

    document.querySelectorAll(
      '[data-menu-toggle],[data-open-contact],[data-open-legal]'
    ).forEach(control => {
      control.addEventListener('click', () => closeSelector());
    });

    window.addEventListener('resize', () => closeSelector(), { passive: true });
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
