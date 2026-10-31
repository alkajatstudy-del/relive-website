
document.addEventListener("DOMContentLoaded", function () {

  // Mobile Navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.textContent = isOpen ? "✕" : "☰";
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Footer Year
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Back To Top
  const backToTop = document.getElementById("backToTop");

  function updateBackToTop() {
    if (backToTop) {
      backToTop.classList.toggle("show", window.scrollY > 400);
    }
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Reveal Animations
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }

  // Repair Category Filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const guideCards = document.querySelectorAll(".guide-card");
  const resultsCount = document.getElementById("resultsCount");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const category = button.dataset.filter;
      let count = 0;

      filterButtons.forEach(function (btn) {
        const active = btn === button;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-pressed", String(active));
      });

      guideCards.forEach(function (card) {
        const matches =
          category === "all" ||
          card.dataset.category === category;

        card.hidden = !matches;

        if (matches) count++;
      });

      if (resultsCount) {
        resultsCount.textContent =
          "Showing " + count + " repair guides";
      }
    });
  });

  // Repair Kit Checklist
  const kitCheckboxes = document.querySelectorAll("[data-kit]");
  const kitPercentage = document.getElementById("kitPercentage");
  const kitProgress = document.getElementById("kitProgress");
  const kitStatus = document.getElementById("kitStatus");
  const resetKit = document.getElementById("resetKit");

  const storageKey = "reliveRepairKit";
  let savedKit = [];

  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");

    if (Array.isArray(stored)) {
      savedKit = stored.filter(function (item) {
        return typeof item === "string";
      });
    }
  } catch (error) {
    console.warn("Could not load saved repair kit.");
  }

  kitCheckboxes.forEach(function (checkbox) {
    checkbox.checked = savedKit.includes(checkbox.dataset.kit);
  });

  function updateKitProgress() {
    const total = kitCheckboxes.length;

    const checked = Array.from(kitCheckboxes).filter(function (checkbox) {
      return checkbox.checked;
    });

    const percentage = total
      ? Math.round((checked.length / total) * 100)
      : 0;

    kitPercentage.textContent = percentage + "%";
    kitProgress.style.width = percentage + "%";

    if (percentage === 100) {
      kitStatus.textContent = "Amazing! Your repair kit is ready.";
    } else if (percentage >= 50) {
      kitStatus.textContent = "Great progress! You're almost ready.";
    } else {
      kitStatus.textContent = "Start checking your available tools!";
    }
  }

  function saveKit() {
    const selected = Array.from(kitCheckboxes)
      .filter(function (checkbox) {
        return checkbox.checked;
      })
      .map(function (checkbox) {
        return checkbox.dataset.kit;
      });

    try {
      localStorage.setItem(storageKey, JSON.stringify(selected));
    } catch (error) {
      console.warn("Unable to save checklist in this browser.");
    }

    updateKitProgress();
  }

  kitCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", saveKit);
  });

  if (resetKit) {
    resetKit.addEventListener("click", function () {
      kitCheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });

      saveKit();
    });
  }

  updateKitProgress();

  // Repair Tutorials
  const tutorials = {
    button: {
      title: "Fix a Missing Button",
      description: "A simple hand-sewing technique for attaching a button.",
      materials: [
        "Replacement button",
        "Needle and matching thread",
        "Small scissors"
      ],
      steps: [
        "Choose a button that matches the garment.",
        "Thread the needle and tie a knot at the end.",
        "Position the button over the original button mark.",
        "Pass the needle through the fabric and button holes several times.",
        "Leave a little space under the button for thick fabric.",
        "Secure the thread with a knot on the inside and trim it."
      ]
    },

    tear: {
      title: "Repair Torn Fabric",
      description: "Mend a small tear using a needle and matching thread.",
      materials: [
        "Needle and matching thread",
        "Fabric scissors",
        "Optional fabric patch"
      ],
      steps: [
        "Clean and dry the damaged garment.",
        "Turn the garment inside out.",
        "Align the torn edges without stretching the fabric.",
        "Use small, even stitches to join the edges.",
        "For weak fabric, add a suitable patch for reinforcement.",
        "Tie a secure knot and trim the loose thread."
      ]
    },

    hem: {
      title: "Fix a Loose Hem",
      description: "Repair a loose hem on trousers, skirts or dresses.",
      materials: [
        "Needle and matching thread",
        "Pins",
        "Measuring tape",
        "Iron if suitable for the fabric"
      ],
      steps: [
        "Turn the garment inside out.",
        "Fold the loose hem back to its original position.",
        "Secure the fold with pins.",
        "Use small, evenly spaced stitches along the fold.",
        "Tie off the thread and remove the pins.",
        "Press the hem gently if the care label allows."
      ]
    },

    stain: {
      title: "Remove Common Stains",
      description: "A gentle starting method for many washable fabrics.",
      materials: [
        "Clean cloth",
        "Cool water",
        "Mild liquid laundry detergent",
        "Soft towel"
      ],
      steps: [
        "Check the garment care label before treatment.",
        "Blot the stain gently; avoid rubbing it deeper.",
        "Test a little detergent on a hidden area first.",
        "For suitable washable fabrics, apply a small amount of mild detergent.",
        "Allow a few minutes, then rinse according to the care label.",
        "Air-dry and inspect before using heat. Seek specialist care for delicate fabrics."
      ]
    },

    zipper: {
      title: "Fix a Stuck Zipper",
      description: "Try gentle methods to release a jammed zipper.",
      materials: [
        "Good lighting",
        "Tweezers",
        "Soft pencil graphite, if appropriate"
      ],
      steps: [
        "Place the garment on a flat surface.",
        "Check whether fabric or thread is trapped in the slider.",
        "Gently remove trapped material without pulling hard.",
        "If appropriate, rub a little pencil graphite on metal zipper teeth.",
        "Move the slider slowly back and forth.",
        "Stop if teeth or slider are damaged and consider professional repair."
      ]
    },

    care: {
      title: "Care for Your Clothes",
      description: "Simple maintenance habits to extend garment life.",
      materials: [
        "Garment care labels",
        "Suitable laundry detergent",
        "Appropriate hangers or storage boxes"
      ],
      steps: [
        "Read washing and drying instructions on the label.",
        "Sort garments by colour and fabric care requirements.",
        "Avoid unnecessary high temperatures.",
        "Air-dry suitable garments when possible.",
        "Store clothes clean and completely dry.",
        "Inspect loose seams, buttons and small holes regularly."
      ]
    }
  };

  // Tutorial Modal
  const modal = document.getElementById("tutorialModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalMaterials = document.getElementById("modalMaterials");
  const modalSteps = document.getElementById("modalSteps");
  const closeModal = document.getElementById("closeModal");
  const modalDone = document.getElementById("modalDone");

  let previousFocus = null;

  function fillList(element, items) {
    element.replaceChildren();

    items.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = item;
      element.appendChild(li);
    });
  }

  function openTutorial(id) {
    const tutorial = tutorials[id];

    if (!tutorial || !modal) return;

    previousFocus = document.activeElement;

    modalTitle.textContent = tutorial.title;
    modalDescription.textContent = tutorial.description;

    fillList(modalMaterials, tutorial.materials);
    fillList(modalSteps, tutorial.steps);

    modal.hidden = false;
    document.body.classList.add("modal-open");
    closeModal.focus();
  }

  function closeTutorial() {
    if (!modal) return;

    modal.hidden = true;
    document.body.classList.remove("modal-open");

    if (previousFocus && previousFocus.isConnected) {
      previousFocus.focus();
    }
  }

  document.querySelectorAll(".tutorial-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      openTutorial(button.dataset.tutorial);
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", closeTutorial);
  }

  if (modalDone) {
    modalDone.addEventListener("click", closeTutorial);
  }

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeTutorial();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (!modal || modal.hidden) return;

    if (event.key === "Escape") {
      closeTutorial();
    }

    if (event.key === "Tab") {
      const focusable = Array.from(
        modal.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled])'
        )
      ).filter(function (element) {
        return element.getClientRects().length > 0;
      });

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  console.log("RELIVE Repair Page Loaded Successfully!");

});
