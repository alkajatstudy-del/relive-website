
document.addEventListener("DOMContentLoaded", function () {
  const navbarRoot = document.getElementById("reliveNavbar");
  if (!navbarRoot) return;

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const isLoggedIn = Boolean(
    sessionStorage.getItem("reliveDemoSession")
  );

  function pageLink(file, label) {
    const activeClass = currentPage === file ? "active" : "";
    return `<a href="${file}" class="${activeClass}">${label}</a>`;
  }

  navbarRoot.innerHTML = `
    <div class="relive-announcement">
      SUSTAINABLE FASHION ✦ GIVE FASHION ANOTHER CHANCE
    </div>

    <header class="relive-navbar">
      <a href="index.html" class="relive-logo" aria-label="RE:LIVE Home">
        RE<span>:</span>LIVE
      </a>

      <button
        type="button"
        class="relive-mobile-toggle"
        id="reliveMobileToggle"
        aria-label="Toggle navigation"
        aria-expanded="false"
        aria-controls="reliveNavLinks"
      >☰</button>

      <nav class="relive-nav-links" id="reliveNavLinks">
        ${pageLink("index.html", "Home")}

        <div class="relive-dropdown" id="reliveDropdown">
          <button
            type="button"
            class="relive-dropdown-toggle"
            id="reliveDropdownToggle"
            aria-expanded="false"
            aria-controls="reliveDropdownMenu"
          >
            Explore <span class="relive-arrow">⌄</span>
          </button>

          <div class="relive-dropdown-menu" id="reliveDropdownMenu">
            <a href="reuse.html" class="${currentPage === "reuse.html" ? "active" : ""}">
              <span class="relive-menu-icon">👕</span>
              <span class="relive-menu-text">
                <strong>Reuse</strong>
                <small>Restyle and upcycle clothes</small>
              </span>
            </a>

            <a href="repair.html" class="${currentPage === "repair.html" ? "active" : ""}">
              <span class="relive-menu-icon">🧵</span>
              <span class="relive-menu-text">
                <strong>Repair</strong>
                <small>Fix clothes, wear them again</small>
              </span>
            </a>

            <a href="recycle.html" class="${currentPage === "recycle.html" ? "active" : ""}">
              <span class="relive-menu-icon">♻️</span>
              <span class="relive-menu-text">
                <strong>Recycle</strong>
                <small>Reduce textile waste</small>
              </span>
            </a>

            <a href="donate.html" class="${currentPage === "donate.html" ? "active" : ""}">
              <span class="relive-menu-icon">🤝</span>
              <span class="relive-menu-text">
                <strong>Donate</strong>
                <small>Give clothes another chance</small>
              </span>
            </a>
          </div>
        </div>

        ${pageLink("about.html", "About")}
        ${pageLink("contact.html", "Contact")}
        ${pageLink("faq.html", "FAQ")}

        ${
          isLoggedIn
            ? `
              ${pageLink("dashboard.html", "Dashboard")}
              <button type="button" class="relive-logout-btn" id="reliveLogoutBtn">
                Logout
              </button>
            `
            : `
              ${pageLink("login.html", "Login")}
              ${pageLink("signup.html", "Sign Up")}
            `
        }
      </nav>
    </header>
  `;

  const dropdown = document.getElementById("reliveDropdown");
  const dropdownToggle = document.getElementById("reliveDropdownToggle");
  const mobileToggle = document.getElementById("reliveMobileToggle");
  const navLinks = document.getElementById("reliveNavLinks");
  const logoutBtn = document.getElementById("reliveLogoutBtn");

  function closeDropdown() {
    dropdown.classList.remove("dropdown-open");
    dropdownToggle.setAttribute("aria-expanded", "false");
  }

  dropdownToggle.addEventListener("click", function (event) {
    event.stopPropagation();

    const isOpen = dropdown.classList.toggle("dropdown-open");
    dropdownToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("mobile-open");

    mobileToggle.textContent = isOpen ? "✕" : "☰";
    mobileToggle.setAttribute("aria-expanded", String(isOpen));

    if (!isOpen) closeDropdown();
  });

  document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target)) closeDropdown();

    if (
      !navbarRoot.contains(event.target) &&
      navLinks.classList.contains("mobile-open")
    ) {
      navLinks.classList.remove("mobile-open");
      mobileToggle.textContent = "☰";
      mobileToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeDropdown();
      navLinks.classList.remove("mobile-open");
      mobileToggle.textContent = "☰";
      mobileToggle.setAttribute("aria-expanded", "false");
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      sessionStorage.removeItem("reliveDemoSession");
      window.location.href = "index.html";
    });
  }
});


