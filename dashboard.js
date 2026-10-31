
document.addEventListener("DOMContentLoaded", function () {

  function read(key) {
    try {
      const data = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  let session = null;

  try {
    session = JSON.parse(
      sessionStorage.getItem("reliveDemoSession") || "null"
    );
  } catch {
    session = null;
  }

  const users = read("reliveDemoUsers");
  const user = session
    ? users.find(u => u.email === session.email)
    : null;

  // Redirect visitors who aren't logged in
  if (!user) {
    window.location.replace("login.html");
    return;
  }

  const firstName = user.name.trim().split(/\s+/)[0];

  document.getElementById("dashboardName").textContent = firstName;

  // Donations are only linked to an account when
  // the user was logged in while submitting the form.
  const donations = read("reliveDonations").filter(
    item => item.accountEmail === user.email
  );

  document.getElementById("donationCount").textContent =
    donations.length;

  const donationList = document.getElementById("donationList");

  if (!donations.length) {
    document.getElementById("noDonations").hidden = false;
  }

  donations.slice().reverse().forEach(function (donation) {
    const card = document.createElement("article");
    card.className = "step-card";

    const heading = document.createElement("h3");
    heading.textContent = donation.clothingType || "Clothing Donation";

    const date = document.createElement("p");
    date.textContent = donation.date
      ? new Date(donation.date).toLocaleDateString("en-IN")
      : "Date unavailable";

    const details = document.createElement("p");
    details.textContent =
      "Quantity: " + (donation.quantity || "N/A") +
      " | Condition: " + (donation.condition || "N/A");

    const status = document.createElement("p");
    status.textContent = donation.status || "Request Submitted";

    card.append(heading, date, details, status);
    donationList.appendChild(card);
  });

  // Reuse favourites
  const favourites = read("reliveReuseFavorites");
  const favoriteNames = {
    "tshirt-bag": "T-Shirt Tote Bag",
    "denim-pouch": "Denim Pouch",
    "scrunchie": "Fabric Scrunchie",
    "denim-shorts": "DIY Denim Shorts",
    "crop-top": "Upcycled Crop Top",
    "patchwork": "Patchwork Cushion"
  };

  document.getElementById("favoriteCount").textContent =
    favourites.length;

  const favoriteList = document.getElementById("favoriteList");

  if (!favourites.length) {
    document.getElementById("noFavorites").hidden = false;
  }

  favourites.forEach(function (id) {
    const card = document.createElement("article");
    card.className = "step-card";

    const heading = document.createElement("h3");
    heading.textContent = favoriteNames[id] || "Saved Idea";

    const link = document.createElement("a");
    link.href = "reuse.html";
    link.className = "card-link";
    link.textContent = "Explore Idea →";

    card.append(heading, link);
    favoriteList.appendChild(card);
  });

  // Repair kit progress
  const repairKit = read("reliveRepairKit");

  document.getElementById("repairCount").textContent =
    repairKit.length + " / 7";

  // Logout
  document.getElementById("dashboardLogout")
    .addEventListener("click", function () {
      sessionStorage.removeItem("reliveDemoSession");
      window.location.replace("login.html");
    });

    
/* ===== DONATION HUB INTERACTIONS ===== */

// Smart donation checklist
const prepChecks = document.querySelectorAll(".prep-check");
const progressBar = document.getElementById("checkProgressBar");
const progressText = document.getElementById("checkProgressText");

function updateChecklist() {
  const completed = document.querySelectorAll(".prep-check:checked").length;
  const total = prepChecks.length;

  if (progressBar) {
    progressBar.style.width =
      (total ? (completed / total) * 100 : 0) + "%";
  }

  if (progressText) {
    progressText.textContent =
      completed === total
        ? "All done! Your clothes are ready to donate."
        : `${completed} of ${total} completed`;
  }
}

prepChecks.forEach((checkbox) => {
  checkbox.addEventListener("change", updateChecklist);
});

updateChecklist();

// Live donation preview
const typeInput = document.getElementById("clothingType");
const quantityInput = document.getElementById("clothingQuantity");
const conditionInput = document.getElementById("clothingCondition");

function updateDonationPreview() {
  const type = document.getElementById("previewType");
  const quantity = document.getElementById("previewQuantity");
  const condition = document.getElementById("previewCondition");

  if (type && typeInput) {
    type.textContent = typeInput.value || "Not selected";
  }

  if (quantity && quantityInput) {
    const amount = Number(quantityInput.value);
    quantity.textContent =
      amount > 0 && Number.isInteger(amount) && amount <= 1000
        ? `${amount} ${amount === 1 ? "item" : "items"}`
        : "0 items";
  }

  if (condition && conditionInput) {
    condition.textContent = conditionInput.value || "Not selected";
  }
}

[typeInput, quantityInput, conditionInput].forEach((field) => {
  if (field) {
    field.addEventListener("input", updateDonationPreview);
    field.addEventListener("change", updateDonationPreview);
  }
});

updateDonationPreview();

});

