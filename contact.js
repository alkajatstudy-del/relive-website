
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");
  const formContent = document.getElementById("formContent");
  const successMessage = document.getElementById("successMessage");
  const reference = document.getElementById("messageReference");
  const sendAnotherBtn = document.getElementById("sendAnotherBtn");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value;
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !subject || !message) {
      alert("Please fill all required fields.");
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const messageId =
      "MSG-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random().toString(36).slice(2, 6).toUpperCase();

    const contactData = {
      id: messageId,
      name: name,
      email: email,
      subject: subject,
      message: message,
      date: new Date().toLocaleString("en-IN"),
      status: "New"
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("reliveMessages") || "[]"
      );

      if (!Array.isArray(existing)) {
        throw new Error("Invalid stored messages");
      }

      existing.push(contactData);

      localStorage.setItem(
        "reliveMessages",
        JSON.stringify(existing)
      );

    } catch (error) {
      console.error("Unable to save contact message:", error);
      alert("Unable to save your message. Please try again.");
      return;
    }

    formContent.hidden = true;
    successMessage.hidden = false;
    reference.textContent = "Reference ID: " + messageId;
    form.reset();
  });

  sendAnotherBtn.addEventListener("click", function () {
    successMessage.hidden = true;
    formContent.hidden = false;
    form.reset();
    document.getElementById("contactName").focus();
  });

});
