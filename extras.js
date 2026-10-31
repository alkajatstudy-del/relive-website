
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");

  if (!form || !status) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const messageText = String(data.get("message") || "").trim();

    if (name.length < 2 || messageText.length < 10) {
      status.hidden = false;
      status.className = "message error";
      status.textContent = "Please enter valid details.";
      return;
    }

    const enquiry = {
      id: "MSG-" + Date.now(),
      name: name,
      email: email,
      subject: subject,
      message: messageText,
      date: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("reliveContactMessages") || "[]"
      );

      const messages = Array.isArray(existing) ? existing : [];
      messages.push(enquiry);

      localStorage.setItem(
        "reliveContactMessages",
        JSON.stringify(messages)
      );

      form.reset();

      status.hidden = false;
      status.className = "message";
      status.textContent =
        "Thank you, " + name +
        "! Your demo message has been saved successfully.";

    } catch (error) {
      status.hidden = false;
      status.className = "message error";
      status.textContent =
        "Unable to save your message. Please check browser storage.";
    }
  });
});

