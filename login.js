
document.addEventListener("DOMContentLoaded", function () {

  // Demo only: Never use browser storage for real passwords.
  const USERS_KEY = "reliveDemoUsers";
  const SESSION_KEY = "reliveDemoSession";

  // Elements
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const accountNav = document.getElementById("accountNav");

  const authForms = document.getElementById("authForms");
  const accountDashboard = document.getElementById("accountDashboard");
  const authHeading = document.getElementById("authHeading");
  const authSubtitle = document.getElementById("authSubtitle");
  const authMessage = document.getElementById("authMessage");

  const loginTab = document.getElementById("loginTab");
  const signupTab = document.getElementById("signupTab");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");

  const signupName = document.getElementById("signupName");
  const signupEmail = document.getElementById("signupEmail");
  const signupPassword = document.getElementById("signupPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const acceptTerms = document.getElementById("acceptTerms");

  const strengthFill = document.getElementById("strengthFill");
  const strengthText = document.getElementById("strengthText");

  const welcomeName = document.getElementById("welcomeName");
  const accountName = document.getElementById("accountName");
  const accountEmail = document.getElementById("accountEmail");
  const logoutButton = document.getElementById("logoutButton");

  // Navbar
  menuToggle.addEventListener("click", function () {
    const open = navLinks.classList.toggle("open");
    menuToggle.textContent = open ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.getElementById("year").textContent =
    new Date().getFullYear();

  // Storage Helpers
  function getUsers() {
    try {
      const value = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      console.warn("Unable to read demo accounts.");
      return [];
    }
  }

  function saveUsers(users) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return true;
    } catch (error) {
      return false;
    }
  }

  function getSession() {
    try {
      const value = JSON.parse(
        sessionStorage.getItem(SESSION_KEY) || "null"
      );

      if (value && typeof value.email === "string") {
        return value;
      }
    } catch (error) {
      console.warn("Unable to read demo session.");
    }

    return null;
  }

  function saveSession(email) {
    try {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ email: email })
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  function clearSession() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch (error) {
      console.warn("Unable to clear demo session.");
    }
  }

  // Validation Helpers
  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function passwordValid(password) {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    );
  }

  function setError(inputId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + "Error");

    if (error) error.textContent = message;

    if (input) {
      input.classList.toggle("invalid", Boolean(message));
      input.setAttribute("aria-invalid", String(Boolean(message)));
    }
  }

  function clearErrors() {
    document.querySelectorAll(".error-text").forEach(function (element) {
      element.textContent = "";
    });

    document.querySelectorAll(".invalid").forEach(function (element) {
      element.classList.remove("invalid");
      element.setAttribute("aria-invalid", "false");
    });
  }

  function showMessage(message, type = "success") {
    authMessage.textContent = message;
    authMessage.className =
      type === "error" ? "message error" : "message";
    authMessage.hidden = false;
  }

  function hideMessage() {
    authMessage.hidden = true;
    authMessage.textContent = "";
  }

  // Switch Between Login and Signup
  function switchForm(mode) {
    const signup = mode === "signup";

    loginForm.hidden = signup;
    signupForm.hidden = !signup;

    loginTab.classList.toggle("active", !signup);
    signupTab.classList.toggle("active", signup);

    loginTab.setAttribute("aria-pressed", String(!signup));
    signupTab.setAttribute("aria-pressed", String(signup));

    authHeading.innerHTML = signup
      ? 'Join <em>RELIVE.</em>'
      : 'Welcome <em>back.</em>';

    authSubtitle.textContent = signup
      ? "Create your account and become part of a more conscious fashion community."
      : "Sign in to continue your sustainable fashion journey.";

    clearErrors();
    hideMessage();

    // Keep URL in sync with selected tab
    const newHash = signup ? "#signup" : "#login";
    history.replaceState(null, "", newHash);
  }

  loginTab.addEventListener("click", function () {
    switchForm("login");
  });

  signupTab.addEventListener("click", function () {
    switchForm("signup");
  });

  document.getElementById("switchToSignup").addEventListener(
    "click",
    function () {
      switchForm("signup");
    }
  );

  document.getElementById("switchToLogin").addEventListener(
    "click",
    function () {
      switchForm("login");
    }
  );

  // Password Show / Hide
  document.querySelectorAll(".password-toggle").forEach(
    function (button) {
      button.addEventListener("click", function () {
        const input = document.getElementById(
          button.dataset.target
        );

        const showing = input.type === "password";

        input.type = showing ? "text" : "password";
        button.textContent = showing ? "Hide" : "Show";
        button.setAttribute(
          "aria-label",
          showing ? "Hide password" : "Show password"
        );
      });
    }
  );

  // Password Strength
  function updatePasswordStrength() {
    const password = signupPassword.value;
    let score = 0;

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (!password) {
      strengthFill.style.width = "0%";
      strengthText.textContent = "Password strength";
      return;
    }

    strengthFill.style.width = (score * 20) + "%";

    if (score <= 2) {
      strengthFill.style.background = "#b44242";
      strengthText.textContent = "Weak password";
    } else if (score <= 3) {
      strengthFill.style.background = "#d6ad6b";
      strengthText.textContent = "Medium password";
    } else {
      strengthFill.style.background = "#39805a";
      strengthText.textContent = "Strong password";
    }
  }

  signupPassword.addEventListener(
    "input",
    updatePasswordStrength
  );

  // Dashboard
  function showDashboard(user) {
    authForms.hidden = true;
    accountDashboard.hidden = false;

    welcomeName.textContent = user.name.split(/\s+/)[0];
    accountName.textContent = user.name;
    accountEmail.textContent = user.email;
    accountNav.textContent = "My Account ↗";
  }

  function showLoggedOut() {
    authForms.hidden = false;
    accountDashboard.hidden = true;
    accountNav.textContent = "Login / Signup ↗";
  }

  // Signup
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    clearErrors();
    hideMessage();

    const name = signupName.value.trim().replace(/\s+/g, " ");
    const email = signupEmail.value.trim().toLowerCase();
    const password = signupPassword.value;
    const confirmation = confirmPassword.value;

    let valid = true;

    if (name.length < 2) {
      setError("signupName", "Enter your full name (at least 2 characters).");
      valid = false;
    }

    if (!validEmail(email)) {
      setError("signupEmail", "Enter a valid email address.");
      valid = false;
    }

    if (!passwordValid(password)) {
      setError(
        "signupPassword",
        "Use at least 8 characters with uppercase, lowercase and a number."
      );
      valid = false;
    }

    if (confirmation !== password || !confirmation) {
      setError("confirmPassword", "Passwords do not match.");
      valid = false;
    }

    if (!acceptTerms.checked) {
      document.getElementById("acceptTermsError").textContent =
        "Please confirm you understand this is a demo.";
      valid = false;
    }

    if (!valid) return;

    const users = getUsers();

    if (users.some(function (user) {
      return user.email === email;
    })) {
      setError("signupEmail", "An account with this email already exists.");
      return;
    }

    // DEMO ONLY: Password stored as plain text in localStorage.
    // Never use this approach for real authentication.
    users.push({
      id: "RELIVE-" + Date.now(),
      name: name,
      email: email,
      password: password,
      createdAt: new Date().toISOString()
    });

    if (!saveUsers(users)) {
      showMessage(
        "Unable to save your account. Check browser storage settings.",
        "error"
      );
      return;
    }

    signupForm.reset();
    updatePasswordStrength();

    switchForm("login");
    loginEmail.value = email;

    showMessage(
      "Account created successfully! Please sign in."
    );
  });

  // Login
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    clearErrors();
    hideMessage();

    const email = loginEmail.value.trim().toLowerCase();
    const password = loginPassword.value;

    let valid = true;

    if (!validEmail(email)) {
      setError("loginEmail", "Enter a valid email address.");
      valid = false;
    }

    if (!password) {
      setError("loginPassword", "Enter your password.");
      valid = false;
    }

    if (!valid) return;

    const users = getUsers();

    const user = users.find(function (account) {
      return (
        account.email === email &&
        account.password === password
      );
    });

    if (!user) {
      showMessage(
        "Incorrect email or password, or no demo account exists.",
        "error"
      );
      return;
    }

    if (!saveSession(user.email)) {
      showMessage(
        "Unable to create a login session in this browser.",
        "error"
      );
      return;
    }

    loginForm.reset();
    showDashboard(user);
  });

  // Logout
  logoutButton.addEventListener("click", function () {
    clearSession();
    loginForm.reset();
    signupForm.reset();
    updatePasswordStrength();

    showLoggedOut();
    switchForm("login");

    showMessage("You have logged out successfully.");
  });

  // Restore Login Session on Refresh
  const session = getSession();

  if (session) {
    const user = getUsers().find(function (account) {
      return account.email === session.email;
    });

    if (user) {
      showDashboard(user);
    } else {
      clearSession();
      showLoggedOut();
    }
  } else {
    showLoggedOut();
  }

  // Open signup directly with login.html#signup
  if (!session) {
    switchForm(
      window.location.hash === "#signup" ? "signup" : "login"
    );
  }

  console.log("RELIVE Demo Authentication Ready!");

});
