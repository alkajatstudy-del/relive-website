
// ====================================
// RE:LIVE - DONATION FORM
// ====================================

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("donationForm");
  const formContent = document.getElementById("formContent");
  const successMessage = document.getElementById("successMessage");
  const referenceElement = document.getElementById("donationReference");
  const donateAgainBtn = document.getElementById("donateAgainBtn");
  const formError = document.getElementById("formError");

  if (!form) {
    console.error("Donation form not found.");
    return;
  }

  const getValue = (id) => {
    return document.getElementById(id).value.trim();
  };

  const showError = (message) => {
    formError.textContent = message;
    formError.hidden = false;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    formError.hidden = true;
    formError.textContent = "";

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const phone = getValue("donorPhone");
    const quantity = Number(getValue("clothingQuantity"));

    if (!/^[0-9]{10}$/.test(phone)) {
      showError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 1000) {
      showError("Please enter a valid clothing quantity.");
      return;
    }

    const reference =
      "REL-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random().toString(36).slice(2, 6).toUpperCase();

    const donation = {
      id: reference,
      donationId: reference,
      name: getValue("donorName"),
      email: getValue("donorEmail"),
      phone: phone,
      clothingType: getValue("clothingType"),
      quantity: quantity,
      condition: getValue("clothingCondition"),
      address: getValue("donorAddress"),
      notes: getValue("donationNotes"),
      status: "Pending",
      date: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    try {
      const stored = JSON.parse(
        localStorage.getItem("reliveDonations") || "[]"
      );

      if (!Array.isArray(stored)) {
        throw new Error("Invalid donation storage format.");
      }

      stored.unshift(donation);

      localStorage.setItem(
        "reliveDonations",
        JSON.stringify(stored)
      );

      referenceElement.textContent = reference;
      formContent.hidden = true;
      successMessage.hidden = false;

      successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    } catch (error) {
      console.error("Donation save error:", error);

      showError(
        "Unable to save donation. Please check browser storage and try again."
      );
    }
  });

  if (donateAgainBtn) {
    donateAgainBtn.addEventListener("click", () => {
      form.reset();
      successMessage.hidden = true;
      formContent.hidden = false;
      formError.hidden = true;

      document.getElementById("donationFormSection")
        .scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
    });
  }

});
