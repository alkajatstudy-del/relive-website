
document.addEventListener("DOMContentLoaded", function () {

  const page = document.body.dataset.page;

  const guides = {
    reuse: [
      {
        title: "Old T-Shirt Tote Bag",
        category: "accessories",
        icon: "👜",
        description: "Turn an unused T-shirt into a reusable shopping bag.",
        materials: ["Old T-shirt", "Scissors", "Ruler"],
        steps: [
          "Lay the T-shirt flat on a clean surface.",
          "Cut off the sleeves along their seams.",
          "Cut a wider opening around the neckline.",
          "Cut matching strips along the bottom edge.",
          "Tie front and back strips together with tight double knots.",
          "Check the bottom for gaps before using the bag."
        ]
      },
      {
        title: "Denim Shorts",
        category: "clothing",
        icon: "👖",
        description: "Convert old jeans into comfortable summer shorts.",
        materials: ["Old jeans", "Scissors", "Measuring tape", "Chalk"],
        steps: [
          "Try on the jeans and mark your desired shorts length.",
          "Leave extra fabric for folding or hemming.",
          "Lay the jeans flat and cut both legs evenly.",
          "Fold the edges inward for a neat finish.",
          "Sew the hems if you want them to stay folded."
        ]
      },
      {
        title: "Fabric Cushion Cover",
        category: "home",
        icon: "🛋️",
        description: "Make a decorative cushion cover from old fabric.",
        materials: ["Clean old shirt or fabric", "Scissors", "Needle", "Thread"],
        steps: [
          "Measure your cushion.",
          "Cut fabric panels slightly larger than the cushion.",
          "Place the fabric pieces with the good sides facing inward.",
          "Sew three sides and most of the fourth side.",
          "Turn the cover right-side out.",
          "Insert the cushion and close the opening."
        ]
      },
      {
        title: "Fabric Hair Scrunchie",
        category: "accessories",
        icon: "🎀",
        description: "Make a stylish hair accessory using leftover fabric.",
        materials: ["Fabric strip", "Elastic", "Needle", "Thread", "Safety pin"],
        steps: [
          "Cut a long rectangular strip of fabric.",
          "Fold it lengthwise and sew along the long edge.",
          "Turn the fabric tube right-side out.",
          "Use a safety pin to pull elastic through.",
          "Tie or sew the elastic ends securely.",
          "Sew the fabric ends together."
        ]
      },
      {
        title: "Patchwork Clothing",
        category: "clothing",
        icon: "🧥",
        description: "Refresh plain clothing with colourful fabric patches.",
        materials: ["Old clothing", "Fabric scraps", "Needle", "Thread"],
        steps: [
          "Choose a clean garment to decorate.",
          "Cut fabric scraps into your preferred shapes.",
          "Arrange the patches before sewing.",
          "Pin them in place.",
          "Sew carefully around the patch edges.",
          "Check that all threads are secure."
        ]
      },
      {
        title: "Reusable Cleaning Cloths",
        category: "home",
        icon: "🧽",
        description: "Repurpose worn cotton clothing into cleaning rags.",
        materials: ["Old cotton clothes", "Scissors"],
        steps: [
          "Choose clean, absorbent cotton fabric.",
          "Remove buttons and hard decorations.",
          "Cut the fabric into manageable squares.",
          "Keep separate cloths for different cleaning tasks.",
          "Wash and reuse them as needed."
        ]
      }
    ],

    repair: [
      {
        title: "Sew a Missing Button",
        category: "sewing",
        icon: "🧵",
        description: "Reattach a loose or missing shirt button.",
        materials: ["Button", "Needle", "Thread", "Scissors"],
        steps: [
          "Thread the needle and tie a knot.",
          "Place the button in its original position.",
          "Pass the needle through the fabric and button holes several times.",
          "Leave enough space for the fabric to sit comfortably.",
          "Secure the thread on the inside with a knot."
        ]
      },
      {
        title: "Fix a Small Tear",
        category: "sewing",
        icon: "🪡",
        description: "Mend small holes before they become bigger.",
        materials: ["Needle", "Matching thread", "Scissors"],
        steps: [
          "Turn the garment inside out.",
          "Align the torn edges carefully.",
          "Use small stitches to join the edges.",
          "Avoid pulling the thread too tightly.",
          "Tie a secure knot and trim excess thread."
        ]
      },
      {
        title: "Repair a Loose Hem",
        category: "alterations",
        icon: "👗",
        description: "Fix the bottom edge of trousers, skirts or dresses.",
        materials: ["Needle", "Thread", "Pins", "Iron"],
        steps: [
          "Fold the hem to its original position.",
          "Press the fold carefully according to the care label.",
          "Secure it with pins.",
          "Sew small stitches along the folded edge.",
          "Remove the pins and inspect the result."
        ]
      },
      {
        title: "Remove a Fresh Stain",
        category: "stains",
        icon: "💧",
        description: "Treat common stains without damaging fabric.",
        materials: ["Clean cloth", "Water", "Mild detergent"],
        steps: [
          "Check the garment care label first.",
          "Blot the stain gently without rubbing.",
          "Test a small amount of mild detergent on a hidden area.",
          "Treat the stain according to the fabric's care instructions.",
          "Rinse if the care label permits.",
          "Check the stain before machine drying."
        ]
      },
      {
        title: "Fix a Loose Seam",
        category: "sewing",
        icon: "🧥",
        description: "Restitch an opened seam to strengthen your clothing.",
        materials: ["Needle", "Matching thread", "Scissors"],
        steps: [
          "Turn the garment inside out.",
          "Align the seam edges.",
          "Begin sewing slightly before the damaged area.",
          "Use small, even stitches along the original seam.",
          "Finish beyond the opening and secure the thread."
        ]
      },
      {
        title: "Shorten Long Trousers",
        category: "alterations",
        icon: "👖",
        description: "Adjust trouser length with a simple new hem.",
        materials: ["Measuring tape", "Chalk", "Pins", "Needle", "Thread"],
        steps: [
          "Try on the trousers with your usual shoes.",
          "Mark the desired finished length.",
          "Leave enough extra fabric for the hem.",
          "Fold both trouser legs evenly and pin.",
          "Sew the hems securely.",
          "Try the trousers again to check the fit."
        ]
      }
    ],

    recycle: [
      {
        title: "Sort Clothes by Condition",
        category: "sorting",
        icon: "👕",
        description: "Separate wearable garments from damaged textiles.",
        materials: ["Unwanted clothes", "Three labelled bags"],
        steps: [
          "Collect clothes you no longer use.",
          "Put clean, wearable garments aside for reuse or donation.",
          "Separate items that could be repaired.",
          "Place unusable textiles in a recycling category.",
          "Check your local textile collector's acceptance rules."
        ]
      },
      {
        title: "Prepare Clothes for Recycling",
        category: "sorting",
        icon: "🧺",
        description: "Get unwanted textiles ready for responsible collection.",
        materials: ["Textiles", "Reusable collection bag"],
        steps: [
          "Check whether your local recycler accepts the materials.",
          "Make sure textiles are clean and dry if required.",
          "Separate heavily contaminated items.",
          "Sort shoes and accessories separately if instructed.",
          "Pack and label the items according to collector requirements."
        ]
      },
      {
        title: "Understand Fabric Types",
        category: "materials",
        icon: "🧶",
        description: "Learn why cotton, polyester and blends are handled differently.",
        materials: ["Clothing care labels", "Paper", "Pen"],
        steps: [
          "Read the fabric composition label.",
          "Identify natural fibres such as cotton or wool.",
          "Identify synthetic fibres such as polyester.",
          "Note any blended materials.",
          "Check which material types your recycler accepts.",
          "Sort according to those instructions."
        ]
      },
      {
        title: "Recycle Worn-Out Denim",
        category: "materials",
        icon: "👖",
        description: "Explore responsible options for damaged jeans.",
        materials: ["Old jeans", "Collection bag"],
        steps: [
          "Check whether the jeans can be repaired or reused.",
          "Look for a textile recycling programme that accepts denim.",
          "Follow the programme's rules for cleaning and accessories.",
          "Keep the jeans dry until collection.",
          "Drop them off at an accepted collection point."
        ]
      },
      {
        title: "Handle Unwearable Textiles",
        category: "disposal",
        icon: "♻️",
        description: "Choose a responsible option for damaged clothing.",
        materials: ["Damaged garments", "Local recycling information"],
        steps: [
          "Check whether the item can be repaired or repurposed.",
          "Find a textile collector that accepts unwearable fabric.",
          "Confirm any restrictions on wet or contaminated textiles.",
          "Prepare items according to the collector's rules.",
          "Avoid putting textiles in ordinary recycling bins unless accepted."
        ]
      },
      {
        title: "Build a Clothing Collection Box",
        category: "disposal",
        icon: "📦",
        description: "Organise unwanted clothing before a recycling drive.",
        materials: ["Large box", "Labels", "Collection bags"],
        steps: [
          "Choose a clean, dry collection area.",
          "Label the box for textiles only.",
          "Display clear accepted-item instructions.",
          "Separate wearable clothes from recycling-only items.",
          "Arrange delivery to a verified textile collector."
        ]
      }
    ]
  };

  const items = guides[page];

  if (!items) return;

  const grid = document.getElementById("ideasGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const emptyState = document.getElementById("emptyState");

  const modal = document.getElementById("guideModal");
  const closeModalBtn = document.getElementById("closeModal");

  let previousFocus = null;

  function renderCards() {
    const query = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;

    const filtered = items.filter(item => {
      const matchesSearch = (
        item.title + " " + item.description
      ).toLowerCase().includes(query);

      const matchesCategory =
        category === "all" || item.category === category;

      return matchesSearch && matchesCategory;
    });

    grid.replaceChildren();

    filtered.forEach(item => {
      const card = document.createElement("article");
      card.className = "idea-card";

      const visual = document.createElement("div");
      visual.className = "card-visual";
      visual.textContent = item.icon;

      const body = document.createElement("div");
      body.className = "card-body";

      const categoryText = document.createElement("span");
      categoryText.className = "card-category";
      categoryText.textContent = item.category;

      const heading = document.createElement("h3");
      heading.textContent = item.title;

      const description = document.createElement("p");
      description.textContent = item.description;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "guide-btn";
      button.textContent = "View Guide";
      button.addEventListener("click", () => openGuide(item));

      body.append(categoryText, heading, description, button);
      card.append(visual, body);
      grid.appendChild(card);
    });

    emptyState.hidden = filtered.length !== 0;
  }

  function fillList(elementId, values) {
    const list = document.getElementById(elementId);
    list.replaceChildren();

    values.forEach(value => {
      const li = document.createElement("li");
      li.textContent = value;
      list.appendChild(li);
    });
  }

  function openGuide(item) {
    previousFocus = document.activeElement;

    document.getElementById("modalTitle").textContent = item.title;
    document.getElementById("modalDescription").textContent =
      item.description;

    fillList("modalMaterials", item.materials);
    fillList("modalSteps", item.steps);

    modal.hidden = false;
    document.body.classList.add("modal-open");
    closeModalBtn.focus();
  }

  function closeGuide() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");

    if (previousFocus && previousFocus.isConnected) {
      previousFocus.focus();
    }
  }

  searchInput.addEventListener("input", renderCards);
  categoryFilter.addEventListener("change", renderCards);
  closeModalBtn.addEventListener("click", closeGuide);

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeGuide();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (modal.hidden) return;

    if (event.key === "Escape") {
      closeGuide();
    }

    if (event.key === "Tab") {
      const focusable = modal.querySelectorAll(
        "button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );

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

  
  renderCards();

  // Eco Impact Tracker
  const recycledCount = document.getElementById("recycledCount");
  const trackImpactBtn = document.getElementById("trackImpactBtn");
  const impactTotal = document.getElementById("impactTotal");
  const impactMessage = document.getElementById("impactMessage");
  const impactProgressBar = document.getElementById("impactProgressBar");

  if (
    recycledCount &&
    trackImpactBtn &&
    impactTotal &&
    impactMessage &&
    impactProgressBar
  ) {
    trackImpactBtn.addEventListener("click", function () {
      const count = Number(recycledCount.value);

      if (
        recycledCount.value.trim() === "" ||
        !Number.isInteger(count) ||
        count < 0 ||
        count > 10000
      ) {
        impactMessage.textContent =
          "Please enter a whole number between 0 and 10,000.";
        return;
      }

      impactTotal.textContent = count.toLocaleString("en-IN");

      // Progress is measured against a 100-item goal.
      const progress = Math.min(count, 100);
      impactProgressBar.style.width = progress + "%";

      if (count === 0) {
        impactMessage.textContent =
          "Start with one item. Every responsible choice counts!";
      } else if (count < 100) {
        impactMessage.textContent =
          "Great start! You have tracked " + count +
          " item(s) toward your 100-item goal.";
      } else {
        impactMessage.textContent =
          "Amazing! You have reached your 100-item tracking goal!";
      }
    });
  }

  
  // Material Finder
  const fabricType = document.getElementById("fabricType");
  const findMaterialBtn = document.getElementById("findMaterialBtn");
  const materialResult = document.getElementById("materialResult");
  const materialTitle = document.getElementById("materialTitle");
  const materialDescription = document.getElementById("materialDescription");
  const materialTips = document.getElementById("materialTips");

  const materialGuides = {
    cotton: {
      title: "Cotton",
      description: "Cotton may be suitable for reuse, repurposing, or textile recycling, depending on its condition and local facilities.",
      tips: [
        "Donate or reuse cotton clothing that is still wearable.",
        "Repurpose worn cotton into cleaning cloths.",
        "Ask a textile recycler whether it accepts cotton fabric."
      ]
    },
    denim: {
      title: "Denim and Jeans",
      description: "Worn denim can sometimes be collected by textile recycling programmes or transformed into useful products.",
      tips: [
        "Repair or repurpose jeans when practical.",
        "Keep unwanted denim clean and dry if required by the collector.",
        "Confirm that the programme accepts denim before drop-off."
      ]
    },
    polyester: {
      title: "Polyester",
      description: "Polyester is a synthetic fibre, and not every recycling facility can process polyester clothing.",
      tips: [
        "Check the garment label for fibre composition.",
        "Look for a programme that explicitly accepts polyester textiles.",
        "Follow the collection programme's preparation instructions."
      ]
    },
    wool: {
      title: "Wool",
      description: "Wool garments may be reused, repaired, or accepted by specialised textile recyclers.",
      tips: [
        "Consider repairing or donating wearable wool clothing.",
        "Check care instructions before cleaning the garment.",
        "Confirm whether a local collector accepts wool textiles."
      ]
    },
    blend: {
      title: "Mixed or Blended Fabric",
      description: "Blended fabrics can be harder to recycle because they contain more than one fibre type.",
      tips: [
        "Read the care label to identify the fibre blend.",
        "Ask the recycler whether it accepts mixed-fibre clothing.",
        "Choose reuse or repair if suitable recycling is unavailable."
      ]
    }
  };

  if (
    fabricType &&
    findMaterialBtn &&
    materialResult &&
    materialTitle &&
    materialDescription &&
    materialTips
  ) {
    findMaterialBtn.addEventListener("click", function () {
      const selected = materialGuides[fabricType.value];

      if (!selected) {
        materialResult.hidden = false;
        materialTitle.textContent = "Choose a fabric first";
        materialDescription.textContent =
          "Select a material from the dropdown to see its recycling tips.";
        materialTips.replaceChildren();
        return;
      }

      materialTitle.textContent = selected.title;
      materialDescription.textContent = selected.description;
      materialTips.replaceChildren();

      selected.tips.forEach(function (tip) {
        const li = document.createElement("li");
        li.textContent = tip;
        materialTips.appendChild(li);
      });

      materialResult.hidden = false;
    });
  }


  
  // =====================================
  // RE:CREATE STUDIO — PROJECT INTERACTIONS
  // =====================================

  const studioGrid = document.getElementById("studioGrid");
  const studioEmpty = document.getElementById("studioEmpty");
  const studioFilters = document.querySelectorAll("[data-studio-filter]");

  const studioModal = document.getElementById("studioModal");
  const studioCloseModal = document.getElementById("studioCloseModal");
  const studioCompleteBtn = document.getElementById("studioCompleteBtn");

  const studioModalIcon = document.getElementById("studioModalIcon");
  const studioModalCategory = document.getElementById("studioModalCategory");
  const studioModalTitle = document.getElementById("studioModalTitle");
  const studioModalDescription = document.getElementById("studioModalDescription");
  const studioModalMaterials = document.getElementById("studioModalMaterials");
  const studioModalSteps = document.getElementById("studioModalSteps");
  const studioModalStatus = document.getElementById("studioModalStatus");

  const studioCompletedCount = document.getElementById("studioCompletedCount");
  const studioTotalCount = document.getElementById("studioTotalCount");

  const studioProjects = [
    {
      id: "denim-tote",
      title: "Denim Reborn",
      category: "accessories",
      icon: "👜",
      description: "Transform old jeans into a useful everyday tote bag.",
      materials: [
        "An old pair of clean jeans",
        "Fabric scissors",
        "Needle and strong thread, or a sewing machine",
        "Measuring tape and chalk"
      ],
      steps: [
        "Inspect the jeans and choose a sturdy section for the bag.",
        "Cut two matching fabric panels for the bag body.",
        "Place the panels together with the outer sides facing inward.",
        "Sew the sides and bottom securely, reinforcing the corners.",
        "Make two sturdy straps from leftover denim or another strong fabric.",
        "Attach the straps securely and check every seam before use."
      ]
    },
    {
      id: "tee-to-tote",
      title: "Tee to Tote",
      category: "accessories",
      icon: "👕",
      description: "Give an old T-shirt a second life as a reusable bag.",
      materials: [
        "A clean old T-shirt",
        "Fabric scissors",
        "Chalk or a washable fabric marker"
      ],
      steps: [
        "Lay the T-shirt flat on a clean surface.",
        "Cut off both sleeves.",
        "Cut a wider opening around the neckline for the bag handles.",
        "Cut even strips along the bottom edge.",
        "Tie matching front and back strips into secure double knots.",
        "Check the bottom for gaps and test with lightweight items first."
      ]
    },
    {
      id: "patchwork-magic",
      title: "Patchwork Magic",
      category: "clothing",
      icon: "🧵",
      description: "Refresh a plain garment with colourful fabric scraps.",
      materials: [
        "A clean garment",
        "Fabric scraps",
        "Needle and thread",
        "Fabric scissors and pins"
      ],
      steps: [
        "Choose a garment that is suitable for decoration.",
        "Cut fabric scraps into shapes or patches.",
        "Arrange the patches on the garment before attaching them.",
        "Pin each patch in place.",
        "Sew around the patch edges with small, even stitches.",
        "Check that the patches are secure before wearing the garment."
      ]
    },
    {
      id: "scrap-cushion",
      title: "Scrap to Cushion",
      category: "home",
      icon: "🛋️",
      description: "Combine leftover fabric pieces into a decorative cushion cover.",
      materials: [
        "Clean fabric scraps",
        "Cushion insert",
        "Needle and thread or a sewing machine",
        "Scissors and measuring tape"
      ],
      steps: [
        "Measure the cushion insert.",
        "Arrange fabric scraps into two panels of suitable size.",
        "Sew the scraps together to make each panel.",
        "Place the panels with their outer sides facing inward.",
        "Sew around the edges, leaving an opening for the insert.",
        "Turn the cover right-side out, insert the cushion and close the opening."
      ]
    },
    {
      id: "fabric-scrunchie",
      title: "Scrap Fabric Scrunchie",
      category: "accessories",
      icon: "🎀",
      description: "Turn a small leftover fabric piece into a reusable hair accessory.",
      materials: [
        "A long fabric strip",
        "Elastic",
        "Needle and thread",
        "Safety pin and scissors"
      ],
      steps: [
        "Cut a long rectangular strip of fabric.",
        "Fold it lengthwise with the outer sides facing inward.",
        "Sew along the long edge to create a tube.",
        "Turn the tube right-side out.",
        "Use a safety pin to guide the elastic through the tube.",
        "Secure the elastic ends and sew the fabric ends together."
      ]
    },
    {
      id: "denim-patch",
      title: "Denim Repair Patch",
      category: "clothing",
      icon: "👖",
      description: "Use sturdy denim scraps to reinforce worn clothing.",
      materials: [
        "A clean garment with a small worn area",
        "A denim scrap",
        "Needle and strong thread",
        "Scissors and pins"
      ],
      steps: [
        "Check that the garment is suitable for patching.",
        "Cut a patch large enough to cover the worn area.",
        "Position the patch over or behind the damaged section.",
        "Pin the patch so it does not shift.",
        "Sew around the patch edges securely.",
        "Inspect the repair and trim loose threads."
      ]
    }
  ];

  let activeStudioProject = null;
  let studioPreviousFocus = null;
  let activeStudioCategory = "all";

  // Save completed project IDs in this browser.
  const studioStorageKey = "reliveCompletedStudioProjects";
  let completedStudioProjects = [];

  try {
    const savedStudioProjects = localStorage.getItem(studioStorageKey);
    const parsedStudioProjects = savedStudioProjects
      ? JSON.parse(savedStudioProjects)
      : [];

    if (Array.isArray(parsedStudioProjects)) {
      completedStudioProjects = parsedStudioProjects.filter(id =>
        studioProjects.some(project => project.id === id)
      );
    }
  } catch (error) {
    completedStudioProjects = [];
  }

  function saveStudioProgress() {
    try {
      localStorage.setItem(
        studioStorageKey,
        JSON.stringify(completedStudioProjects)
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  function updateStudioProgress() {
    studioCompletedCount.textContent = completedStudioProjects.length;
    studioTotalCount.textContent = studioProjects.length;
  }

  function renderStudioProjects() {
    studioGrid.replaceChildren();

    const filteredProjects = studioProjects.filter(project =>
      activeStudioCategory === "all" ||
      project.category === activeStudioCategory
    );

    filteredProjects.forEach(project => {
      const isCompleted = completedStudioProjects.includes(project.id);

      const card = document.createElement("article");
      card.className = "studio-card";

      const visual = document.createElement("div");
      visual.className = "studio-card-visual";
      visual.textContent = project.icon;
      visual.setAttribute("aria-hidden", "true");

      const body = document.createElement("div");
      body.className = "studio-card-body";

      const tag = document.createElement("span");
      tag.className = "studio-tag";
      tag.textContent = project.category;

      const heading = document.createElement("h3");
      heading.textContent = project.title;

      const description = document.createElement("p");
      description.textContent = project.description;

      body.append(tag, heading, description);

      if (isCompleted) {
        const status = document.createElement("p");
        status.className = "studio-card-status";
        status.textContent = "✓ Project completed";
        body.appendChild(status);
      }

      const button = document.createElement("button");
      button.type = "button";
      button.className = "studio-view-btn";
      button.textContent = "View Project →";
      button.addEventListener("click", () => openStudioProject(project));

      body.appendChild(button);
      card.append(visual, body);
      studioGrid.appendChild(card);
    });

    studioEmpty.hidden = filteredProjects.length > 0;
    updateStudioProgress();
  }

  function fillStudioList(element, values) {
    element.replaceChildren();

    values.forEach(value => {
      const li = document.createElement("li");
      li.textContent = value;
      element.appendChild(li);
    });
  }

  function openStudioProject(project) {
    activeStudioProject = project;
    studioPreviousFocus = document.activeElement;

    studioModalIcon.textContent = project.icon;
    studioModalCategory.textContent = project.category;
    studioModalTitle.textContent = project.title;
    studioModalDescription.textContent = project.description;

    fillStudioList(studioModalMaterials, project.materials);
    fillStudioList(studioModalSteps, project.steps);

    studioModalStatus.textContent = "";
    updateStudioCompleteButton();

    studioModal.hidden = false;
    document.body.classList.add("studio-modal-open");
    studioCloseModal.focus();
  }

  function updateStudioCompleteButton() {
    if (!activeStudioProject) return;

    const isCompleted = completedStudioProjects.includes(
      activeStudioProject.id
    );

    studioCompleteBtn.classList.toggle("is-completed", isCompleted);
    studioCompleteBtn.textContent = isCompleted
      ? "✓ Completed — Mark Incomplete"
      : "✓ Mark as Completed";
  }

  function closeStudioProject() {
    studioModal.hidden = true;
    document.body.classList.remove("studio-modal-open");
    activeStudioProject = null;

    if (studioPreviousFocus && studioPreviousFocus.isConnected) {
      studioPreviousFocus.focus();
    }
  }

  studioFilters.forEach(button => {
    button.addEventListener("click", function () {
      activeStudioCategory = button.dataset.studioFilter;

      studioFilters.forEach(filterButton => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });

      renderStudioProjects();
    });

    button.setAttribute(
      "aria-pressed",
      String(button.dataset.studioFilter === "all")
    );
  });

  studioCloseModal.addEventListener("click", closeStudioProject);

  studioModal.addEventListener("click", function (event) {
    if (event.target === studioModal) {
      closeStudioProject();
    }
  });

  studioCompleteBtn.addEventListener("click", function () {
    if (!activeStudioProject) return;

    const projectId = activeStudioProject.id;
    const isAlreadyCompleted = completedStudioProjects.includes(projectId);

    if (isAlreadyCompleted) {
      completedStudioProjects = completedStudioProjects.filter(
        id => id !== projectId
      );
    } else {
      completedStudioProjects.push(projectId);
    }

    const saved = saveStudioProgress();

    updateStudioCompleteButton();
    updateStudioProgress();
    renderStudioProjects();

    if (isAlreadyCompleted) {
      studioModalStatus.textContent = "Project marked as incomplete.";
    } else if (saved) {
      studioModalStatus.textContent =
        "Wonderful work! Your project is marked as completed.";
    } else {
      studioModalStatus.textContent =
        "Project marked as completed for this session. Browser storage is unavailable, so it may not remain saved after closing the page.";
    }
  });

  document.addEventListener("keydown", function (event) {
    if (studioModal.hidden) return;

    if (event.key === "Escape") {
      closeStudioProject();
      return;
    }

    if (event.key === "Tab") {
      const focusable = studioModal.querySelectorAll(
        "button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  renderStudioProjects();

});


