
document.addEventListener("DOMContentLoaded", function () {

  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const welcomeUser = document.getElementById("welcomeUser");

  const ACCOUNT_KEY = "reliveDemoAccount";
  const SESSION_KEY = "reliveDemoSession";

  // SIGNUP
  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim().toLowerCase();
      const password = document.getElementById("signupPassword").value;
      const confirm = document.getElementById("confirmPassword").value;
      const error = document.getElementById("signupError");

      error.textContent = "";

      if (password.length < 6) {
        error.textContent = "Password must be at least 6 characters.";
        return;
      }

      if (password !== confirm) {
        error.textContent = "Passwords do not match.";
        return;
      }

      // Demo only: no password is stored
      const account = {
        name: name,
        email: email
      };

      localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(account));

      window.location.href = "dashboard.html";
    });
  }

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("loginEmail").value.trim().toLowerCase();
      const password = document.getElementById("loginPassword").value;
      const error = document.getElementById("loginError");

      error.textContent = "";

      let account = null;

      try {
        account = JSON.parse(localStorage.getItem(ACCOUNT_KEY));
      } catch (e) {
        account = null;
      }

      if (!account || account.email !== email || !password) {
        error.textContent = "Account not found or invalid details.";
        return;
      }

      // Demo only: password is not verified
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(account));
      window.location.href = "dashboard.html";
    });
  }

  // DASHBOARD
  if (welcomeUser) {
    let user = null;

    try {
      user = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    } catch (e) {
      user = null;
    }

    if (!user || !user.name) {
      window.location.replace("login.html");
      return;
    }

    welcomeUser.textContent = "Welcome, " + user.name + "!";
  }

  // LOGOUT
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      sessionStorage.removeItem(SESSION_KEY);
      window.location.replace("login.html");
    });
  }

});
