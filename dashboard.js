
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

});
