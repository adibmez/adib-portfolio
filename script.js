// ===== Page switching (SPA-style) =====
(function () {
  const links = Array.from(document.querySelectorAll("[data-page-link]"));
  const views = Array.from(document.querySelectorAll("[data-page]"));

  function showPage(pageName) {
    // Fallback
    const page = pageName && pageName.trim() ? pageName.trim() : "home";

    // Hide all views
    views.forEach((v) => v.classList.remove("is-visible"));

    // Show selected
    const target = document.querySelector(`[data-page="${page}"]`);
    if (target) target.classList.add("is-visible");

    // Update active nav
    links.forEach((a) => a.classList.remove("is-active"));
    const active = document.querySelector(`[data-page-link="${page}"]`);
    if (active) active.classList.add("is-active");
  }

  function getPageFromHash() {
    const hash = (window.location.hash || "").replace("#", "").trim();
    return hash || "home";
  }

  // Click handling
  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const page = a.getAttribute("data-page-link") || "home";

      // Update URL hash (this also makes refresh/back/forward work)
      window.location.hash = page;
      showPage(page);
    });
  });

  // Handle refresh + back/forward
  window.addEventListener("hashchange", () => {
    showPage(getPageFromHash());
  });

  // Init
  document.addEventListener("DOMContentLoaded", () => {
    showPage(getPageFromHash());
  });

  // ===== Visitor counter (safe) =====
  document.addEventListener("DOMContentLoaded", () => {
    const counterEl = document.getElementById("visitor-count");
    if (!counterEl) return; // If you didn't add it in HTML, do nothing.

    fetch("https://api.countapi.xyz/hit/adib.pro.bd/visits", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Count API request failed");
        return res.json();
      })
      .then((data) => {
        const val = typeof data?.value === "number" ? data.value : null;
        counterEl.textContent = val !== null ? String(val) : "—";
      })
      .catch(() => {
        counterEl.textContent = "—";
      });
  });
})();
