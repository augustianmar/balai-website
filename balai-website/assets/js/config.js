window.BALAI_CONFIG = {
  email: "",
  formEndpoint: "",
  whatsappNumber: ""
};

(() => {
  const loader = document.currentScript;
  if (!loader?.src) return;

  const assets = [
    { type: 'style', href: new URL('../css/language-selector.css?v=75', loader.src).href },
    { type: 'style', href: new URL('../css/navigation.css?v=80', loader.src).href },
    { type: 'script', href: new URL('./language-selector.js?v=75', loader.src).href },
    { type: 'script', href: new URL('./navigation.js?v=80', loader.src).href }
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
