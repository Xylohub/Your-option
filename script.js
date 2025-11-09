/* =========================================================
   script.js — Her Option Jewelry Interactive Behaviors
   Improved & polished by IKJO
   =========================================================
   - Theme toggle (manual, saves user choice)
   - Hamburger mobile menu (fixed toggle)
   - Product rendering (local images)
   - Buy modal with MoMo / WhatsApp options
   - Scroll reveal animation
========================================================= */

// ---------------- PRODUCTS ----------------
const PRODUCTS = [
  { id: "p1", title: "Casio", price: "65k", img: "images/img1.jpg" },
  {
    id: "p2",
    title: "Daniel Wellington silver-green",
    price: "65k",
    img: "images/img2.jpg",
  },
  {
    id: "p3",
    title: "Daniel Wellington silver-black",
    price: "65k",
    img: "images/img3.jpg",
  },
  {
    id: "p4",
    title: "Daniel Wellington silver-white",
    price: "65k",
    img: "images/img4.jpg",
  },
  {
    id: "p5",
    title: "Daniel Wellington gold-cream",
    price: "65k",
    img: "images/img5.jpg",
  },
  {
    id: "p6",
    title: "Daniel Wellington gold-white",
    price: "65k frw",
    img: "images/img6.jpg",
  },
  {
    id: "p7",
    title: "Daniel Wellington gold-green",
    price: "65k frw",
    img: "images/img7.jpg",
  },
  { id: "p8", title: "Casio", price: "65k frw", img: "images/img8.jpg" },
  { id: "p9", title: "Tissot", price: "60k frw", img: "images/img9.jpg" },
  {
    id: "p10",
    title: "Rolex Oyster Perpetual",
    price: "65k frw",
    img: "images/img10.jpg",
  },
  {
    id: "p11",
    title: "Casio watch & bracelet (gold)",
    price: "65k frw",
    img: "images/img11.jpg",
  },
  {
    id: "p12",
    title: "Casio watch & bracelet (gold & blue)",
    price: "65k frw",
    img: "images/img12.jpg",
  },
  {
    id: "p13",
    title: "Rolex Oyster Perpetual (Pale-Gold)",
    price: "65k frw",
    img: "images/img13.jpg",
  },
  {
    id: "p14",
    title: "Rolex Oyster Perpetual (Silver-White)",
    price: "65k frw",
    img: "images/img14.jpg",
  },
  {
    id: "p15",
    title: "Tissot (green)",
    price: "65k frw",
    img: "images/img15.jpg",
  },
  {
    id: "p16",
    title: "Tissot (black-white)",
    price: "65k frw",
    img: "images/img16.jpg",
  },
  {
    id: "p17",
    title: "Rolex Oyster Perpetual (white)",
    price: "65k frw",
    img: "images/img17.jpg",
  },
  {
    id: "p18",
    title: "Tissot (pure black)",
    price: "65k frw",
    img: "images/img18.jpg",
  },
  {
    id: "p19",
    title: "Rolex Oyster Perpetual",
    price: "65k frw",
    img: "images/img19.jpg",
  },
  {
    id: "p20",
    title: "Rolex Oyster Perpetual",
    price: "65k frw",
    img: "images/img20.jpg",
  },
];

// ---------------- DOM ELEMENTS ----------------
const productGrid = document.getElementById("product-grid");
const buyModal = document.getElementById("buy-modal");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const momoBtn = document.getElementById("momo-btn");
const waBtn = document.getElementById("wa-btn");
const modalClose = document.getElementById("modal-close");

const themeToggle = document.getElementById("theme-toggle");
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".nav-mobile");
const brandLogo = document.getElementById("brand-logo");
const yearEl = document.getElementById("year");
const heroVideo = document.getElementById("hero-video");

// ---------------- SET YEAR ----------------
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------------- RENDER PRODUCTS ----------------
function renderProducts() {
  if (!productGrid) return;
  productGrid.innerHTML = "";

  PRODUCTS.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card reveal";

    card.innerHTML = `
      <div class="card-media">
        <img src="${p.img}" alt="${p.title}">
      </div>
      <div class="card-body">
        <div class="card-info">
          <div class="card-title">${p.title}</div>
          <div class="card-price">${p.price}</div>
        </div>
        <div class="card-actions">
          <button class="btn buy-btn">Buy</button>
          <a class="btn outline" href="#">Details</a>
        </div>
      </div>
    `;

    card
      .querySelector(".buy-btn")
      .addEventListener("click", () => openBuyModal(p));
    productGrid.appendChild(card);
  });
}

// ---------------- BUY MODAL ----------------
function openBuyModal(product) {
  modalTitle.textContent = product.title;
  modalPrice.textContent = product.price;

  const momoLink = `tel:*182*8*1*1*0798812309#`; // Replace with real MoMo link
  momoBtn.href = momoLink;

  const waNumber = "250798812309";
  const msg = `Hello, I want to order "${product.title}" priced at ${product.price}.`;
  waBtn.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  buyModal.setAttribute("aria-hidden", "false");
}

function closeBuyModal() {
  buyModal.setAttribute("aria-hidden", "true");
}

if (modalClose) modalClose.addEventListener("click", closeBuyModal);
if (buyModal)
  buyModal.addEventListener("click", (e) => {
    if (e.target === buyModal) closeBuyModal();
  });

// ---------------- THEME TOGGLE ----------------
function updateLogo(isLight) {
  brandLogo.src = isLight ? "images/logo.jpg" : "images/logo.jpg";
}

(function initTheme() {
  const saved = localStorage.getItem("ho_theme");
  const initial = saved || "dark";
  if (initial === "light")
    document.documentElement.classList.add("light-theme");
  updateLogo(document.documentElement.classList.contains("light-theme"));

  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("light-theme");
    const isLight = document.documentElement.classList.contains("light-theme");
    localStorage.setItem("ho_theme", isLight ? "light" : "dark");
    updateLogo(isLight);
  });
})();

// ---------------- HAMBURGER MENU ----------------
if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileNav.classList.toggle("active");
  });

  // close menu on link click
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active");
      hamburger.classList.remove("open");
    });
  });
}

// ---------------- SCROLL REVEAL ----------------
function setupReveal() {
  const obs = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) {
          ent.target.classList.add("visible");
          observer.unobserve(ent.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
}

// ---------------- INIT ----------------
renderProducts();
setupReveal();

// ---------------- MOBILE VIDEO AUTOPAUSE ----------------
if (heroVideo && window.matchMedia("(max-width:600px)").matches) {
  try {
    heroVideo.pause();
  } catch {}
}
