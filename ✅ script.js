// ====== EDIT THESE ======
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // e.g. 919876543210 (no +)
const INSTAGRAM_URL = "https://instagram.com/korakagaz";
const EMAIL = "korakagaz@gmail.com";
// Optional: Paste Razorpay payment link here (if you create one)
const RAZORPAY_PAYMENT_LINK = "";
// ========================

function waLink(message){
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

function setActiveNav(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav a").forEach(a=>{
    const href = (a.getAttribute("href") || "").toLowerCase();
    if(href === path) a.classList.add("active");
  });
}

function wireCommonLinks(){
  const year = document.getElementById("year");
  if(year) year.textContent = new Date().getFullYear();

  const insta = document.getElementById("instaLink");
  if(insta) insta.href = INSTAGRAM_URL;

  const email = document.getElementById("emailLink");
  if(email) email.href = `mailto:${EMAIL}`;

  const waTop = document.getElementById("whatsappTop");
  if(waTop) waTop.href = waLink("Hi Kora Kagaz! I want to buy your handmade artwork. Please share available pieces & delivery details.");

  const waFooter = document.getElementById("whatsappFooter");
  if(waFooter) waFooter.href = waLink("Hi Kora Kagaz! I want to buy your handmade artwork. Please share available pieces & delivery details.");
}

function wireBuyButtons(){
  document.querySelectorAll("[data-buy]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const name = btn.getAttribute("data-name") || "Artwork";
      const price = btn.getAttribute("data-price") || "";
      const code = btn.getAttribute("data-code") || "";
      const msg = `Hi Kora Kagaz! I want to buy:\n• Item: ${name}\n• Code: ${code}\n• Price: ${price}\n\nPlease confirm availability and delivery.`;
      window.open(waLink(msg), "_blank");
    });
  });

  const pay = document.getElementById("payLink");
  if(pay){
    if(RAZORPAY_PAYMENT_LINK && RAZORPAY_PAYMENT_LINK.trim().length > 0){
      pay.href = RAZORPAY_PAYMENT_LINK.trim();
      pay.style.display = "inline-flex";
    } else {
      pay.style.display = "none";
    }
  }
}

function wireContactForm(){
  const form = document.getElementById("contactForm");
  if(!form) return;

  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "";
    const phone = data.get("phone") || "";
    const message = data.get("message") || "";
    const msg = `Hi Kora Kagaz!\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
    window.open(waLink(msg), "_blank");
  });
}

setActiveNav();
wireCommonLinks();
wireBuyButtons();
wireContactForm();
