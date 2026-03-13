async function loadProjects() {
  const container = document.getElementById("projects-container");
  try {
    const response = await fetch("/api/projects");
    if (!response.ok) throw new Error("Server error: " + response.status);
    const result   = await response.json();
    const projects = result.data;
    container.innerHTML = "";
    projects.forEach((project) => {
      const tags = project.techStack.map(t => `<span class="tech-tag">${t}</span>`).join("");
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-tags">${tags}</div>
        <div class="project-links">
          <a href="${project.liveUrl}" target="_blank">🔗 Live Demo</a>
          <a href="${project.repoUrl}" target="_blank">💻 GitHub</a>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load projects:", error);
    container.innerHTML = `<p class="loading">⚠️ Could not load projects.</p>`;
  }
}

async function handleContactSubmit(event) {
  event.preventDefault();
  const name      = document.getElementById("name").value.trim();
  const email     = document.getElementById("email").value.trim();
  const message   = document.getElementById("message").value.trim();
  const submitBtn = document.getElementById("submit-btn");
  const status    = document.getElementById("form-status");
  status.className   = "form-status";
  status.textContent = "";
  submitBtn.disabled    = true;
  submitBtn.textContent = "Sending…";
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });
    const result = await response.json();
    if (result.success) {
      status.className   = "form-status success";
      status.textContent = result.message;
      document.getElementById("contact-form").reset();
    } else {
      status.className   = "form-status error";
      status.textContent = result.message;
    }
  } catch (error) {
    status.className   = "form-status error";
    status.textContent = "Something went wrong. Please try again.";
  } finally {
    submitBtn.disabled    = false;
    submitBtn.textContent = "Send Message";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  const form = document.getElementById("contact-form");
  if (form) form.addEventListener("submit", handleContactSubmit);
});
