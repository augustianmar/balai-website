window.BALAI_CONFIG = {
  /* Add one confirmed destination before publishing active enquiry buttons. */
  email: "",
  formEndpoint: "",
  /* International format, digits only or with a leading +, for example +358... */
  whatsappNumber: "",
  /* Change to true only after replacing the legal preview with final text. */
  legalReady: false
};

(() => {
  const loader = document.currentScript;
  if (!loader?.src) return;

  const assets = [
    { type: 'style', href: new URL('../css/language-selector.css?v=84', loader.src).href },
    { type: 'style', href: new URL('../css/navigation.css?v=84', loader.src).href },
    { type: 'script', href: new URL('./language-selector.js?v=84', loader.src).href },
    { type: 'script', href: new URL('./navigation.js?v=84', loader.src).href }
  ];

  assets.forEach(asset => {
    if (asset.type === 'style') {
      if (document.querySelector(`link[href="${asset.href}"]`)) return;
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = asset.href;
      document.head.append(style);
      return;
    }

    if (document.querySelector(`script[src="${asset.href}"]`)) return;
    const script = document.createElement('script');
    script.src = asset.href;
    script.async = false;
    document.head.append(script);
  });
})();
