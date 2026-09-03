export function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-contact-status]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const first = String(data.get("firstName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!first || !email || !message) {
      if (status) {
        status.textContent = "Please fill in the required fields.";
        status.classList.remove("is-success");
      }
      return;
    }

    form.reset();
    if (status) {
      status.textContent = "Thanks — your message has been noted.";
      status.classList.add("is-success");
    }
  });
}
