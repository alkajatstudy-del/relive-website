
document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);
  const USERS = "reliveDemoUsers";
  const SESSION = "reliveDemoSession";

  function read(key, fallback = []) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value === null ? fallback : value;
    } catch {
      return fallback;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  function currentUser() {
    try {
      const session = JSON.parse(
        sessionStorage.getItem(SESSION) || "null"
      );
      const users = read(USERS);
      return Array.isArray(users) && session
        ? users.find(u => u.email === session.email) || null
        : null;
    } catch {
      return null;
    }
  }

  function loginSession(email) {
    try {
      sessionStorage.setItem(SESSION, JSON.stringify({ email }));
      return true;
    } catch {
      return false;
    }
  }

  // Shared navbar
  const menu = $("menuToggle");
  const links = $("navLinks");

  if (menu && links) {
    menu.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      menu.textContent = open ? "✕" : "☰";
      menu.setAttribute("aria-expanded", String(open));
    });
  }

  const accountLink = $("accountNav");
  const user = currentUser();

  if (accountLink) {
    accountLink.textContent = user
      ? "Hi, " + user.name.trim().split(/\s+/)[0] + " ↗"
      : "Login / Signup ↗";
  }

  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("#navLinks a").forEach(a => {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });

  if ($("year")) $("year").textContent = new Date().getFullYear();

  // Image fallback
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
      img.style.background = "#dbe4d9";
      img.alt = "RELIVE sustainable fashion";
    });
  });

  // Shared message
  function message(id, text, error = false) {
    const el = $(id);
    if (!el) return;
    el.textContent = text;
    el.className = error ? "message error" : "message";
    el.hidden = false;
  }

  // Donate form
  const donationForm = $("donationForm");

  if (donationForm) {
    donationForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!donationForm.reportValidity()) return;

      const data = new FormData(donationForm);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const phone = String(data.get("phone") || "").trim();

      if (name.length < 2) {
        message("donationMessage", "Please enter your full name.", true);
        return;
      }

      if (!/^[0-9]{10}$/.test(phone)) {
        message("donationMessage", "Enter a valid 10-digit phone number.", true);
        return;
      }

      const donation = {
        id: "REL-" + Date.now(),
        name,
        email,
        phone,
        clothingType: data.get("clothingType"),
        quantity: data.get("quantity"),
        condition: data.get("condition"),
        method: data.get("method"),
        address: data.get("address"),
        notes: data.get("notes"),
        accountEmail: currentUser()?.email || null,
        date: new Date().toISOString(),
        status: "Request Submitted"
      };

      const donations = read("reliveDonations");
      donations.push(donation);

      if (!save("reliveDonations", donations)) {
        message("donationMessage", "Browser storage unavailable.", true);
        return;
      }

      donationForm.reset();
      message(
        "donationMessage",
        "Thank you! Your demo donation request has been saved. ID: " +
        donation.id
      );
      $("donationMessage").scrollIntoView({
        behavior: "smooth", block: "center"
      });
    });
  }

  // Category filters
  document.querySelectorAll(".filter-bar").forEach(bar => {
    const target = document.querySelector(bar.dataset.target);
    if (!target) return;

    bar.querySelectorAll(".filter-btn").forEach(button => {
      button.addEventListener("click", () => {
        bar.querySelectorAll(".filter-btn").forEach(b =>
          b.classList.remove("active")
        );
        button.classList.add("active");

        const filter = button.dataset.filter;
        target.querySelectorAll("[data-category]").forEach(card => {
          card.hidden = filter !== "all" &&
            !card.dataset.category.split(" ").includes(filter);
        });
      });
    });
  });

  // Reuse favourites
  const favKey = "reliveReuseFavorites";

  document.querySelectorAll(".fav-btn").forEach(button => {
    const id = button.dataset.favorite;

    function update() {
      const saved = read(favKey);
      const active = Array.isArray(saved) && saved.includes(id);
      button.classList.toggle("saved", active);
      button.textContent = active ? "♥" : "♡";
      button.setAttribute("aria-pressed", String(active));
    }

    button.addEventListener("click", () => {
      const saved = read(favKey);
      const list = Array.isArray(saved) ? saved : [];
      const next = list.includes(id)
        ? list.filter(x => x !== id)
        : [...list, id];

      if (save(favKey, next)) update();
    });

    update();
  });

  // Tutorial popup
  const tutorials = {
    "tshirt-bag": {
      title: "T-Shirt Tote Bag",
      steps: [
        "Take a clean old T-shirt.",
        "Cut off the sleeves and widen the neckline.",
        "Turn the shirt inside out.",
        "Stitch the bottom securely or tie fabric strips.",
        "Turn it right side out and use it as a bag."
      ]
    },
    "denim-pouch": {
      title: "Denim Pouch",
      steps: [
        "Cut two equal rectangles from old jeans.",
        "Place the pieces inside out.",
        "Stitch three sides together.",
        "Attach a zip or button at the opening.",
        "Turn it right side out."
      ]
    },
    "scrunchie": {
      title: "Fabric Scrunchie",
      steps: [
        "Cut a long fabric strip.",
        "Fold it lengthwise and stitch the edge.",
        "Turn the tube right side out.",
        "Insert elastic using a safety pin.",
        "Tie elastic ends and close the fabric."
      ]
    },
    "denim-shorts": {
      title: "DIY Denim Shorts",
      steps: [
        "Try on old jeans and mark the desired length.",
        "Remove jeans before cutting.",
        "Cut slightly below your marking.",
        "Fold and stitch the hem.",
        "Add decorative patches if desired."
      ]
    },
    "crop-top": {
      title: "Upcycled Crop Top",
      steps: [
        "Choose an old oversized T-shirt.",
        "Mark the desired length while wearing it.",
        "Remove the shirt and cut carefully.",
        "Fold and stitch the hem if desired.",
        "Decorate with embroidery or fabric paint."
      ]
    },
    "patchwork": {
      title: "Patchwork Cushion",
      steps: [
        "Collect clean fabric scraps.",
        "Cut matching squares.",
        "Arrange the squares into a pattern.",
        "Stitch the squares together.",
        "Create a cushion cover with a back panel."
      ]
    },
    "button": {
      title: "Sew a Missing Button",
      steps: [
        "Find a matching button and needle.",
        "Thread the needle and tie a knot.",
        "Position the button over the original mark.",
        "Sew through its holes several times.",
        "Secure the thread on the inside."
      ]
    },
    "tear": {
      title: "Repair a Small Tear",
      steps: [
        "Turn the garment inside out.",
        "Align the torn fabric edges.",
        "Use matching thread and small stitches.",
        "Reinforce the ends of the tear.",
        "Trim loose threads."
      ]
    },
    "hem": {
      title: "Fix a Loose Hem",
      steps: [
        "Fold the fabric to the original hemline.",
        "Press it flat.",
        "Pin the folded edge.",
        "Use small even stitches.",
        "Remove pins and press again."
      ]
    },
    "stain": {
      title: "Treat a Fabric Stain",
      steps: [
        "Check the garment care label.",
        "Blot the stain gently; do not rub aggressively.",
        "Test mild detergent on a hidden area.",
        "Wash according to the care instructions.",
        "Air dry and check before using heat."
      ]
    },
    "zipper": {
      title: "Care for a Stuck Zipper",
      steps: [
        "Do not pull forcefully.",
        "Check whether fabric is caught in the teeth.",
        "Gently free trapped fabric.",
        "Try a small amount of zipper-safe lubricant.",
        "Replace the zipper if it is broken."
      ]
    },
    "care": {
      title: "Make Clothes Last Longer",
      steps: [
        "Read clothing care labels.",
        "Wash only when necessary.",
        "Use gentle cycles where appropriate.",
        "Air dry suitable garments.",
        "Store clean, dry clothes properly."
      ]
    }
  };

  const modal = $("tutorialModal");

  if (modal) {
    const title = $("modalTitle");
    const steps = $("modalSteps");

    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = "";
    }

    document.querySelectorAll("[data-tutorial]").forEach(button => {
      button.addEventListener("click", () => {
        const tutorial = tutorials[button.dataset.tutorial];
        if (!tutorial) return;

        title.textContent = tutorial.title;
        steps.replaceChildren();

        tutorial.steps.forEach(step => {
          const li = document.createElement("li");
          li.textContent = step;
          steps.appendChild(li);
        });

        modal.hidden = false;
        document.body.style.overflow = "hidden";
      });
    });

    $("closeModal").addEventListener("click", closeModal);

    modal.addEventListener("click", event => {
      if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeModal();
    });
  }

  // Repair kit checklist
  const kitKey = "reliveRepairKit";
  const kitBoxes = document.querySelectorAll("[data-kit]");

  if (kitBoxes.length) {
    const saved = read(kitKey);
    const checked = Array.isArray(saved) ? saved : [];

    kitBoxes.forEach(box => {
      box.checked = checked.includes(box.dataset.kit);

      box.addEventListener("change", () => {
        const selected = [...kitBoxes]
          .filter(item => item.checked)
          .map(item => item.dataset.kit);

        save(kitKey, selected);
        updateKit();
      });
    });

    function updateKit() {
      const count = [...kitBoxes].filter(box => box.checked).length;
      if ($("kitProgress")) {
        $("kitProgress").textContent =
          count + " / " + kitBoxes.length + " essentials ready";
      }
    }

    updateKit();
  }

  // Recycle quiz
  const quizQuestions = [
    {
      q: "What should you do with clean clothes in good condition?",
      options: ["Throw them away", "Donate or reuse them", "Burn them"],
      answer: 1
    },
    {
      q: "Which material is a natural fibre?",
      options: ["Cotton", "Polyester", "Acrylic"],
      answer: 0
    },
    {
      q: "What is the best first step before recycling clothes?",
      options: ["Mix them with waste", "Sort by condition", "Soak in paint"],
      answer: 1
    },
    {
      q: "Can old denim be creatively reused?",
      options: ["Yes", "Never", "Only in factories"],
      answer: 0
    },
    {
      q: "What should you do with wet, contaminated clothing?",
      options: [
        "Put it directly in a donation box",
        "Mix it with clean textiles",
        "Follow local disposal guidance"
      ],
      answer: 2
    }
  ];

  const quiz = $("quizBox");

  if (quiz) {
    let index = 0;
    let score = 0;
    let selected = null;

    function renderQuiz() {
      if (index >= quizQuestions.length) {
        quiz.replaceChildren();

        const heading = document.createElement("h3");
        heading.textContent =
          "Your Score: " + score + " / " + quizQuestions.length;

        const desc = document.createElement("p");
        desc.textContent = score === quizQuestions.length
          ? "Excellent! You're a RELIVE recycling champion."
          : "Great effort! Keep learning about textile recycling.";

        const restart = document.createElement("button");
        restart.className = "btn";
        restart.textContent = "Try Again ↻";
        restart.addEventListener("click", () => {
          index = 0;
          score = 0;
          renderQuiz();
        });

        quiz.append(heading, desc, restart);
        return;
      }

      selected = null;
      quiz.replaceChildren();

      const item = quizQuestions[index];
      const label = document.createElement("span");
      label.className = "eyebrow";
      label.textContent =
        "QUESTION " + (index + 1) + " OF " + quizQuestions.length;

      const heading = document.createElement("h3");
      heading.textContent = item.q;

      quiz.append(label, heading);

      item.options.forEach((option, i) => {
        const button = document.createElement("button");
        button.className = "quiz-option";
        button.textContent = option;

        button.addEventListener("click", () => {
          selected = i;
          quiz.querySelectorAll(".quiz-option").forEach(b =>
            b.classList.remove("selected")
          );
          button.classList.add("selected");
        });

        quiz.appendChild(button);
      });

      const next = document.createElement("button");
      next.className = "btn";
      next.textContent =
        index === quizQuestions.length - 1
          ? "See My Result →"
          : "Next Question →";

      next.addEventListener("click", () => {
        if (selected === null) {
          alert("Please select an answer.");
          return;
        }
        if (selected === item.answer) score++;
        index++;
        renderQuiz();
      });

      quiz.appendChild(next);
    }

    renderQuiz();
  }

  // Login and Signup
  const loginForm = $("loginForm");
  const signupForm = $("signupForm");

  if (loginForm && signupForm) {
    const loginTab = $("loginTab");
    const signupTab = $("signupTab");
    const authForms = $("authForms");
    const dashboard = $("accountDashboard");

    function switchTab(mode) {
      const signup = mode === "signup";
      loginForm.hidden = signup;
      signupForm.hidden = !signup;
      loginTab.classList.toggle("active", !signup);
      signupTab.classList.toggle("active", signup);
      $("authHeading").textContent =
        signup ? "Join RELIVE." : "Welcome back.";
      $("authMessage").hidden = true;
      history.replaceState(
        null, "", signup ? "#signup" : "#login"
      );
    }

    loginTab.addEventListener("click", () => switchTab("login"));
    signupTab.addEventListener("click", () => switchTab("signup"));

    document.querySelectorAll("[data-switch]").forEach(button => {
      button.addEventListener("click", () =>
        switchTab(button.dataset.switch)
      );
    });

    document.querySelectorAll("[data-show]").forEach(button => {
      button.addEventListener("click", () => {
        const input = $(button.dataset.show);
        input.type = input.type === "password" ? "text" : "password";
        button.textContent = input.type === "password" ? "Show" : "Hide";
      });
    });

    function showDashboard(user) {
      authForms.hidden = true;
      dashboard.hidden = false;
      $("welcomeName").textContent = user.name.split(/\s+/)[0];
      $("accountName").textContent = user.name;
      $("accountEmail").textContent = user.email;
      if (accountLink) {
        accountLink.textContent =
          "Hi, " + user.name.split(/\s+/)[0] + " ↗";
      }
    }

    signupForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!signupForm.reportValidity()) return;

      const name = $("signupName").value.trim();
      const email = $("signupEmail").value.trim().toLowerCase();
      const password = $("signupPassword").value;
      const confirm = $("confirmPassword").value;

      if (name.length < 2) {
        message("authMessage", "Enter a valid full name.", true);
        return;
      }

      if (
        password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password)
      ) {
        message(
          "authMessage",
          "Password needs 8+ characters, uppercase, lowercase and a number.",
          true
        );
        return;
      }

      if (password !== confirm) {
        message("authMessage", "Passwords do not match.", true);
        return;
      }

      const users = read(USERS);

      if (users.some(u => u.email === email)) {
        message("authMessage", "This email is already registered.", true);
        return;
      }

      // College demo ONLY. Plain-text password storage is insecure.
      users.push({ name, email, password });

      if (!save(USERS, users)) {
        message("authMessage", "Unable to save demo account.", true);
        return;
      }

      signupForm.reset();
      switchTab("login");
      $("loginEmail").value = email;
      message("authMessage", "Account created! Please login.");
    });

    loginForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!loginForm.reportValidity()) return;

      const email = $("loginEmail").value.trim().toLowerCase();
      const password = $("loginPassword").value;

      const user = read(USERS).find(
        u => u.email === email && u.password === password
      );

      if (!user) {
        message("authMessage", "Incorrect email or password.", true);
        return;
      }

      if (!loginSession(email)) {
        message("authMessage", "Unable to create session.", true);
        return;
      }

      loginForm.reset();
      showDashboard(user);
    });

    $("logoutButton").addEventListener("click", () => {
      sessionStorage.removeItem(SESSION);
      dashboard.hidden = true;
      authForms.hidden = false;
      if (accountLink) accountLink.textContent = "Login / Signup ↗";
      switchTab("login");
      message("authMessage", "Logged out successfully.");
    });

    if (user) {
      showDashboard(user);
    } else {
      switchTab(location.hash === "#signup" ? "signup" : "login");
    }
  }
});


// Optional: redirect after successful login
// window.location.href = "dashboard.html";