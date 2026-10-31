
document.addEventListener("DOMContentLoaded", function () {

  // Mobile Menu
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const open = navLinks.classList.toggle("open");

      menuToggle.textContent = open ? "✕" : "☰";
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute(
        "aria-label",
        open ? "Close menu" : "Open menu"
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

  // Current Year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Back to Top
  const backToTop = document.getElementById("backToTop");

  function updateBackToTop() {
    backToTop.classList.toggle("show", window.scrollY > 400);
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  updateBackToTop();

  // Reveal Animations
  const revealElements = document.querySelectorAll(".reveal");

  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }

  // Material Information
  const materials = {
    cotton: {
      title: "Cotton Recycling",
      description: "Cotton is a natural fibre. Some cotton garments can be recycled into recovered textile fibres.",
      points: [
        "Reuse or donate wearable cotton garments first.",
        "Mechanical recycling may shorten the recovered fibres.",
        "Recycled cotton is sometimes blended with other fibres.",
        "Check which cotton textiles your local recycler accepts."
      ]
    },

    denim: {
      title: "Denim Recycling",
      description: "Denim can have several second-life uses, depending on its composition and condition.",
      points: [
        "Repair or reuse wearable jeans whenever possible.",
        "Denim can be upcycled into bags, patches or accessories.",
        "Some recycling facilities shred denim into insulation or fibre.",
        "Stretch denim and blended materials may require special processing."
      ]
    },

    polyester: {
      title: "Polyester Recycling",
      description: "Polyester is a synthetic fibre. Textile-to-textile recycling is possible in some specialist systems.",
      points: [
        "Recycling availability depends on local facilities.",
        "Mixed fibres and finishes can make recycling more difficult.",
        "Not every plastic recycling bin accepts polyester clothing.",
        "Use an authorised textile collection programme."
      ]
    },

    wool: {
      title: "Wool Recycling",
      description: "Wool garments can sometimes be mechanically recycled into recovered fibres.",
      points: [
        "Donate wearable wool clothing.",
        "Repair small holes before they become larger.",
        "Suitable wool textiles can be sorted and processed into new materials.",
        "Follow collection guidelines for fibre blends."
      ]
    }
  };

  const modal = document.getElementById("materialModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalPoints = document.getElementById("modalPoints");
  const closeModalButton = document.getElementById("closeModal");
  const modalDone = document.getElementById("modalDone");

  let previousFocus = null;

  function openModal(materialId) {
    const material = materials[materialId];
    if (!material) return;

    previousFocus = document.activeElement;

    modalTitle.textContent = material.title;
    modalDescription.textContent = material.description;
    modalPoints.replaceChildren();

    material.points.forEach(function (point) {
      const li = document.createElement("li");
      li.textContent = point;
      modalPoints.appendChild(li);
    });

    modal.hidden = false;
    document.body.classList.add("modal-open");
    closeModalButton.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");

    if (previousFocus && previousFocus.isConnected) {
      previousFocus.focus();
    }
  }

  document.querySelectorAll(".learn-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      openModal(button.dataset.material);
    });
  });

  closeModalButton.addEventListener("click", closeModal);
  modalDone.addEventListener("click", closeModal);

  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", function (event) {
    if (modal.hidden) return;

    if (event.key === "Escape") {
      closeModal();
      return;
    }

    if (event.key === "Tab") {
      const buttons = Array.from(
        modal.querySelectorAll("button:not([disabled])")
      );

      const first = buttons[0];
      const last = buttons[buttons.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Clothing Sorting Guide
  const conditionSelect = document.getElementById("conditionSelect");
  const checkCondition = document.getElementById("checkCondition");
  const sortingResult = document.getElementById("sortingResult");
  const resultIcon = document.getElementById("resultIcon");
  const resultTitle = document.getElementById("resultTitle");
  const resultDescription = document.getElementById("resultDescription");
  const resultLink = document.getElementById("resultLink");

  const sortingOptions = {
    good: {
      icon: "♡",
      title: "Reuse or Donate",
      description: "Your garment is still wearable! Keep using it, pass it to someone who needs it, or donate through a suitable organisation.",
      link: "donate.html",
      linkText: "Explore Donation →"
    },

    repair: {
      icon: "✂",
      title: "Repair It First",
      description: "A small tear or missing button can often be fixed. Try a simple repair before considering disposal.",
      link: "repair.html",
      linkText: "Explore Repair Guides →"
    },

    worn: {
      icon: "♻",
      title: "Check Textile Recycling",
      description: "If the item cannot be repaired or reused, contact a textile recycling facility to confirm whether it accepts the material.",
      link: "",
      linkText: ""
    },

    wet: {
      icon: "!",
      title: "Handle Separately",
      description: "Do not place wet, mouldy or contaminated clothes into ordinary donation or textile recycling collections. Follow local waste guidance; dry safe items before assessing them.",
      link: "",
      linkText: ""
    }
  };

  checkCondition.addEventListener("click", function () {
    const selected = conditionSelect.value;

    if (!selected) {
      sortingResult.hidden = false;
      resultIcon.textContent = "!";
      resultTitle.textContent = "Select a Condition";
      resultDescription.textContent =
        "Please choose your garment's condition first.";
      resultLink.hidden = true;
      return;
    }

    const option = sortingOptions[selected];

    resultIcon.textContent = option.icon;
    resultTitle.textContent = option.title;
    resultDescription.textContent = option.description;

    if (option.link) {
      resultLink.href = option.link;
      resultLink.textContent = option.linkText;
      resultLink.hidden = false;
    } else {
      resultLink.hidden = true;
    }

    sortingResult.hidden = false;
  });

  conditionSelect.addEventListener("change", function () {
    sortingResult.hidden = true;
  });

  // Recycling Quiz
  const questions = [
    {
      question: "What should you do with clean, wearable clothes you no longer need?",
      options: [
        "Throw them in the general waste",
        "Reuse or donate them",
        "Burn them"
      ],
      answer: 1,
      explanation: "Wearable clothes can often be reused or donated."
    },

    {
      question: "What is a good first step when a shirt has a missing button?",
      options: [
        "Try to repair the button",
        "Throw the shirt away",
        "Put it in a plastic recycling bin"
      ],
      answer: 0,
      explanation: "Simple repairs can extend a garment's useful life."
    },

    {
      question: "Can all clothing be placed in ordinary plastic recycling bins?",
      options: [
        "Yes, all fabrics are plastic",
        "Only if the clothes are colourful",
        "No, textile collection rules are different"
      ],
      answer: 2,
      explanation: "Clothes require suitable textile collection or recycling systems."
    },

    {
      question: "Which factor can affect how easily textiles are recycled?",
      options: [
        "Fabric composition",
        "The owner's favourite colour",
        "The garment's brand popularity"
      ],
      answer: 0,
      explanation: "Fibre composition and blends influence recycling options."
    },

    {
      question: "What is a key goal of circular fashion?",
      options: [
        "Replace clothes as often as possible",
        "Keep clothing and materials useful for longer",
        "Throw away clothes after one use"
      ],
      answer: 1,
      explanation: "Circular fashion aims to keep products and materials in use."
    }
  ];

  const questionNumber = document.getElementById("questionNumber");
  const quizScore = document.getElementById("quizScore");
  const quizProgress = document.getElementById("quizProgress");
  const questionText = document.getElementById("questionText");
  const quizOptions = document.getElementById("quizOptions");
  const quizFeedback = document.getElementById("quizFeedback");
  const nextQuestion = document.getElementById("nextQuestion");
  const quizContent = document.getElementById("quizContent");
  const quizFinished = document.getElementById("quizFinished");
  const finalScore = document.getElementById("finalScore");
  const finalMessage = document.getElementById("finalMessage");
  const restartQuiz = document.getElementById("restartQuiz");

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    const current = questions[currentQuestion];

    answered = false;
    nextQuestion.disabled = true;
    quizFeedback.textContent = "";

    questionNumber.textContent =
      "QUESTION " + (currentQuestion + 1) + " OF " + questions.length;

    quizScore.textContent = "SCORE: " + score;

    quizProgress.style.width =
      ((currentQuestion / questions.length) * 100) + "%";

    questionText.textContent = current.question;
    quizOptions.replaceChildren();

    current.options.forEach(function (option, index) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.textContent = option;

      button.addEventListener("click", function () {
        selectAnswer(index);
      });

      quizOptions.appendChild(button);
    });

    nextQuestion.textContent =
      currentQuestion === questions.length - 1
        ? "View My Result →"
        : "Next Question →";
  }

  function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const current = questions[currentQuestion];
    const correct = selectedIndex === current.answer;

    if (correct) score++;

    const buttons = quizOptions.querySelectorAll(".quiz-option");

    buttons.forEach(function (button, index) {
      button.disabled = true;

      if (index === current.answer) {
        button.classList.add("correct");
      } else if (index === selectedIndex) {
        button.classList.add("wrong");
      }
    });

    quizFeedback.textContent =
      (correct ? "✓ Correct! " : "✕ Not quite. ") +
      current.explanation;

    quizScore.textContent = "SCORE: " + score;
    nextQuestion.disabled = false;
  }

  function finishQuiz() {
    quizContent.hidden = true;
    quizFinished.hidden = false;

    questionNumber.textContent = "QUIZ COMPLETED";
    quizProgress.style.width = "100%";

    finalScore.textContent =
      "You scored " + score + " out of " + questions.length + "!";

    if (score === questions.length) {
      finalMessage.textContent =
        "Excellent! You understand the basics of circular fashion.";
    } else if (score >= 3) {
      finalMessage.textContent =
        "Great work! Keep learning about sustainable clothing.";
    } else {
      finalMessage.textContent =
        "Good start! Explore the recycling guide and try again.";
    }
  }

  nextQuestion.addEventListener("click", function () {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      finishQuiz();
    }
  });

  restartQuiz.addEventListener("click", function () {
    currentQuestion = 0;
    score = 0;
    answered = false;

    quizFinished.hidden = true;
    quizContent.hidden = false;

    renderQuestion();
  });

  renderQuestion();

  console.log("RELIVE Recycle Page Loaded Successfully!");

});
