
document.addEventListener("DOMContentLoaded", function () {

  const faqs = [
    {
      category: "general",
      question: "What is RELIVE?",
      answer:
        "RELIVE – Give Fashion Another Chance is a student project focused on promoting sustainable fashion. It encourages people to reuse, repair, recycle and donate clothes instead of throwing them away."
    },
    {
      category: "general",
      question: "What is the main goal of RELIVE?",
      answer:
        "Our goal is to spread awareness about textile waste and encourage responsible clothing habits by extending the useful life of garments."
    },
    {
      category: "general",
      question: "What are the 4Rs of RELIVE?",
      answer:
        "The four approaches are Reuse, Repair, Recycle and Redistribute. Redistribute means giving wearable clothing another chance through donation."
    },
    {
      category: "donation",
      question: "How can I donate clothes through RELIVE?",
      answer:
        "Open the Donate page, fill in your details, select the clothing type, quantity, condition and donation method, then submit the form. Your donation request will be saved in the project demo."
    },
    {
      category: "donation",
      question: "What type of clothes can I donate?",
      answer:
        "You can register clothing donations such as shirts, T-shirts, jeans, dresses and other wearable garments. Clothes should ideally be clean and in usable condition."
    },
    {
      category: "donation",
      question: "Can I track my donation status?",
      answer:
        "Yes. Log in using your demo account and open My Donations. Requests submitted with the same email address will show their current Pending, Approved or Rejected status."
    },
    {
      category: "donation",
      question: "Does RELIVE arrange real clothing pickup?",
      answer:
        "Not currently. This website is a college project demo. Submitting a donation request does not schedule a real pickup or transfer clothes to an organization."
    },
    {
      category: "reuse",
      question: "What is clothing reuse?",
      answer:
        "Clothing reuse means using garments again, sharing them or transforming them into useful items instead of discarding them."
    },
    {
      category: "reuse",
      question: "How can I reuse an old T-shirt?",
      answer:
        "You can turn an old T-shirt into a reusable shopping bag, cleaning cloth or other DIY item. Visit our Reuse page for step-by-step ideas."
    },
    {
      category: "reuse",
      question: "Why should I repair clothes?",
      answer:
        "Repairing clothes helps extend their lifespan and can reduce the need to buy replacements. Simple repairs include sewing buttons, fixing small tears and repairing loose seams."
    },
    {
      category: "recycling",
      question: "What is textile recycling?",
      answer:
        "Textile recycling is the process of recovering materials from unwanted textiles so they can potentially be used again, depending on their condition and the available recycling facilities."
    },
    {
      category: "recycling",
      question: "Can damaged clothes be recycled?",
      answer:
        "Some damaged textiles may be accepted by specialist textile recycling facilities. Acceptance depends on the material, contamination and the recycler's rules."
    },
    {
      category: "recycling",
      question: "Should I wash clothes before recycling or donating?",
      answer:
        "Clothes should generally be clean and dry before donation or textile collection. Always follow the receiving organization's specific instructions."
    },
    {
      category: "account",
      question: "How do I create an account?",
      answer:
        "Open the Signup page, enter your details and create a demo account. The current website uses browser-based demo authentication rather than a secure online account system."
    },
    {
      category: "account",
      question: "How do I access My Donations?",
      answer:
        "Log in to your demo account, open your Dashboard and select My Donations. Use the same email address when submitting donation requests."
    },
    {
      category: "account",
      question: "Will my data be available on another device?",
      answer:
        "Not with the current demo setup. Donations, contact messages and account information are stored locally in your browser. A secure backend and database would be needed for access across devices."
    }
  ];

  const categoryNames = {
    general: "General",
    donation: "Donations",
    reuse: "Reuse & Repair",
    recycling: "Recycling",
    account: "Account"
  };

  const faqList = document.getElementById("faqList");
  const searchInput = document.getElementById("faqSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const emptyState = document.getElementById("emptyState");
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");

  let activeCategory = "all";

  function createFaqItem(faq, index) {

    const item = document.createElement("article");
    item.className = "faq-item";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "faq-question";
    button.setAttribute("aria-expanded", "false");

    const answerId = "faq-answer-" + index;
    button.setAttribute("aria-controls", answerId);

    const questionContent = document.createElement("div");
    questionContent.className = "faq-question-text";

    const category = document.createElement("span");
    category.className = "faq-category";
    category.textContent = categoryNames[faq.category];

    const question = document.createElement("div");
    question.textContent = faq.question;

    questionContent.append(category, question);

    const icon = document.createElement("span");
    icon.className = "faq-toggle-icon";
    icon.textContent = "+";
    icon.setAttribute("aria-hidden", "true");

    button.append(questionContent, icon);

    const answer = document.createElement("div");
    answer.className = "faq-answer";
    answer.id = answerId;
    answer.hidden = true;
    answer.textContent = faq.answer;

    button.addEventListener("click", function () {

      const isOpen = item.classList.contains("open");

      item.classList.toggle("open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));

      answer.hidden = isOpen;
      icon.textContent = isOpen ? "+" : "−";

    });

    item.append(button, answer);

    return item;
  }

  function renderFaqs() {

    const keyword = searchInput.value.trim().toLowerCase();

    const filtered = faqs.filter(faq => {

      const matchesCategory =
        activeCategory === "all" ||
        faq.category === activeCategory;

      const searchableText =
        (faq.question + " " + faq.answer).toLowerCase();

      const matchesSearch = searchableText.includes(keyword);

      return matchesCategory && matchesSearch;
    });

    faqList.replaceChildren();

    filtered.forEach((faq, index) => {
      faqList.appendChild(createFaqItem(faq, index));
    });

    emptyState.hidden = filtered.length > 0;
  }

  function selectCategory(category) {

    activeCategory = category;

    filterButtons.forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.category === category
      );
    });

    renderFaqs();
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", function () {
      selectCategory(this.dataset.category);
    });
  });

  searchInput.addEventListener("input", renderFaqs);

  resetFiltersBtn.addEventListener("click", function () {
    searchInput.value = "";
    selectCategory("all");
    searchInput.focus();
  });

  // MOBILE NAVIGATION

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("show");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  renderFaqs();

});
