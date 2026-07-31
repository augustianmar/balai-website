window.BALAI_CONFIG = {
  email: "",
  formEndpoint: "",
  whatsappNumber: ""
};

(() => {
  const loader = document.currentScript;
  if (!loader?.src) return;

  const styleHref = new URL('../css/language-selector.css?v=72', loader.src).href;
  const scriptHref = new URL('./language-selector.js?v=72', loader.src).href;

  if (!document.querySelector(`link[href="${styleHref}"]`)) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = styleHref;
    document.head.append(style);
  }

  if (!document.querySelector(`script[src="${scriptHref}"]`)) {
    const script = document.createElement('script');
    script.src = scriptHref;
    script.async = false;
    document.head.append(script);
  }
})();
