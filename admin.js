
document.addEventListener("DOMContentLoaded", function () {

  const DONATIONS_KEY = "reliveDonations";
  const MESSAGES_KEY = "reliveMessages";

  const sections = {
    overview: document.getElementById("overviewSection"),
    donations: document.getElementById("donationsSection"),
    messages: document.getElementById("messagesSection")
  };

  const titles = {
    overview: "Dashboard Overview",
    donations: "Manage Donations",
    messages: "Contact Messages"
  };

  const pageTitle = document.getElementById("pageTitle");
  const navButtons = document.querySelectorAll(".nav-btn");

  const donationsBody =
    document.getElementById("donationsTableBody");

  const donationSearch =
    document.getElementById("donationSearch");

  const donationStatusFilter =
    document.getElementById("donationStatusFilter");

  const messagesList =
    document.getElementById("messagesList");

  const messageSearch =
    document.getElementById("messageSearch");

  const messageStatusFilter =
    document.getElementById("messageStatusFilter");

  const modal = document.getElementById("messageModal");
  const modalSubject = document.getElementById("modalSubject");
  const modalDetails =
    document.getElementById("modalMessageDetails");

  const closeModalBtn =
    document.getElementById("closeMessageModal");

  let previousFocus = null;

  function readArray(key) {
    try {
      const data = JSON.parse(
        localStorage.getItem(key) || "[]"
      );

      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Storage error:", error);
      return [];
    }
  }

  function saveArray(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Save error:", error);
      alert("Unable to save changes.");
      return false;
    }
  }

  function getDonations() {
    return readArray(DONATIONS_KEY);
  }

  function getMessages() {
    return readArray(MESSAGES_KEY);
  }

  function getDonationStatus(donation) {
    const status = donation.status || "Pending";

    return ["Pending", "Approved", "Rejected"].includes(status)
      ? status
      : "Pending";
  }

  function getMessageStatus(message) {
    return message.status === "Read" ? "Read" : "New";
  }

  function showSection(name) {
    Object.entries(sections).forEach(([key, section]) => {
      section.hidden = key !== name;
    });

    navButtons.forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.section === name
      );
    });

    pageTitle.textContent = titles[name];

    renderAll();
  }

  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      showSection(button.dataset.section);
    });
  });

  document.getElementById("openDonationsBtn")
    .addEventListener("click", () => showSection("donations"));

  document.getElementById("openMessagesBtn")
    .addEventListener("click", () => showSection("messages"));

  function updateOverview() {
    const donations = getDonations();
    const messages = getMessages();

    document.getElementById("totalDonations").textContent =
      donations.length;

    document.getElementById("pendingDonations").textContent =
      donations.filter(d =>
        getDonationStatus(d) === "Pending"
      ).length;

    document.getElementById("approvedDonations").textContent =
      donations.filter(d =>
        getDonationStatus(d) === "Approved"
      ).length;

    document.getElementById("totalClothes").textContent =
      donations.reduce((total, donation) => {
        const quantity = Number(donation.quantity);

        return total + (
          Number.isFinite(quantity) && quantity > 0
            ? quantity
            : 0
        );
      }, 0);

    const unread = messages.filter(m =>
      getMessageStatus(m) === "New"
    ).length;

    document.getElementById("totalMessages").textContent =
      messages.length;

    document.getElementById("unreadMessages").textContent =
      unread;

    document.getElementById("sidebarUnread").textContent =
      unread;

    document.getElementById("messagesTotalCount").textContent =
      messages.length;

    document.getElementById("messagesNewCount").textContent =
      unread;

    document.getElementById("messagesReadCount").textContent =
      messages.length - unread;
  }

  function createButton(text, className, onClick) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "small-btn " + className;
    button.textContent = text;
    button.addEventListener("click", onClick);

    return button;
  }

  function createCell(text) {
    const td = document.createElement("td");
    td.textContent = String(text ?? "N/A");
    return td;
  }

  function createStatusBadge(status) {
    const badge = document.createElement("span");

    badge.className =
      "status-badge status-" + status.toLowerCase();

    badge.textContent = status;

    return badge;
  }

  function renderDonations() {
    const donations = getDonations();

    const search = donationSearch.value.trim().toLowerCase();
    const filter = donationStatusFilter.value;

    const filtered = donations.filter(donation => {
      const text = [
        donation.id,
        donation.donorName,
        donation.email,
        donation.phone,
        donation.clothingType
      ].join(" ").toLowerCase();

      return text.includes(search) &&
        (filter === "All" ||
         getDonationStatus(donation) === filter);
    });

    donationsBody.replaceChildren();

    filtered.slice().reverse().forEach(donation => {
      const row = document.createElement("tr");

      row.appendChild(createCell(donation.id));

      const donorCell = document.createElement("td");

      const donorName = document.createElement("strong");
      donorName.textContent = donation.donorName || "N/A";

      const donorEmail = document.createElement("small");
      donorEmail.textContent = donation.email || "";

      donorCell.append(donorName, donorEmail);
      row.appendChild(donorCell);

      row.appendChild(createCell(donation.clothingType));
      row.appendChild(createCell(donation.quantity));
      row.appendChild(createCell(donation.date));

      const statusCell = document.createElement("td");
      const status = getDonationStatus(donation);

      statusCell.appendChild(createStatusBadge(status));
      row.appendChild(statusCell);

      const actionsCell = document.createElement("td");
      const actions = document.createElement("div");
      actions.className = "action-buttons";

      if (status !== "Approved") {
        actions.appendChild(
          createButton("Approve", "approve-btn", () => {
            changeDonationStatus(donation.id, "Approved");
          })
        );
      }

      if (status !== "Rejected") {
        actions.appendChild(
          createButton("Reject", "reject-btn", () => {
            changeDonationStatus(donation.id, "Rejected");
          })
        );
      }

      actions.appendChild(
        createButton("Delete", "delete-btn", () => {
          deleteDonation(donation.id);
        })
      );

      actionsCell.appendChild(actions);
      row.appendChild(actionsCell);

      donationsBody.appendChild(row);
    });

    document.getElementById("donationsEmpty").hidden =
      filtered.length > 0;
  }

  function changeDonationStatus(id, status) {
    const donations = getDonations();

    const donation = donations.find(item =>
      String(item.id) === String(id)
    );

    if (!donation) {
      alert("Donation not found.");
      return;
    }

    donation.status = status;

    if (saveArray(DONATIONS_KEY, donations)) {
      renderAll();
    }
  }

  function deleteDonation(id) {
    if (!confirm("Delete this donation permanently?")) {
      return;
    }

    const donations = getDonations();

    const updated = donations.filter(item =>
      String(item.id) !== String(id)
    );

    if (saveArray(DONATIONS_KEY, updated)) {
      renderAll();
    }
  }

  function renderMessages() {
    const messages = getMessages();

    const search = messageSearch.value.trim().toLowerCase();
    const filter = messageStatusFilter.value;

    const filtered = messages.filter(message => {
      const text = [
        message.id,
        message.name,
        message.email,
        message.subject,
        message.message
      ].join(" ").toLowerCase();

      return text.includes(search) &&
        (filter === "All" ||
         getMessageStatus(message) === filter);
    });

    messagesList.replaceChildren();

    filtered.slice().reverse().forEach(message => {
      const card = document.createElement("article");
      const status = getMessageStatus(message);

      card.className =
        "message-card" + (status === "New" ? " unread" : "");

      const top = document.createElement("div");
      top.className = "message-top";

      const sender = document.createElement("div");

      const name = document.createElement("h3");
      name.textContent = message.name || "Unknown Sender";

      const email = document.createElement("p");
      email.textContent = message.email || "";

      const date = document.createElement("p");
      date.textContent = message.date || "";

      sender.append(name, email, date);

      top.append(sender, createStatusBadge(status));

      const subject = document.createElement("p");
      subject.className = "message-subject";
      subject.textContent = message.subject || "No Subject";

      const preview = document.createElement("p");
      preview.className = "message-preview";

      const fullText = String(message.message || "");
      preview.textContent =
        fullText.length > 180
          ? fullText.slice(0, 180) + "..."
          : fullText;

      const actions = document.createElement("div");
      actions.className = "message-actions";

      actions.appendChild(
        createButton("View Message", "view-btn", () => {
          openMessage(message.id);
        })
      );

      if (status === "New") {
        actions.appendChild(
          createButton("Mark as Read", "read-btn", () => {
            markMessageRead(message.id);
          })
        );
      }

      actions.appendChild(
        createButton("Delete", "delete-btn", () => {
          deleteMessage(message.id);
        })
      );

      card.append(top, subject, preview, actions);
      messagesList.appendChild(card);
    });

    document.getElementById("messagesEmpty").hidden =
      filtered.length > 0;
  }

  function markMessageRead(id) {
    const messages = getMessages();

    const message = messages.find(item =>
      String(item.id) === String(id)
    );

    if (!message) {
      alert("Message not found.");
      return;
    }

    message.status = "Read";

    if (saveArray(MESSAGES_KEY, messages)) {
      renderAll();
    }
  }

  function deleteMessage(id) {
    if (!confirm("Delete this contact message permanently?")) {
      return;
    }

    const messages = getMessages();

    const updated = messages.filter(item =>
      String(item.id) !== String(id)
    );

    if (saveArray(MESSAGES_KEY, updated)) {
      renderAll();
    }
  }

  function addModalDetail(label, value) {
    const row = document.createElement("div");
    row.className = "modal-detail";

    const strong = document.createElement("strong");
    strong.textContent = label;

    const span = document.createElement("span");
    span.textContent = String(value ?? "N/A");

    row.append(strong, span);
    modalDetails.appendChild(row);
  }

  function openMessage(id) {
    const messages = getMessages();

    const message = messages.find(item =>
      String(item.id) === String(id)
    );

    if (!message) {
      alert("Message not found.");
      return;
    }

    previousFocus = document.activeElement;

    modalSubject.textContent =
      message.subject || "Message Details";

    modalDetails.replaceChildren();

    addModalDetail("Message ID", message.id);
    addModalDetail("Sender Name", message.name);
    addModalDetail("Email Address", message.email);
    addModalDetail("Subject", message.subject);
    addModalDetail("Date", message.date);
    addModalDetail("Message", message.message);
    addModalDetail("Status", getMessageStatus(message));

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    closeModalBtn.focus();
  }

  function closeMessageModal() {
    modal.hidden = true;
    document.body.style.overflow = "";

    if (previousFocus && previousFocus.isConnected) {
      previousFocus.focus();
    }
  }

  closeModalBtn.addEventListener("click", closeMessageModal);

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeMessageModal();
    }
  });

  document.addEventListener("keydown", event => {
    if (modal.hidden) return;

    if (event.key === "Escape") {
      closeMessageModal();
    }

    if (event.key === "Tab") {
      event.preventDefault();
      closeModalBtn.focus();
    }
  });

  donationSearch.addEventListener("input", renderDonations);
  donationStatusFilter.addEventListener(
    "change",
    renderDonations
  );

  messageSearch.addEventListener("input", renderMessages);
  messageStatusFilter.addEventListener(
    "change",
    renderMessages
  );

  document.getElementById("refreshDonationsBtn")
    .addEventListener("click", renderAll);

  document.getElementById("refreshMessagesBtn")
    .addEventListener("click", renderAll);

  window.addEventListener("storage", event => {
    if (
      event.key === DONATIONS_KEY ||
      event.key === MESSAGES_KEY
    ) {
      renderAll();
    }
  });

  function renderAll() {
    updateOverview();
    renderDonations();
    renderMessages();
  }

  showSection("overview");

});
