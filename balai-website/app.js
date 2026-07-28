(() => {
  const config = window.BALAI_CONFIG;
  const productGrid = document.querySelector("#productGrid");
  const serviceList = document.querySelector("#serviceList");
  const cartDrawer = document.querySelector("#cartDrawer");
  const drawerBackdrop = document.querySelector("#drawerBackdrop");
  const cartItems = document.querySelector("#cartItems");
  const cartCount = document.querySelectorAll("[data-cart-count]");
  const cartTotal = document.querySelector("#cartTotal");
  const enquiryModal = document.querySelector("#enquiryModal");
  const enquiryForm = document.querySelector("#enquiryForm");
  const enquirySubject = document.querySelector("#enquirySubject");
  const enquiryMessage = document.querySelector("#enquiryMessage");
  const formStatus = document.querySelector("#formStatus");
  const toast = document.querySelector("#toast");
  const mobilePanel = document.querySelector("#mobilePanel");

  const currency = new Intl.NumberFormat(config.brand.locale, {
    style: "currency",
    currency: config.brand.currency
  });

  let cart = loadCart();

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem("balai-store-cart-v1")) || [];
    } catch {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem("balai-store-cart-v1", JSON.stringify(cart));
    renderCart();
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  function icon(name) {
    const icons = {
      arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      cart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 7H6M10 20h.01M17 20h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      menu: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
      close: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
    };
    return icons[name] || "";
  }

  function renderProducts() {
    productGrid.innerHTML = config.products.map(product => `
      <article class="product-card">
        <div class="product-media">
          <span class="product-badge">${product.category}</span>
          <img src="${product.image}" alt="${product.name} ${product.subtitle}" />
        </div>
        <div class="product-body">
          <div class="product-meta"><span>${product.subtitle}</span><span>${product.unit}</span></div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-footer">
            <strong class="product-price">${currency.format(product.price)}</strong>
            <button class="add-product" type="button" data-add-product="${product.id}">Add to basket</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  function renderServices() {
    serviceList.innerHTML = config.services.map(service => `
      <article class="service-row">
        <span class="service-number">${service.number}</span>
        <h3 class="service-title">${service.title}</h3>
        <div class="service-copy"><p>${service.summary}</p><small>${service.detail}</small></div>
        <button class="service-button" type="button" aria-label="${service.cta}" data-service="${service.id}">↗</button>
      </article>
    `).join("");
  }

  function renderCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.forEach(node => node.textContent = count);

    if (!cart.length) {
      cartItems.innerHTML = '<div class="empty-cart"><p>Your basket is empty.</p><small>Add products or request a service proposal.</small></div>';
    } else {
      cartItems.innerHTML = cart.map(item => `
        <article class="cart-item">
          <img src="${item.image}" alt="" />
          <div>
            <h3>${item.name}</h3>
            <p>${item.subtitle} · ${item.unit}</p>
            <div class="quantity">
              <button type="button" data-quantity="${item.id}" data-delta="-1" aria-label="Decrease quantity">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-quantity="${item.id}" data-delta="1" aria-label="Increase quantity">+</button>
            </div>
            <button class="remove-item" type="button" data-remove="${item.id}">Remove</button>
          </div>
          <strong class="cart-item-price">${currency.format(item.price * item.quantity)}</strong>
        </article>
      `).join("");
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = currency.format(total);
  }

  function addProduct(productId) {
    const product = config.products.find(item => item.id === productId);
    if (!product) return;
    const existing = cart.find(item => item.id === productId);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    saveCart();
    showToast(`${product.name} added to basket`);
  }

  function updateQuantity(productId, delta) {
    const item = cart.find(entry => entry.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) cart = cart.filter(entry => entry.id !== productId);
    saveCart();
  }

  function openCart() {
    cartDrawer.classList.add("open");
    drawerBackdrop.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function closeCart() {
    cartDrawer.classList.remove("open");
    drawerBackdrop.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  function openEnquiry(subject = "General enquiry", message = "") {
    closeCart();
    enquirySubject.value = subject;
    enquiryMessage.value = message;
    enquiryModal.classList.add("open");
    enquiryModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    setTimeout(() => enquiryForm.querySelector("input")?.focus(), 50);
  }

  function closeEnquiry() {
    enquiryModal.classList.remove("open");
    enquiryModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    formStatus.textContent = "";
  }

  function cartSummary() {
    return cart.map(item => `${item.quantity} × ${item.name} ${item.unit} — ${currency.format(item.price * item.quantity)}`).join("\n");
  }

  async function copyEnquiry(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  productGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-add-product]");
    if (button) addProduct(button.dataset.addProduct);
  });

  serviceList.addEventListener("click", event => {
    const button = event.target.closest("[data-service]");
    if (!button) return;
    const service = config.services.find(item => item.id === button.dataset.service);
    if (service) openEnquiry(service.title, `I would like to discuss ${service.title}.`);
  });

  cartItems.addEventListener("click", event => {
    const quantity = event.target.closest("[data-quantity]");
    const remove = event.target.closest("[data-remove]");
    if (quantity) updateQuantity(quantity.dataset.quantity, Number(quantity.dataset.delta));
    if (remove) {
      cart = cart.filter(item => item.id !== remove.dataset.remove);
      saveCart();
    }
  });

  document.addEventListener("click", event => {
    if (event.target.closest("[data-open-cart]")) openCart();
    if (event.target.closest("[data-close-cart]")) closeCart();
    if (event.target.closest("[data-open-enquiry]")) openEnquiry("Business enquiry", "I would like to discuss working with BALAI.");
    if (event.target.closest("[data-close-enquiry]")) closeEnquiry();
    if (event.target.closest("[data-menu-toggle]")) {
      const open = mobilePanel.classList.toggle("open");
      event.target.closest("[data-menu-toggle]").setAttribute("aria-expanded", String(open));
    }
    if (event.target.closest(".mobile-panel a")) mobilePanel.classList.remove("open");
  });

  document.querySelector("#checkoutButton").addEventListener("click", () => {
    if (!cart.length) {
      showToast("Add at least one product first");
      return;
    }
    openEnquiry("Product order request", `I would like to request the following order:\n\n${cartSummary()}\n\nTotal: ${cartTotal.textContent}`);
  });

  enquiryForm.addEventListener("submit", async event => {
    event.preventDefault();
    const data = new FormData(enquiryForm);
    const message = [
      `BALAI enquiry: ${data.get("subject")}`,
      "",
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company") || "—"}`,
      "",
      data.get("message")
    ].join("\n");

    const placeholderEmail = config.brand.contactEmail.includes("replace-me");
    const copied = await copyEnquiry(message);

    if (placeholderEmail) {
      formStatus.textContent = copied
        ? "Enquiry copied. Add your real email in config.js before launch."
        : "Add your real contact email in config.js before launch.";
      showToast("Enquiry prepared");
      return;
    }

    const mailto = `mailto:${encodeURIComponent(config.brand.contactEmail)}?subject=${encodeURIComponent(data.get("subject"))}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
    formStatus.textContent = copied ? "Enquiry copied and email opened." : "Email opened.";
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeCart();
      closeEnquiry();
      mobilePanel.classList.remove("open");
    }
  });

  document.querySelector("[data-year]").textContent = new Date().getFullYear();
  document.querySelectorAll("[data-icon='cart']").forEach(node => node.innerHTML = icon("cart"));
  document.querySelectorAll("[data-icon='menu']").forEach(node => node.innerHTML = icon("menu"));
  document.querySelectorAll("[data-icon='close']").forEach(node => node.innerHTML = icon("close"));
  document.querySelectorAll("[data-icon='arrow']").forEach(node => node.innerHTML = icon("arrow"));

  renderProducts();
  renderServices();
  renderCart();
})();