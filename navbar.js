
document.addEventListener("DOMContentLoaded", function () {
  const navbarRoot = document.getElementById("reliveNavbar");

  // Navbar sirf un pages par load hoga jahan placeholder hai.
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
    <header class="relive-navbar">
      <a href="index.html" class="relive-logo" aria-label="RE:LIVE Home">
        RE<span>:</span>LIVE
      </a>

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
  const dropdownMenu = document.getElementById("reliveDropdownMenu");
  const logoutBtn = document.getElementById("reliveLogoutBtn");

  // Dropdown open/close
  dropdownToggle.addEventListener("click", function (event) {
    event.stopPropagation();

    const isOpen = dropdown.classList.toggle("dropdown-open");
    dropdownToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Dropdown ko bahar click karne par close karo
  document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("dropdown-open");
      dropdownToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Escape key se dropdown close karo
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      dropdown.classList.remove("dropdown-open");
      dropdownToggle.setAttribute("aria-expanded", "false");
      dropdownToggle.focus();
    }
  });

  // Demo logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      sessionStorage.removeItem("reliveDemoSession");
      window.location.href = "index.html";
    });
  }
});

