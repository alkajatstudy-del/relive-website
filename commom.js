
/* RELIVE Shared Website Integration */

document.addEventListener("DOMContentLoaded", function () {

  const USERS_KEY = "reliveDemoUsers";
  const SESSION_KEY = "reliveDemoSession";

  // 1. Find current demo user
  function getCurrentUser() {
    try {
      const session = JSON.parse(
        sessionStorage.getItem(SESSION_KEY) || "null"
      );

      const users = JSON.parse(
        localStorage.getItem(USERS_KEY) || "[]"
      );

      if (
        !session ||
        typeof session.email !== "string" ||
        !Array.isArray(users)
      ) {
        return null;
      }

      return users.find(function (user) {
        return user.email === session.email;
      }) || null;

    } catch (error) {
      return null;
    }
  }

  // 2. Add or update account link in navbar
  function updateAccountNavigation() {
    const navLinks = document.getElementById("navLinks");
    if (!navLinks) return;

    let accountLink = document.getElementById("accountNav");

    // Create account link only when missing
    if (!accountLink) {
      accountLink = document.createElement("a");
      accountLink.id = "accountNav";
      navLinks.appendChild(accountLink);
    }

    accountLink.classList.add("relive-account-link");
    accountLink.href = "login.html";

    const user = getCurrentUser();

    if (user) {
      const firstName = String(user.name || "Friend")
        .trim()
        .split(/\s+/)[0];

      accountLink.textContent = "Hi, " + firstName + " ↗";
      accountLink.setAttribute(
        "aria-label",
        "Open your RELIVE account"
      );
    } else {
      accountLink.textContent = "Login / Signup ↗";
      accountLink.setAttribute(
        "aria-label",
        "Login or create a RELIVE account"
      );
    }
  }

  updateAccountNavigation();

  // 3. Highlight active page
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("#navLinks a").forEach(function (link) {
    const target = link.getAttribute("href");

    if (!target || link.id === "accountNav") return;

    const targetPage = target.split("#")[0];

    if (targetPage === currentPage) {
      link.classList.add("active");
    }
  });

  // 4. Handle broken images
  function handleBrokenImage(img) {
    if (img.dataset.reliveFallbackApplied === "true") {
      return;
    }

    img.dataset.reliveFallbackApplied = "true";

    const fallback = document.createElement("div");
    fallback.className = "relive-image-fallback";

    const text = document.createElement("span");
    text.textContent = "RELIVE ♻ Give Fashion Another Chance";

    fallback.appendChild(text);

    // Replace the broken image while keeping its parent layout
    img.replaceWith(fallback);
  }

  document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("error", function () {
      handleBrokenImage(img);
    });

    // Catch images that failed before DOMContentLoaded
    if (img.complete && img.naturalWidth === 0) {
      handleBrokenImage(img);
    }
  });

  // 5. Set footer year where available
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  console.log("RELIVE common integration loaded.");
});
