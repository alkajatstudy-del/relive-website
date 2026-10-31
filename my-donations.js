
document.addEventListener("DOMContentLoaded", function () {

  const STORAGE_KEY = "reliveDonations";
  const SESSION_KEY = "reliveDemoSession";

  const list = document.getElementById("donationsList");
  const searchInput = document.getElementById("searchInput");
  const statusFilter = document.getElementById("statusFilter");
  const refreshBtn = document.getElementById("refreshBtn");
  const emptyState = document.getElementById("emptyState");
  const emptyText = document.getElementById("emptyText");

  const modal = document.getElementById("detailsModal");
  const closeModalBtn = document.getElementById("closeModal");
  const modalDetails = document.getElementById("modalDetails");

  let activeUser = null;
  let previousFocus = null;

  try {
    activeUser = JSON.parse(
      sessionStorage.getItem(SESSION_KEY) || "null"
    );
  } catch (error) {
    activeUser = null;
  }

  // Require demo login
  if (!activeUser || !activeUser.email) {
    window.location.replace("login.html");
    return;
  }

  function getDonations() {
    try {
      const data = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Could not read donations:", error);
      return [];
    }
  }

  function myDonations() {
    const email = String(activeUser.email).trim().toLowerCase();

    return getDonations().filter(donation =>
      String(donation.email || "").trim().toLowerCase() === email
    );
  }

  function getStatus(donation) {
    const status = donation.status || "Pending";

    return ["Pending", "Approved", "Rejected"].includes(status)
      ? status
      : "Pending";
  }

  function updateStats(donations) {
    document.getElementById("totalCount").textContent =
      donations.length;

    document.getElementById("pendingCount").textContent =
      donations.filter(d => getStatus(d) === "Pending").length;

    document.getElementById("approvedCount").textContent =
      donations.filter(d => getStatus(d) === "Approved").length;

    document.getElementById("rejectedCount").textContent =
      donations.filter(d => getStatus(d) === "Rejected").length;
  }

  function addInfo(parent, label, value) {
    const box = document.createElement("div");

    const labelElement = document.createElement("p");
    labelElement.className = "info-label";
    labelElement.textContent = label;

    const valueElement = document.createElement("p");
    valueElement.className = "info-value";
    valueElement.textContent = String(value ?? "N/A");

    box.append(labelElement, valueElement);
    parent.appendChild(box);
  }

  function addDetail(label, value) {
    const row = document.createElement("div");
    row.className = "detail-row";

    const strong = document.createElement("strong");
    strong.textContent = label;

    const span = document.createElement("span");
    span.textContent = String(value ?? "N/A");

    row.append(strong, span);
    modalDetails.appendChild(row);
  }

  function openDetails(donation) {
    previousFocus = document.activeElement;
    modalDetails.replaceChildren();

    addDetail("Donation ID", donation.id);
    addDetail("Donor Name", donation.donorName);
    addDetail("Email", donation.email);
    addDetail("Phone", donation.phone);
    addDetail("Clothing Type", donation.clothingType);
    addDetail("Quantity", donation.quantity);
    addDetail("Condition", donation.condition);
    addDetail("Donation Method", donation.method);
    addDetail("Address", donation.address);
    addDetail("Additional Notes", donation.notes || "None");
    addDetail("Submitted On", donation.date);
    addDetail("Status", getStatus(donation));

    modal.hidden = false;
    document.body.classList.add("modal-open");
    closeModalBtn.focus();
  }

  function closeDetails() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");

    if (previousFocus && previousFocus.isConnected) {
      previousFocus.focus();
    }
  }

  function renderDonations() {
    const donations = myDonations();

    updateStats(donations);

    const search = searchInput.value.trim().toLowerCase();
    const filter = statusFilter.value;

    const filtered = donations.filter(donation => {
      const text = [
        donation.id,
        donation.clothingType,
        donation.method
      ].join(" ").toLowerCase();

      const matchesSearch = text.includes(search);
      const matchesStatus =
        filter === "All" || getStatus(donation) === filter;

      return matchesSearch && matchesStatus;
    });

    list.replaceChildren();

    filtered.slice().reverse().forEach(donation => {
      const card = document.createElement("article");
      card.className = "donation-card";

      const top = document.createElement("div");
      top.className = "donation-top";

      const heading = document.createElement("div");

      const id = document.createElement("p");
      id.className = "donation-id";
      id.textContent = donation.id || "N/A";

      const date = document.createElement("p");
      date.className = "donation-date";
      date.textContent = donation.date || "N/A";

      heading.append(id, date);

      const status = getStatus(donation);
      const badge = document.createElement("span");
      badge.className = "status " + status.toLowerCase();
      badge.textContent = status;

      top.append(heading, badge);

      const info = document.createElement("div");
      info.className = "donation-info";

      addInfo(info, "Clothing Type", donation.clothingType);
      addInfo(info, "Quantity", donation.quantity);
      addInfo(info, "Donation Method", donation.method);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "details-btn";
      button.textContent = "View Details";
      button.addEventListener("click", () => openDetails(donation));

      card.append(top, info, button);
      list.appendChild(card);
    });

    emptyState.hidden = filtered.length > 0;

    emptyText.textContent = donations.length === 0
      ? "You haven't submitted any donations with this account email yet."
      : "No donations match your search or selected status.";
  }

  searchInput.addEventListener("input", renderDonations);
  statusFilter.addEventListener("change", renderDonations);
  refreshBtn.addEventListener("click", renderDonations);

  closeModalBtn.addEventListener("click", closeDetails);

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeDetails();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hidden) {
      closeDetails();
    }

    if (event.key === "Tab" && !modal.hidden) {
      // Only the close button is interactive inside this modal.
      event.preventDefault();
      closeModalBtn.focus();
    }
  });

  window.addEventListener("storage", function (event) {
    if (event.key === STORAGE_KEY) {
      renderDonations();
    }
  });

  renderDonations();

});
