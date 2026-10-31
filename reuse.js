
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

  // Reveal Animation
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }

  // DIY Category Filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const ideaCards = document.querySelectorAll(".idea-card");
  const resultsCount = document.getElementById("resultsCount");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const category = button.dataset.filter;
      let visibleCount = 0;

      filterButtons.forEach(function (btn) {
        const isActive = btn === button;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
      });

      ideaCards.forEach(function (card) {
        const matches =
          category === "all" ||
          card.dataset.category === category;

        card.hidden = !matches;

        if (matches) visibleCount++;
      });

      if (resultsCount) {
        resultsCount.textContent =
          "Showing " + visibleCount + " creative ideas";
      }
    });
  });

  // Favourites - localStorage
  const storageKey = "reliveReuseFavorites";
  let favorites = [];

  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");

    if (Array.isArray(stored)) {
      favorites = stored.filter(function (id) {
        return typeof id === "string";
      });
    }
  } catch (error) {
    console.warn("Unable to load saved favourites.");
  }

  const favoriteButtons = document.querySelectorAll(".favorite-btn");

  function updateFavoriteButton(button) {
    const isSaved = favorites.includes(button.dataset.id);

    button.classList.toggle("saved", isSaved);
    button.textContent = isSaved ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(isSaved));
    button.setAttribute(
      "aria-label",
      isSaved ? "Remove from favourites" : "Save to favourites"
    );
  }

  favoriteButtons.forEach(function (button) {
    updateFavoriteButton(button);

    button.addEventListener("click", function () {
      const id = button.dataset.id;
      const previousFavorites = [...favorites];

      if (favorites.includes(id)) {
        favorites = favorites.filter(function (item) {
          return item !== id;
        });
      } else {
        favorites.push(id);
      }

      try {
        localStorage.setItem(storageKey, JSON.stringify(favorites));
        updateFavoriteButton(button);
      } catch (error) {
        favorites = previousFavorites;
        alert("Unable to save favourites in this browser.");
      }
    });
  });

  // DIY Tutorials
  const tutorials = {
    "tshirt-bag": {
      title: "T-Shirt Tote Bag",
      description: "Make a reusable bag from an old T-shirt without sewing.",
      materials: [
        "One old T-shirt",
        "Fabric scissors",
        "Ruler or measuring tape"
      ],
      steps: [
        "Lay the T-shirt flat on a clean surface.",
        "Cut off both sleeves along the seams.",
        "Cut a wider opening around the neckline for the bag opening.",
        "Cut 7-10 cm vertical strips along the bottom hem.",
        "Tie matching front and back strips into tight double knots.",
        "Turn the bag inside out and check the knots before use."
      ]
    },

    "denim-pouch": {
      title: "Denim Pocket Pouch",
      description: "Reuse denim pockets to create a compact storage pouch.",
      materials: [
        "Old denim jeans",
        "Scissors",
        "Needle and strong thread",
        "Optional button or zipper"
      ],
      steps: [
        "Cut out two denim pieces around the back pocket area.",
        "Place the pieces together with outer sides facing inward.",
        "Sew the sides and bottom, leaving the top open.",
        "Turn the pouch right side out.",
        "Add a button or zipper if desired.",
        "Use it to store coins, stationery or small accessories."
      ]
    },

    "scrunchie": {
      title: "Fabric Scrunchies",
      description: "Create colourful hair scrunchies from leftover fabric.",
      materials: [
        "Fabric strip about 45 × 10 cm",
        "Elastic about 18 cm",
        "Needle and thread or sewing machine",
        "Safety pin"
      ],
      steps: [
        "Fold the fabric strip lengthwise with right sides together.",
        "Sew along the long edge to create a tube.",
        "Turn the tube right side out.",
        "Use a safety pin to thread elastic through the tube.",
        "Tie or sew the elastic ends securely.",
        "Fold in and stitch the fabric ends together."
      ]
    },

    "denim-shorts": {
      title: "Jeans to Shorts",
      description: "Transform old jeans into comfortable summer shorts.",
      materials: [
        "Old jeans",
        "Fabric scissors",
        "Chalk or washable marker",
        "Measuring tape"
      ],
      steps: [
        "Try on the jeans and mark your preferred shorts length.",
        "Take them off and lay them flat.",
        "Mark a cutting line 3 cm below your preferred length.",
        "Cut both legs carefully along the marked lines.",
        "Fold the edges twice for a neat cuff.",
        "Secure the cuffs with a few stitches if needed."
      ]
    },

    "crop-top": {
      title: "T-Shirt to Crop Top",
      description: "Refresh an oversized T-shirt with a simple redesign.",
      materials: [
        "Old oversized T-shirt",
        "Fabric scissors",
        "Measuring tape",
        "Chalk"
      ],
      steps: [
        "Try on the T-shirt and decide the new length.",
        "Mark the desired cutting line using chalk.",
        "Take off the shirt and lay it flat.",
        "Cut evenly below the marked line.",
        "Try it on again and adjust the hem if needed.",
        "Leave a raw edge or fold and stitch for a finished look."
      ]
    },

    "patchwork": {
      title: "Patchwork Cushion",
      description: "Combine fabric scraps into a decorative cushion cover.",
      materials: [
        "Clean fabric scraps",
        "Scissors and ruler",
        "Needle and thread or sewing machine",
        "Existing cushion insert"
      ],
      steps: [
        "Measure your cushion insert.",
        "Cut fabric scraps into equal squares, allowing seam margins.",
        "Arrange the squares into a colourful pattern.",
        "Sew the squares together to create the front panel.",
        "Attach a fabric backing, leaving an opening.",
        "Turn the cover right side out and insert the cushion."
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

    // Keep keyboard focus inside the open modal
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

  console.log("RELIVE Reuse Page Loaded Successfully!");

});
