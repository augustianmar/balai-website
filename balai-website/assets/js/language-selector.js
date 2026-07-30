(() => {
  const metaByLabel = {
    English: { code: 'EN', trigger: 'English' },
    Suomi: { code: 'FI', trigger: 'Suomi' },
    Svenska: { code: 'SV', trigger: 'Svenska' },
    'Bahasa Indonesia': { code: 'ID', trigger: 'Indonesia' }
  };

  const interfaceLabels = {
    en: { change: 'Change language', current: 'Current language' },
    fi: { change: 'Vaihda kieltä', current: 'Nykyinen kieli' },
    sv: { change: 'Byt språk', current: 'Nuvarande språk' },
    id: { change: 'Ganti bahasa', current: 'Bahasa saat ini' }
  };

  const chevron = '<svg class="language-trigger-chevron" aria-hidden="true" viewBox="0 0 20 20"><path d="m5.5 7.5 4.5 4.5 4.5-4.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"/></svg>';
  const check = '<svg aria-hidden="true" viewBox="0 0 20 20"><path d="m4.5 10.3 3.2 3.2 7.8-7.8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>';

  const cloneSvgWithUniqueIds = (svg, suffix) => {
    if (!svg) return '';
    const clone = svg.cloneNode(true);
    const idMap = new Map();
    clone.querySelectorAll('[id]').forEach(node => {
      const oldId = node.id;
      const newId = `${oldId}-${suffix}`;
      idMap.set(oldId, newId);
      node.id = newId;
    });
    clone.querySelectorAll('*').forEach(node => {
      [...node.attributes].forEach(attribute => {
        let value = attribute.value;
        idMap.forEach((newId, oldId) => {
          value = value
            .replaceAll(`url(#${oldId})`, `url(#${newId})`)
            .replaceAll(`#${oldId}`, `#${newId}`);
        });
        if (value !== attribute.value) node.setAttribute(attribute.name, value);
      });
    });
    clone.removeAttribute('aria-label');
    clone.setAttribute('aria-hidden', 'true');
    return clone.outerHTML;
  };

  const languageLabel = link => link.getAttribute('title') || link.getAttribute('aria-label') || link.textContent.trim();

  const enhanceSelector = selector => {
    if (!selector || selector.classList.contains('language-switcher--enhanced')) return;

    const links = [...selector.querySelectorAll('.lang-link')];
    if (links.length < 2) return;

    const active = links.find(link => link.getAttribute('aria-current') === 'page' || link.classList.contains('is-active')) || links[0];
    const activeLabel = languageLabel(active);
    const activeMeta = metaByLabel[activeLabel] || { code: document.documentElement.lang.slice(0, 2).toUpperCase(), trigger: activeLabel };
    const pageLanguage = document.documentElement.lang.slice(0, 2).toLowerCase();
    const ui = interfaceLabels[pageLanguage] || interfaceLabels.en;

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'language-trigger';
    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', `${ui.change}. ${ui.current}: ${activeLabel}`);
    trigger.innerHTML = `
      <span class="language-trigger-flag">${cloneSvgWithUniqueIds(active.querySelector('svg'), 'trigger')}</span>
      <span class="language-trigger-copy">
        <span class="language-trigger-name">${activeMeta.trigger}</span>
        <span class="language-trigger-code">${activeMeta.code}</span>
      </span>
      ${chevron}
    `;

    const menu = document.createElement('div');
    menu.className = 'language-menu';
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-label', ui.change);

    links.forEach((link, index) => {
      const label = languageLabel(link);
      const meta = metaByLabel[label] || { code: label.slice(0, 2).toUpperCase(), trigger: label };
      const isActive = link === active;
      const flag = link.querySelector('svg');

      link.className = `language-option${isActive ? ' is-active' : ''}`;
      link.setAttribute('role', 'menuitemradio');
      link.setAttribute('aria-checked', String(isActive));
      link.setAttribute('tabindex', '-1');
      link.removeAttribute('title');
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');

      link.innerHTML = `
        <span class="language-option-flag">${flag ? flag.outerHTML : ''}</span>
        <span class="language-option-copy"><strong>${label}</strong><small>${meta.code}</small></span>
        <span class="language-option-check">${check}</span>
      `;

      link.addEventListener('click', event => {
        if (isActive) {
          event.preventDefault();
          closeSelector(true);
          return;
        }
        const target = new URL(link.href, window.location.href);
        if (!target.search && window.location.search) target.search = window.location.search;
        if (window.location.hash) target.hash = window.location.hash;
        event.preventDefault();
        window.location.assign(target.href);
      });

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
      if (Number.isInteger(focusIndex)) requestAnimationFrame(() => options[focusIndex]?.focus());
    };

    trigger.addEventListener('click', () => {
      if (selector.classList.contains('is-open')) closeSelector(false);
      else openSelector();
    });

    trigger.addEventListener('keydown', event => {
      if (['ArrowDown', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        openSelector(Math.max(options.findIndex(option => option.classList.contains('is-active')), 0));
      }
      if (event.key === 'ArrowUp') {
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
      if (event.key === 'Escape' && selector.classList.contains('is-open')) closeSelector(true);
    });

    document.querySelectorAll('[data-menu-toggle],[data-open-contact],[data-open-legal]').forEach(control => {
      control.addEventListener('click', () => closeSelector(false));
    });
  };

  const preserveMobileLanguagePosition = () => {
    document.querySelectorAll('.mobile-language-links a').forEach(link => {
      link.addEventListener('click', event => {
        if (link.getAttribute('aria-current') === 'page' || link.classList.contains('is-active')) return;
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

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
