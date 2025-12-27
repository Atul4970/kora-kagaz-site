/* =========================================================
   Kora Kagaz - script.js (Complete)
   Includes:
   - WhatsApp link (all pages)
   - Mobile menu toggle (all pages)
   - Optional lightbox for image click (if lightbox HTML exists)
   ========================================================= */

/* ================================
   CONFIG (EDIT ONLY THIS PART)
   ================================ */
const WHATSAPP_NUMBER = "918077542962"; 
// Example: "919457052437" (no +, no spaces)

const DEFAULT_MESSAGE =
  "Hi! I’m interested in Kora Kagaz products. Please share price & availability.";

/* ================================
   Run after DOM is ready
   ================================ */
document.addEventListener("DOMContentLoaded", () => {
  setupWhatsAppLinks();
  setupMobileMenu();
  setupLightbox(); // optional (works only if lightbox exists)
});

/* ================================
   1) WhatsApp links (ALL PAGES)
   How it works:
   - Any <a> with class="whatsapp-link" will be converted to wa.me link
   - Use data-msg="..." to customize message per button
   ================================ */
function setupWhatsAppLinks() {
  const buttons = document.querySelectorAll("a.whatsapp-link");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    const msg = btn.getAttribute("data-msg") || DEFAULT_MESSAGE;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

    // Set real WA link so it never opens blank/duplicate page
    btn.setAttribute("href", url);

    // If any page accidentally has href="#" prevent that behavior
    btn.addEventListener("click", (e) => {
      const href = btn.getAttribute("href") || "";
      if (href.trim() === "" || href.trim() === "#") e.preventDefault();
    });
  });
}

/* ================================
   2) Mobile menu toggle (ALL PAGES)
   Works with either of these setups:

   Preferred:
   - button#menuBtn
   - nav#siteNav

   OR (fallback):
   - .menu-toggle
   - #navMenu

   It will:
   - toggle class "mobile-open" or "active"
   - close menu when a link is clicked
   ================================ */
function setupMobileMenu() {
  // Try first set of ids/classes (from earlier fixes)
  let menuBtn = document.getElementById("menuBtn");
  let nav = document.getElementById("siteNav");

  // Fallback for the newer header variant
  if (!menuBtn) menuBtn = document.getElementById("menuToggle");
  if (!nav) nav = document.getElementById("navMenu");

  // Fallback for class-based selectors
  if (!menuBtn) menuBtn = document.querySelector(".menu-btn, .menu-toggle");
  if (!nav) nav = document.querySelector(".nav");

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", () => {
    // Support both class names so your CSS can use either
    nav.classList.toggle("mobile-open");
    nav.classList.toggle("active");

    // aria-expanded for accessibility (safe)
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", (!expanded).toString());
  });

  // Close after clicking any nav link
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("mobile-open");
      nav.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* ================================
   3) Lightbox (Optional)
   Opens image in fullscreen when clicked.

   Requirements (only if you want it):
   Add this HTML once in every page (before </body>):

   <div id="lightbox" class="lightbox" style="display:none;">
     <button class="close" aria-label="Close">×</button>
     <img id="lightbox-img" alt="Preview">
   </div>

   And CSS to style .lightbox (I can share if needed).
   ================================ */
ffunction setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const imgEl = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  if (!lightbox || !imgEl) return;

  // Open: any image inside common containers
  document.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;

    // Only open for images that are part of products/gallery
    const allowed = img.closest(".card, .item, .product, .gallery-grid, .products, .craft-grid, main");
    if (!allowed) return;

    // Open full
    imgEl.src = img.src;
    imgEl.alt = img.alt || "Kora Kagaz artwork";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener("click", close);
  }

  // Close if click outside image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  function close() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    imgEl.src = "";
    document.body.style.overflow = "";
  }
}


  // Close button
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
      lightboxImg.src = "";
    });
  }

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      lightboxImg.src = "";
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lightbox.style.display = "none";
      lightboxImg.src = "";
    }
  });
}
