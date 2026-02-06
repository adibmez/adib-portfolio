const links = document.querySelectorAll("[data-page-link]");
const views = document.querySelectorAll("[data-page]");

function showPage(pageName) {
  // hide all
  views.forEach((v) => v.classList.remove("is-visible"));

  // show selected
  const target = document.querySelector(`[data-page="${pageName}"]`);
  if (target) target.classList.add("is-visible");

  // active nav highlight (only on About/Works/Services/Contact)
  links.forEach((a) => a.classList.remove("is-active"));
  const active = document.querySelector(`[data-page-link="${pageName}"]`);
  if (active) active.classList.add("is-active");
}

// Click handling
links.forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const page = a.getAttribute("data-page-link");

    // If they click the logo (home), show home and also clear active if you want
    showPage(page);

    // Optional: update URL hash
    if (page === "home") {
      history.replaceState(null, "", "#home");
    } else {
      history.replaceState(null, "", `#${page}`);
    }
  });
});

// Load from hash on refresh
const initial = (location.hash || "#home").replace("#", "");
showPage(initial);

// Load from hash on refresh
const initial = (location.hash || "#home").replace("#", "");
showPage(initial);




