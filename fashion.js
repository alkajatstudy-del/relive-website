
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

});
